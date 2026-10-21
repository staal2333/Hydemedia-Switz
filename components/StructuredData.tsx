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
  const siteUrl = config.siteUrl;
  
  if (props.type === 'LocalBusiness') {
    const localBusiness = {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      "name": "Hyde Media",
      "alternateName": "HydeMedia",
      "url": siteUrl,
      "logo": `${siteUrl}/logo.png`,
      "image": props.image || `${siteUrl}/og-image.jpg`,
      "description": props.description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": config.streetAddress,
        "postalCode": config.postalCode,
        "addressLocality": config.addressLocality,
        "addressRegion": config.addressRegion,
        "addressCountry": config.countryCode
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": config.geoLatitude,
        "longitude": config.geoLongitude
      },
      "telephone": config.phone,
      "email": config.email,
      "priceRange": "$$",
      "currenciesAccepted": config.currency,
      "paymentAccepted": "Invoice, Bank Transfer",
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
      "areaServed": [
        { "@type": "Country", "name": "Switzerland" },
        ...(config.areasServed || []).map((city: string) => ({
          "@type": "City",
          "name": city
        }))
      ],
      "knowsAbout": locale === 'en'
        ? ["Outdoor advertising", "Out-of-home (OOH)", "Scaffolding advertising", "Facade advertising", "Large-format banners", "Advertising permits in Switzerland"]
        : ["Aussenwerbung", "Out-of-Home (OOH)", "Gerüstwerbung", "Fassadenwerbung", "Grossformat-Werbebanner", "Reklamebewilligungen in der Schweiz"],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": locale === 'en' ? "Outdoor advertising" : "Aussenwerbung",
        "itemListElement": (locale === 'en'
          ? [
              ["Scaffolding advertising", "Large-format banners on scaffolding around buildings under renovation, from 4 weeks", "/scaffolding"],
              ["Facade advertising", "Long-term banners on facades and fire walls", "/facade"],
            ]
          : [
              ["Gerüstwerbung", "Grossformat-Banner an Gerüsten von Gebäuden in Sanierung, ab 4 Wochen", "/scaffolding"],
              ["Fassadenwerbung", "Langfristige Banner an Fassaden und Brandmauern", "/facade"],
            ]
        ).map(([name, description, path]) => ({
          "@type": "Offer",
          "itemOffered": { "@type": "Service", name, description, "url": `${siteUrl}/${locale}${path}` },
        })),
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
        streetAddress: config.streetAddress,
        postalCode: config.postalCode,
        addressLocality: config.addressLocality,
        addressCountry: config.countryCode,
      },
    };
  }

  if (props.type === 'WebSite') {
    structuredData = {
      ...baseData,
      '@type': 'WebSite',
      inLanguage: locale === 'en' ? 'en' : 'de-CH',
    };
  }

  if (props.type === 'Service') {
    structuredData = {
      ...baseData,
      '@type': 'Service',
      serviceType: 'Outdoor Advertising',
      areaServed: {
        '@type': 'Country',
        name: 'Switzerland',
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
