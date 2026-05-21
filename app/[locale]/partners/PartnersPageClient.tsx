'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

const VALUE_PROPS = ['revenue', 'hassleFree', 'support'] as const;
const STEPS = ['apply', 'visit', 'agreement', 'installation', 'earn'] as const;
const LOCATIONS = ['traffic', 'corners', 'prime'] as const;
const FAQS = ['revenue', 'duration'] as const;

export default function PartnersPageClient() {
  const t = useTranslations('partners');
  const locale = useLocale();

  return (
    <div className="relative">
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {t('hero.badge')}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {t('hero.title')} <span className="italic text-cream">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="font-body text-white/85 max-w-3xl mx-auto m-0 mb-8" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {t('hero.description')}
            </p>
            <div className="inline-flex flex-wrap gap-3 justify-center">
              <Link
                href={`/${locale}/contact?inquiry=property`}
                className="inline-flex items-center gap-3 px-6 py-4 bg-cream text-dusk rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-glow transition-all"
              >
                {t('hero.primaryCta')} <span>↗</span>
              </Link>
              <Link
                href={`/${locale}/property-owners`}
                className="inline-flex items-center gap-3 px-6 py-4 bg-transparent border border-white/45 text-white rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:bg-white/10 hover:border-white transition-all"
              >
                {t('hero.secondaryCta')} →
              </Link>
            </div>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        <section className="py-24">
          <div className="shell">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="sec-no inline-block mb-4 text-mid">{locale === 'en' ? '§ Why' : '§ Warum'}</span>
              <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t('why.title')}
              </h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft m-0 max-w-2xl mx-auto">
                {t('why.subtitle')}
              </p>
            </div>
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-5 max-w-5xl mx-auto">
              {VALUE_PROPS.map((k, i) => (
                <div key={k} className="bg-white border border-rule rounded-[20px] p-7">
                  <div className="font-display italic font-normal text-mid mb-3" style={{ fontSize: 30, lineHeight: 1 }}>
                    0{i + 1}.
                  </div>
                  <h3 className="font-display font-normal m-0 mb-2.5 text-ink" style={{ fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {t(`valueProps.${k}.title`)}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-ink-soft m-0">
                    {t(`valueProps.${k}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="shell">
            <div className="grid lg:grid-cols-[300px_1fr] grid-cols-1 gap-12 lg:gap-16">
              <div className="lg:sticky lg:top-10 self-start">
                <span className="sec-no inline-block mb-4 text-mid">{locale === 'en' ? '§ Process' : '§ Prozess'}</span>
                <h2 className="font-display italic font-normal text-ink m-0" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                  {t('howItWorks.title')}
                </h2>
                <p className="text-[15px] leading-[1.6] text-ink-soft mt-4 mb-0 max-w-md">
                  {t('howItWorks.subtitle')}
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
                      {t(`steps.${s}.title`)}
                    </h3>
                    <p className="text-[14.5px] leading-[1.6] text-ink-soft m-0 max-w-md">
                      {t(`steps.${s}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="shell">
            <div className="max-w-3xl mb-14">
              <span className="sec-no inline-block mb-4 text-mid">{locale === 'en' ? '§ Ideal partner' : '§ Ideal partner'}</span>
              <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t('idealLocations.title')}
              </h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft m-0 max-w-2xl">
                {t('idealLocations.description')}
              </p>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5 max-w-6xl">
              {LOCATIONS.map((k) => (
                <div key={k} className="bg-white border border-rule rounded-[20px] p-7">
                  <h3 className="font-display font-normal m-0 mb-3 text-ink" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {t(`idealLocations.${k}.title`)}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-ink-soft m-0 mb-4">
                    {t(`idealLocations.${k}.description`)}
                  </p>
                  <ul className="m-0 p-0 list-none flex flex-col gap-2">
                    {[1, 2, 3].map((n) => (
                      <li key={n} className="flex gap-2.5 items-start text-[13.5px] leading-[1.5] text-ink-soft">
                        <span aria-hidden className="font-display italic text-mid text-[14px] leading-[1.4] shrink-0">→</span>
                        <span>{t(`idealLocations.${k}.feature${n}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-12 bg-white border border-rule rounded-[20px] p-8 text-center">
              <h3 className="font-display font-normal m-0 mb-3 text-ink" style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                {t('idealLocations.notSure.title')}
              </h3>
              <p className="text-[15px] leading-[1.6] text-ink-soft m-0 mb-5 max-w-xl mx-auto">
                {t('idealLocations.notSure.description')}
              </p>
              <Link
                href={`/${locale}/contact?inquiry=property`}
                className="inline-flex items-center gap-3 px-6 py-3 bg-ink text-white rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-dusk transition-all"
              >
                {t('idealLocations.notSure.cta')} <span>↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="shell">
            <div className="max-w-3xl mx-auto text-center">
              <span className="sec-no inline-block mb-4 text-mid">{locale === 'en' ? '§ Terms' : '§ Konditionen'}</span>
              <h2 className="font-display font-normal text-ink m-0 mb-6" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                {t('terms.title')}
              </h2>
              <p className="text-[16px] leading-[1.7] text-ink-soft m-0 mb-8">
                {t('terms.description')}
              </p>
              <Link
                href={`/${locale}/contact?inquiry=property`}
                className="inline-flex items-center gap-3 px-6 py-4 bg-ink text-white rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-dusk transition-all"
              >
                {t('terms.cta')} <span>↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="shell">
            <div className="max-w-3xl mx-auto">
              <span className="sec-no inline-block mb-4 text-mid">{locale === 'en' ? '§ FAQ' : '§ FAQ'}</span>
              <h2 className="font-display font-normal m-0 mb-8 text-ink" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t('faqTitle')}
              </h2>
              <div className="space-y-3">
                {FAQS.map((k) => (
                  <details key={k} className="group bg-white border border-rule rounded-[16px] overflow-hidden">
                    <summary className="cursor-pointer list-none p-6 flex items-start justify-between gap-4 hover:bg-fog/40 transition-colors">
                      <span className="font-display font-normal text-ink" style={{ fontSize: 18, letterSpacing: '-0.015em', lineHeight: 1.35 }}>
                        {t(`faq.${k}.question`)}
                      </span>
                      <span className="font-display italic text-mid text-[24px] leading-[1] shrink-0 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-6 pb-6 -mt-2 text-[14.5px] leading-[1.65] text-ink-soft">
                      {t(`faq.${k}.answer`)}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

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
            <div>
              <h2 className="font-display font-normal m-0 text-white" style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: 0.96, letterSpacing: '-0.035em' }}>
                {t('finalCta.title')}
              </h2>
              <p className="font-body text-white/80 mt-6 max-w-xl m-0" style={{ fontSize: 17, lineHeight: 1.6 }}>
                {t('finalCta.subtitle')}
              </p>
            </div>
            <Link
              href={`/${locale}/contact?inquiry=property`}
              className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>{t('finalCta.cta')}</span>
              <span className="text-glow text-[20px]">↗</span>
            </Link>
          </div>
        </section>
      </GroundFlow>
    </div>
  );
}
