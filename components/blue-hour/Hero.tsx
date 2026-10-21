'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useLocale } from 'next-intl';
import { PLACEMENT_KINDS, getCurrentPlacements, localizePlacement, placementPath } from '@/lib/placements';

// 3D scaffold runs in the browser only — never on the server.
const Hero3DScaffold = dynamic(() => import('./Hero3DScaffold'), {
  ssr: false,
  loading: () => null,
});

const COPY = {
  de: {
    h1a: 'den man ',
    h1b: 'nicht',
    h1c: 'vergisst.',
    lede: 'erüstwerbung und Fassadenwerbung im Grossformat an den verkehrsreichsten Orten. Wir übernehmen alles von Druck bis Montage.',
    owners: 'Für Liegenschaftseigentümer',
    kicker: 'Gerüstwerbung und Fassadenwerbung in Basel und der Schweiz',
    quote: 'Angebot anfordern',
    browse: 'Standorte ansehen',
    brands: 'Für Marken',
    flagship: 'Neuer Flagship',
    daily: 'Kontakte pro Tag',
    see: 'Standort ansehen',
  },
  en: {
    h1a: 'you ',
    h1b: "won't",
    h1c: 'forget.',
    lede: 'rand-format scaffolding and facade advertising at the busiest spots. We handle everything from print to installation.',
    owners: 'For property owners',
    kicker: 'Scaffolding and facade advertising in Basel and Switzerland',
    quote: 'Request a quote',
    browse: 'See locations',
    brands: 'For brands',
    flagship: 'New flagship',
    daily: 'contacts a day',
    see: 'See the site',
  },
} as const;

/** The placement marked flagship in placements.json, if one is live. */
const FLAGSHIP = PLACEMENT_KINDS.flatMap((k) => getCurrentPlacements(k)).find((p) => p.flagship && p.status === 'available');

/**
 * Hero — single left column for all text & CTAs, 3D scene in its own
 * column on the right. No overlap; the text and the model never compete
 * for the same horizontal space.
 */
export default function Hero() {
  const locale = useLocale();
  const t = COPY[locale === 'en' ? 'en' : 'de'];

  return (
    <section className="relative z-[5] pt-12 md:pt-16">
      <div className="shell">
        {/* Stage — flex/grid keeps text left, 3D right, no overlap */}
        <div className="relative grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] grid-cols-1 gap-8 lg:gap-12 lg:min-h-[680px] items-start">
          {/* LEFT: text + lede + CTAs */}
          <div className="relative z-10 flex flex-col">
            {FLAGSHIP && (
              <Link
                href={`/${locale}${placementPath(FLAGSHIP)}`}
                className="group self-start mb-7 flex items-center gap-3.5 max-w-full rounded-2xl bg-white/[0.12] backdrop-blur-md border border-white/25 p-1.5 pr-5 text-white hover:bg-white/20 hover:border-white/50 transition-all"
              >
                <span className="relative shrink-0 w-[76px] h-[56px] sm:w-[92px] sm:h-[64px] rounded-xl overflow-hidden bg-white/10">
                  <Image
                    src={FLAGSHIP.video?.poster ?? FLAGSHIP.image}
                    alt={localizePlacement(FLAGSHIP, locale).name}
                    fill
                    sizes="92px"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </span>
                <span className="min-w-0 flex flex-col gap-1">
                  <span className="self-start bg-glow text-dusk font-ui font-bold text-[9.5px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full">
                    {t.flagship}
                  </span>
                  <span className="font-ui font-semibold text-[14px] leading-tight truncate">{localizePlacement(FLAGSHIP, locale).name}</span>
                  <span className="font-ui text-[12px] text-white/75 truncate">
                    {FLAGSHIP.size} · {FLAGSHIP.traffic.split(' ')[0]} {t.daily}
                    <span className="hidden sm:inline text-glow"> · {t.see} <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span></span>
                  </span>
                </span>
              </Link>
            )}

            {/* Headline — the kicker carries the search terms, the display line the brand. */}
            <h1
              className="font-display font-normal text-white"
              style={{
                fontSize: 'clamp(44px, 6vw, 104px)',
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                textShadow: '0 2px 24px rgba(14,30,51,0.2)',
              }}
            >
              <span className="block font-ui font-semibold text-[11px] md:text-[12px] tracking-[0.24em] uppercase text-white/75 mb-5" style={{ lineHeight: 1.5, letterSpacing: '0.24em' }}>
                {t.kicker}
              </span>
              <span className="font-ui font-extrabold uppercase tracking-[-0.01em] text-[0.88em] inline-block">
                Impact
              </span>
              <br />
              {t.h1a}<span className="italic text-cream">{t.h1b}</span>
              <br />
              <span className="italic">{t.h1c}</span>
            </h1>

            {/* Lede */}
            <p
              className="italic mt-10 max-w-[36ch] text-white/90"
              style={{ fontSize: 'clamp(18px, 1.6vw, 22px)', lineHeight: 1.4, letterSpacing: '-0.005em' }}
            >
              <span
                className="font-display italic float-left text-glow leading-none pr-1"
                style={{ fontSize: '1.5em', fontWeight: 400 }}
              >
                G
              </span>
              {t.lede}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              <Link
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-3.5 px-6 py-4 bg-cream text-dusk rounded-full font-ui font-semibold text-[13px] uppercase tracking-[0.08em] hover:-translate-y-0.5 hover:bg-glow transition-all"
              >
                {t.quote}
                <span className="inline-block h-px w-[22px] bg-current group-hover:w-9 transition-all" />
              </Link>
              <a
                href="#standorte"
                className="inline-flex items-center gap-2.5 px-6 py-4 bg-transparent text-white rounded-full border border-white/45 font-ui font-semibold text-[13px] uppercase tracking-[0.08em] hover:bg-white/10 hover:border-white transition-all"
              >
                {t.browse}
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-ui font-semibold text-[11px] uppercase tracking-[0.16em] text-white/70">
              <Link href={`/${locale}/brands`} className="hover:text-white transition-colors">{t.brands} →</Link>
              <Link href={`/${locale}/property-owners`} className="hover:text-white transition-colors">{t.owners} →</Link>
            </div>
          </div>

          {/* RIGHT: bigger float in top-right on mobile, full column on desktop */}
          <div className="absolute -top-24 sm:-top-16 md:-top-12 -right-6 sm:-right-4 md:-right-2 w-[210px] h-[290px] sm:w-[260px] sm:h-[350px] md:w-[300px] md:h-[400px] lg:relative lg:top-auto lg:right-auto lg:w-auto lg:h-auto lg:min-h-[680px] cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform">
            <Hero3DScaffold variant="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
