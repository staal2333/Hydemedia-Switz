'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import placements from '@/data/placements.json';
import casesData from '@/public/data/cases.json';
import DuskHero from './DuskHero';
import GroundFlow from './GroundFlow';

export interface LocationConfig {
  /** Unique slug used for structured data and the section eyebrow */
  slug: string;
  /** "Basel" / "Zürich" — used in headlines and meta */
  city: string;
  /** "Stilladsreklame" / "Facadereklame" */
  serviceName: string;
  /** "scaffolding" / "facade" — keys into placements.json */
  serviceKind: 'scaffolding' | 'facade';
  /** Big H1 for the hero */
  heroTitle: string;
  /** Italic accent at end of headline */
  heroAccent: string;
  /** Lede paragraph under H1 */
  heroDescription: string;
  /** 4 local stats shown as a strip */
  stats: { value: string; label: string }[];
  /** 4-6 neighborhoods or arteries this city is known for */
  neighborhoods: string[];
  /** Local-context paragraph — uniqueness for SEO, ideally 80-120 words */
  localContext: string;
  /** "Why this city + service" — 4 bullets */
  whyCity: { title: string; desc: string }[];
  /** FAQ items — great for SEO + featured snippets */
  faq: { q: string; a: string }[];
  /** Filter for placements.json — return true to include this placement */
  placementFilter: (location: string, address: string) => boolean;
  /** Filter for cases.json */
  caseFilter: (location: string) => boolean;
}

