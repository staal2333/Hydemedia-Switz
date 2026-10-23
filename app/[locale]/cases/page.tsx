import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import CasesPageClient from './CasesPageClient';
import StructuredData from '@/components/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale !== 'en';

  let title: string, description: string, keywords: string;
  if (isGerman) {
    title = 'Referenzen & Marken | Unsere Kampagnen';
    description = 'Entdecken Sie unsere neuesten Kampagnen und Kunden. Sehen Sie, wie wir wirkungsvolle Bannerkampagnen mit maximaler Sichtbarkeit umsetzen.';
    keywords = 'Bannerkampagnen Referenzen, Werbekampagnen Schweiz, Kundenreferenzen, Aussenwerbung Beispiele, erfolgreiche Kampagnen';
  } else {
    title = 'Cases & Brands | Our Latest Campaigns';
    description = 'See our latest campaigns and clients. See how we create high-impact banner campaigns with maximum visibility.';
    keywords = 'banner campaign cases, advertising campaigns, client cases, outdoor advertising examples, successful campaigns';
  }

  return generateSEOMetadata({ title, description, keywords, path: '/cases', locale });
}

export default async function CasesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const isGerman = locale !== 'en';

  const sdTitle = isGerman ? 'Referenzen & Marken' : 'Cases & Brands';
  const sdDesc = isGerman
    ? 'Entdecken Sie unsere neuesten Kampagnen und Kunden'
    : 'See our latest campaigns and clients';

  return (
    <>
      <StructuredData
        type="Service"
        title={sdTitle}
        description={sdDesc}
        url={`/${locale}/cases`}
      />
      <CasesPageClient />
    </>
  );
}
