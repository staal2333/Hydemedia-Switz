'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import casesDe from '@/public/data/cases.json';
import casesEn from '@/public/data/cases-en.json';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

export default function CasesPageClient() {
  const locale = useLocale();
  const casesData = locale === 'en' ? casesEn : casesDe;

  return (
    <div className="relative">
      {/* ── HERO on dusk ── */}
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {locale === 'en' ? 'References · Brands' : 'Referenzen · Marken'}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {locale === 'en' ? 'References &' : 'Referenzen &'} <span className="italic text-cream">{locale === 'en' ? 'Brands.' : 'Marken.'}</span>
            </h1>
            <p className="font-body text-white/85 max-w-2xl mx-auto m-0" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {locale === 'en'
                ? 'Real campaigns, real results. See how brands create impact with Hyde Media — from Lidl and Saxo Bank to Fernet-Branca and GoMore.'
                : 'Echte Kampagnen, echte Resultate. Sehen Sie, wie Marken mit Hyde Media Wirkung erzielen — von Lidl über Saxo Bank bis Fernet-Branca und GoMore.'}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>

      {/* ── CASES GRID ── */}
      <section className="py-20">
        <div className="shell">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {casesData.map((c) => (
              <Link
                key={c.id}
                href={`/${locale}/cases/${c.slug}`}
                className="group bg-white border border-rule rounded-[20px] overflow-hidden flex flex-col hover:-translate-y-1.5 hover:border-mid transition-all"
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 40px 80px -20px rgba(31,58,95,0.25)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 0 transparent'; }}
              >
                <div className="relative aspect-[16/10] bg-fog overflow-hidden">
                  {c.images?.[0] && (
                    <Image
                      src={c.images[0]}
                      alt={`${c.brand} – ${c.location}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                    />
                  )}
                  {/* Tags */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                    {c.tags?.slice(0, 1).map((tag) => (
                      <span
                        key={tag}
                        className="font-ui font-semibold text-[9px] tracking-[0.2em] uppercase text-dusk bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-white bg-dusk/55 backdrop-blur-md px-2.5 py-1 rounded-full">
                    {c.size}
                  </div>
                </div>

                <div className="p-7 flex flex-col gap-3 flex-1">
                  <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted">
                    {c.location}
                  </div>
                  <h3
                    className="font-display font-normal m-0 text-ink"
                    style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.15 }}
                  >
                    {c.brand} <span className="italic text-mid">— {c.format.toLowerCase()}</span>
                  </h3>
                  <p className="text-[14px] leading-[1.55] text-ink-soft m-0 flex-1">
                    {c.challenge.length > 140 ? c.challenge.slice(0, 140) + '…' : c.challenge}
                  </p>
                  <div className="pt-4 border-t border-rule flex justify-between items-center font-ui font-semibold text-[11px] tracking-[0.22em] uppercase text-muted group-hover:text-ink transition-colors">
                    <span>{c.duration}</span>
                    <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-mid">
                      {locale === 'en' ? 'View case' : 'Case ansehen'} ↗
                    </span>
                  </div>
                </div>
              </Link>
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
              {locale === 'en' ? 'Ready for' : 'Bereit für'} <span className="italic text-glow">{locale === 'en' ? 'your own story?' : 'Ihre eigene Story?'}</span>
            </h2>
            <p className="font-body text-white/80 mt-6 max-w-xl m-0" style={{ fontSize: 17, lineHeight: 1.6 }}>
              {locale === 'en'
                ? "Let's talk about how we deliver results for your brand. A tailored proposal within 24 hours."
                : 'Sprechen wir darüber, wie wir Resultate für Ihre Marke liefern. Massgeschneidertes Angebot innerhalb von 24 Stunden.'}
            </p>
          </div>
          <div className="flex flex-col gap-3.5">
            <Link
              href={`/${locale}/contact`}
              className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
            >
              <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>{locale === 'en' ? 'Request a proposal' : 'Angebot anfordern'}</span>
              <span className="text-glow text-[20px]">↗</span>
            </Link>
            <a
              href="tel:+41772338121"
              className="flex justify-between items-center px-6 py-5 bg-white/[0.06] backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/15 hover:border-white/50 hover:-translate-y-0.5 transition-all"
            >
              <span className="font-display italic font-normal text-[20px] text-white/85" style={{ letterSpacing: '-0.02em' }}>{locale === 'en' ? 'Call' : 'Anrufen'} 77 233 81 21</span>
              <span className="text-white/65 text-[18px]">→</span>
            </a>
          </div>
        </div>
      </section>

      </GroundFlow>
    </div>
  );
}
