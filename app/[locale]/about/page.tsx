import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import AboutPageClient from './AboutPageClient';
import StructuredData from '@/components/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { locales } from '@/i18n';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale === 'de';
  const isDanish = locale === 'da';

  let title: string, description: string, keywords: string;

  if (isGerman) {
    title = 'Über uns | Wirkungsvolle Bannerkampagnen seit 2025';
    description = 'Wir spezialisieren uns auf strategisch platzierte Werbebanner. Unsere Lösungen gewährleisten maximale Sichtbarkeit für Marken in der Schweiz.';
    keywords = 'über hydemedia, Aussenwerbung Schweiz, Grossformat Banner, Werbebanner Basel, OOH Werbung Schweiz';
  } else if (isDanish) {
    title = 'Om os | High-Impact Bannerkampagner siden 2025';
    description = 'Vi er stolte af at drive vores virksomhed under 2W ApS, hvor vi specialiserer os i strategisk placerede reklamebannere. Vores løsninger sikrer maksimal synlighed for brands i hele Danmark.';
    keywords = 'om hydemedia, 2W ApS, bannerreklame Danmark, outdoor reklame, storformat bannere, reklamebannere København';
  } else {
    title = 'About us | High-Impact Banner Campaigns since 2025';
    description = 'We specialize in strategically placed advertising banners. Our solutions ensure maximum visibility for brands.';
    keywords = 'about hydemedia, 2W ApS, banner advertising, outdoor advertising, large format banners';
  }

  return generateSEOMetadata({
    title,
    description,
    keywords,
    path: '/about',
    locale,
  });
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Enable static rendering
  setRequestLocale(locale);
  
  const isGerman = locale === 'de';
  const isDanish = locale === 'da';

  const orgDesc = isGerman
    ? 'Hyde Media spezialisiert sich auf wirkungsvolle Bannerkampagnen auf Gerüsten und Fassaden in der Schweiz.'
    : isDanish
    ? 'Hyde Media specialiserer sig i high-impact bannerkampagner på stilladser og facader i Danmark.'
    : 'Hyde Media specializes in high-impact banner campaigns on scaffolding and facades.';

  return (
    <>
      <StructuredData
        type="Organization"
        title="Hyde Media"
        description={orgDesc}
        url={`/${locale}/about`}
      />
      <AboutPageClient locale={locale} />
    </>
  );
}
