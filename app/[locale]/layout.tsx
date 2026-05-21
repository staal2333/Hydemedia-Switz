import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales } from '@/i18n';
import { getRegionConfig } from '@/lib/region';
import BlueHourHeader from '@/components/blue-hour/Header';
import BlueHourFooter from '@/components/blue-hour/Footer';
import StructuredData from '@/components/StructuredData';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isDanish = locale === 'da';
  const isGerman = locale === 'de';

  let title: string;
  let description: string;
  let keywords: string;

  if (isGerman) {
    title = 'Premium Aussenwerbung in der Schweiz';
    description = 'Hyde Media spezialisiert sich auf wirkungsvolle Bannerkampagnen auf Gerüsten und Fassaden in Basel und der ganzen Schweiz. Strategisch platzierte Werbebanner mit maximaler Sichtbarkeit.';
    keywords = 'Aussenwerbung, Gerüstwerbung, Fassadenwerbung, Basel, Zürich, Schweiz, Grossformat Banner, Werbebanner, OOH Werbung';
  } else if (isDanish) {
    title = 'Premium Out-of-Home Reklame i Danmark';
    description = 'Hyde Media specialiserer sig i high-impact bannerkampagner på stilladser og facader i København, Aarhus og hele Danmark. Strategisk placerede reklamebannere med maksimal synlighed.';
    keywords = 'outdoor reklame, bannerreklame, facadereklame, stilladsreklame, København, Aarhus, Danmark, storformat bannere, reklamebannere';
  } else {
    title = 'Premium Out-of-Home Advertising in Denmark';
    description = 'Hyde Media specializes in high-impact banner campaigns on scaffolding and facades in Copenhagen, Aarhus and throughout Denmark. Strategically placed advertising banners with maximum visibility.';
    keywords = 'outdoor advertising, banner advertising, facade advertising, scaffolding advertising, Copenhagen, Aarhus, Denmark, large format banners, advertising banners';
  }

  return generateSEOMetadata({
    title,
    description,
    keywords,
    path: '',
    locale,
  });
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const regionConfig = getRegionConfig(locale);
  const siteUrl = regionConfig.siteUrl;
  const isDanish = locale === 'da';
  const isGerman = locale === 'de';

  const localDesc = isGerman
    ? 'Führender Anbieter von Grossformat-Aussenwerbung in der Schweiz. Spezialisiert auf Gerüstbanner, Fassadenbanner und Gebäudeverkleidungen in Basel und der ganzen Schweiz.'
    : isDanish
      ? 'Førende leverandør af storformat udendørs reklame i Danmark. Specialiseret i stilladsebannere, facadebannere og bygningswraps i København, Aarhus og hele Danmark.'
      : 'Leading provider of large-format outdoor advertising. Specializing in scaffolding banners, facade banners, and building wraps.';

  return (
    <NextIntlClientProvider messages={messages}>
      <StructuredData type="LocalBusiness" title="Hyde Media" description={localDesc} url={`${siteUrl}/${locale}`} />
      <StructuredData type="Organization" title="Hyde Media" description={localDesc} url={`${siteUrl}/${locale}`} />
      <StructuredData type="WebSite" title="Hyde Media" description={localDesc} url={`${siteUrl}/${locale}`} />
      <div className="flex min-h-screen flex-col">
        <GoogleAnalytics />
        <BreadcrumbSchema />
        <BlueHourHeader />
        <main className="flex-1">{children}</main>
        <BlueHourFooter />
      </div>
    </NextIntlClientProvider>
  );
}
