import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import LegalDocument from '@/components/legal/LegalDocument';
import { terms } from '@/content/legal/terms';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale !== 'en';
  return generateSEOMetadata({
    title: isGerman ? 'Allgemeine Geschäftsbedingungen (AGB)' : 'Terms of sale and delivery',
    description: isGerman
      ? 'Die Allgemeinen Geschäftsbedingungen von Hyde Media für Werbeflächen auf Gerüsten und Fassaden in der Schweiz: Angebot, Preise, Bewilligungen, Haftung.'
      : 'Hyde Media terms of sale and delivery for advertising space on scaffolding and facades in Switzerland: offers, prices, permits, liability.',
    keywords: isGerman ? 'AGB, Allgemeine Geschäftsbedingungen, Hyde Media, Aussenwerbung' : 'terms of sale, terms and conditions, Hyde Media, outdoor advertising',
    path: '/terms',
    locale,
  });
}

export default function TermsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <LegalDocument doc={terms[locale === 'en' ? 'en' : 'de']} />;
}
