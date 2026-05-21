import { Metadata } from 'next';
import { getRegionConfig } from '@/lib/region';

type SEOProps = {
  title: string;
  description: string;
  keywords?: string;
  path: string;
  locale: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
};

export function generateMetadata({
  title,
  description,
  keywords,
  path,
  locale,
  image = '/og-image.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
}: SEOProps): Metadata {
  const config = getRegionConfig(locale);
  const siteUrl = config.siteUrl;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${siteUrl}/${locale}${cleanPath}`;
  const ogImage = `${siteUrl}${image}`;

  const ogLocale = locale === 'de' ? 'de_CH' : 'en_US';
  const alternateLocales = ['en_US', 'de_CH'].filter(l => l !== ogLocale);

  return {
    title: `${title} | Hyde Media`,
    description,
    keywords: keywords || 'outdoor advertising, banner advertising, facade advertising, scaffolding advertising',
    alternates: {
      canonical: url,
      languages: {
        'de-CH': `https://www.hydemedia.ch/de${cleanPath}`,
        'en-US': `https://www.hydemedia.ch/en${cleanPath}`,
        'x-default': `https://www.hydemedia.ch/de${cleanPath}`,
      },
    },
    openGraph: {
      title: `${title} | Hyde Media`,
      description,
      url,
      siteName: 'Hyde Media',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 600,
          alt: title,
        },
      ],
      locale: ogLocale,
      alternateLocale: alternateLocales,
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Hyde Media`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStructuredData({
  type,
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
  locale = 'de',
}: {
  type: 'Organization' | 'WebSite' | 'Service' | 'Article';
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  locale?: string;
}) {
  const regionConfig = getRegionConfig(locale);
  const siteUrl = regionConfig.siteUrl;
  const isSwiss = regionConfig.region === 'ch';

  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url,
    ...(image && { image }),
  };

  if (type === 'Organization') {
    return {
      ...baseData,
      '@type': 'Organization',
      name: 'Hyde Media',
      legalName: 'Hyde Media',
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      telephone: regionConfig.phone,
      email: regionConfig.email,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        telephone: regionConfig.phone,
        email: regionConfig.email,
        areaServed: regionConfig.countryCode,
        availableLanguage: isSwiss ? ['German', 'English'] : ['Danish', 'English'],
      },
      sameAs: [
        'https://www.instagram.com/hyde.med',
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: regionConfig.countryCode,
        addressLocality: isSwiss ? 'Basel' : 'København',
      },
    };
  }

  if (type === 'WebSite') {
    return {
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

  if (type === 'Service') {
    return {
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

  if (type === 'Article') {
    return {
      ...baseData,
      '@type': 'Article',
      headline: title,
      ...(datePublished && { datePublished }),
      ...(dateModified && { dateModified }),
      ...(author && {
        author: {
          '@type': 'Person',
          name: author,
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

  return baseData;
}
