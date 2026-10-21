'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getRegionConfig } from '@/lib/region';
import { track } from '@/lib/track';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

const COPY = {
  de: {
    eyebrow: '§ Kontakt',
    direct: 'A. Direkt',
    answerLead: 'Antwort innerhalb von',
    answerAccent: '24 Stunden.',
    answerBody: 'Wir antworten so schnell wie möglich auf Ihre Anfrage — in der Regel innerhalb eines Arbeitstags.',
    write: 'Schreiben',
    call: 'Anrufen',
    address: 'Adresse',
    formNo: 'B. Schreiben Sie uns',
    formTitle: 'Was ist Ihr Anliegen?',
    tabBrand: 'Ich bin eine Marke',
    tabFacade: 'Ich habe eine Fassade',
    name: 'Name',
    email: 'E-Mail',
    company: 'Unternehmen',
    companyPartner: 'Firma/UID',
    phone: 'Telefon',
    messageBrand: 'Erzählen Sie uns von Ihrer Kampagne',
    messagePartner: 'Erzählen Sie uns von Ihrer Liegenschaft',
    error: (email: string) => `Etwas ist schiefgelaufen — versuchen Sie es erneut oder schreiben Sie direkt an ${email}.`,
    sending: 'Wird gesendet…',
    send: 'Anfrage senden',
    privacyLead: 'Wir verwenden Ihre Angaben, um Ihre Anfrage zu beantworten. Mehr dazu in unserer ',
    privacyLink: 'Datenschutzerklärung',
    successEyebrow: 'Vielen Dank für Ihre Anfrage',
    successLead: 'Wir melden uns',
    successAccent: 'innerhalb von 24 Stunden.',
    successBody: 'Sie erhalten eine Bestätigung per E-Mail. Wir melden uns rasch mit den nächsten Schritten.',
    successReset: 'Neue Anfrage senden',
    topicLabel: 'Anfrage zu',
    topicClear: 'Thema entfernen',
    topicPermit: 'Hilfe bei der Bewilligung',
    prefillLocation: (name: string) =>
      `Guten Tag\n\nWir interessieren uns für den Standort ${name}.\n\nGewünschter Zeitraum: \nMarke/Kampagne: `,
  },
  en: {
    eyebrow: '§ Contact',
    direct: 'A. Direct',
    answerLead: 'Get an answer within',
    answerAccent: '24 hours.',
    answerBody: 'We reply to your enquiry as quickly as possible — usually within one business day.',
    write: 'Email',
    call: 'Call',
    address: 'Address',
    formNo: 'B. Write to us',
    formTitle: 'Where are you starting from?',
    tabBrand: "I'm a brand",
    tabFacade: 'I own a facade',
    name: 'Name',
    email: 'Email',
    company: 'Company',
    companyPartner: 'Company/VAT no.',
    phone: 'Phone',
    messageBrand: 'Tell us about your campaign',
    messagePartner: 'Tell us about your property',
    error: (email: string) => `Something went wrong — try again, or email us directly at ${email}.`,
    sending: 'Sending…',
    send: 'Send enquiry',
    privacyLead: 'We use your details to respond to your enquiry. Read more in our ',
    privacyLink: 'privacy policy',
    successEyebrow: 'Thanks for your enquiry',
    successLead: "We'll get back to you",
    successAccent: 'within 24 hours.',
    successBody: "You'll receive a confirmation by email. We'll follow up quickly with next steps.",
    successReset: 'Send a new enquiry',
    topicLabel: 'Enquiry about',
    topicClear: 'Remove topic',
    topicPermit: 'Help with a permit',
    prefillLocation: (name: string) =>
      `Hi Hyde Media\n\nWe are interested in the ${name} placement.\n\nPreferred period: \nBrand/campaign: `,
  },
};

type Copy = (typeof COPY)['de'];
type FormType = 'advertiser' | 'partner';
type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Links across the site say where the visitor came from: `?location=` names a
 * placement, `?inquiry=` is "property", "permit" or a free-text service.
 */
function topicFor(copy: Copy, location?: string, inquiry?: string): string {
  if (location) return location;
  if (inquiry === 'permit') return copy.topicPermit;
  if (inquiry && inquiry !== 'property') return inquiry;
  return '';
}

