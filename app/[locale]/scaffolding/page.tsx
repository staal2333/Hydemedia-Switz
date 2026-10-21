import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import ServiceGuide from '@/components/ServiceGuide';
import ScaffoldingPageClient from './ScaffoldingPageClient';
import StructuredData from '@/components/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

// The commercial pillar for "Gerüstwerbung", so title and description are
// written per locale and match what buyers search for.
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale !== 'en';
  return generateSEOMetadata({
    title: isGerman ? 'Gerüstwerbung in Basel: Gerüstbanner im Grossformat' : 'Scaffolding Advertising in Basel and Switzerland',
    description: isGerman
      ? 'Gerüstwerbung im Grossformat an verkehrsreichen Kreuzungen in Basel. Standorte mit Grösse und Verkehrszahlen. Wir übernehmen Bewilligung, Druck und Montage.'
      : 'Large-format scaffolding banners at busy junctions in Basel. See sites with size and traffic figures. We handle the permit, print and installation.',
    keywords: isGerman
      ? 'Gerüstwerbung, Gerüstbanner, Gerüstwerbung Basel, Baugerüst Werbung, Grossformat Werbung, Aussenwerbung Basel, Werbebanner Gerüst'
      : 'scaffolding advertising, scaffold banners, scaffolding advertising Basel, large format outdoor advertising, Switzerland',
    path: '/scaffolding',
    locale,
    image: '/images/cases/grand-casino-basel-1.jpg',
  });
}

export default function ScaffoldingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const isGerman = locale !== 'en';
  const sdTitle = isGerman ? 'Gerüstwerbung - Hyde Media' : 'Scaffolding Advertising - Hyde Media';
  const sdDesc = isGerman
    ? 'Gerüstbanner im Grossformat in Basel und der Schweiz. Kontakt: theodor.staal@hydemedia.ch, +41 77 233 81 21'
    : 'Large-format scaffolding banners in Basel and Switzerland. Contact: theodor.staal@hydemedia.ch, +41 77 233 81 21';

  return (
    <>
      <StructuredData type="Service" title={sdTitle} description={sdDesc} url={`/${locale}/scaffolding`} />
      <ScaffoldingPageClient>
        <ServiceGuide kind="scaffolding" locale={locale} />
      </ScaffoldingPageClient>
    </>
  );
}
