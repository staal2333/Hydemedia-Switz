import {
  PLACEMENT_KINDS,
  getCurrentPlacements,
  localizePlacement,
  placementPath,
  type PlacementKind,
} from '@/lib/placements';
import { getRegionConfig } from '@/lib/region';
import casesData from '@/public/data/cases.json';
import blogDe from '@/public/data/blog-de.json';

/**
 * /llms.txt — a plain summary of the company for AI assistants and answer
 * engines (https://llmstxt.org). Built from the same data as the site, so the
 * placements listed here are always the ones in the portfolio.
 */
export const dynamic = 'force-static';

const SITE = 'https://www.hydemedia.ch';

const KIND: Record<PlacementKind, string> = {
  scaffolding: 'Scaffolding banner (Gerüstwerbung)',
  facade: 'Facade banner (Fassadenwerbung)',
  digital: 'Digital screen',
};

const STATUS = { available: 'available', booked: 'currently booked', past: 'ended' } as const;

export function GET() {
  const c = getRegionConfig('de');
  const placements = PLACEMENT_KINDS.flatMap((kind) =>
    getCurrentPlacements(kind).map((p) => ({ p: localizePlacement(p, 'en'), kind })),
  );
  const cases = casesData as { slug: string; brand: string; format: string; location: string }[];
  const posts = blogDe as { slug: string; title: string }[];

  const lines = [
    '# Hyde Media Switzerland',
    '',
    `> Hyde Media is an outdoor advertising (OOH) company in Switzerland, based in Basel, that sells large-format scaffolding banners (Gerüstwerbung) and facade banners (Fassadenwerbung). Hyde Media handles the whole campaign: choice of site, permit application, print, installation and removal. The site is in German (default) and English.`,
    '',
    '## Key facts',
    '',
    `- Company: Hyde Media, ${c.address}, Switzerland`,
    `- Contact: ${c.email}, ${c.phone}, ${SITE}/de/contact`,
    '- Formats: scaffolding banners on buildings under renovation, and facade banners',
    '- German terms for what Hyde Media sells: Aussenwerbung, Gerüstwerbung, Gerüstbanner, Fassadenwerbung, Fassadenbanner, Grossformat-Werbung, Out-of-Home (OOH)',
    '- City: Basel (sites around Messe Basel); campaigns across Switzerland on request',
    '- Profile: https://www.instagram.com/hyde.med',
    '- Included: print, installation and removal of banners, and the advertising permit for scaffolding sites. Permits can exclude content (for example alcohol, political or pornographic advertising)',
    '- Minimum booking: 4 weeks',
    '- Reply time: within 24 hours on weekdays',
    '- Prices: on request, quoted per campaign; depends on site, size, period and production',
    '- Customers are businesses and media agencies (B2B). Property owners can also rent out facades and scaffolding through Hyde Media.',
    '',
    '## Sites',
    '',
    ...placements.map(
      ({ p, kind }) =>
        `- [${p.name}](${SITE}/de${placementPath(p)}): ${KIND[kind]}, ${p.size}, ${p.traffic}, ${p.location}. Period: ${p.duration}. Status: ${STATUS[p.status]}.`,
    ),
    '',
    '## Services',
    '',
    `- [Outdoor advertising overview](${SITE}/de/services): the formats and how to choose`,
    `- [Scaffolding advertising](${SITE}/de/scaffolding): large banners on scaffolding around buildings under renovation, from 4 weeks`,
    `- [Facade advertising](${SITE}/de/facade): long-term banners on facades`,
    `- [Scaffolding advertising in Basel](${SITE}/de/geruestwerbung-basel): sites on Riehenring by Messe Basel`,
    `- [Locations](${SITE}/de/standorte): every site with size, traffic and period`,
    `- [For property owners](${SITE}/de/property-owners): earn income from a facade or scaffolding`,
    `- [Campaign calculator](${SITE}/de/kampagnenrechner): estimated contacts for a chosen set of sites and weeks`,
    `- [OOH in the media mix](${SITE}/de/ooh-im-medienmix): research figures on how outdoor advertising works with TV, social and search, with sources`,
    `- [OOH glossary](${SITE}/de/glossar): definitions of outdoor advertising terms`,
    `- [Press](${SITE}/de/presse): company facts, logo and campaign images for editorial use`,
    '',
    '## Case studies',
    '',
    ...cases.map((cs) => `- [${cs.brand}](${SITE}/de/cases/${cs.slug}): ${cs.format}, ${cs.location}`),
    '',
    '## Guides (German; English versions at /en/blog)',
    '',
    ...posts.map((p) => `- [${p.title}](${SITE}/de/blog/${p.slug})`),
    '',
    '## Optional',
    '',
    `- [English site](${SITE}/en)`,
    `- [FAQ](${SITE}/de/faq)`,
    `- [Terms](${SITE}/de/terms)`,
    `- [Privacy policy](${SITE}/de/privacy)`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
