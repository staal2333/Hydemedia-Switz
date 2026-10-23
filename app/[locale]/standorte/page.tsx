import { Metadata } from 'next';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { PLACEMENT_KINDS, getCurrentPlacements, localizePlacement, placementPath } from '@/lib/placements';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';
import LocationsIndex from '@/components/blue-hour/LocationsIndex';

const SITE = 'https://www.hydemedia.ch';

const COPY = {
  de: {
    title: 'Standorte für Gerüstwerbung und Fassadenwerbung in Basel',
    description: 'Alle Standorte von Hyde Media: Gerüst- und Fassadenflächen in Basel mit Grösse, Verkehrszahlen und Zeitraum. Für Aussenwerbung im Grossformat.',
    eyebrow: 'Standorte',
    h1a: 'Alle unsere ',
    h1b: 'Standorte.',
    lede: 'Gerüst- und Fassadenflächen an den verkehrsreichsten Orten der Schweiz. Wählen Sie einen Standort und sehen Sie Grösse, Verkehrszahlen und Zeitraum.',
    more: 'Siehe auch',
    links: [
      ['/de/geruestwerbung-basel', 'Gerüstwerbung in Basel'],
      ['/de/megaposter', 'Megaposter in Basel'],
      ['/de/scaffolding', 'Gerüstwerbung'],
      ['/de/facade', 'Fassadenwerbung'],
      ['/de/kampagnenrechner', 'Kampagnenrechner'],
    ],
  },
  en: {
    title: 'Locations: scaffolding and facade advertising in Basel',
    description: 'All Hyde Media locations: scaffolding and facade sites in Basel with size, traffic figures and period. Large-format outdoor advertising in Switzerland.',
    eyebrow: 'Locations',
    h1a: 'All our ',
    h1b: 'locations.',
    lede: 'Scaffolding and facade sites at the busiest spots in Switzerland. Choose a site to see its size, traffic and period.',
    more: 'See also',
    links: [
      ['/en/geruestwerbung-basel', 'Scaffolding advertising in Basel'],
      ['/en/megaposter', 'Megaposters in Basel'],
      ['/en/scaffolding', 'Scaffolding advertising'],
      ['/en/facade', 'Facade advertising'],
      ['/en/kampagnenrechner', 'Campaign calculator'],
    ],
  },
} as const;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const c = COPY[locale === 'en' ? 'en' : 'de'];
  return generateSEOMetadata({ title: c.title, description: c.description, path: '/standorte', locale });
}

export default function LocationsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const c = COPY[locale === 'en' ? 'en' : 'de'];
  const url = `${SITE}/${locale}/standorte`;
  const all = PLACEMENT_KINDS.flatMap((k) => getCurrentPlacements(k).map((p) => localizePlacement(p, locale)));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${url}#list`,
    name: c.title,
    url,
    numberOfItems: all.length,
    itemListElement: all.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${SITE}/${locale}${placementPath(p)}`,
    })),
  };

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {c.eyebrow}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {c.h1a}<span className="italic text-cream">{c.h1b}</span>
            </h1>
            <p className="font-body text-white/85 max-w-2xl mx-auto m-0" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {c.lede}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        <section className="py-16">
          <div className="shell">
            <LocationsIndex locale={locale} />

            <nav aria-label={c.more} className="mt-4 pt-8 border-t border-rule flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="font-ui font-semibold text-[10px] tracking-[0.22em] uppercase text-muted">{c.more}</span>
              {c.links.map(([href, label]) => (
                <Link key={href} href={href} className="font-ui text-[13px] text-ink-soft hover:text-mid underline underline-offset-4 decoration-rule">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </section>
      </GroundFlow>
    </div>
  );
}
