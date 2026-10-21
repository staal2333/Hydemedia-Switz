'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getSiteUrl } from '@/lib/region';
import { SECTION_NAMES } from '@/lib/breadcrumbs';

/**
 * Breadcrumbs for top-level pages. Detail pages (placements, articles, cases)
 * render their own, because only the page knows its real title.
 */
export default function BreadcrumbSchema() {
  const pathname = usePathname();
  const locale = useLocale();
  const siteUrl = getSiteUrl(locale);
  const lang = locale === 'en' ? 'en' : 'de';

  const segments = pathname.split('/').filter(Boolean).filter((s) => s !== locale);
  if (segments.length !== 1) return null;
  const name = SECTION_NAMES[segments[0]]?.[lang];
  if (!name) return null;

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: lang === 'de' ? 'Startseite' : 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name, item: `${siteUrl}/${locale}/${segments[0]}` },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />;
}
