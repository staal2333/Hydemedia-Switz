import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { hit, clientKey, rateLimitHeaders } from '@/lib/rate-limit';

// SMTP delivery can take a few seconds; give the function room so a slow
// handshake surfaces as a sent mail rather than a platform timeout.
export const maxDuration = 30;

/** Nobody signs up for a newsletter three times in ten minutes. */
const LIMIT = { limit: 3, windowMs: 10 * 60 * 1000 };

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  /** Where on the site the form sat, e.g. "blog", "footer", "placement:riehenring-141". */
  source: z.string().trim().max(80).regex(/^[a-z0-9:_-]*$/).optional().default('website'),
  locale: z.enum(['de', 'en']).optional().default('de'),
  /** Hidden field; a person never fills it in. */
  website: z.string().max(200).optional(),
});

const MSG = {
  de: {
    tooMany: 'Zu viele Versuche. Bitte versuchen Sie es in Kürze erneut.',
    invalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    pending: 'Bitte prüfen Sie Ihren Posteingang und klicken Sie auf den Link in der E-Mail, um zu bestätigen.',
    already: 'Sie sind bereits angemeldet. Vielen Dank!',
    received: 'Vielen Dank! Wir haben Ihre Anmeldung erhalten.',
    failed: 'Die Anmeldung ist fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie an theodor.staal@hydemedia.ch.',
    unavailable: 'Der Newsletter ist im Moment nicht verfügbar. Schreiben Sie an theodor.staal@hydemedia.ch.',
  },
  en: {
    tooMany: 'Too many attempts. Please try again shortly.',
    invalid: 'Please enter a valid email address.',
    pending: 'Check your inbox and click the link in the email to confirm.',
    already: 'You are already subscribed. Thank you!',
    received: 'Thank you! We have received your signup.',
    failed: 'Signup failed. Please try again, or email theodor.staal@hydemedia.ch.',
    unavailable: 'The newsletter is not available right now. Email theodor.staal@hydemedia.ch.',
  },
} as const;

type Outcome = 'pending' | 'already';

/**
 * Mailchimp with double opt-in: a new address is created as "pending", and
 * Mailchimp sends the confirmation email. Only a confirmed click turns it into
 * a subscriber, which documents the consent Swiss law requires for mass
 * advertising by email (Art. 3 Abs. 1 lit. o UWG).
 *
 * PUT on the member hash is an upsert, so repeat signups never error.
 * `status_if_new` only applies to new members, so an existing subscriber is
 * left as they are.
 *
 * Env: MAILCHIMP_API_KEY (ends in the server prefix, e.g. "-us21") and
 * MAILCHIMP_LIST_ID (the audience ID).
 */
async function subscribeMailchimp(
  email: string,
  source: string,
  locale: 'de' | 'en',
  ip: string | undefined,
): Promise<Outcome> {
  const key = process.env.MAILCHIMP_API_KEY!;
  const list = process.env.MAILCHIMP_LIST_ID!;
  const server = process.env.MAILCHIMP_SERVER_PREFIX || key.split('-')[1];
  const hash = createHash('md5').update(email).digest('hex');
  const base = `https://${server}.api.mailchimp.com/3.0/lists/${list}/members/${hash}`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${Buffer.from(`hydemedia:${key}`).toString('base64')}`,
  };

  const res = await fetch(base, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      email_address: email,
      status_if_new: 'pending',
      language: locale,
      ...(ip ? { ip_signup: ip } : {}),
    }),
  });
  const member = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error('Mailchimp error:', res.status, member?.title, member?.detail);
    throw new Error('mailchimp');
  }

  // Someone who unsubscribed earlier and signs up again must re-confirm.
  let status: string = member.status;
  if (status === 'unsubscribed') {
    const again = await fetch(base, { method: 'PATCH', headers, body: JSON.stringify({ status: 'pending' }) });
    if (!again.ok) throw new Error('mailchimp-resubscribe');
    status = 'pending';
  }

  // Tags say where the signup came from. A failure here must not lose the signup.
  await fetch(`${base}/tags`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      tags: [
        { name: 'hydemedia.ch', status: 'active' },
        { name: `quelle:${source}`, status: 'active' },
      ],
    }),
  }).catch((err) => console.error('Mailchimp tags failed:', err));

  return status === 'subscribed' ? 'already' : 'pending';
}

/**
 * No Mailchimp keys yet: mail the signup to the team, so the address is not
 * lost. There is no confirmation step on this path, so the team must confirm
 * consent before adding the address to a list.
 */
async function notifyBySmtp(email: string, source: string) {
  const nodemailer = await import('nodemailer');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const safe = (v: string) => v.replace(/[<>&"]/g, '');
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || 'theodor.staal@hydemedia.ch',
    subject: 'Neue Newsletter-Anmeldung (nicht bestätigt)',
    html: `<p><strong>E-Mail:</strong> ${safe(email)}</p><p><strong>Quelle:</strong> ${safe(source)}</p>
      <p>Mailchimp ist nicht eingerichtet, daher wurde keine Bestätigungs-E-Mail versendet. Bitte die Einwilligung einholen, bevor die Adresse auf die Liste kommt.</p>`,
  });
}

export async function POST(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang') === 'en' ? 'en' : 'de';
  const gate = hit(`newsletter:${clientKey(request)}`, LIMIT);
  if (!gate.ok) {
    return NextResponse.json({ error: MSG[lang].tooMany }, { status: 429, headers: rateLimitHeaders(gate) });
  }

  let data: z.infer<typeof schema>;
  try {
    data = schema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: MSG[lang].invalid }, { status: 400 });
  }
  const msg = MSG[data.locale];

  // Honeypot filled: answer as if it worked, and store nothing.
  if (data.website) return NextResponse.json({ message: msg.pending, status: 'pending' });

  try {
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined;
      const outcome = await subscribeMailchimp(data.email, data.source, data.locale, ip);
      return NextResponse.json({ message: outcome === 'already' ? msg.already : msg.pending, status: outcome });
    }
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      // No confirmation mail goes out on this path, so do not tell the visitor to look for one.
      await notifyBySmtp(data.email, data.source);
      return NextResponse.json({ message: msg.received, status: 'received' });
    }
    console.error('Newsletter signup could not be stored — no Mailchimp and no SMTP.');
    return NextResponse.json({ error: msg.unavailable }, { status: 503 });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: msg.failed }, { status: 502 });
  }
}