export default function LocationTemplate({ config }: { config: LocationConfig }) {
  const locale = useLocale();

  const localPlacements = placements[config.serviceKind].filter((p) =>
    config.placementFilter(p.location, p.address),
  );
  const localCases = casesData.filter((c) => config.caseFilter(c.location));

  // FAQ structured data for Google rich results
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: config.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  // Service + areaServed structured data
  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: config.serviceName,
    provider: { '@type': 'Organization', name: 'Hyde Media', url: 'https://www.hydemedia.dk' },
    areaServed: { '@type': 'City', name: config.city },
    name: `${config.serviceName} i ${config.city}`,
    description: config.heroDescription,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />

      <div className="relative">
        {/* ── HERO on dusk ── */}
        <DuskHero>
          <div className="shell">
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {config.serviceName} · {config.city}</span>
              <h1
                className="font-display font-normal text-white m-0 mb-6"
                style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
              >
                {config.heroTitle} <span className="italic text-cream">{config.heroAccent}</span>
              </h1>
              <p className="font-body text-white/85 max-w-3xl mx-auto m-0 mb-8" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
                {config.heroDescription}
              </p>
              <Link
                href={`/${locale}/contact?inquiry=${encodeURIComponent(`${config.serviceName} ${config.city}`)}`}
                className="inline-flex items-center gap-3 px-6 py-4 bg-cream text-dusk rounded-full font-ui font-semibold text-[12px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-glow transition-all"
              >
                {locale === 'en' ? 'Request a quote' : 'Offerte anfordern'} · {config.city} <span>↗</span>
              </Link>
            </div>
          </div>
        </DuskHero>

        <GroundFlow>

        {/* ── STATS ── */}
        <section className="py-8 pt-20">
          <div className="shell">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-rule rounded-[20px] overflow-hidden border border-rule max-w-5xl mx-auto">
              {config.stats.map((s, i) => (
                <div key={i} className="bg-white p-6 text-center">
                  <div className="font-display font-normal text-ink mb-2" style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div className="font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCAL CONTEXT — for SEO uniqueness ── */}
        <section className="py-20">
          <div className="shell">
            <div className="grid lg:grid-cols-[1fr_1.4fr] grid-cols-1 gap-10 lg:gap-16 max-w-6xl mx-auto">
              <div>
                <span className="sec-no inline-block mb-4 text-mid">§ {config.city}</span>
                <h2 className="font-display font-normal m-0 text-ink" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                  {locale === 'en' ? 'Where we ' : 'Wo wir '}<span className="italic text-mid">{locale === 'en' ? `operate in ${config.city}.` : `in ${config.city} tätig sind.`}</span>
                </h2>
              </div>
              <div>
                <p className="text-[16px] leading-[1.7] text-ink-soft m-0 mb-6">
                  {config.localContext}
                </p>
                <div className="flex flex-wrap gap-2">
                  {config.neighborhoods.map((n) => (
                    <span
                      key={n}
                      className="font-ui font-semibold text-[11px] tracking-[0.16em] uppercase text-ink-soft border border-rule rounded-full px-3.5 py-1.5 bg-white"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ACTIVE PLACEMENTS — filtered to this city ── */}
        {localPlacements.length > 0 && (
          <section className="py-20">
            <div className="shell">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
                <h2 className="font-display font-normal m-0 text-ink" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05, maxWidth: '22ch' }}>
                  {locale === 'en' ? 'Live placements in ' : 'Live-Platzierungen in '}<span className="italic text-mid">{config.city}.</span>
                </h2>
                <span className="sec-no">{locale === 'en' ? '§ Active portfolio' : '§ Aktives Portfolio'}</span>
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                {localPlacements.map((p, i) => (
                  <Link
                    key={p.id}
                    href={`/${locale}/${config.serviceKind === 'scaffolding' ? 'scaffolding' : 'facade'}#${p.id}`}
                    className="group bg-white border border-rule rounded-[20px] overflow-hidden flex flex-col hover:-translate-y-1.5 hover:border-mid transition-all"
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 40px 80px -20px rgba(31,58,95,0.25)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 0 0 transparent'; }}
                  >
                    <div className="relative aspect-[16/10] bg-fog overflow-hidden">
                      <Image src={p.image} alt={`${config.serviceName} ${p.name} – ${config.city}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]" />
                      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full font-ui font-semibold text-[9px] tracking-[0.2em] uppercase text-dusk">
                        <span className="h-1.5 w-1.5 rounded-full bg-mid" /> Live · № {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted">{p.address}</div>
                      <h3 className="font-display font-normal m-0 text-ink" style={{ fontSize: 24, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        {p.name}
                      </h3>
                      <p className="text-[14px] leading-[1.55] text-ink-soft m-0">{p.traffic} · {p.size} · {p.duration}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── WHY THIS CITY ── */}
        <section className="py-24">
          <div className="shell">
            <div className="max-w-3xl mb-12">
              <span className="sec-no inline-block mb-4 text-mid">{locale === 'en' ? '§ Why' : '§ Warum'}</span>
              <h2 className="font-display font-normal text-ink m-0" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {locale === 'en' ? `Why ${config.serviceName.toLowerCase()} in ` : `Warum ${config.serviceName.toLowerCase()} in `}<span className="italic text-mid">{config.city}?</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {config.whyCity.map((w, i) => (
                <div key={i} className="bg-white border border-rule rounded-[20px] p-7">
                  <div className="font-display italic font-normal text-mid mb-3" style={{ fontSize: 30, lineHeight: 1 }}>
                    0{i + 1}.
                  </div>
                  <h3 className="font-display font-normal m-0 mb-2.5 text-ink" style={{ fontSize: 19, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    {w.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-ink-soft m-0">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LOCAL CASES ── */}
        {localCases.length > 0 && (
          <section className="py-20">
            <div className="shell">
              <div className="mb-10">
                <span className="sec-no inline-block mb-4 text-mid">§ Cases</span>
                <h2 className="font-display font-normal m-0 text-ink" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                  {locale === 'en' ? 'Brands that ' : 'Marken, die '}<span className="italic text-mid">{locale === 'en' ? `have advertised in ${config.city}.` : `in ${config.city} geworben haben.`}</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {localCases.slice(0, 6).map((c) => (
                  <Link
                    key={c.id}
                    href={`/${locale}/cases/${c.slug}`}
                    className="group bg-white border border-rule rounded-[20px] overflow-hidden flex flex-col hover:-translate-y-1 hover:border-mid transition-all"
                  >
                    {c.images?.[0] && (
                      <div className="relative aspect-[16/10] bg-fog overflow-hidden">
                        <Image src={c.images[0]} alt={`${c.brand} – ${c.location}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col gap-2 flex-1">
                      <div className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted">{c.location}</div>
                      <h3 className="font-display font-normal m-0 text-ink" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                        {c.brand}
                      </h3>
                      <p className="text-[13.5px] leading-[1.55] text-ink-soft m-0">{c.format} · {c.size} · {c.duration}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ — boosts featured snippets ── */}
        <section className="py-24">
          <div className="shell">
            <div className="max-w-3xl mx-auto">
              <span className="sec-no inline-block mb-4 text-mid">§ FAQ</span>
              <h2 className="font-display font-normal m-0 mb-10 text-ink" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {locale === 'en' ? 'Frequently asked ' : 'Häufig gestellte '}<span className="italic text-mid">{locale === 'en' ? 'questions.' : 'Fragen.'}</span>
              </h2>
              <div className="space-y-3">
                {config.faq.map((f, i) => (
                  <details
                    key={i}
                    className="group bg-white border border-rule rounded-[16px] overflow-hidden"
                  >
                    <summary className="cursor-pointer list-none p-6 flex items-start justify-between gap-4 hover:bg-fog/40 transition-colors">
                      <span className="font-display font-normal text-ink" style={{ fontSize: 19, letterSpacing: '-0.015em', lineHeight: 1.35 }}>
                        {f.q}
                      </span>
                      <span className="font-display italic text-mid text-[24px] leading-[1] shrink-0 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="px-6 pb-6 -mt-2 text-[15px] leading-[1.65] text-ink-soft">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERNAL LINKS for crawlability ── */}
        <section className="pb-12">
          <div className="shell">
            <div className="max-w-4xl mx-auto flex flex-wrap gap-3 justify-center text-center">
              <span className="font-ui font-semibold text-[10px] tracking-[0.24em] uppercase text-muted self-center mr-2">{locale === 'en' ? 'See also' : 'Siehe auch'}</span>
              <Link href={`/${locale}/services`} className="font-display italic text-ink underline decoration-mid underline-offset-4 hover:text-mid transition-colors" style={{ fontSize: 17 }}>
                {locale === 'en' ? 'all solutions' : 'alle Lösungen'}
              </Link>
              <span className="self-center text-ink-soft">·</span>
              <Link href={`/${locale}/${config.serviceKind === 'scaffolding' ? 'scaffolding' : 'facade'}`} className="font-display italic text-ink underline decoration-mid underline-offset-4 hover:text-mid transition-colors" style={{ fontSize: 17 }}>
                {locale === 'en' ? `${config.serviceName.toLowerCase()} overview` : `${config.serviceName.toLowerCase()} Übersicht`}
              </Link>
              <span className="self-center text-ink-soft">·</span>
              <Link href={`/${locale}/cases`} className="font-display italic text-ink underline decoration-mid underline-offset-4 hover:text-mid transition-colors" style={{ fontSize: 17 }}>
                {locale === 'en' ? 'all cases' : 'alle Referenzen'}
              </Link>
              <span className="self-center text-ink-soft">·</span>
              <Link href={`/${locale}/contact`} className="font-display italic text-ink underline decoration-mid underline-offset-4 hover:text-mid transition-colors" style={{ fontSize: 17 }}>
                {locale === 'en' ? 'contact' : 'kontakt'}
              </Link>
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
                {locale === 'en' ? 'Ready to put your brand ' : 'Bereit, deine Marke '}<span className="italic text-glow">{locale === 'en' ? `on the map in ${config.city}?` : `in ${config.city} auf die Karte zu bringen?`}</span>
              </h2>
              <p className="font-body text-white/80 mt-6 max-w-xl m-0" style={{ fontSize: 17, lineHeight: 1.6 }}>
                {locale === 'en' ? 'Reply within 24 hours. A tailored quote based on your campaign and target audience.' : 'Antwort innerhalb von 24 Stunden. Massgeschneiderte Offerte basierend auf deiner Kampagne und Zielgruppe.'}
              </p>
            </div>
            <div className="flex flex-col gap-3.5">
              <Link
                href={`/${locale}/contact?inquiry=${encodeURIComponent(`${config.serviceName} ${config.city}`)}`}
                className="flex justify-between items-center px-6 py-5 bg-white/[0.14] backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/25 hover:border-white hover:-translate-y-0.5 transition-all"
              >
                <span className="font-display italic font-normal text-[24px]" style={{ letterSpacing: '-0.02em' }}>{locale === 'en' ? 'Request a quote' : 'Offerte anfordern'}</span>
                <span className="text-glow text-[20px]">↗</span>
              </Link>
              <a
                href="tel:+41772338121"
                className="flex justify-between items-center px-6 py-5 bg-white/[0.06] backdrop-blur-xl border border-white/20 rounded-2xl hover:bg-white/15 hover:border-white/50 hover:-translate-y-0.5 transition-all"
              >
                <span className="font-display italic font-normal text-[20px] text-white/85" style={{ letterSpacing: '-0.02em' }}>{locale === 'en' ? 'Call +41 77 233 81 21' : 'Anrufen +41 77 233 81 21'}</span>
                <span className="text-white/65 text-[18px]">→</span>
              </a>
            </div>
          </div>
        </section>

        </GroundFlow>
      </div>
    </>
  );
}
