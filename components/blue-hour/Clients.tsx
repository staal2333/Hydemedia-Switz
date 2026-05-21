'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';

interface Brand {
  name: string;
  logo?: string; // path under /public — leave undefined to render text fallback
}

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
];

function BrandTile({ brand }: { brand: Brand }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center mx-6 md:mx-10"
      style={{ width: 180, height: 80 }}
    >
      {brand.logo ? (
        <Image
          src={brand.logo}
          alt={brand.name}
          width={160}
          height={64}
          className="max-h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
          style={{ filter: 'grayscale(0.4)' }}
        />
      ) : (
        <span
          className="font-display italic text-ink whitespace-nowrap"
          style={{
            fontSize: 28,
            letterSpacing: '-0.02em',
            opacity: 0.55,
          }}
        >
          {brand.name}
        </span>
      )}
    </div>
  );
}

/**
 * Two-row spinning carousel. Each row duplicates the list once so the CSS
 * marquee animation can translate -50% and seamlessly loop.
 * Top row scrolls left, bottom row scrolls right — opposite directions add
 * a sense of motion without feeling like a single conveyor belt.
 */
export default function Clients() {
  const locale = useLocale();

  // Split brands roughly in half across the two rows
  const half = Math.ceil(BRANDS.length / 2);
  const rowA = BRANDS.slice(0, half);
  const rowB = BRANDS.slice(half);

  return (
    <section id="cases" className="py-32 overflow-hidden">
      <div className="shell">
        <div className="text-center mb-14">
          <span className="eyebrow dark inline-block mb-4 text-mid">{locale === 'en' ? '§ 03 · Brands that trust us' : '§ 03 · Marken, die uns vertrauen'}</span>
          <h2 className="font-display font-normal m-0 text-ink" style={{ fontSize: 'clamp(34px, 4.2vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            {locale === 'en' ? 'Companies we have ' : 'Unternehmen, mit denen wir '}<span className="italic text-mid">{locale === 'en' ? 'worked with.' : 'zusammengearbeitet haben.'}</span>
          </h2>
        </div>
      </div>

      {/* Row A — scrolls left */}
      <div className="relative w-full overflow-hidden mb-6 group">
        {/* Edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10" style={{ background: 'linear-gradient(to right, var(--cream, #e0e5ea), transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10" style={{ background: 'linear-gradient(to left, var(--cream, #e0e5ea), transparent)' }} />

        <div className="flex w-max" style={{ animation: 'marquee-left 50s linear infinite' }}>
          {[...rowA, ...rowA].map((b, i) => (
            <BrandTile key={`a-${i}`} brand={b} />
          ))}
        </div>
      </div>

      {/* Row B — scrolls right */}
      <div className="relative w-full overflow-hidden group">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10" style={{ background: 'linear-gradient(to right, var(--cream, #e0e5ea), transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10" style={{ background: 'linear-gradient(to left, var(--cream, #e0e5ea), transparent)' }} />

        <div className="flex w-max" style={{ animation: 'marquee-right 55s linear infinite' }}>
          {[...rowB, ...rowB].map((b, i) => (
            <BrandTile key={`b-${i}`} brand={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
