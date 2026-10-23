'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';
import {
  getPlacementsForCase,
  localizeCase,
  localizePlacement,
  placementPath,
  type CaseStudy as LibCaseStudy,
} from '@/lib/placements';

const COPY = {
  de: {
    back: 'Zurück zu allen Referenzen',
    image: (n: number) => `Bild ${n}`,
    statLocation: 'Standort',
    statSize: 'Grösse',
    statDuration: 'Dauer',
    statFormat: 'Format',
    challenge: 'Herausforderung',
    solution: 'Lösung',
    results: 'Resultate',
    placementEyebrow: 'Standort',
    placementTitle: 'Hier lief die Kampagne.',
    placementBookable: 'Standort ansehen',
    placementRetired: 'Ehemaliger Standort',
    related: 'Verwandte Seiten',
    pillarFacade: 'Fassadenwerbung',
    pillarScaffolding: 'Gerüstwerbung',
    moreCases: 'Weitere Referenzen',
    allServices: 'Alle Lösungen',
    ctaLead: 'Bereit für',
    ctaAccent: 'Ihre eigene Story?',
    quote: 'Angebot anfordern',
  },
  en: {
    back: 'Back to all references',
    image: (n: number) => `Image ${n}`,
    statLocation: 'Location',
    statSize: 'Size',
    statDuration: 'Duration',
    statFormat: 'Format',
    challenge: 'Challenge',
    solution: 'Solution',
    results: 'Results',
    placementEyebrow: 'Location',
    placementTitle: 'Where this campaign ran.',
    placementBookable: 'See the placement',
    placementRetired: 'Retired placement',
    related: 'Related pages',
    pillarFacade: 'Facade advertising',
    pillarScaffolding: 'Scaffolding advertising',
    moreCases: 'More cases',
    allServices: 'All services',
    ctaLead: 'Ready for',
    ctaAccent: 'your own story?',
    quote: 'Request a proposal',
  },
};

interface CaseStudy {
  id: number;
  slug: string;
  brand: string;
  title: string;
  location: string;
  format: string;
  size: string;
  duration: string;
  challenge: string;
  solution: string;
  results: string;
  testimonial: string;
  images: string[];
  tags: string[];
  type: string;
  /** Placement ids this campaign ran on — see data/placements.json. */
  placementIds?: string[];
}

// Map a campaign's city to its city landing page, where one exists.
function cityLandingPage(location: string, format: string, locale: string): string | null {
  const isFacade = /fassade|facade/i.test(format);
  if (!isFacade && /basel/i.test(location)) return `/${locale}/geruestwerbung-basel`;
  return null;
}

export interface OtherCase { slug: string; brand: string; location: string; format: string; image: string | null }

