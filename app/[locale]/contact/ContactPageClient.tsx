'use client';

import { useState, FormEvent } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';
import { getRegionConfig } from '@/lib/region';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

type FormType = 'advertiser' | 'partner';
type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPageClient({ locale }: { locale: string }) {
  const t = useTranslations('contact');
  const config = getRegionConfig(locale);

  const [formType, setFormType] = useState<FormType>('advertiser');
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
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
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
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {locale === 'en' ? 'Contact' : 'Kontakt'}</span>
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
                <span className="sec-no inline-block mb-3 text-mid">{locale === 'en' ? 'A. Direct' : 'A. Direkt'}</span>
                <h2 className="font-display font-normal m-0 mb-4 text-ink" style={{ fontSize: 32, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                  {locale === 'en' ? 'A reply within' : 'Antwort innerhalb von'} <span className="italic text-mid">{locale === 'en' ? '24 hours.' : '24 Stunden.'}</span>
                </h2>
                <p className="text-[15px] leading-[1.6] text-ink-soft m-0">
                  {locale === 'en'
                    ? 'We respond to your enquiry as quickly as possible — usually within one business day.'
                    : 'Wir antworten so schnell wie möglich auf Ihre Anfrage — in der Regel innerhalb eines Arbeitstags.'}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {[
                  { Icon: Mail, label: locale === 'en' ? 'Write' : 'Schreiben', value: config.email, href: `mailto:${config.email}` },
                  { Icon: Phone, label: locale === 'en' ? 'Call' : 'Anrufen', value: config.phone, href: `tel:${config.phone.replace(/\s/g, '')}` },
                  { Icon: MapPin, label: locale === 'en' ? 'Address' : 'Adresse', value: 'Hauptstrasse 30, 4127 Birsfelden', href: undefined as string | undefined },
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
            <div className="bg-white border border-rule rounded-[20px] p-8 md:p-10">
              {status === 'success' ? (
                <SuccessState locale={locale} onReset={() => setStatus('idle')} />
              ) : (
                <>
                  {/* Tabs */}
                  <div className="mb-7">
                    <span className="sec-no inline-block mb-3 text-mid">{locale === 'en' ? 'B. Write to us' : 'B. Schreiben Sie uns'}</span>
                    <h2 className="font-display font-normal m-0 mb-5 text-ink" style={{ fontSize: 28, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                      {locale === 'en' ? 'What can we help you with?' : 'Was ist Ihr Anliegen?'}
                    </h2>
                    <div className="flex gap-2 p-1 bg-fog rounded-full w-max">
                      {([
                        { v: 'advertiser', label: locale === 'en' ? "I'm a brand" : 'Ich bin eine Marke' },
                        { v: 'partner', label: locale === 'en' ? 'I have a facade' : 'Ich habe eine Fassade' },
                      ] as const).map((tab) => (
                        <button
                          key={tab.v}
                          type="button"
                          onClick={() => setFormType(tab.v)}
                          className={`px-4 py-2 rounded-full font-ui font-semibold text-[12px] tracking-[0.06em] transition-all ${
                            formType === tab.v ? 'bg-ink text-white' : 'text-ink-soft hover:text-ink'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field name="name" label="Name" required />
                    <Field name="email" label="E-Mail" type="email" required />
                    <Field name="company" label={locale === 'en' ? 'Company' : 'Firma'} />
                    <Field name="phone" label={locale === 'en' ? 'Phone' : 'Telefon'} type="tel" />
                    <FieldArea
                      name="message"
                      label={
                        formType === 'advertiser'
                          ? (locale === 'en' ? 'Tell us about your campaign' : 'Erzählen Sie von Ihrer Kampagne')
                          : (locale === 'en' ? 'Tell us about your property' : 'Erzählen Sie von Ihrer Immobilie')
                      }
                      required
                    />
                    {status === 'error' && (
                      <p className="sm:col-span-2 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg p-3 m-0">
                        {locale === 'en'
                          ? `Something went wrong — please try again or write directly to ${config.email}. (${errorMsg})`
                          : `Etwas ist schiefgelaufen — bitte versuchen Sie es erneut oder schreiben Sie direkt an ${config.email}. (${errorMsg})`}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="sm:col-span-2 inline-flex items-center justify-center gap-3 px-6 py-4 bg-ink text-white rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-dusk transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting'
                        ? (locale === 'en' ? 'Sending…' : 'Senden…')
                        : (locale === 'en' ? 'Send enquiry' : 'Anfrage senden')}
                      <span>↗</span>
                    </button>
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

function FieldArea({ name, label, required }: { name: string; label: string; required?: boolean }) {
  return (
    <label className="flex flex-col gap-1.5 sm:col-span-2">
      <span className="font-ui font-semibold text-[10px] tracking-[0.18em] uppercase text-muted">
        {label}{required && <span className="text-mid"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={5}
        className="w-full px-4 py-3 bg-fog border border-rule rounded-lg text-[15px] text-ink placeholder:text-muted/60 focus:outline-none focus:border-mid focus:bg-white transition-colors resize-y"
      />
    </label>
  );
}

function SuccessState({ locale, onReset }: { locale: string; onReset: () => void }) {
  return (
    <div className="text-center py-10">
      <div className="font-ui font-semibold text-[10px] tracking-[0.28em] uppercase text-mid mb-4">{locale === 'en' ? 'Thank you for your enquiry' : 'Danke für Ihre Anfrage'}</div>
      <h3 className="font-display font-normal m-0 mb-4 text-ink" style={{ fontSize: 'clamp(28px, 3.2vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1 }}>
        {locale === 'en' ? "We'll get back to you" : 'Wir melden uns'} <span className="italic text-mid">{locale === 'en' ? 'within 24 hours.' : 'innerhalb von 24 Stunden.'}</span>
      </h3>
      <p className="text-[15px] leading-[1.6] text-ink-soft m-0 mb-8 max-w-md mx-auto">
        {locale === 'en'
          ? 'You will receive a confirmation by email. We will be in touch shortly with the next steps.'
          : 'Sie erhalten eine Bestätigung per E-Mail. Wir melden uns schnell mit den nächsten Schritten.'}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.18em] text-ink border-b-2 border-ink pb-1 hover:text-mid hover:border-mid transition-colors"
      >
        {locale === 'en' ? 'Send a new enquiry' : 'Neue Anfrage senden'} <span>→</span>
      </button>
    </div>
  );
}
