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
    received: 'Vielen Dank! Wir haben Ihre Anmeldung erhalten.',
    failed: 'Die Anmeldung ist fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie an theodor.staal@hydemedia.ch.',
    unavailable: 'Der Newsletter ist im Moment nicht verfügbar. Schreiben Sie an theodor.staal@hydemedia.ch.',
  },
  en: {
    tooMany: 'Too many attempts. Please try again shortly.',
    invalid: 'Please enter a valid email address.',
    received: 'Thank you! We have received your signup.',
    failed: 'Signup failed. Please try again, or email theodor.staal@hydemedia.ch.',
    unavailable: 'The newsletter is not available right now. Email theodor.staal@hydemedia.ch.',
  },
} as const;

/**
 * Every signup is mailed to the team, who add the address to the newsletter
 * list by hand. The mail keeps the time, page, language and IP of the signup,
 * which documents the consent Swiss law requires for mass advertising by email
 * (Art. 3 Abs. 1 lit. o UWG).
 */
async function notifyTeam(email: string, source: string, locale: 'de' | 'en', ip: string | undefined) {
  const nodemailer = await import('nodemailer');
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  const safe = (v: string) => v.replace(/[<>&"]/g, '');
  const at = new Date().toLocaleString('de-CH', { timeZone: 'Europe/Zurich' });
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || 'theodor.staal@hydemedia.ch',
    replyTo: email,
    subject: `Neue Newsletter-Anmeldung: ${safe(email)}`,
    html: `<p><strong>E-Mail:</strong> ${safe(email)}</p>
      <p><strong>Zeitpunkt:</strong> ${safe(at)}</p>
      <p><strong>Quelle:</strong> ${safe(source)}</p>
      <p><strong>Sprache:</strong> ${locale}</p>
      ${ip ? `<p><strong>IP-Adresse:</strong> ${safe(ip)}</p>` : ''}
      <p>Bitte die Adresse manuell auf die Newsletter-Liste setzen. Diese E-Mail dient als Nachweis der Einwilligung.</p>`,
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
  if (data.website) return NextResponse.json({ message: msg.received, status: 'received' });

  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined;
      await notifyTeam(data.email, data.source, data.locale, ip);
      return NextResponse.json({ message: msg.received, status: 'received' });
    }
    console.error('Newsletter signup could not be sent — SMTP is not configured.');
    return NextResponse.json({ error: msg.unavailable }, { status: 503 });
  } catch (error) {
    console.error('Newsletter error:', error);
    return NextResponse.json({ error: msg.failed }, { status: 502 });
  }
}