export default function CaseStudyDetailClient({ caseStudy, others = [] }: { caseStudy: CaseStudy; others?: OtherCase[] }) {
  const locale = useLocale();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Parse/route from the German source; display from the localized copy.
  const source = caseStudy;
  const c = localizeCase(caseStudy as unknown as LibCaseStudy, locale);
  const heroImage = c.images?.[selectedImageIndex] ?? c.images?.[0];

  // SEO: internal link-net — connect this case to its pillar service page + nearest city landing page.
  const isFacade = /fassade|facade/i.test(source.format);
  const pillarHref = isFacade ? `/${locale}/facade` : `/${locale}/scaffolding`;
  const t = COPY[locale === 'en' ? 'en' : 'de'];
  const pillarLabel = isFacade ? t.pillarFacade : t.pillarScaffolding;
  const cityHref = cityLandingPage(source.location, source.format, locale);

  // The physical placement(s) this campaign ran on — proof the spot delivers.
  const ranOn = getPlacementsForCase({ placementIds: source.placementIds ?? [] }).map((p) => localizePlacement(p, locale));

  return (
    <div className="relative">
      {/* ── HERO on dusk ── */}
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/${locale}/cases`}
              className="inline-flex items-center gap-2 font-ui font-semibold text-[11px] uppercase tracking-[0.18em] text-white/70 hover:text-white transition-colors mb-8"
            >
              <span>←</span> {t.back}
            </Link>
            <div className="text-center">
              <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">
                § {c.location}
              </span>
              <h1
                className="font-display font-normal text-white m-0 mb-6"
                style={{ fontSize: 'clamp(36px, 5.5vw, 88px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
              >
                {c.brand} <span className="italic text-cream">— {c.format.toLowerCase()}</span>
              </h1>
              <p className="font-display italic text-white/85 max-w-3xl mx-auto m-0" style={{ fontSize: 'clamp(20px, 2vw, 28px)', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
                {c.title}
              </p>
            </div>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>

      {/* ── HERO IMAGE + meta ── */}
      <section className="py-16 md:py-20">
        <div className="shell">
          {heroImage && (
            <div className="relative aspect-[16/9] rounded-[24px] overflow-hidden bg-fog border border-rule mb-8 max-w-6xl mx-auto">
              <Image
                src={heroImage}
                alt={`${c.brand} – ${c.location}`}
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Image thumbnails */}
          {c.images && c.images.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center mb-12 max-w-6xl mx-auto">
              {c.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImageIndex(i)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    i === selectedImageIndex ? 'border-mid scale-105' : 'border-rule hover:border-mid/50'
                  }`}
                >
                  <Image src={img} alt={t.image(i + 1)} fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule rounded-[20px] overflow-hidden border border-rule max-w-5xl mx-auto">
            {[
              { v: c.location, k: t.statLocation },
              { v: c.size, k: t.statSize },
              { v: c.duration, k: t.statDuration },
              { v: c.format, k: t.statFormat },
            ].map((s, i) => (
              <div key={i} className="bg-white p-5 text-center">
                <div className="font-display font-normal text-ink mb-1.5" style={{ fontSize: 'clamp(15px, 1.4vw, 20px)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                  {s.v}
                </div>
                <div className="font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-muted">
                  {s.k}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHALLENGE / SOLUTION / RESULTS ── */}
      <section className="py-20">
        <div className="shell">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-10 max-w-6xl mx-auto">
            {[
              { num: 'i.', title: t.challenge, body: c.challenge },
              { num: 'ii.', title: t.solution, body: c.solution },
              { num: 'iii.', title: t.results, body: c.results },
            ].map((s) => (
              <div key={s.num}>
                <div className="font-display italic font-normal text-mid mb-4 inline-flex items-center gap-3" style={{ fontSize: 32, lineHeight: 1 }}>
                  {s.num}
                  <span aria-hidden className="block h-px w-10 bg-mid opacity-50" />
                </div>
                <h3 className="font-display font-normal m-0 mb-4 text-ink" style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                  {s.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-ink-soft m-0">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      {c.testimonial && (
        <section className="py-24">
          <div className="shell">
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-display italic text-mid mb-6 inline-block" style={{ fontSize: 80, lineHeight: 0.5 }}>
                &ldquo;
              </span>
              <p
                className="font-display italic font-normal text-ink m-0 mb-6"
                style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', letterSpacing: '-0.01em', lineHeight: 1.35 }}
              >
                {c.testimonial}
              </p>
              <div className="font-ui font-semibold text-[10px] tracking-[0.28em] uppercase text-muted">
                — {c.brand}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── PLACEMENT — the physical spot this campaign ran on ── */}
      {ranOn.length > 0 && (
        <section className="pb-16">
          <div className="shell">
            <div className="max-w-4xl mx-auto">
              <span className="sec-no inline-block mb-4 text-mid">§ {t.placementEyebrow}</span>
              <h3
                className="font-display font-normal m-0 mb-7 text-ink"
                style={{ fontSize: 'clamp(26px, 3vw, 38px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}
              >
                {t.placementTitle}
              </h3>
              <div className={`grid gap-5 ${ranOn.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                {ranOn.map((p) => {
                  const href = `/${locale}${placementPath(p)}`;
                  const retired = p.status === 'past';
                  return (
                    <Link
                      key={p.id}
                      href={href}
                      className="group bg-white border border-rule rounded-[20px] overflow-hidden flex sm:flex-row flex-col hover:-translate-y-1 hover:border-mid transition-all"
                    >
                      <div className="relative sm:w-[42%] w-full aspect-[4/3] sm:aspect-auto bg-fog shrink-0 overflow-hidden">
                        {p.image && (
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="(max-width: 640px) 100vw, 220px"
                            className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
                          />
                        )}
                      </div>
                      <div className="p-6 flex flex-col gap-2 flex-1">
                        <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted">
                          {p.location}
                        </div>
                        <h4
                          className="font-display font-normal m-0 text-ink"
                          style={{ fontSize: 21, letterSpacing: '-0.02em', lineHeight: 1.12 }}
                        >
                          {p.name}
                        </h4>
                        <p className="text-[13.5px] leading-[1.5] text-ink-soft m-0">
                          {p.size} · {p.traffic}
                        </p>
                        <div className="mt-auto pt-4 font-ui font-semibold text-[11px] tracking-[0.2em] uppercase text-muted group-hover:text-ink transition-colors">
                          {retired ? t.placementRetired : t.placementBookable}
                          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">↗</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── TAGS ── */}
      {c.tags && c.tags.length > 0 && (
        <section className="pb-12">
          <div className="shell">
            <div className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center">
              {c.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-ui font-semibold text-[11px] tracking-[0.16em] uppercase text-ink-soft border border-rule rounded-full px-3.5 py-1.5 bg-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OTHER CASES ── */}
      {others.length > 0 && (
        <section className="pb-16">
          <div className="shell">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-display font-normal m-0 mb-8 text-ink text-center" style={{ fontSize: 'clamp(26px, 3vw, 38px)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                {t.moreCases}
              </h2>
              <div className="grid sm:grid-cols-3 gap-5">
                {others.map((o) => (
                  <Link key={o.slug} href={`/${locale}/cases/${o.slug}`} className="group bg-white border border-rule rounded-[20px] overflow-hidden flex flex-col hover:-translate-y-1 hover:border-mid transition-all">
                    {o.image && (
                      <div className="relative aspect-[16/10] bg-fog overflow-hidden">
                        <Image src={o.image} alt={`${o.brand} – ${o.location}`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col gap-1.5">
                      <div className="font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-muted">{o.location}</div>
                      <h3 className="font-display font-normal m-0 text-ink" style={{ fontSize: 20, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{o.brand}</h3>
                      <p className="text-[13.5px] text-ink-soft m-0">{o.format}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── RELATED LINKS — SEO internal link-net ── */}
      <section className="pb-16">
        <div className="shell">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-ui font-semibold text-[11px] tracking-[0.18em] uppercase text-muted mb-4 text-center">
              {t.related}
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href={pillarHref} className="font-ui font-semibold text-[12px] tracking-[0.14em] uppercase text-ink border border-rule rounded-full px-4 py-2 bg-white hover:bg-slate-50 transition-colors">
                {pillarLabel} →
              </Link>
              {cityHref && (
                <Link href={cityHref} className="font-ui font-semibold text-[12px] tracking-[0.14em] uppercase text-ink border border-rule rounded-full px-4 py-2 bg-white hover:bg-slate-50 transition-colors">
                  {pillarLabel} {source.location.split(',')[0]} →
                </Link>
              )}
              <Link href={`/${locale}/cases`} className="font-ui font-semibold text-[12px] tracking-[0.14em] uppercase text-ink border border-rule rounded-full px-4 py-2 bg-white hover:bg-slate-50 transition-colors">
                {t.moreCases} →
              </Link>
              <Link href={`/${locale}/services`} className="font-ui font-semibold text-[12px] tracking-[0.14em] uppercase text-ink border border-rule rounded-full px-4 py-2 bg-white hover:bg-slate-50 transition-colors">
                {t.allServices} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden py-28 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%), linear-gradient(0deg, transparent 49.6%, rgba(0,0,0,0.20) 50%, transparent 50.4%)`,
            backgroundSize: '120px 80px',
          }}
        />
        <div className="shell relative z-10 grid lg:grid-cols-[1.2fr_1fr] grid-cols-1 gap-12 items-center">
          <h2
            className="font-display font-normal m-0 text-white"
            style={{ fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 0.96, letterSpacing: '-0.035em' }}
          >
            {t.ctaLead} <span className="italic text-glow">{t.ctaAccent}</span>
          </h2>
          <Link
            href={`/${locale}/contact`}
            className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
          >
            <span className="font-display italic font-normal text-[22px]" style={{ letterSpacing: '-0.02em' }}>{t.quote}</span>
            <span className="text-glow text-[20px]">↗</span>
          </Link>
        </div>
      </section>

      </GroundFlow>
    </div>
  );
}
