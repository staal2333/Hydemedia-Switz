import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import ServiceGuide from '@/components/ServiceGuide';
import FacadePageClient from './FacadePageClient';
import StructuredData from '@/components/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';


export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale !== 'en';
  return generateSEOMetadata({
    title: isGerman ? 'Fassadenwerbung: Fassadenbanner in der Schweiz' : 'Facade Advertising in Switzerland',
    description: isGerman
      ? 'Fassadenwerbung im Grossformat in Basel, Zürich und der Schweiz. Fassadenbanner für Marken, mit Druck, Montage und Bewilligungsabklärung aus einer Hand.'
      : 'Large-format facade advertising in Basel, Zurich and Switzerland. Facade banners for brands, with print, installation and permits handled for you.',
    keywords: isGerman
      ? 'Fassadenwerbung, Fassadenbanner, Gebäudewerbung, Hauswand Werbung, Grossformat Werbung, Aussenwerbung Schweiz, Fassadenwerbung Basel'
      : 'facade advertising, facade banners, building wrap, large format outdoor advertising, Switzerland',
    path: '/facade',
    locale,
  });
}

export default function FacadePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const isGerman = locale !== 'en';
  const sdTitle = isGerman ? 'Fassadenwerbung - Hyde Media' : 'Facade Advertising - Hyde Media';
  const sdDesc = isGerman
    ? 'Fassadenbanner im Grossformat in der Schweiz. Kontakt: theodor.staal@hydemedia.ch, +41 77 233 81 21'
    : 'Large-format facade banners in Switzerland. Contact: theodor.staal@hydemedia.ch, +41 77 233 81 21';

  return (
    <>
      <StructuredData type="Service" title={sdTitle} description={sdDesc} url={`/${locale}/facade`} />
      <FacadePageClient>
        <ServiceGuide kind="facade" locale={locale} />
      </FacadePageClient>
    </>
  );
}
