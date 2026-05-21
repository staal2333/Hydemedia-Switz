'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

const STATS = ['impressions', 'locations', 'cities', 'formats'] as const;
const BENEFITS = ['visibility', 'impact', 'reach', 'timing'] as const;
const CAMPAIGN_TYPES = ['productLaunch', 'brandAwareness', 'eventPromotion', 'longTerm'] as const;
const STEPS = ['step1', 'step2', 'step3', 'step4'] as const;
const REASONS = ['reason1', 'reason2', 'reason3', 'reason4', 'reason5', 'reason6'] as const;

export default function BrandsPageClient({ locale }: { locale: string }) {
  const t = useTranslations('brands');

  return (
    <div className="relative">
      {/* ── HERO on dusk ── */}
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {t('hero.badge')}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {t('hero.title')}
            </h1>
            <p className="font-body text-white/85 max-w-3xl mx-auto m-0 mb-8" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {t('hero.description')}
            </p>
            <div className="inline-flex flex-wrap gap-3 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-3 px-6 py-4 bg-cream text-dusk rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-glow transition-all"
              >
                {t('hero.cta')} <span>↗</span>
              </Link>
              <Link
                href={`/${locale}/cases`}
                className="inline-flex items-center gap-3 px-6 py-4 bg-transparent border border-white/45 text-white rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:bg-white/10 hover:border-white transition-all"
              >
                {t('hero.secondaryCta')} →
              </Link>
            </div>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>

      {/* ── STATS ── */}
      <section className="py-12 pt-20">
        <div className="shell">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule rounded-[20px] overflow-hidden border border-rule max-w-5xl mx-auto">
            {STATS.map((s) => (
              <div key={s} className="bg-white p-7 text-center">
                <div className="font-display font-normal text-ink mb-2" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {t(`stats.${s}.value`)}
                </div>
                <div className="font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-muted">
                  {t(`stats.${s}.label`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24">
        <div className="shell">
          <div className="max-w-3xl mb-14">
            <span className="sec-no inline-block mb-4 text-mid">§ Hvorfor</span>
            <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {t('benefits.title')}
            </h2>
            <p className="text-[16px] leading-[1.6] text-ink-soft m-0 max-w-2xl">
              {t('benefits.subtitle')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <div key={b} className="bg-white border border-rule rounded-[20px] p-7">
                <div className="font-display italic font-normal text-mid mb-4" style={{ fontSize: 32, lineHeight: 1 }}>
                  0{i + 1}.
                </div>
                <h3 className="font-display font-normal m-0 mb-3 text-ink" style={{ fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  {t(`benefits.items.${b}.title`)}
                </h3>
                <p className="text-[14px] leading-[1.6] text-ink-soft m-0">
                  {t(`benefits.items.${b}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAMPAIGN TYPES ── */}
      <section className="py-24">
        <div className="shell">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="sec-no inline-block mb-4 text-mid">§ Kampagnetyper</span>
            <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {t('campaignTypes.title').split(' ').slice(0, -2).join(' ')}{' '}
              <span className="italic text-mid">{t('campaignTypes.title').split(' ').slice(-2).join(' ')}</span>
            </h2>
            <p className="text-[16px] leading-[1.6] text-ink-soft m-0 max-w-2xl mx-auto">
              {t('campaignTypes.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 max-w-5xl mx-auto">
            {CAMPAIGN_TYPES.map((c) => (
              <div key={c} className="bg-white border border-rule rounded-[20px] p-8">
                <h3 className="font-display font-normal m-0 mb-3 text-ink" style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  {t(`campaignTypes.types.${c}.title`)}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-ink-soft m-0">
                  {t(`campaignTypes.types.${c}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS — roman numerals ── */}
      <section className="py-24">
        <div className="shell">
          <div className="grid lg:grid-cols-[280px_1fr] grid-cols-1 gap-12 lg:gap-16">
            <div className="lg:sticky lg:top-10 self-start">
              <span className="sec-no inline-block mb-4 text-mid">§ Proces</span>
              <h2 className="font-display italic font-normal text-ink m-0" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                {t('process.title')}
              </h2>
              <p className="text-[15px] leading-[1.6] text-ink-soft mt-4 mb-0 max-w-md">
                {t('process.description')}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-12 gap-y-10">
              {STEPS.map((s, i) => (
                <div key={s}>
                  <div className="font-display italic font-normal text-mid mb-3 inline-flex items-center gap-3" style={{ fontSize: 32, lineHeight: 1 }}>
                    {['i', 'ii', 'iii', 'iv'][i]}.
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

      {/* ── WHY CHOOSE ── */}
      <section className="py-24">
        <div className="shell">
          <div className="max-w-3xl mb-14">
            <span className="sec-no inline-block mb-4 text-mid">§ Hvorfor Hyde</span>
            <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              {t('whyChoose.title')}
            </h2>
            <p className="text-[16px] leading-[1.6] text-ink-soft m-0 max-w-2xl">
              {t('whyChoose.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl">
            {REASONS.map((r) => (
              <div key={r} className="bg-white border border-rule rounded-[20px] p-7">
                <h3 className="font-display font-normal m-0 mb-3 text-ink" style={{ fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                  {t(`whyChoose.reasons.${r}.title`)}
                </h3>
                <p className="text-[14px] leading-[1.6] text-ink-soft m-0">
                  {t(`whyChoose.reasons.${r}.description`)}
                </p>
              </div>
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
            <h2
              className="font-display font-normal m-0 text-white"
              style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', lineHeight: 0.96, letterSpacing: '-0.035em' }}
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
              <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>{t('cta.primaryButton')}</span>
              <span className="text-glow text-[20px]">↗</span>
            </Link>
            <Link
              href={`/${locale}/services`}
              className="flex justify-between items-center px-6 py-5 bg-white/[0.06] backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/15 hover:border-white/50 hover:-translate-y-0.5 transition-all"
            >
              <span className="font-display italic font-normal text-[20px] text-white/85" style={{ letterSpacing: '-0.02em' }}>{t('cta.secondaryButton')}</span>
              <span className="text-white/65 text-[18px]">→</span>
            </Link>
          </div>
        </div>
      </section>

      </GroundFlow>
    </div>
  );
}
