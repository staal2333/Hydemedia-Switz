'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import references from '@/data/references.json';

interface Brand {
  name: string;
  /** Null until a logo asset exists — the tile falls back to a wordmark. */
  logo?: string | null;
  /** Slug in cases.json when this brand has a published case study. */
  caseSlug?: string | null;
  /** Width / height of the logo artwork, trimmed of empty margins. */
  ratio?: number;
  /** Optical correction for artwork that reads heavier or lighter than its area. */
  scale?: number;
}

/**
 * Every logo gets the same visual area rather than the same box, so a long
 * wordmark and a square badge read as equally large. Height and width caps
 * stop the extremes from growing past the tile.
 */
const LOGO_AREA = 2900;
const MAX_H = 54;
const MAX_W = 160;

function logoSize(ratio = 2.3, scale = 1) {
  let w = Math.sqrt(LOGO_AREA * ratio) * scale;
  let h = w / ratio;
  if (h > MAX_H * scale) { h = MAX_H * scale; w = h * ratio; }
  if (w > MAX_W) { w = MAX_W; h = w / ratio; }
  return { width: Math.round(w), height: Math.round(h) };
}

const BRANDS: Brand[] = references;

const COPY = {
  de: { section: 'Marken, die uns vertrauen', seeCase: (b: string) => `Referenz ansehen: ${b}` },
  en: { section: 'Brands that trust us', seeCase: (b: string) => `See case: ${b}` },
} as const;

function Logo({ brand, onDusk }: { brand: Brand; onDusk: boolean }) {
  if (!brand.logo) {
    return (
      <span
        className={`font-display italic whitespace-nowrap ${onDusk ? 'text-white/85' : 'text-ink'}`}
        style={{ fontSize: 24, opacity: 0.85 }}
      >
        {brand.name}
      </span>
    );
  }
  const size = logoSize(brand.ratio, brand.scale);
  return (
    <div className="relative" style={size}>
      <Image
        src={brand.logo}
        alt={brand.name}
        fill
        sizes={`${size.width}px`}
        className="object-contain opacity-90 transition-opacity group-hover/tile:opacity-100"
      />
    </div>
  );
}

function Tile({ brand, onDusk = false }: { brand: Brand; onDusk?: boolean }) {
  const locale = useLocale();
  const shell = 'group/tile shrink-0 flex items-center justify-center mx-6 md:mx-10';
  const style = { width: MAX_W, height: 76 };

  // Brands with a published case become a doorway into it; the rest stay static.
  if (brand.caseSlug) {
    return (
      <Link
        href={`/${locale}/cases/${brand.caseSlug}`}
        aria-label={COPY[locale === 'en' ? 'en' : 'de'].seeCase(brand.name)}
        className={`${shell} rounded-2xl transition-transform hover:-translate-y-0.5`}
        style={style}
      >
        <Logo brand={brand} onDusk={onDusk} />
      </Link>
    );
  }

  return (
    <div className={shell} style={style}>
      <Logo brand={brand} onDusk={onDusk} />
    </div>
  );
}

interface Props {
  /** When true the strip is inside the TopStage and renders on a transparent bg with white-ish logos. */
  onDusk?: boolean;
}

/**
 * Brand carousel — two rows scrolling opposite directions.
 * Drops in either as a section between hero and §01 (default), or layered
 * inside the hero stage on the dusk gradient (`onDusk`).
 *
 * The brand list lives in data/references.json so the strip, the cases index
 * and any future reference wall stay in sync from one source.
 */
export default function BrandStrip({ onDusk = false }: Props) {
  const locale = useLocale();
  const t = COPY[locale === 'en' ? 'en' : 'de'];
  const half = Math.ceil(BRANDS.length / 2);
  // Each row is doubled once more so that half of the looping track (what the
  // marquee keyframes slide by) is wider than even a large screen.
  const rowA = [...BRANDS.slice(0, half), ...BRANDS.slice(0, half)];
  const rowB = [...BRANDS.slice(half), ...BRANDS.slice(half)];

  // Edge fades use a wider, fully-transparent sweep so they melt into the
  // dusk gradient without creating a visible band.
  const containerBg = onDusk ? 'transparent' : '#c6d8e8';

  return (
    <section
      aria-label={t.section}
      className={`relative overflow-hidden ${onDusk ? 'py-3' : 'py-8'}`}
      style={{ background: containerBg }}
    >
      {/* Row A — left */}
      <div className="relative w-full overflow-hidden group" style={{ maskImage: 'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)' }}>
        <div className="flex w-max" style={{ animation: 'marquee-left 220s linear infinite' }}>
          {[...rowA, ...rowA].map((b, i) => <Tile key={`a-${i}`} brand={b} onDusk={onDusk} />)}
        </div>
      </div>

      {/* Row B — right */}
      <div className="relative w-full overflow-hidden group" style={{ maskImage: 'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)' }}>
        <div className="flex w-max" style={{ animation: 'marquee-right 260s linear infinite' }}>
          {[...rowB, ...rowB].map((b, i) => <Tile key={`b-${i}`} brand={b} onDusk={onDusk} />)}
        </div>
      </div>
    </section>
  );
}
