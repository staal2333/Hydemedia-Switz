import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FAQPageClient from './FAQPageClient';
import StructuredData from '@/components/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isGerman = locale === 'de';
  const isDanish = locale === 'da';

  let title: string, description: string, keywords: string;
  if (isGerman) {
    title = 'Häufig gestellte Fragen | FAQ zur Aussenwerbung';
    description = 'Antworten auf die häufigsten Fragen zu Aussenwerbung, Bannerwerbung, Standorten, Preisen und Kampagnenplanung. Alles, was Sie über unsere Dienstleistungen wissen müssen.';
    keywords = 'FAQ Aussenwerbung, Fragen Bannerwerbung, häufig gestellte Fragen, Werbekampagne Fragen';
  } else if (isDanish) {
    title = 'Ofte Stillede Spørgsmål | FAQ om Outdoor Reklame';
    description = 'Få svar på de mest almindelige spørgsmål om outdoor reklame, bannerreklame, placeringer, priser og kampagneplanlægning. Alt du behøver at vide om vores services.';
    keywords = 'FAQ outdoor reklame, spørgsmål bannerreklame, ofte stillede spørgsmål, reklamekampagne spørgsmål';
  } else {
    title = 'Frequently Asked Questions | FAQ about Outdoor Advertising';
    description = 'Get answers to the most common questions about outdoor advertising, banner advertising, locations, pricing and campaign planning. Everything you need to know about our services.';
    keywords = 'FAQ outdoor advertising, banner advertising questions, frequently asked questions, advertising campaign questions';
  }

  return generateSEOMetadata({ title, description, keywords, path: '/faq', locale });
}

export default async function FAQPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const isGerman = locale === 'de';
  const isDanish = locale === 'da';
  const t = await getTranslations({ locale, namespace: 'faq.items' });

  // Generate FAQ Schema for better SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      'booking', 'duration', 'pricing', 'priceIncludes', 'design', 'timeline', 
      'permits', 'locations', 'difference', 'measurement', 'weather', 'targeting',
      'cancellation', 'installation', 'brandApproval', 'reach', 'materials', 'support'
    ].map(key => ({
      '@type': 'Question',
      name: t(`${key}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`${key}.answer`)
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <StructuredData
        type="Service"
        title={isGerman ? 'Häufig gestellte Fragen' : isDanish ? 'Ofte Stillede Spørgsmål' : 'Frequently Asked Questions'}
        description={isGerman
          ? 'Antworten auf die häufigsten Fragen'
          : isDanish
          ? 'Få svar på de mest almindelige spørgsmål'
          : 'Get answers to the most common questions'}
        url={`/${locale}/faq`}
      />
      <FAQPageClient locale={locale} />
    </>
  );
}
