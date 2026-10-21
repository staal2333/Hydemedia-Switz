import casesData from '@/public/data/cases.json';
import { getCurrentPlacements, type Placement } from '@/lib/placements';

/**
 * Facts for the city landing pages, derived from the placement and case data
 * so the pages cannot drift from the portfolio. Hand-written city copy goes
 * stale the moment a site is booked or retired.
 */
const CITY_PATTERN = {
  basel: /basel/i,
  zuerich: /zürich|zuerich|zurich/i,
} as const;

export type City = keyof typeof CITY_PATTERN;

export function livePlacements(city: City, kind: 'scaffolding' | 'facade'): Placement[] {
  return getCurrentPlacements(kind).filter((p) => CITY_PATTERN[city].test(p.location));
}

/** "Riehenring 141 und Riehenring 70" */
export function nameList(placements: Placement[], and = 'und'): string {
  const names = placements.map((p) => p.name);
  if (names.length <= 1) return names.join('');
  return `${names.slice(0, -1).join(', ')} ${and} ${names[names.length - 1]}`;
}

/** "125–175 m²", or null with no live sites. */
export function sizeRange(placements: Placement[]): string | null {
  const sizes = placements.map((p) => p.dimensions.width).filter((w) => w > 0);
  if (sizes.length === 0) return null;
  const min = Math.min(...sizes);
  const max = Math.max(...sizes);
  return min === max ? `${min} m²` : `${min}–${max} m²`;
}

/** Daily contacts of the busiest site, as "40k", from figures like "39'851 pro Tag". */
export function dailyReach(placements: Placement[]): string | null {
  const counts = placements.map((p) => {
    const n = Number(p.traffic.split(' ')[0].replace(/['’.,]/g, '')) || 0;
    return /wöch|week/i.test(p.traffic) ? n / 7 : n;
  });
  const top = Math.max(0, ...counts);
  return top > 0 ? `${Math.round(top / 1000)}k` : null;
}

export function caseBrands(city: City, and = 'und'): string {
  const brands = (casesData as { location: string; brand: string }[])
    .filter((c) => CITY_PATTERN[city].test(c.location))
    .map((c) => c.brand);
  if (brands.length <= 1) return brands.join('');
  return `${brands.slice(0, -1).join(', ')} ${and} ${brands[brands.length - 1]}`;
}

export const CITY_RE = CITY_PATTERN;
