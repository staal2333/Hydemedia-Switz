'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

const SOLUTIONS = [
  {
    key: 'scaffolding',
    num: '01 / 02',
    href: '/scaffolding',
    image: '/images/placements/Bredgade.jpg',
  },
  {
    key: 'facade',
    num: '02 / 02',
    href: '/facade',
    image: '/images/placements/facade-1.jpg',
  },
] as const;

const COMPARISON_FEATURES = ['visibility', 'duration', 'installation', 'costEffective', 'flexibility'] as const;

export default function ServicesPageClient({ locale }: { locale: string }) {
  const t = useTranslations('services');

  return (
    <div className="relative">
      {/* ── HERO on dusk ── */}
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ Outdoor marketing</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {t('title').split(' ').slice(0, -2).join(' ')}{' '}
              <span className="italic text-cream">{t('title').split(' ').slice(-2).join(' ')}</span>
            </h1>
            <p
              className="font-body text-white/85 max-w-3xl mx-auto"
              style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}
            >
              {t('subtitle')}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>

      {/* ── SOLUTIONS — two stacked cards ── */}
      <section className="pb-24 pt-20">
        <div className="shell">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            {SOLUTIONS.map((s) => (
              <Link
                key={s.key}
                href={`/${locale}${s.href}`}
                className="group bg-white border border-rule rounded-[20px] overflow-hidden flex flex-col hover:-translate-y-1.5 hover:border-mid transition-all"
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 40px 80px -20px rgba(31,58,95,0.25)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 0 transparent'; }}
              >
                <div className="relative aspect-[16/10] bg-fog overflow-hidden">
                  <Image
                    src={s.image}
                    alt={t(`${s.key}.title`)}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col gap-4 flex-1">
                  <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted flex justify-between">
                    <span>{s.num}</span>
                    <span>OOH · DK</span>
                  </div>
                  <h2
                    className="font-display font-normal m-0 text-ink"
                    style={{ fontSize: 'clamp(32px, 3.5vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1 }}
                  >
                    {t(`${s.key}.title`)}
                  </h2>
                  <p className="text-[15px] leading-[1.6] text-ink-soft m-0 flex-1">{t(`${s.key}.description`)}</p>
                  <div className="pt-4 border-t border-rule flex justify-between items-center font-ui font-semibold text-[11px] tracking-[0.22em] uppercase text-muted group-hover:text-ink transition-colors">
                    <span>{t(`${s.key}.shortDescription`).split(' ').slice(0, 4).join(' ')}…</span>
                    <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-mid">
                      {t(`${s.key}.cta`)} ↗
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-24">
        <div className="shell">
          <div className="max-w-4xl mx-auto mb-12">
            <span className="sec-no inline-block mb-4 text-mid">§ Sammenligning</span>
            <h2
              className="font-display font-normal text-ink m-0 mb-4"
              style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              {t('comparison.title')}{' '}
              <span className="italic text-mid">— hvad er forskellen?</span>
            </h2>
            <p className="font-body text-ink-soft max-w-2xl m-0" style={{ fontSize: 17, lineHeight: 1.6 }}>
              {t('comparison.description')}
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_1fr_1fr] grid-cols-1 gap-px bg-rule rounded-[20px] overflow-hidden border border-rule">
            {/* Header row */}
            <div className="bg-white p-6 font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted">
              {t('comparison.feature')}
            </div>
            <div className="bg-white p-6 font-display font-normal text-ink" style={{ fontSize: 22, letterSpacing: '-0.02em' }}>
              {t('scaffolding.title')}
            </div>
            <div className="bg-white p-6 font-display font-normal text-ink" style={{ fontSize: 22, letterSpacing: '-0.02em' }}>
              <span className="italic text-mid">{t('facade.title')}</span>
            </div>

            {COMPARISON_FEATURES.map((f) => (
              <FeatureRow key={f} f={f} />
            ))}
          </div>
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
        <div className="shell relative z-10 grid lg:grid-cols-[1.2fr_1fr] grid-cols-1 gap-12 items-center">
          <div>
            <div className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/70 mb-6">
              {t('planning.title')}
            </div>
            <h2
              className="font-display font-normal m-0 text-white"
              style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: 0.96, letterSpacing: '-0.035em', textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {t('cta.title')}
            </h2>
            <p className="font-body text-white/80 mt-6 max-w-xl m-0" style={{ fontSize: 17, lineHeight: 1.6 }}>
              {t('cta.description')}
            </p>
          </div>
          <div className="flex flex-col gap-3.5">
            <Link
              href={`/${locale}/contact`}
              className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <span className="flex items-center gap-4">
                <span className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-white/65">Kontakt</span>
                <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>
                  {t('cta.button')}
                </span>
              </span>
              <span className="text-glow text-[20px]">↗</span>
            </Link>
          </div>
        </div>
      </section>

      </GroundFlow>
    </div>
  );
}

function FeatureRow({ f }: { f: string }) {
  const t = useTranslations('services.comparison.features');
  return (
    <>
      <div className="bg-white p-6 font-ui font-semibold text-[12px] tracking-[0.04em] text-ink">
        {t(`${f}.name`)}
      </div>
      <div className="bg-white p-6 text-[14.5px] leading-[1.55] text-ink-soft">
        {t(`${f}.scaffolding`)}
      </div>
      <div className="bg-white p-6 text-[14.5px] leading-[1.55] text-ink-soft" style={{ background: 'rgba(74, 123, 181, 0.04)' }}>
        {t(`${f}.facade`)}
      </div>
    </>
  );
}
