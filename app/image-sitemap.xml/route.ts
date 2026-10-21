import { PLACEMENT_KINDS, getCurrentPlacements, placeLabel, placementPath } from '@/lib/placements';
import casesData from '@/public/data/cases.json';
import blogDe from '@/public/data/blog-de.json';

/**
 * Image sitemap. Next 14's sitemap() has no image fields, so this lists the
 * photos Google Images should know about, each on the page it belongs to:
 * placement photos, campaign photos on case pages and article covers.
 */
export const dynamic = 'force-static';

const SITE = 'https://www.hydemedia.ch';
const KIND = { scaffolding: 'Gerüstwerbung', facade: 'Fassadenwerbung', digital: 'Digitaler Screen' } as const;

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Spaces and non-ASCII in file names must be percent-encoded in a URL. */
function abs(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  return SITE + src.split('/').map((seg) => encodeURIComponent(seg)).join('/');
}

type Entry = { page: string; images: { loc: string; title: string }[] };

export function GET() {
  const entries: Entry[] = [];

  for (const kind of PLACEMENT_KINDS) {
    for (const p of getCurrentPlacements(kind)) {
      const shots = Array.from(new Set([p.image, ...(p.images ?? [])])).filter(Boolean);
      if (shots.length === 0) continue;
      entries.push({
        page: `${SITE}/de${placementPath(p)}`,
        images: shots.map((src) => ({ loc: abs(src), title: `${KIND[kind]} am ${placeLabel(p)}` })),
      });
    }
  }

  for (const c of casesData as { slug: string; title: string; location: string; images?: string[] }[]) {
    if (!c.images?.length) continue;
    entries.push({
      page: `${SITE}/de/cases/${c.slug}`,
      images: c.images.map((src) => ({ loc: abs(src), title: `${c.title}, ${c.location}` })),
    });
  }

  for (const post of blogDe as { slug: string; title: string; image?: string }[]) {
    // Only our own photos; stock images on other hosts are not ours to submit.
    if (!post.image || /^https?:\/\//.test(post.image)) continue;
    entries.push({ page: `${SITE}/de/blog/${post.slug}`, images: [{ loc: abs(post.image), title: post.title }] });
  }

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n' +
    entries
      .map(
        (e) =>
          `  <url>\n    <loc>${esc(e.page)}</loc>\n` +
          e.images.map((i) => `    <image:image>\n      <image:loc>${esc(i.loc)}</image:loc>\n      <image:title>${esc(i.title)}</image:title>\n    </image:image>\n`).join('') +
          '  </url>',
      )
      .join('\n') +
    '\n</urlset>\n';

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
