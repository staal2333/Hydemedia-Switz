'use client';

import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getSiteUrl } from '@/lib/region';

export default function BreadcrumbSchema() {
  const pathname = usePathname();
  const locale = useLocale();
  const siteUrl = getSiteUrl(locale);

  if (pathname === `/${locale}` || pathname === '/') {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean).filter(s => s !== locale);
  
  const homeName = locale === 'da' ? 'Hjem' : locale === 'de' ? 'Startseite' : 'Home';

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeName,
        item: `${siteUrl}/${locale}`
      },
      ...segments.map((segment, index) => {
        const name = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        
        const url = `${siteUrl}/${locale}/${segments.slice(0, index + 1).join('/')}`;
        
        return {
          '@type': 'ListItem',
          position: index + 2,
          name,
          item: url
        };
      })
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}
