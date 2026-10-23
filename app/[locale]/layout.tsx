import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales } from '@/i18n';
import { getRegionConfig } from '@/lib/region';
import BlueHourHeader from '@/components/blue-hour/Header';
import BlueHourFooter from '@/components/blue-hour/Footer';
import MobileCTA from '@/components/blue-hour/MobileCTA';
import StructuredData from '@/components/StructuredData';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ConsentProvider from '@/components/consent/ConsentProvider';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

// Pages are rendered at build time and served from the CDN; an hour of ISR
// keeps date-dependent bits (placement availability, "current" campaigns) fresh.
export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale !== 'en';

  let title: string;
  let description: string;
  let keywords: string;

  if (isGerman) {
    title = 'Gerüstwerbung und Fassadenwerbung in der Schweiz';
    description = 'Hyde Media: Gerüstwerbung und Fassadenwerbung im Grossformat in Basel und der ganzen Schweiz. Strategisch platzierte Werbebanner mit maximaler Sichtbarkeit.';
    keywords = 'Aussenwerbung, Gerüstwerbung, Fassadenwerbung, Basel, Zürich, Schweiz, Grossformat Banner, Werbebanner, OOH Werbung';
  } else {
    title = 'Premium Out-of-Home Advertising in Switzerland';
    description = 'Hyde Media specializes in high-impact banner campaigns on scaffolding and facades in Basel and throughout Switzerland. Strategically placed advertising banners with maximum visibility.';
    keywords = 'outdoor advertising, banner advertising, facade advertising, scaffolding advertising, Basel, Zurich, Switzerland, large format banners, advertising banners';
  }

  return {
    ...generateSEOMetadata({ title, description, keywords, path: '', locale }),
    // Pages that set a plain string title get the brand suffix from here.
    title: { default: `${title} | Hyde Media`, template: '%s | Hyde Media' },
  };
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
  const isGerman = locale !== 'en';

  const localDesc = isGerman
    ? 'Anbieter von Grossformat-Aussenwerbung in der Schweiz. Spezialisiert auf Gerüstbanner und Fassadenbanner in Basel und der ganzen Schweiz.'
    : 'Leading provider of large-format outdoor advertising in Switzerland. Specializing in scaffolding banners, facade banners, and building wraps in Basel and across Switzerland.';

  return (
    <NextIntlClientProvider messages={messages}>
      <StructuredData type="LocalBusiness" title="Hyde Media" description={localDesc} url={`${siteUrl}/${locale}`} />
      <StructuredData type="WebSite" title="Hyde Media" description={localDesc} url={`${siteUrl}/${locale}`} />
      {/* Consent wraps everything that may load optional tracking. */}
      <ConsentProvider locale={locale}>
        <div className="flex min-h-screen flex-col">
          {/* useSearchParams needs a Suspense boundary, or the whole page renders client-side. */}
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <BreadcrumbSchema />
          <BlueHourHeader />
          <main className="flex-1">{children}</main>
          <BlueHourFooter />
          <MobileCTA />
        </div>
      </ConsentProvider>
    </NextIntlClientProvider>
  );
}
