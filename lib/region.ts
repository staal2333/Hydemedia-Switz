export type Region = 'dk' | 'ch';

export function getRegion(_locale?: string): Region {
  return 'ch';
}

export function getSiteUrl(_locale?: string): string {
  return 'https://www.hydemedia.ch';
}

export function getRegionConfig(_locale?: string) {
  return {
    region: 'ch' as const,
    siteUrl: 'https://www.hydemedia.ch',
    companyName: 'Hyde Media',
    currency: 'CHF',
    phone: '+41 77 233 81 21',
    email: 'theodor.staal@hydemedia.ch',
    address: 'Hauptstrasse 30, 4127 Birsfelden',
    country: 'Schweiz',
    countryCode: 'CH',
    geoRegion: 'CH-BS',
    geoPlacename: 'Basel',
    defaultLocale: 'de',
    locales: ['de', 'en'],
  };
}
