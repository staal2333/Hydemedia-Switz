import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';
import { z } from 'zod';
import { hit, clientKey, rateLimitHeaders } from '@/lib/rate-limit';

// SMTP delivery can take a few seconds; give the function room so a slow
// handshake surfaces as a sent mail rather than a platform timeout.
export const maxDuration = 30;

/**
 * The browser validates with zod before submitting, but the endpoint is
 * publicly reachable, so it validates again rather than trusting the client.
 */
const schema = z.object({
  formType: z.enum(['advertiser', 'partner']).default('advertiser'),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  phone: z.string().trim().max(60).optional().or(z.literal('')),
  message: z.string().trim().min(5).max(5000),
  campaignType: z.string().trim().max(120).optional().or(z.literal('')),
  budget: z.string().trim().max(120).optional().or(z.literal('')),
  propertyAddress: z.string().trim().max(240).optional().or(z.literal('')),
  propertyType: z.string().trim().max(120).optional().or(z.literal('')),
  /** What the visitor clicked through from, e.g. a placement name. */
  topic: z.string().trim().max(160).optional().or(z.literal('')),
  /**
   * Hidden field — a real person never fills this in. Accepted by the schema
   * so the honeypot branch below can answer 200 and tell a bot nothing.
   */
  website: z.string().max(200).optional(),
});

/** Submitted text lands inside an HTML email, so it must not carry markup. */
function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Visitor-facing wording. The form passes ?lang=en; anything else is German. */
const MSG = {
  de: {
    tooMany: 'Zu viele Anfragen. Bitte versuchen Sie es in Kürze erneut oder rufen Sie +41 77 233 81 21 an.',
    invalid: 'Bitte prüfen Sie die Felder und versuchen Sie es erneut.',
    failed: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an theodor.staal@hydemedia.ch.',
    receiptSubject: 'Vielen Dank für Ihre Anfrage an Hyde Media',
    receiptBody: (name: string, isAdvertiser: boolean) => `
        <h2>Vielen Dank für Ihre Anfrage!</h2>
        <p>Guten Tag ${name}</p>
        <p>Wir haben Ihre ${isAdvertiser ? 'Kampagnenanfrage' : 'Partneranfrage'} erhalten und melden uns innerhalb von 24 Stunden.</p>
        <p>Freundliche Grüsse<br/>Hyde Media</p>`,
  },
  en: {
    tooMany: 'Too many requests. Please try again shortly, or call +41 77 233 81 21.',
    invalid: 'Please check the fields and try again.',
    failed: 'The message could not be sent. Please try again, or email theodor.staal@hydemedia.ch.',
    receiptSubject: 'Thank you for contacting Hyde Media',
    receiptBody: (name: string, isAdvertiser: boolean) => `
        <h2>Thank you for your enquiry!</h2>
        <p>Hi ${name},</p>
        <p>We have received your ${isAdvertiser ? 'campaign enquiry' : 'partnership enquiry'} and will get back to you within 24 hours.</p>
        <p>Kind regards<br/>Hyde Media</p>`,
  },
} as const;

/** Five enquiries in ten minutes is far above any real visitor. */
const LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

export async function POST(request: NextRequest) {
  const msg = MSG[request.nextUrl.searchParams.get('lang') === 'en' ? 'en' : 'de'];
  const gate = hit(`contact:${clientKey(request)}`, LIMIT);
  if (!gate.ok) {
    return NextResponse.json(
      { error: msg.tooMany },
      { status: 429, headers: rateLimitHeaders(gate) },
    );
  }

  let data: z.infer<typeof schema>;
  try {
    data = schema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { error: msg.invalid },
      { status: 400, headers: rateLimitHeaders(gate) },
    );
  }

  // Honeypot filled means a bot; answer 200 so it learns nothing.
  if (data.website) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const { formType, name, email, company, phone, message, topic } = data;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      // One connection for both messages instead of two handshakes.
      pool: true,
      maxConnections: 2,
    });

    const subject =
      (formType === 'advertiser'
        ? `New Advertiser Inquiry from ${name}`
        : `New Partner Application from ${name}`) + (topic ? ` — ${topic}` : '');

    const detail =
      formType === 'advertiser'
        ? `
        <p><strong>Campaign Type:</strong> ${esc(data.campaignType) || 'N/A'}</p>
        <p><strong>Budget:</strong> ${esc(data.budget) || 'Not specified'}</p>`
        : `
        <p><strong>Property Address:</strong> ${esc(data.propertyAddress) || 'N/A'}</p>
        <p><strong>Property Type:</strong> ${esc(data.propertyType) || 'N/A'}</p>`;

    const emailBody = `
      <h2>${esc(subject)}</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Company:</strong> ${esc(company) || 'N/A'}</p>
      <p><strong>Phone:</strong> ${esc(phone) || 'N/A'}</p>
      ${topic ? `<p><strong>Topic:</strong> ${esc(topic)}</p>` : ''}
      ${detail}
      <p><strong>Message:</strong></p>
      <p>${esc(message).replace(/\n/g, '<br/>')}</p>
    `;

    // Sent together — sequentially this took ~20s, long enough to risk a
    // serverless timeout and long enough that the visitor assumes it failed.
    await Promise.all([
      transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL || 'theodor.staal@hydemedia.ch',
        replyTo: email,
        subject,
        html: emailBody,
      }),
      transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: msg.receiptSubject,
        html: msg.receiptBody(esc(name), formType === 'advertiser'),
      }),
    ]);

    transporter.close();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: msg.failed }, { status: 500 });
  }
}
