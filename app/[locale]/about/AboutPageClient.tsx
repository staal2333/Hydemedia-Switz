'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

const VALUES = ['quality', 'reliability', 'innovation'] as const;
const CERT_AREAS = ['safety', 'permits', 'quality', 'compliance'] as const;

export default function AboutPageClient({ locale }: { locale: string }) {
  const t = useTranslations('about');

  return (
    <div className="relative">
      {/* ── HERO on dusk ── */}
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">{locale === 'en' ? '§ About Hyde Media' : '§ Über Hyde Media'}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {t('title')}
            </h1>
            <p className="font-body text-white/85 max-w-3xl mx-auto m-0" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {t('subtitle')}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>

      {/* ── MISSION + VISION (centered) ── */}
      <section className="py-20">
        <div className="shell">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <div className="font-ui font-semibold text-[11px] tracking-[0.28em] uppercase text-mid mb-5">
              {locale === 'en' ? 'Chapter 01' : 'Kapitel 01'}
            </div>
            <h2 className="font-display italic font-normal m-0 mb-6 text-ink" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
              {locale === 'en' ? 'Our Mission.' : 'Unsere Mission.'}
            </h2>
            <h3 className="font-display font-normal m-0 mb-6 mx-auto text-ink" style={{ fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              {t('mission.title')}
            </h3>
            <p className="text-[16px] leading-[1.7] text-ink-soft m-0 mx-auto max-w-[55ch]">
              {t('mission.description')}
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <div className="font-ui font-semibold text-[11px] tracking-[0.28em] uppercase text-mid mb-5">
              {locale === 'en' ? 'Chapter 02' : 'Kapitel 02'}
            </div>
            <h2 className="font-display italic font-normal m-0 mb-6 text-ink" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
              {locale === 'en' ? 'Our Vision.' : 'Unsere Vision.'}
            </h2>
            <h3 className="font-display font-normal m-0 mb-6 mx-auto text-ink" style={{ fontSize: 'clamp(24px, 3vw, 38px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              {t('vision.title')}
            </h3>
            <p className="text-[16px] leading-[1.7] text-ink-soft m-0 mx-auto max-w-[55ch]">
              {t('vision.description')}
            </p>
          </div>
        </div>
      </section>

      {/* ── VALUES — 3 columns ── */}
      <section className="py-24">
        <div className="shell">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="sec-no inline-block mb-4 text-mid">{locale === 'en' ? '§ Values' : '§ Werte'}</span>
            <h2 className="font-display font-normal text-ink m-0" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {t('values.title')}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6 max-w-5xl mx-auto">
            {VALUES.map((v, i) => (
              <div key={v} className="bg-white border border-rule rounded-[20px] p-8 text-center">
                <div className="font-display italic font-normal text-mid mb-4" style={{ fontSize: 36, lineHeight: 1 }}>
                  {String.fromCharCode(105 + i)}.
                </div>
                <h3 className="font-display font-normal m-0 mb-3 text-ink" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  {t(`values.${v}.title`)}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-ink-soft m-0">
                  {t(`values.${v}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-24">
        <div className="shell">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="sec-no inline-block mb-4 text-mid">{locale === 'en' ? '§ Team' : '§ Team'}</span>
            <h2 className="font-display font-normal text-ink m-0 mb-5" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {locale === 'en' ? 'From Denmark ' : 'Von Dänemark '}<span className="italic text-mid">{locale === 'en' ? 'to Switzerland.' : 'in die Schweiz.'}</span>
            </h2>
            <p className="text-[16px] leading-[1.7] text-ink-soft m-0 max-w-2xl mx-auto">
              {locale === 'en'
                ? "Hyde Media started in Denmark. Through Sebastian Staal's close connection to and love for Switzerland, we decided to expand — with Theodor Staal as our Country Manager and Director in Switzerland."
                : 'Hyde Media hat in Dänemark angefangen. Durch Sebastian Staals enge Verbindung zur und seine Liebe für die Schweiz haben wir uns entschieden zu expandieren — mit Theodor Staal als unserem Country Manager und Director in der Schweiz.'}
            </p>
          </div>
          <div className="max-w-sm mx-auto">
            <div className="bg-white border border-rule rounded-[20px] overflow-hidden flex flex-col">
              <div className="relative aspect-[4/5] bg-fog overflow-hidden">
                <Image
                  src="/images/about/Theo final.png"
                  alt="Theodor Staal"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="p-7 flex flex-col flex-1 text-center items-center">
                <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted mb-2">
                  {locale === 'en' ? 'Country Manager & Director · Switzerland' : 'Country Manager & Director · Schweiz'}
                </div>
                <h3 className="font-display font-normal m-0 mb-4 text-ink" style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  Theodor Staal
                </h3>
                <a
                  href="mailto:theodor.staal@hydemedia.ch"
                  className="inline-flex items-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.18em] text-ink border-b-2 border-ink pb-1 hover:text-mid hover:border-mid transition-colors"
                >
                  theodor.staal@hydemedia.ch <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS / FOCUS AREAS ── */}
      <section className="py-24">
        <div className="shell">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="sec-no inline-block mb-4 text-mid">{locale === 'en' ? '§ Standards' : '§ Standards'}</span>
            <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {t('certifications.title')}
            </h2>
            <p className="text-[16px] leading-[1.6] text-ink-soft m-0 max-w-2xl mx-auto">
              {t('certifications.subtitle')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 max-w-5xl mx-auto">
            {CERT_AREAS.map((c) => (
              <div key={c} className="bg-white border border-rule rounded-[20px] p-8 text-center">
                <h3 className="font-display font-normal m-0 mb-3 text-ink" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  {t(`certifications.${c}.title`)}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-ink-soft m-0">
                  {t(`certifications.${c}.description`)}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[14px] italic text-ink-soft mt-8 max-w-3xl mx-auto text-center">
            {t('certifications.standards.footer')}
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden py-32 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%), linear-gradient(0deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%)`,
            backgroundSize: '120px 80px',
          }}
        />
        <div className="shell relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-10">
          <h2
            className="font-display font-normal m-0 text-white"
            style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: 0.96, letterSpacing: '-0.035em' }}
          >
            {locale === 'en' ? "Let's build " : 'Lassen Sie uns '}<span className="italic text-glow">{locale === 'en' ? 'together.' : 'gemeinsam bauen.'}</span>
          </h2>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-between gap-6 px-8 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
          >
            <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>{locale === 'en' ? 'Get in touch' : 'Kontakt aufnehmen'}</span>
            <span className="text-glow text-[20px]">↗</span>
          </Link>
        </div>
      </section>

      </GroundFlow>
    </div>
  );
}