export default function ContactPageClient({
  locale,
  location,
  inquiry,
}: {
  locale: string;
  location?: string;
  inquiry?: string;
}) {
  const t = useTranslations('contact');
  const config = getRegionConfig(locale);
  const copy: Copy = COPY[locale === 'en' ? 'en' : 'de'];

  const [formType, setFormType] = useState<FormType>(inquiry === 'property' ? 'partner' : 'advertiser');
  const [topic, setTopic] = useState(() => topicFor(copy, location, inquiry));
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);
    const payload = {
      formType,
      name: fd.get('name'),
      email: fd.get('email'),
      company: fd.get('company') ?? '',
      phone: fd.get('phone') ?? '',
      message: fd.get('message'),
      website: fd.get('website') ?? '',
      topic,
    };

    try {
      const res = await fetch(`/api/contact?lang=${locale === 'en' ? 'en' : 'de'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        // Surface the endpoint's own wording — "HTTP 429" tells a visitor nothing.
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || `HTTP ${res.status}`);
      }
      setStatus('success');
      track('generate_lead', { form_type: formType, topic: topic || undefined });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Network error');
    }
  };

  return (
    <div className="relative">
      {/* ── HERO on dusk ── */}
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">{copy.eyebrow}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {t('title').split(' ').slice(0, -1).join(' ')}{' '}
              <span className="italic text-cream">{t('title').split(' ').slice(-1).join(' ')}</span>
            </h1>
            <p className="font-body text-white/85 max-w-2xl mx-auto m-0" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {t('subtitle')}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>

      {/* ── INFO + FORM ── */}
      <section className="py-24">
        <div className="shell">
          <div className="grid lg:grid-cols-[1fr_1.3fr] grid-cols-1 gap-10 lg:gap-16 max-w-6xl mx-auto">
            {/* Info column */}
            <div className="flex flex-col gap-7">
              <div>
                <span className="sec-no inline-block mb-3 text-mid">{copy.direct}</span>
                <h2 className="font-display font-normal m-0 mb-4 text-ink" style={{ fontSize: 32, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                  {copy.answerLead} <span className="italic text-mid">{copy.answerAccent}</span>
                </h2>
                <p className="text-[15px] leading-[1.6] text-ink-soft m-0">
                  {copy.answerBody}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { Icon: Mail, label: copy.write, value: config.email, href: `mailto:${config.email}` },
                  { Icon: Phone, label: copy.call, value: config.phone, href: `tel:${config.phone.replace(/\s/g, '')}` },
                  { Icon: MapPin, label: copy.address, value: config.address, href: undefined as string | undefined },
                ].map((c, i) => {
                  const Inner = (
                    <>
                      <div className="flex items-center gap-3 mb-1.5">
                        <c.Icon className="w-4 h-4 text-mid" />
                        <span className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted">{c.label}</span>
                      </div>
                      <div className="font-display italic text-ink" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                        {c.value}
                      </div>
                    </>
                  );
                  return c.href ? (
                    <a key={i} href={c.href} className="block bg-white border border-rule rounded-2xl px-5 py-4 hover:border-mid hover:-translate-y-0.5 transition-all">
                      {Inner}
                    </a>
                  ) : (
                    <div key={i} className="block bg-white border border-rule rounded-2xl px-5 py-4">{Inner}</div>
                  );
                })}
              </div>
            </div>

            {/* Form column */}
            <div className="order-first lg:order-none bg-white border border-rule rounded-[20px] p-6 sm:p-8 md:p-10">
              {status === 'success' ? (
                <SuccessState copy={copy} onReset={() => setStatus('idle')} />
              ) : (
                <>
                  {/* Tabs */}
                  <div className="mb-7">
                    <span className="sec-no inline-block mb-3 text-mid">{copy.formNo}</span>
                    <h2 className="font-display font-normal m-0 mb-5 text-ink" style={{ fontSize: 28, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                      {copy.formTitle}
                    </h2>
                    <div className="flex gap-1 sm:gap-2 p-1 bg-fog rounded-full w-max max-w-full">
                      {([
                        { v: 'advertiser', label: copy.tabBrand },
                        { v: 'partner', label: copy.tabFacade },
                      ] as const).map((tab) => (
                        <button
                          key={tab.v}
                          type="button"
                          onClick={() => setFormType(tab.v)}
                          className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap font-ui font-semibold text-[12px] tracking-[0.06em] transition-all ${
                            formType === tab.v ? 'bg-ink text-white' : 'text-ink-soft hover:text-ink'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                    {topic && (
                      <div className="mt-4 inline-flex items-center gap-2 max-w-full bg-glow/25 border border-glow/60 text-ink rounded-full pl-4 pr-1.5 py-1.5">
                        <span className="font-ui font-semibold text-[10px] tracking-[0.18em] uppercase text-muted shrink-0">
                          {copy.topicLabel}
                        </span>
                        <span className="font-display text-[15px] truncate">{topic}</span>
                        <button
                          type="button"
                          onClick={() => setTopic('')}
                          aria-label={copy.topicClear}
                          className="shrink-0 h-6 w-6 rounded-full grid place-items-center text-ink-soft hover:bg-white hover:text-ink transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>

                  <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Honeypot — hidden from people, catches naive bots. */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    />
                    <Field name="name" label={copy.name} required />
                    <Field name="email" label={copy.email} type="email" required />
                    <Field name="company" label={formType === 'advertiser' ? copy.company : copy.companyPartner} />
                    <Field name="phone" label={copy.phone} type="tel" />
                    <FieldArea
                      name="message"
                      label={formType === 'advertiser' ? copy.messageBrand : copy.messagePartner}
                      required
                      defaultValue={location ? copy.prefillLocation(location) : undefined}
                    />
                    {status === 'error' && (
                      <p className="sm:col-span-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg p-3 m-0">
                        {copy.error(config.email)} ({errorMsg})
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="sm:col-span-2 inline-flex items-center justify-center gap-3 px-6 py-4 bg-ink text-white rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-dusk transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? copy.sending : copy.send}
                      <span>↗</span>
                    </button>
                    <p className="sm:col-span-2 text-[12px] leading-[1.6] text-muted m-0">
                      {copy.privacyLead}
                      <Link href={`/${locale}/privacy`} className="underline underline-offset-2 hover:text-ink transition-colors">
                        {copy.privacyLink}
                      </Link>
                      .
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      </GroundFlow>
    </div>
  );
}

function Field({ name, label, type = 'text', required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-1.5 sm:col-span-1">
      <span className="font-ui font-semibold text-[10px] tracking-[0.18em] uppercase text-muted">
        {label}{required && <span className="text-mid"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3 bg-fog border border-rule rounded-lg text-[15px] text-ink placeholder:text-muted/60 focus:outline-none focus:border-mid focus:bg-white transition-colors"
      />
    </label>
  );
}

function FieldArea({
  name,
  label,
  required,
  defaultValue,
}: {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5 sm:col-span-2">
      <span className="font-ui font-semibold text-[10px] tracking-[0.18em] uppercase text-muted">
        {label}{required && <span className="text-mid"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        defaultValue={defaultValue}
        rows={5}
        className="w-full px-4 py-3 bg-fog border border-rule rounded-lg text-[15px] text-ink placeholder:text-muted/60 focus:outline-none focus:border-mid focus:bg-white transition-colors resize-y"
      />
    </label>
  );
}

function SuccessState({ copy, onReset }: { copy: Copy; onReset: () => void }) {
  return (
    <div className="text-center py-10">
      <div className="font-ui font-semibold text-[10px] tracking-[0.28em] uppercase text-mid mb-4">{copy.successEyebrow}</div>
      <h3 className="font-display font-normal m-0 mb-4 text-ink" style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1 }}>
        {copy.successLead} <span className="italic text-mid">{copy.successAccent}</span>
      </h3>
      <p className="text-[15px] leading-[1.6] text-ink-soft m-0 mb-8 max-w-md mx-auto">
        {copy.successBody}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.18em] text-ink border-b-2 border-ink pb-1 hover:text-mid hover:border-mid transition-colors"
      >
        {copy.successReset} <span>→</span>
      </button>
    </div>
  );
}
