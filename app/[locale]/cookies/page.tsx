import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import LegalDocument from '@/components/legal/LegalDocument';
import { cookies } from '@/content/legal/cookies';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale !== 'en';
  return generateSEOMetadata({
    title: isGerman ? 'Cookie-Richtlinie' : 'Cookie policy for hydemedia.ch',
    description: isGerman
      ? 'Welche Cookies und lokalen Speicher hydemedia.ch verwendet, wofür, wie lange, und wie Sie Ihre Einwilligung ändern oder widerrufen.'
      : 'Which cookies and local storage hydemedia.ch uses, why, for how long, and how to change or withdraw your consent.',
    keywords: isGerman ? 'Cookie-Richtlinie, Cookies, Einwilligung, Hyde Media' : 'cookie policy, cookies, consent, Hyde Media',
    path: '/cookies',
    locale,
  });
}

export default function CookiesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <LegalDocument doc={cookies[locale === 'en' ? 'en' : 'de']} />;
}
