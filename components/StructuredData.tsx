'use client';

import { useLocale } from 'next-intl';
import { getRegionConfig } from '@/lib/region';

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Service' | 'Article' | 'LocalBusiness';
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
}

export default function StructuredData(props: StructuredDataProps) {
  const locale = useLocale();
  const config = getRegionConfig(locale);
  const isSwiss = config.region === 'ch';
  const siteUrl = config.siteUrl;
  
  if (props.type === 'LocalBusiness') {
    const localBusiness = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#organization`,
      "name": "Hyde Media",
      "alternateName": "HydeMedia",
      "legalName": "Hyde Media",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "image": props.image || `${siteUrl}/og-image.jpg`,
      "description": props.description,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": isSwiss ? "Basel" : "København",
        "addressCountry": config.countryCode
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": isSwiss ? 47.5596 : 55.6761,
        "longitude": isSwiss ? 7.5886 : 12.5683
      },
      "telephone": config.phone,
      "email": config.email,
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "17:00"
        }
      ],
      "sameAs": [
        "https://www.instagram.com/hyde.med"
      ],
      "areaServed": {
        "@type": "Country",
        "name": isSwiss ? "Switzerland" : "Denmark"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": locale === 'da' ? "Udendørs Reklame Tjenester" : locale === 'de' ? "Aussenwerbung Dienstleistungen" : "Outdoor Advertising Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": locale === 'da' ? "Stilladsebannere" : locale === 'de' ? "Gerüstbanner" : "Scaffolding Banners",
              "description": locale === 'da'
                ? "Fleksible, kortvarige annonceringsløsninger på stilladser"
                : locale === 'de'
                ? "Flexible, kurzfristige Werbelösungen auf Gerüsten"
                : "Flexible, short-term advertising solutions on scaffolding"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": locale === 'da' ? "Facadebannere" : locale === 'de' ? "Fassadenbanner" : "Facade Banners",
              "description": locale === 'da'
                ? "Langvarig annoncering med maksimal effekt på bygninger"
                : locale === 'de'
                ? "Langfristige Werbung mit maximaler Wirkung auf Gebäudefassaden"
                : "Long-term, maximum-impact advertising on buildings"
            }
          }
        ]
      }
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
    );
  }

  const baseData = {
    '@context': 'https://schema.org',
    '@type': props.type,
    name: props.title,
    description: props.description,
    url: props.url,
    ...(props.image && { image: props.image }),
  };

  let structuredData: any = baseData;

  if (props.type === 'Organization') {
    structuredData = {
      ...baseData,
      '@type': 'Organization',
      name: 'Hyde Media',
      legalName: 'Hyde Media',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        email: config.email,
        telephone: config.phone,
      },
      sameAs: [
        'https://www.instagram.com/hyde.med',
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: config.countryCode,
      },
    };
  }

  if (props.type === 'WebSite') {
    structuredData = {
      ...baseData,
      '@type': 'WebSite',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/{search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };
  }

  if (props.type === 'Service') {
    structuredData = {
      ...baseData,
      '@type': 'Service',
      serviceType: 'Outdoor Advertising',
      areaServed: {
        '@type': 'Country',
        name: isSwiss ? 'Switzerland' : 'Denmark',
      },
      provider: {
        '@type': 'Organization',
        name: 'Hyde Media',
      },
    };
  }

  if (props.type === 'Article') {
    structuredData = {
      ...baseData,
      '@type': 'Article',
      headline: props.title,
      ...(props.datePublished && { datePublished: props.datePublished }),
      ...(props.dateModified && { dateModified: props.dateModified }),
      ...(props.author && {
        author: {
          '@type': 'Person',
          name: props.author,
        },
      }),
      publisher: {
        '@type': 'Organization',
        name: 'Hyde Media',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`,
        },
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
