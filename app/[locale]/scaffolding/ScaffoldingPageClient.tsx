'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import placementsDe from '@/data/placements.json';
import placementsEn from '@/data/placements-en.json';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

export default function ScaffoldingPageClient() {
  const t = useTranslations('scaffolding');
  const locale = useLocale();
  const placements = locale === 'en' ? placementsEn : placementsDe;
  const list = placements.scaffolding;

  return (
    <div className="relative">
      {/* ── HERO on dusk ── */}
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">{locale === 'en' ? '§ Scaffolding Advertising' : '§ Gerüstwerbung'}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {t('title')}
            </h1>
            <p
              className="font-body text-white/85 max-w-3xl mx-auto m-0"
              style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}
            >
              {t('description')}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>

      {/* ── PLACEMENTS — alternating photo/text rows ── */}
      <section className="py-20">
        <div className="shell flex flex-col gap-16 md:gap-24">
          {list.map((p, i) => {
            const reverse = i % 2 === 1;
            const num = String(i + 1).padStart(2, '0');
            const isWeekly = /ugent|weekly|wöch/i.test(p.traffic);
            const trafficKey = isWeekly ? 'details.trafficWeekly' : 'details.trafficDaily';
            return (
              <div
                key={p.id}
                id={p.id}
                className={`grid lg:grid-cols-[1.1fr_1fr] grid-cols-1 gap-10 md:gap-14 items-center scroll-mt-24 ${reverse ? 'lg:[grid-template-columns:1fr_1.1fr]' : ''}`}
              >
                {/* Image */}
                <div className={`relative aspect-[4/3] rounded-[20px] overflow-hidden bg-fog border border-rule ${reverse ? 'lg:order-2' : ''}`}>
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  {/* Live badge */}
                  <div className="absolute top-5 left-5 inline-flex items-center gap-2 bg-white/88 backdrop-blur-md px-3.5 py-2 rounded-full font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-dusk">
                    <span className="h-1.5 w-1.5 rounded-full bg-mid" style={{ animation: 'pl-blink 1.5s ease-in-out infinite' }} />
                    {p.status === 'available' ? t('status.available') : t('status.booked')}
                  </div>
                  <div className="absolute top-5 right-5 font-ui font-semibold text-[11px] tracking-[0.22em] text-white bg-dusk/55 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    № {num}
                  </div>
                </div>

                {/* Content */}
                <div className={reverse ? 'lg:order-1' : ''}>
                  <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted mb-3">
                    {p.address}
                  </div>
                  <h2
                    className="font-display font-normal m-0 mb-5 text-ink"
                    style={{ fontSize: 'clamp(32px, 3.6vw, 56px)', letterSpacing: '-0.025em', lineHeight: 0.98 }}
                  >
                    {p.name.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="italic text-mid">{p.name.split(' ').slice(-1).join(' ')}</span>
                  </h2>

                  {/* Stats grid */}
                  <div className="grid grid-cols-3 border-t border-rule mb-6">
                    {[
                      { v: p.size, k: t('details.size') ?? (locale === 'en' ? 'Size' : 'Grösse') },
                      { v: p.traffic.split(' ')[0], k: t(trafficKey) },
                      { v: p.duration.replace('Uge ', ''), k: t('details.duration') ?? (locale === 'en' ? 'Period' : 'Periode') },
                    ].map((s, j) => (
                      <div key={j} className={`py-4 border-b border-rule ${j < 2 ? 'pr-3 border-r' : ''} ${j > 0 ? 'pl-3' : ''}`}>
                        <div className="font-display font-normal text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 32px)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                          {s.v}
                        </div>
                        <div className="font-ui font-semibold text-[9.5px] tracking-[0.18em] uppercase text-muted mt-1.5">
                          {s.k}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <ul className="m-0 mb-7 p-0 list-none flex flex-col gap-2.5">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex gap-3 items-start text-[15px] leading-[1.55] text-ink-soft">
                        <span aria-hidden className="font-display italic text-mid text-[16px] leading-[1.3] shrink-0">→</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/${locale}/contact?location=${encodeURIComponent(p.name)}`}
                    className="inline-flex items-center gap-3 px-6 py-3.5 bg-ink text-white rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-dusk transition-all"
                  >
                    {t('details.contactButton')}
                    <span>↗</span>
                  </Link>
                </div>
              </div>
            );
          })}
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
              <span className="flex items-center gap-4">
                <span className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-white/65">{locale === 'en' ? 'Book' : 'Book'}</span>
                <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>
                  {t('cta.button')}
                </span>
              </span>
              <span className="text-glow text-[20px]">↗</span>
            </Link>
            <a
              href="tel:+41772338121"
              className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <span className="flex items-center gap-4">
                <span className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-white/65">{locale === 'en' ? 'Call' : 'Anrufen'}</span>
                <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>
                  77 233 81 21
                </span>
              </span>
              <span className="text-glow text-[20px]">↗</span>
            </a>
          </div>
        </div>
      </section>

      </GroundFlow>
    </div>
  );
}
