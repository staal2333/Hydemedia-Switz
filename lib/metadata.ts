import { Metadata } from 'next';

export const siteConfig = {
  name: 'Hyde Media',
  title: 'Hyde Media | Premium Out-of-Home Advertising',
  description: 'High-impact OOH advertising placements. Transparent pricing, fair partnerships, professional service.',
  keywords: [
    'OOH advertising',
    'building wraps',
    'outdoor advertising',
    'banner advertising',
    'out-of-home media',
    'facade advertising',
    'scaffolding advertising',
  ],
  url: 'https://www.hydemedia.ch',
  ogImage: 'https://www.hydemedia.ch/og-image.jpg',
  twitterHandle: '@HydeMedia',
};

export function createMetadata(
  title?: string,
  description?: string,
  ogImage?: string
): Metadata {
  return {
    title: title ? `${title} | Hyde Media` : siteConfig.title,
    description: description || siteConfig.description,
    keywords: siteConfig.keywords,
    openGraph: {
      title: title || siteConfig.title,
      description: description || siteConfig.description,
      images: [ogImage || siteConfig.ogImage],
      type: 'website',
      url: siteConfig.url,
    },
    twitter: {
      card: 'summary_large_image',
      creator: siteConfig.twitterHandle,
    },
  };
}
