/**
 * Names for top-level sections. Google shows breadcrumbs in search results,
 * so the names must read like page names, in the page's language, not like
 * URL slugs ("Scaffolding" on a German page, "Geruestwerbung Basel").
 */
export const SECTION_NAMES: Record<string, { de: string; en: string }> = {
  about: { de: 'Über uns', en: 'About' },
  services: { de: 'Aussenwerbung', en: 'Outdoor advertising' },
  brands: { de: 'Für Marken', en: 'For brands' },
  scaffolding: { de: 'Gerüstwerbung', en: 'Scaffolding advertising' },
  facade: { de: 'Fassadenwerbung', en: 'Facade advertising' },
  pricing: { de: 'Preise', en: 'Pricing' },
  cases: { de: 'Referenzen', en: 'References' },
  blog: { de: 'Wissen', en: 'Insights' },
  faq: { de: 'FAQ', en: 'FAQ' },
  'property-owners': { de: 'Für Liegenschaftseigentümer', en: 'For property owners' },
  partners: { de: 'Partner', en: 'Partners' },
  contact: { de: 'Kontakt', en: 'Contact' },
  privacy: { de: 'Datenschutz', en: 'Privacy policy' },
  terms: { de: 'AGB', en: 'Terms' },
  cookies: { de: 'Cookie-Richtlinie', en: 'Cookie policy' },
  standorte: { de: 'Standorte', en: 'Locations' },
  'geruestwerbung-basel': { de: 'Gerüstwerbung in Basel', en: 'Scaffolding advertising in Basel' },
  megaposter: { de: 'Megaposter', en: 'Megaposter' },
  kampagnenrechner: { de: 'Kampagnenrechner', en: 'Campaign calculator' },
  glossar: { de: 'OOH-Glossar', en: 'OOH glossary' },
  'ooh-im-medienmix': { de: 'OOH im Medienmix', en: 'OOH in the media mix' },
  presse: { de: 'Presse', en: 'Press' },
};

/** Breadcrumb JSON-LD for a detail page under a section, e.g. an article under Wissen. */
export function detailBreadcrumb(
  siteUrl: string,
  locale: string,
  section: keyof typeof SECTION_NAMES,
  title: string,
  path: string,
) {
  const lang = locale === 'en' ? 'en' : 'de';
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'de' ? 'Startseite' : 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: SECTION_NAMES[section][lang], item: `${siteUrl}/${locale}/${section}` },
      { '@type': 'ListItem', position: 3, name: title, item: `${siteUrl}/${locale}${path}` },
    ],
  };
}
