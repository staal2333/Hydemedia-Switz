import { PLACEMENT_KINDS, getCurrentPlacements, placementPath } from '@/lib/placements';

/**
 * Turns the first mention of a key term in an article into a link to the page
 * that sells it. The articles are the site's most-linked-to content and the
 * service pages its least, so this carries authority to where it is needed
 * and tells search engines which page a term belongs to.
 *
 * Only plain body text is touched: headings, existing links and anything the
 * article already links to are left alone, and each target is linked once.
 */
type Rule = { pattern: RegExp; path: string };

function rulesFor(locale: 'de' | 'en'): Rule[] {
  const services: Rule[] =
    locale === 'de'
      ? [
          // The city page before the general one, so "Gerüstwerbung in Basel" lands there.
          { pattern: /\b(Gerüstwerbung in Basel)/i, path: '/de/geruestwerbung-basel' },
          // Inflected and compound forms too: "Gerüstwerbungen", "Gerüstbannern".
          { pattern: /\b(Gerüstwerbung[a-z]*|Gerüstbanner[a-z]*)/i, path: '/de/scaffolding' },
          { pattern: /\b(Fassadenwerbung[a-z]*|Fassadenbanner[a-z]*)/i, path: '/de/facade' },
          { pattern: /\b(Aussenwerbung[a-z]*|Out-of-Home-Werbung)/i, path: '/de/services' },
        ]
      : [
          { pattern: /\b(scaffolding advertising in Basel)\b/i, path: '/en/geruestwerbung-basel' },
          { pattern: /\b(scaffolding (?:advertising|banners?))\b/i, path: '/en/scaffolding' },
          { pattern: /\b(facade (?:advertising|banners?))\b/i, path: '/en/facade' },
          { pattern: /\b(outdoor advertising)\b/i, path: '/en/services' },
        ];
  // Live placements by name, e.g. "Riehenring 141".
  const placements: Rule[] = PLACEMENT_KINDS.flatMap((k) => getCurrentPlacements(k))
    .filter((p) => p.name.length > 6)
    .map((p) => ({
      // Not followed by another digit, so "Riehenring 70" never matches inside "Riehenring 701".
      pattern: new RegExp(`(${p.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?!\\d)`),
      path: `/${locale}${placementPath(p)}`,
    }));
  // Service pages first: they are the ones that need the authority most.
  return [...services, ...placements];
}

const MAX_LINKS = 5;

export function autolink(markdown: string, locale: string, selfPath?: string): string {
  const lang = locale === 'en' ? 'en' : 'de';
  const lines = markdown.split('\n');
  const used = new Set<string>(selfPath ? [selfPath] : []);
  // Targets the author already linked to are not linked again.
  for (const m of markdown.matchAll(/\]\((\/[^)\s]+)\)/g)) used.add(m[1].replace(/\/$/, ''));
  let added = 0;

  for (const rule of rulesFor(lang)) {
    if (added >= MAX_LINKS || used.has(rule.path)) continue;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (/^\s*(#|>|\|)/.test(line)) continue; // headings, quotes, tables
      // Split around existing links so their text is never re-linked.
      const parts = line.split(/(\[[^\]]*\]\([^)]*\))/g);
      let done = false;
      for (let j = 0; j < parts.length && !done; j += 2) {
        const m = rule.pattern.exec(parts[j]);
        if (!m) continue;
        const at = m.index + (m[0].length - m[1].length);
        parts[j] = `${parts[j].slice(0, at)}[${m[1]}](${rule.path})${parts[j].slice(at + m[1].length)}`;
        done = true;
      }
      if (done) {
        lines[i] = parts.join('');
        used.add(rule.path);
        added++;
        break;
      }
    }
  }
  return lines.join('\n');
}
