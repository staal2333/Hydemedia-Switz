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
    title = 'Datenschutzrichtlinie | DSGVO-Konformität';
    description = 'Erfahren Sie, wie Hyde Media Ihre persönlichen Daten erfasst, verwendet und schützt. DSGVO-konforme Datenschutzrichtlinie.';
    keywords = 'Datenschutzrichtlinie, DSGVO, Datenschutz, personenbezogene Daten';
  } else if (isDanish) {
    title = 'Privatlivspolitik | GDPR Compliance';
    description = 'Læs hvordan Hyde Media indsamler, bruger og beskytter dine personlige oplysninger. GDPR-compliant privatlivspolitik.';
    keywords = 'privatlivspolitik, GDPR, databeskyttelse, persondata';
  } else {
    title = 'Privacy Policy | GDPR Compliance';
    description = 'Learn how Hyde Media collects, uses, and protects your personal information. GDPR compliant privacy policy.';
    keywords = 'privacy policy, GDPR, data protection, personal data';
  }

  return generateSEOMetadata({ title, description, keywords, path: '/privacy', locale });
}

export default async function PrivacyPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });

  return (
    <div className="relative">
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ Privatlivspolitik</span>
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
              <h2>{t('sections.introduction.title')}</h2>
              <p>{t('sections.introduction.content')}</p>

              <h2>{t('sections.dataCollection.title')}</h2>
              <h3>{t('sections.dataCollection.personalData.title')}</h3>
              <ul>
                <li>{t('sections.dataCollection.personalData.items.0')}</li>
                <li>{t('sections.dataCollection.personalData.items.1')}</li>
                <li>{t('sections.dataCollection.personalData.items.2')}</li>
              </ul>
              <h3>{t('sections.dataCollection.usageData.title')}</h3>
              <ul>
                <li>{t('sections.dataCollection.usageData.items.0')}</li>
                <li>{t('sections.dataCollection.usageData.items.1')}</li>
                <li>{t('sections.dataCollection.usageData.items.2')}</li>
              </ul>

              <h2>{t('sections.dataUsage.title')}</h2>
              <ul>
                <li>{t('sections.dataUsage.items.0')}</li>
                <li>{t('sections.dataUsage.items.1')}</li>
                <li>{t('sections.dataUsage.items.2')}</li>
                <li>{t('sections.dataUsage.items.3')}</li>
              </ul>

              <h2>{t('sections.dataSharing.title')}</h2>
              <p>{t('sections.dataSharing.intro')}</p>
              <ul>
                <li>{t('sections.dataSharing.items.0')}</li>
                <li>{t('sections.dataSharing.items.1')}</li>
              </ul>

              <h2>{t('sections.dataSecurity.title')}</h2>
              <p>{t('sections.dataSecurity.content')}</p>

              <h2>{t('sections.gdprRights.title')}</h2>
              <p>{t('sections.gdprRights.intro')}</p>
              <ul>
                <li>{t('sections.gdprRights.items.0')}</li>
                <li>{t('sections.gdprRights.items.1')}</li>
                <li>{t('sections.gdprRights.items.2')}</li>
                <li>{t('sections.gdprRights.items.3')}</li>
                <li>{t('sections.gdprRights.items.4')}</li>
              </ul>

              <h2>{t('sections.cookies.title')}</h2>
              <p>{t('sections.cookies.content')}</p>

              <h2>{t('sections.contact.title')}</h2>
              <p dangerouslySetInnerHTML={{ __html: t.raw('sections.contact.content') }} />

              <h2>{t('sections.changes.title')}</h2>
              <p>{t('sections.changes.content')}</p>
            </div>
          </div>
        </article>
      </GroundFlow>
    </div>
  );
}
