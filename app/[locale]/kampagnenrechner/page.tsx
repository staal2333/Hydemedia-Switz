import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';
import CampaignCalculator from '@/components/CampaignCalculator';

const SITE = 'https://www.hydemedia.ch';

const COPY = {
  de: {
    eyebrow: 'Kampagnenrechner',
    h1a: 'Wie viele sehen',
    h1b: 'Ihre Kampagne?',
    lede: 'Wählen Sie Standorte und Zeitraum und sehen Sie die erwarteten Kontakte auf Basis der Verkehrszahlen. Teilen Sie den Plan mit Ihrem Team oder senden Sie ihn direkt an uns.',
    title: 'Kampagnenrechner: Reichweite für Aussenwerbung',
    description: 'Wählen Sie Gerüst- und Fassadenstandorte in Basel und sehen Sie, wie viele Kontakte Ihre Kampagne erzielt. Teilen Sie den Plan oder fordern Sie ein Angebot an.',
  },
  en: {
    eyebrow: 'Campaign calculator',
    h1a: 'How many people see',
    h1b: 'your campaign?',
    lede: 'Choose sites and a period, and see the estimated contacts based on traffic figures. Share the plan with your team, or send it straight to us.',
    title: 'Campaign Calculator: Outdoor Advertising Reach',
    description: 'Choose scaffolding and facade sites in Basel and see how many contacts your campaign gets. Share the plan or request a quote.',
  },
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const c = COPY[locale === 'en' ? 'en' : 'de'];
  return generateSEOMetadata({ title: c.title, description: c.description, path: '/kampagnenrechner', locale });
}

export default function CalculatorPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const c = COPY[locale === 'en' ? 'en' : 'de'];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: c.title,
    url: `${SITE}/${locale}/kampagnenrechner`,
    description: c.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    isAccessibleForFree: true,
    provider: { '@id': `${SITE}/#organization` },
  };

  return (
    <div className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {c.eyebrow}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-6"
              style={{ fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {c.h1a} <span className="italic text-cream">{c.h1b}</span>
            </h1>
            <p className="font-body text-white/85 max-w-2xl mx-auto m-0" style={{ fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6 }}>
              {c.lede}
            </p>
          </div>
        </div>
      </DuskHero>
      <GroundFlow>
        <section className="py-16 pb-28">
          <div className="shell">
            <CampaignCalculator />
          </div>
        </section>
      </GroundFlow>
    </div>
  );
}
