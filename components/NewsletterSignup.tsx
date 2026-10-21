'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { markSubscribed } from '@/lib/newsletter';
import { track } from '@/lib/track';

const COPY = {
  de: {
    eyebrow: 'Newsletter',
    title: 'Neue Standorte vor allen anderen',
    body: 'Eine kurze E-Mail, sobald eine neue Fläche frei wird. Abmeldung mit einem Klick.',
    label: 'Ihre E-Mail',
    placeholder: 'name@firma.ch',
    send: 'Anmelden',
    sending: 'Wird angemeldet…',
    legalA: 'Sie erhalten eine E-Mail, mit der Sie die Anmeldung bestätigen. Wie wir Ihre E-Mail-Adresse bearbeiten, lesen Sie in unserer ',
    legalLink: 'Datenschutzerklärung',
    doneTitle: 'Fast geschafft',
    thanks: 'Danke',
    network: 'Die Anmeldung ist fehlgeschlagen. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.',
  },
  en: {
    eyebrow: 'Newsletter',
    title: 'Hear about new placements first',
    body: 'A short email when a new site becomes available. Unsubscribe in one click.',
    label: 'Your email',
    placeholder: 'name@company.com',
    send: 'Sign up',
    sending: 'Signing up…',
    legalA: 'You will get an email to confirm your signup. Read how we handle your email in our ',
    legalLink: 'privacy policy',
    doneTitle: 'Almost done',
    thanks: 'Thank you',
    network: 'Signup failed. Check your connection and try again.',
  },
} as const;

export type NewsletterVariant = 'card' | 'footer' | 'compact';

interface Props {
  /** Where the form sits; becomes a Mailchimp tag, e.g. "blog" or "placement:riehenring-141". */
  source: string;
  variant?: NewsletterVariant;
  /** Override the default headline and body for a specific context. */
  title?: string;
  body?: string;
  /** Called after a successful signup, e.g. so the slide-in can close itself. */
  onDone?: () => void;
}

/**
 * Newsletter signup with double opt-in. Submitting creates a pending contact in
 * Mailchimp, which then sends the confirmation email; nothing is sent to the
 * visitor until they click it. The form states that plainly, so the consent
 * is informed.
 */
export default function NewsletterSignup({ source, variant = 'card', title, body, onDone }: Props) {
  const locale = useLocale();
  const lang = locale === 'en' ? 'en' : 'de';
  const t = COPY[lang];
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  // "pending" means a confirmation mail is on its way; anything else is final.
  const [awaitingConfirm, setAwaitingConfirm] = useState(true);

  const dark = variant === 'footer';
  const compact = variant === 'compact';

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setStatus('sending');
    try {
      const res = await fetch(`/api/newsletter?lang=${lang}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(fd.get('email') ?? ''),
          website: String(fd.get('website') ?? ''),
          source,
          locale: lang,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || t.network);
      setMessage(data.message);
      setAwaitingConfirm(data.status === 'pending');
      setStatus('done');
      markSubscribed();
      track('sign_up', { method: 'newsletter', source });
      onDone?.();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : t.network);
      setStatus('error');
    }
  }

  const heading = title ?? t.title;
  const lede = body ?? t.body;

  const text = {
    eyebrow: dark ? 'text-sky' : 'text-mid',
    title: dark ? 'text-white' : 'text-ink',
    body: dark ? 'text-white/75' : 'text-ink-soft',
    legal: dark ? 'text-white/55' : 'text-muted',
  };

  if (status === 'done') {
    return (
      <div role="status" className={compact ? '' : 'py-2'}>
        <div className={`font-ui font-semibold text-[10px] tracking-[0.24em] uppercase mb-2 ${text.eyebrow}`}>{awaitingConfirm ? t.doneTitle : t.thanks}</div>
        <p className={`font-display m-0 ${text.title}`} style={{ fontSize: compact ? 20 : 26, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          {message}
        </p>
      </div>
    );
  }

  const form = (
    <form onSubmit={onSubmit} className="w-full" data-newsletter-form="">
      {/* Honeypot — hidden from people, catches naive bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
      <div className={`flex gap-2 ${compact ? 'flex-col' : 'flex-col sm:flex-row'}`}>
        <label className="flex-1">
          <span className="sr-only">{t.label}</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t.placeholder}
            className={`w-full px-4 py-3.5 rounded-full text-[15px] focus:outline-none transition-colors ${
              dark
                ? 'bg-white/10 border border-white/25 text-white placeholder:text-white/45 focus:border-white/70'
                : 'bg-fog border border-rule text-ink placeholder:text-muted/70 focus:border-mid focus:bg-white'
            }`}
          />
        </label>
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`shrink-0 px-6 py-3.5 rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] transition-all disabled:opacity-60 ${
            dark ? 'bg-cream text-dusk hover:bg-glow' : 'bg-ink text-white hover:bg-dusk'
          }`}
        >
          {status === 'sending' ? t.sending : t.send}
        </button>
      </div>
      {status === 'error' && (
        <p role="alert" className={`text-[13px] mt-2 m-0 ${dark ? 'text-glow' : 'text-red-700'}`}>
          {message}
        </p>
      )}
      <p className={`text-[12px] leading-[1.55] mt-3 m-0 ${text.legal}`}>
        {t.legalA}
        <Link href={`/${lang}/privacy`} className="underline underline-offset-2 hover:opacity-80">
          {t.legalLink}
        </Link>
        .
      </p>
    </form>
  );

  const intro = (
    <div>
      <div className={`font-ui font-semibold text-[10px] tracking-[0.24em] uppercase mb-2 ${text.eyebrow}`}>{t.eyebrow}</div>
      <h2
        className={`font-display font-normal m-0 ${text.title}`}
        style={{ fontSize: compact ? 22 : 'clamp(24px, 2.6vw, 34px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
      >
        {heading}
      </h2>
      <p className={`text-[15px] leading-[1.6] m-0 mt-2.5 ${text.body}`}>{lede}</p>
    </div>
  );

  if (compact) {
    return (
      <div className="flex flex-col gap-4">
        {intro}
        {form}
      </div>
    );
  }

  return (
    <div className={`grid gap-6 items-center ${dark ? 'lg:grid-cols-[1fr_1.1fr]' : 'md:grid-cols-[1fr_1.15fr]'}`}>
      {intro}
      {form}
    </div>
  );
}
