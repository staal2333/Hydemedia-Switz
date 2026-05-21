import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';

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
    title = 'Nutzungsbedingungen | AGB für Aussenwerbung';
    description = 'Lesen Sie die Allgemeinen Geschäftsbedingungen von Hyde Media für die Nutzung unserer OOH-Werbeplattform und Dienstleistungen.';
    keywords = 'Nutzungsbedingungen, AGB, Aussenwerbung, rechtlich';
  } else if (isDanish) {
    title = 'Servicevilkår | Betingelser for Outdoor Reklame';
    description = 'Læs Hyde Medias vilkår og betingelser for brug af vores OOH reklameudbud og services.';
    keywords = 'servicevilkår, betingelser, outdoor reklame, juridisk';
  } else {
    title = 'Terms of Service | Outdoor Advertising Terms';
    description = 'Read Hyde Media\'s terms and conditions for using our OOH advertising platform and services.';
    keywords = 'terms of service, conditions, outdoor advertising, legal';
  }

  return generateSEOMetadata({ title, description, keywords, path: '/terms', locale });
}

export default async function TermsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'legal.terms' });

  return (
    <div className="relative">
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ Nutzungsbedingungen</span>
            <h1
              className="font-display font-normal text-white m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 5vw, 80px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {t('title')}
            </h1>
            <p className="font-mono text-[12px] tracking-[0.18em] uppercase text-white/55 m-0">
              {t('lastUpdated')}
            </p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        <article className="py-20">
          <div className="shell">
            <div className="max-w-3xl mx-auto prose prose-slate prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight prose-h2:text-[clamp(24px,3vw,36px)] prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-[20px] prose-h3:mt-6 prose-h3:mb-2 prose-p:text-ink-soft prose-p:leading-relaxed prose-li:text-ink-soft">
              <h2>{t('sections.acceptance.title')}</h2>
              <p>{t('sections.acceptance.content')}</p>

              <h2>{t('sections.services.title')}</h2>
              <p>{t('sections.services.content')}</p>

              <h2>{t('sections.advertiserResponsibilities.title')}</h2>
              <ul>
                <li>{t('sections.advertiserResponsibilities.items.0')}</li>
                <li>{t('sections.advertiserResponsibilities.items.1')}</li>
                <li>{t('sections.advertiserResponsibilities.items.2')}</li>
                <li>{t('sections.advertiserResponsibilities.items.3')}</li>
              </ul>

              <h2>{t('sections.partnerResponsibilities.title')}</h2>
              <ul>
                <li>{t('sections.partnerResponsibilities.items.0')}</li>
                <li>{t('sections.partnerResponsibilities.items.1')}</li>
                <li>{t('sections.partnerResponsibilities.items.2')}</li>
              </ul>

              <h2>{t('sections.bookingPayments.title')}</h2>
              <ul>
                <li>{t('sections.bookingPayments.items.0')}</li>
                <li>{t('sections.bookingPayments.items.1')}</li>
                <li>{t('sections.bookingPayments.items.2')}</li>
                <li>{t('sections.bookingPayments.items.3')}</li>
              </ul>

              <h2>{t('sections.contentStandards.title')}</h2>
              <p>{t('sections.contentStandards.intro')}</p>
              <ul>
                <li>{t('sections.contentStandards.items.0')}</li>
                <li>{t('sections.contentStandards.items.1')}</li>
                <li>{t('sections.contentStandards.items.2')}</li>
                <li>{t('sections.contentStandards.items.3')}</li>
              </ul>

              <h2>{t('sections.installation.title')}</h2>
              <ul>
                <li>{t('sections.installation.items.0')}</li>
                <li>{t('sections.installation.items.1')}</li>
                <li>{t('sections.installation.items.2')}</li>
              </ul>

              <h2>{t('sections.liability.title')}</h2>
              <p>{t('sections.liability.content')}</p>

              <h2>{t('sections.intellectualProperty.title')}</h2>
              <p>{t('sections.intellectualProperty.content')}</p>

              <h2>{t('sections.termination.title')}</h2>
              <p>{t('sections.termination.content')}</p>

              <h2>{t('sections.governingLaw.title')}</h2>
              <p>{t('sections.governingLaw.content')}</p>

              <h2>{t('sections.changes.title')}</h2>
              <p>{t('sections.changes.content')}</p>

              <h2>{t('sections.contact.title')}</h2>
              <p dangerouslySetInnerHTML={{ __html: t.raw('sections.contact.content') }} />
            </div>
          </div>
        </article>
      </GroundFlow>
    </div>
  );
}
