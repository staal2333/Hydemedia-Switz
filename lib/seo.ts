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
  // The homepage is /de, not /de/ — the slash form redirects, and a canonical
  // must never point at a redirect.
  const cleanPath = !path || path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  const url = `${siteUrl}/${locale}${cleanPath}`;
  const ogImage = `${siteUrl}${image}`;

  const ogLocale = locale === 'de' ? 'de_CH' : 'en_US';
  const alternateLocales = ['en_US', 'de_CH'].filter(l => l !== ogLocale);
  // Search results cut titles at about 60 characters. The brand suffix is
  // dropped when it would push the words that describe the page out of view.
  const fullTitle = `${title} | Hyde Media`.length <= 60 ? `${title} | Hyde Media` : title;

  return {
    // Absolute so parent layout templates don't add the suffix a second time.
    title: { absolute: fullTitle },
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
      title: fullTitle,
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
      title: fullTitle,
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
