'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';

interface Brand { name: string; logo?: string; }

const BRANDS: Brand[] = [
  { name: 'GoMore',           logo: '/images/campaigns/gomore.png' },
  { name: 'Lidl',             logo: '/images/campaigns/lidl.png' },
  { name: 'Saxo Bank',        logo: '/images/campaigns/saxo.png' },
  { name: 'Fernet-Branca',    logo: '/images/campaigns/fernet-branca.png' },
  { name: 'TV2',              logo: '/images/campaigns/tv2.png' },
  { name: 'Vios',             logo: '/images/campaigns/vios.png' },
  { name: 'OLC',              logo: '/images/campaigns/olc.png' },
  { name: 'Lederne',          logo: '/images/campaigns/lederne.png' },
  { name: 'Jyllands-Posten',  logo: '/images/campaigns/jyllands-posten.png' },
  { name: 'Information',      logo: '/images/campaigns/information.png' },
  { name: 'Liberal Alliance', logo: '/images/campaigns/la.png' },
  { name: 'Culture Works',    logo: '/images/campaigns/CW updated.png' },
  { name: 'Sum-Up',           logo: '/images/campaigns/sum-up.svg' },
  { name: 'Normal',           logo: '/images/campaigns/normal.png' },
  { name: 'Moderaterne',      logo: '/images/campaigns/moderaterne.png' },
  { name: 'Venstre',          logo: '/images/campaigns/venstre.webp' },
  { name: 'Tise',             logo: '/images/campaigns/tise.png' },
  { name: 'Kragen Media',     logo: '/images/campaigns/Kragen media.png' },
  { name: 'Orchestra',        logo: '/images/campaigns/orchestra.png' },
];

function Tile({ brand, onDusk = false }: { brand: Brand; onDusk?: boolean }) {
  return (
    <div className="shrink-0 flex items-center justify-center mx-6 md:mx-10" style={{ width: 160, height: 70 }}>
      {brand.logo ? (
        <div className="relative" style={{ width: 130, height: 56 }}>
          <Image
            src={brand.logo}
            alt={brand.name}
            fill
            sizes="130px"
            className="object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      ) : (
        <span className={`font-display italic whitespace-nowrap ${onDusk ? 'text-white/85' : 'text-ink'}`} style={{ fontSize: 24, opacity: 0.85 }}>
          {brand.name}
        </span>
      )}
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
 */
export default function BrandStrip({ onDusk = false }: Props) {
  const locale = useLocale();
  const half = Math.ceil(BRANDS.length / 2);
  const rowA = BRANDS.slice(0, half);
  const rowB = BRANDS.slice(half);

  // Edge fades use a wider, fully-transparent sweep so they melt into the
  // dusk gradient without creating a visible band.
  const containerBg = onDusk ? 'transparent' : '#c6d8e8';

  return (
    <section
      aria-label={locale === 'en' ? 'Brands that trust us' : 'Marken, die uns vertrauen'}
      className={`relative overflow-hidden ${onDusk ? 'py-3' : 'py-8'}`}
      style={{ background: containerBg }}
    >
      {/* Row A — left */}
      <div className="relative w-full overflow-hidden group" style={{ maskImage: 'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)' }}>
        <div className="flex w-max" style={{ animation: 'marquee-left 110s linear infinite' }}>
          {[...rowA, ...rowA].map((b, i) => <Tile key={`a-${i}`} brand={b} onDusk={onDusk} />)}
        </div>
      </div>

      {/* Row B — right */}
      <div className="relative w-full overflow-hidden group" style={{ maskImage: 'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)' }}>
        <div className="flex w-max" style={{ animation: 'marquee-right 130s linear infinite' }}>
          {[...rowB, ...rowB].map((b, i) => <Tile key={`b-${i}`} brand={b} onDusk={onDusk} />)}
        </div>
      </div>
    </section>
  );
}
