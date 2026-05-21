'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

const FACTORS = ['location', 'format', 'duration', 'traffic', 'support'] as const;
const INCLUDED = ['installation', 'permits', 'design', 'monitoring', 'documentation', 'support'] as const;

export default function PricingPageClient() {
  const t = useTranslations('pricing');
  const locale = useLocale();

  return (
    <div className="relative">
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ Priser</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {t('hero.title')}
            </h1>
            <p className="font-body text-white/85 max-w-3xl mx-auto m-0 mb-8" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {t('hero.description')}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 px-6 py-4 bg-cream text-dusk rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-glow transition-all"
            >
              {t('hero.cta')} <span>↗</span>
            </Link>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        {/* What affects pricing */}
        <section className="py-24">
          <div className="shell">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="sec-no inline-block mb-4 text-mid">§ Faktorer</span>
              <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t('factors.title')}
              </h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft m-0 max-w-2xl mx-auto">
                {t('factors.description')}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {FACTORS.map((k, i) => (
                <div key={k} className="bg-white border border-rule rounded-[20px] p-7">
                  <div className="font-display italic font-normal text-mid mb-3" style={{ fontSize: 30, lineHeight: 1 }}>
                    0{i + 1}.
                  </div>
                  <h3 className="font-display font-normal m-0 mb-2.5 text-ink" style={{ fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {t(`factors.${k}.title`)}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-ink-soft m-0">
                    {t(`factors.${k}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom quote */}
        <section className="py-20">
          <div className="shell">
            <div className="max-w-3xl mx-auto text-center">
              <span className="sec-no inline-block mb-4 text-mid">§ Custom</span>
              <h2 className="font-display font-normal text-ink m-0 mb-6" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t('custom.title')}
              </h2>
              <p className="text-[17px] leading-[1.7] text-ink-soft m-0 mb-4 max-w-2xl mx-auto">
                {t('custom.description')}
              </p>
              <p className="font-display italic text-mid m-0 mb-8" style={{ fontSize: 'clamp(18px, 1.8vw, 22px)', lineHeight: 1.4 }}>
                {t('custom.benefit')}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-3 px-6 py-4 bg-ink text-white rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-dusk transition-all"
              >
                {t('custom.cta')} <span>↗</span>
              </Link>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="py-24">
          <div className="shell">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <span className="sec-no inline-block mb-4 text-mid">§ Inkluderet</span>
              <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t('included.title')}
              </h2>
              <p className="text-[16px] leading-[1.6] text-ink-soft m-0">
                {t('included.description')}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {INCLUDED.map((k) => (
                <div key={k} className="flex items-start gap-4 bg-white border border-rule rounded-[16px] p-6">
                  <span aria-hidden className="font-display italic text-mid text-[24px] leading-[1] shrink-0">→</span>
                  <div>
                    <h3 className="font-display font-normal m-0 mb-1.5 text-ink" style={{ fontSize: 17, letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                      {t(`included.items.${k}.title`)}
                    </h3>
                    <p className="text-[14px] leading-[1.55] text-ink-soft m-0">
                      {t(`included.items.${k}.description`)}
                    </p>
                  </div>
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
            <div>
              <h2 className="font-display font-normal m-0 text-white" style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: 0.96, letterSpacing: '-0.035em' }}>
                {t('final.title')}
              </h2>
              <p className="font-body text-white/80 mt-6 max-w-xl m-0" style={{ fontSize: 17, lineHeight: 1.6 }}>
                {t('final.description')}
              </p>
            </div>
            <Link
              href={`/${locale}/contact`}
              className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>{t('final.cta')}</span>
              <span className="text-glow text-[20px]">↗</span>
            </Link>
          </div>
        </section>
      </GroundFlow>
    </div>
  );
}
