import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import MegaposterClient from './MegaposterClient';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale !== 'en';
  return generateSEOMetadata({
    title: isGerman ? 'Megaposter in Basel: Werbeblachen am Gerüst' : 'Megaposters in Basel: Scaffolding Banners',
    description: isGerman
      ? 'Megaposter und Werbeblachen im Grossformat am Gerüst in Basel: Grössen, Vergleich mit Plakatformaten, Bewilligung und Preise. Druck und Montage inklusive.'
      : 'Large-format megaposters and advertising tarps on scaffolding in Basel: sizes, comparison with poster formats, permits and prices. Print and installation included.',
    keywords: isGerman
      ? 'Megaposter, Megaposter Basel, Werbeblache, Werbeblachen, Blachenwerbung, Gerüstbanner, Baugerüst Werbung, Grossflächenwerbung Basel'
      : 'megaposter, megaposter Basel, advertising tarp, scaffolding banner, large format advertising Basel',
    path: '/megaposter',
    locale,
    image: '/images/cases/grand-casino-basel-1.jpg',
  });
}

export default function MegaposterPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <MegaposterClient />;
}
