import placementsData from '@/data/placements.json';
import casesData from '@/public/data/cases.json';

/**
 * "available" — bookable now.
 * "booked"    — currently running a campaign, not bookable.
 * "past"      — retired from the portfolio. Kept as proof-of-work, never sold.
 */
export type PlacementStatus = 'available' | 'booked' | 'past';

export type PlacementKind = 'scaffolding' | 'facade' | 'digital';

/**
 * Digital-out-of-home metrics. Screens are sold on share of voice and
 * impressions rather than square metres and booked weeks, so they carry
 * their own figures alongside the shared placement fields.
 */
export interface DigitalSpec {
  dailyPassersBy: string;
  weeklyOts: string;
  impressions: string;
  shareOfVoice: string;
  maxAdvertisers: number;
  formats: string;
  onAir: string;
  visibility: string;
}

export interface Placement {
  id: string;
  name: string;
  location: string;
  address: string;
  size: string;
  dimensions: { width: number; height: number };
  duration: string;
  status: PlacementStatus;
  price: string;
  traffic: string;
  image: string;
  isNew?: boolean;
  features: string[];
  /** Slugs from cases.json for campaigns that ran on this placement. */
  caseSlugs: string[];
  /**
   * Brands that ran here but have no published case study — credited as plain
   * text so a placement's history stays complete without inventing a case.
   */
  brands?: string[];
  /** Extra photos beyond `image` — currently used by digital screens. */
  images?: string[];
  /** Muted looping clip used as the lead media where one exists. */
  video?: { src: string; poster: string };
  /** Pins the URL of the placement page; derived from `name` when absent. */
  slug?: string;
  /** The headline placement: leads the homepage reel and its section page. */
  flagship?: boolean;
  /** Set false to keep a live placement out of the homepage reel. */
  featured?: boolean;
  /** Present only on digital screens. */
  digital?: DigitalSpec;
  /**
   * English overrides. German is the source of truth; any field left out
   * falls back to it, so a partial translation never blanks the page.
   */
  en?: PlacementCopy;
}

/** Translatable text on a placement. Numbers and media are shared. */
export interface PlacementCopy {
  name?: string;
  location?: string;
  address?: string;
  price?: string;
  traffic?: string;
  duration?: string;
  features?: string[];
  digital?: Partial<Pick<DigitalSpec, 'formats' | 'onAir' | 'visibility'>>;
}

/** The two languages the site is published in. */
export type SiteLocale = 'de' | 'en';

export interface CaseStudy {
  id: number;
  slug: string;
  brand: string;
  title: string;
  location: string;
  size: string;
  duration: string;
  format: string;
  tags: string[];
  challenge: string;
  solution: string;
  results: string;
  images: string[];
  testimonial: string;
  type: string;
  /** Placement ids this campaign ran on. */
  placementIds: string[];
  /** English overrides; missing fields fall back to the German source. */
  en?: CaseCopy;
}

/** Translatable text on a case study. Brand, slug and images are shared. */
export type CaseCopy = Partial<
  Pick<
    CaseStudy,
    'title' | 'location' | 'size' | 'duration' | 'format' | 'tags' | 'challenge' | 'solution' | 'results' | 'testimonial' | 'type'
  >
>;

/**
 * A placement with its text in the requested language. Keep the unlocalised
 * record for anything numeric — traffic counts are parsed from the German
 * strings, whose format ("39'851 pro Tag") the parsers rely on.
 */
export function localizePlacement(p: Placement, locale: string): Placement {
  if (locale !== 'en' || !p.en) return p;
  const { digital: digitalCopy, ...copy } = p.en;
  return {
    ...p,
    ...Object.fromEntries(Object.entries(copy).filter(([, v]) => v !== undefined && v !== '')),
    digital: p.digital && digitalCopy ? { ...p.digital, ...digitalCopy } : p.digital,
  };
}

/** A case study with its text in the requested language. */
export function localizeCase(c: CaseStudy, locale: string): CaseStudy {
  if (locale !== 'en' || !c.en) return c;
  return {
    ...c,
    ...Object.fromEntries(Object.entries(c.en).filter(([, v]) => v !== undefined && v !== '')),
  };
}

const placements = placementsData as unknown as Record<PlacementKind, Placement[]>;
const cases = casesData as unknown as CaseStudy[];

/** Switzerland sells scaffolding and facades; digital screens are Denmark-only for now. */
export const PLACEMENT_KINDS: PlacementKind[] = ['scaffolding', 'facade'];

export function getPlacements(kind: PlacementKind): Placement[] {
  return placements[kind] ?? [];
}

export function getAllPlacements(): Placement[] {
  return PLACEMENT_KINDS.flatMap(getPlacements);
}

/** Placements still in the portfolio — bookable or currently running. */
export function isCurrent(p: Placement): boolean {
  return p.status !== 'past';
}

export function getCurrentPlacements(kind: PlacementKind): Placement[] {
  return getPlacements(kind).filter(isCurrent);
}

/** Retired placements, kept as proof-of-work. */
export function getPastPlacements(kind: PlacementKind): Placement[] {
  return getPlacements(kind).filter((p) => p.status === 'past');
}

export function getPlacementById(id: string): Placement | undefined {
  return getAllPlacements().find((p) => p.id === id);
}

const TRANSLIT: Record<string, string> = { æ: 'ae', ø: 'oe', å: 'aa', é: 'e', ä: 'ae', ö: 'oe', ü: 'ue' };

/**
 * URL slug for a placement's own page: "Riehenring 141" → "riehenring-141",
 * "Zürichstrasse 5" → "zuerichstrasse-5". Set `slug` in
 * placements.json to pin a URL if a name ever changes.
 */
export function placementSlug(p: Pick<Placement, 'name' | 'slug'>): string {
  if (p.slug) return p.slug;
  return p.name
    .toLowerCase()
    .replace(/[æøåéäöü]/g, (ch) => TRANSLIT[ch] ?? ch)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getPlacementBySlug(slug: string): { placement: Placement; kind: PlacementKind } | undefined {
  for (const kind of PLACEMENT_KINDS) {
    const placement = getPlacements(kind).find((p) => placementSlug(p) === slug);
    if (placement) return { placement, kind };
  }
  return undefined;
}

/** Path of a placement's own page, without the locale prefix. */
export function placementPath(p: Pick<Placement, 'name' | 'slug'>): string {
  return `/standorte/${placementSlug(p)}`;
}

/**
 * "Riehenring 141, Basel" rather than "Riehenring 141, Riehenring,
 * Basel": drops the street from the location when the name has it.
 */
export function placeLabel(p: Pick<Placement, 'name' | 'location'>): string {
  const [first, ...rest] = p.location.split(',').map((s) => s.trim());
  return rest.length && p.name.includes(first) ? `${p.name}, ${rest.join(', ')}` : `${p.name}, ${p.location}`;
}

export function getKindForPlacement(id: string): PlacementKind | undefined {
  return PLACEMENT_KINDS.find((k) => getPlacements(k).some((p) => p.id === id));
}

/** Case studies that ran on a given placement, in cases.json order. */
export function getCasesForPlacement(p: Placement): CaseStudy[] {
  return p.caseSlugs
    .map((slug) => cases.find((c) => c.slug === slug))
    .filter((c): c is CaseStudy => Boolean(c));
}

/** Placements a given case ran on. */
export function getPlacementsForCase(c: Pick<CaseStudy, 'placementIds'>): Placement[] {
  return (c.placementIds ?? [])
    .map(getPlacementById)
    .filter((p): p is Placement => Boolean(p));
}
