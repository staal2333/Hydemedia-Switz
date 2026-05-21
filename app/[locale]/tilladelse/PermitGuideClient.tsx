'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

const STEPS = ['assessment', 'application', 'review', 'approval', 'installation'] as const;
const REQUIREMENTS = ['location', 'size', 'duration', 'safety', 'design'] as const;
const MUNICIPALITIES = ['copenhagen', 'frederiksberg', 'aarhus', 'odense'] as const;

export default function PermitGuideClient() {
  const t = useTranslations('permitGuide');
  const locale = useLocale();

  return (
    <div className="relative">
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">{locale === 'en' ? '§ Permit Guide' : '§ Bewilligungs-Guide'}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(36px, 5.2vw, 84px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {t('hero.title')}
            </h1>
            <p className="font-body text-white/85 max-w-3xl mx-auto m-0 mb-8" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {t('hero.subtitle')}
            </p>
            <Link
              href={`/${locale}/contact?inquiry=permit`}
              className="inline-flex items-center gap-3 px-6 py-4 bg-cream text-dusk rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-glow transition-all"
            >
              {t('hero.cta')} <span>↗</span>
            </Link>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        {/* Process steps */}
        <section className="py-24">
          <div className="shell">
            <div className="grid lg:grid-cols-[300px_1fr] grid-cols-1 gap-12 lg:gap-16">
              <div className="lg:sticky lg:top-10 self-start">
                <span className="sec-no inline-block mb-4 text-mid">{locale === 'en' ? '§ Process' : '§ Prozess'}</span>
                <h2 className="font-display italic font-normal text-ink m-0" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                  {t('process.title')}
                </h2>
                <p className="text-[15px] leading-[1.6] text-ink-soft mt-4 mb-0 max-w-md">
                  {t('process.subtitle')}
                </p>
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-12 gap-y-10">
                {STEPS.map((s, i) => (
                  <div key={s}>
                    <div className="font-display italic font-normal text-mid mb-3 inline-flex items-center gap-3" style={{ fontSize: 32, lineHeight: 1 }}>
                      {['i', 'ii', 'iii', 'iv', 'v'][i]}.
                      <span aria-hidden className="block h-px w-10 bg-mid opacity-50" />
                    </div>
                    <h3 className="font-display font-normal m-0 mb-2.5 text-ink" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                      {t(`process.steps.${s}.title`)}
                    </h3>
                    <p className="text-[14.5px] leading-[1.6] text-ink-soft m-0 max-w-md">
                      {t(`process.steps.${s}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-24">
          <div className="shell">
            <div className="max-w-3xl mb-14">
              <span className="sec-no inline-block mb-4 text-mid">{locale === 'en' ? '§ Requirements' : '§ Anforderungen'}</span>
              <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t('requirements.title')}
              </h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft m-0 max-w-2xl">
                {t('requirements.subtitle')}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl">
              {REQUIREMENTS.map((k) => (
                <div key={k} className="bg-white border border-rule rounded-[20px] p-7">
                  <h3 className="font-display font-normal m-0 mb-3 text-ink" style={{ fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {t(`requirements.items.${k}.title`)}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-ink-soft m-0">
                    {t(`requirements.items.${k}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Municipalities */}
        <section className="py-24">
          <div className="shell">
            <div className="max-w-3xl mb-14">
              <span className="sec-no inline-block mb-4 text-mid">{locale === 'en' ? '§ Municipalities' : '§ Gemeinden'}</span>
              <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t('municipalities.title')}
              </h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft m-0 max-w-2xl">
                {t('municipalities.subtitle')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5 max-w-5xl">
              {MUNICIPALITIES.map((m) => (
                <div key={m} className="bg-white border border-rule rounded-[20px] p-7">
                  <h3 className="font-display font-normal m-0 mb-3 text-ink capitalize" style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {m === 'copenhagen' ? 'Basel' : m}
                  </h3>
                  <p className="text-[14.5px] leading-[1.6] text-ink-soft m-0 mb-4">
                    {t(`municipalities.${m}.description`)}
                  </p>
                  <a
                    href={t(`municipalities.${m}.link`)}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.18em] text-ink border-b-2 border-ink pb-1 hover:text-mid hover:border-mid transition-colors"
                  >
                    {t('municipalities.visitWebsite')} <span>↗</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden py-32 text-white">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage: `linear-gradient(90deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%), linear-gradient(0deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%)`,
              backgroundSize: '120px 80px',
            }}
          />
          <div className="shell relative z-10 grid lg:grid-cols-[1.2fr_1fr] grid-cols-1 gap-12 items-center">
            <h2 className="font-display font-normal m-0 text-white" style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 0.96, letterSpacing: '-0.035em' }}>
              {locale === 'en' ? 'We ' : 'Wir '}<span className="italic text-glow">{locale === 'en' ? 'handle permits for you.' : 'kümmern uns um Ihre Bewilligungen.'}</span>
            </h2>
            <Link
              href={`/${locale}/contact?inquiry=permit`}
              className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <span className="font-display italic font-normal text-[22px]" style={{ letterSpacing: '-0.02em' }}>{t('hero.cta')}</span>
              <span className="text-glow text-[20px]">↗</span>
            </Link>
          </div>
        </section>
      </GroundFlow>
    </div>
  );
}
