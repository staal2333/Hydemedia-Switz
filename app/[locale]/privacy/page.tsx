import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import LegalDocument from '@/components/legal/LegalDocument';
import { privacy } from '@/content/legal/privacy';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale !== 'en';
  return generateSEOMetadata({
    title: isGerman ? 'Datenschutzerklärung' : 'Privacy policy for hydemedia.ch',
    description: isGerman
      ? 'Wie Hyde Media Personendaten bearbeitet: Zwecke, Empfänger, Aufbewahrung und Ihre Rechte nach dem Schweizer Datenschutzgesetz (DSG) und der DSGVO.'
      : 'How Hyde Media processes personal data: purposes, recipients, retention and your rights under the Swiss FADP and the GDPR.',
    keywords: isGerman ? 'Datenschutzerklärung, DSG, DSGVO, Personendaten, Hyde Media' : 'privacy policy, FADP, GDPR, personal data, Hyde Media',
    path: '/privacy',
    locale,
  });
}

export default function PrivacyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <LegalDocument doc={privacy[locale === 'en' ? 'en' : 'de']} />;
}
