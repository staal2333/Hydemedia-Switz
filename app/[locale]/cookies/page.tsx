import { Metadata } from 'next';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { getRegionConfig } from '@/lib/region';
import DuskHero from '@/components/blue-hour/DuskHero';
import GroundFlow from '@/components/blue-hour/GroundFlow';
import ConsentSettingsButton from '@/components/legal/ConsentSettingsButton';

/**
 * Every entry here matches what the code actually stores: the consent choice
 * (lib/consent.ts), the newsletter reminder (lib/newsletter.ts) and Google
 * Analytics, which only loads after consent (components/GoogleAnalytics.tsx).
 */
const COPY = {
  de: {
    title: 'Cookie-Richtlinie',
    description: 'Welche Cookies und lokalen Speicher hydemedia.ch verwendet, wofür, wie lange, und wie Sie Ihre Einwilligung ändern oder widerrufen.',
    eyebrow: 'Cookies',
    updated: 'Stand: Oktober 2026',
    intro:
      'Diese Website verwendet nur das, was für ihren Betrieb nötig ist. Statistik-Cookies von Google Analytics werden erst gesetzt, wenn Sie ausdrücklich zustimmen. Ohne Ihre Zustimmung wird keine Anfrage an Google gesendet.',
    tableHead: ['Name', 'Zweck', 'Kategorie', 'Speicherdauer'],
    rows: [
      ['hyde-consent', 'Speichert Ihre Cookie-Wahl, damit wir sie respektieren können (lokaler Speicher).', 'Notwendig', '12 Monate'],
      ['hyde-newsletter', 'Merkt sich, ob Sie die Newsletter-Einblendung geschlossen oder sich angemeldet haben (lokaler Speicher).', 'Notwendig', '30 Tage bzw. bis zur Löschung'],
      ['_ga, _ga_*', 'Google Analytics: unterscheidet Besuche, damit wir anonym messen können, welche Seiten genutzt werden.', 'Statistik (nur mit Einwilligung)', 'bis 2 Jahre'],
    ],
    withdrawTitle: 'Einwilligung ändern oder widerrufen',
    withdraw:
      'Sie können Ihre Wahl jederzeit ändern. Wenn Sie die Einwilligung widerrufen, stoppen wir Google Analytics und löschen die bereits gesetzten Analytics-Cookies.',
    settings: 'Cookie-Einstellungen öffnen',
    googleTitle: 'Google Analytics',
    google:
      'Google Analytics wird von Google bereitgestellt. Daten können in die USA übermittelt werden. Mehr dazu in unserer ',
    privacy: 'Datenschutzerklärung',
    contactTitle: 'Kontakt',
  },
  en: {
    title: 'Cookie policy',
    description: 'Which cookies and local storage hydemedia.ch uses, for what, for how long, and how to change or withdraw your consent.',
    eyebrow: 'Cookies',
    updated: 'Last updated: October 2026',
    intro:
      'This website only uses what it needs to work. Statistics cookies from Google Analytics are set only after you explicitly agree. Without your consent, no request is sent to Google.',
    tableHead: ['Name', 'Purpose', 'Category', 'Duration'],
    rows: [
      ['hyde-consent', 'Stores your cookie choice so we can respect it (local storage).', 'Necessary', '12 months'],
      ['hyde-newsletter', 'Remembers whether you closed the newsletter prompt or signed up (local storage).', 'Necessary', '30 days or until deleted'],
      ['_ga, _ga_*', 'Google Analytics: tells visits apart so we can measure anonymously which pages are used.', 'Statistics (consent only)', 'up to 2 years'],
    ],
    withdrawTitle: 'Change or withdraw consent',
    withdraw:
      'You can change your choice at any time. If you withdraw consent, we stop Google Analytics and delete the analytics cookies already set.',
    settings: 'Open cookie settings',
    googleTitle: 'Google Analytics',
    google: 'Google Analytics is provided by Google. Data may be transferred to the USA. Read more in our ',
    privacy: 'privacy policy',
    contactTitle: 'Contact',
  },
} as const;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const c = COPY[locale === 'en' ? 'en' : 'de'];
  return generateSEOMetadata({ title: c.title, description: c.description, path: '/cookies', locale });
}

export default function CookiesPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const c = COPY[locale === 'en' ? 'en' : 'de'];
  const config = getRegionConfig(locale);

  return (
    <div className="relative">
      <DuskHero>
        <div className="shell">
          <div className="max-w-4xl mx-auto text-center">
            <span className="font-ui font-medium text-[11px] tracking-[0.3em] uppercase text-white/65 inline-block mb-6">§ {c.eyebrow}</span>
            <h1
              className="font-display font-normal text-white m-0 mb-4"
              style={{ fontSize: 'clamp(36px, 5vw, 80px)', letterSpacing: '-0.03em', lineHeight: 1, textShadow: '0 2px 24px rgba(14,30,51,0.2)' }}
            >
              {c.title}
            </h1>
            <p className="font-mono text-[12px] tracking-[0.18em] uppercase text-white/55 m-0">{c.updated}</p>
          </div>
        </div>
      </DuskHero>

      <GroundFlow>
        <article className="py-20">
          <div className="shell max-w-3xl">
            <p className="text-[17px] leading-[1.7] text-ink-soft m-0 mb-10">{c.intro}</p>

            <div className="overflow-x-auto mb-12">
              <table className="w-full text-left text-[14px] border-collapse">
                <thead>
                  <tr>
                    {c.tableHead.map((h) => (
                      <th key={h} className="py-3 pr-4 border-b border-rule font-ui font-semibold text-[10px] tracking-[0.18em] uppercase text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) => (
                        <td key={i} className={`py-4 pr-4 border-b border-rule align-top ${i === 0 ? 'font-mono text-[13px] text-ink whitespace-nowrap' : 'text-ink-soft'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-0.02em' }}>{c.withdrawTitle}</h2>
            <p className="text-[16px] leading-[1.7] text-ink-soft m-0 mb-5">{c.withdraw}</p>
            <ConsentSettingsButton label={c.settings} />

            <h2 className="font-display font-normal text-ink m-0 mt-8 mb-4" style={{ fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-0.02em' }}>{c.googleTitle}</h2>
            <p className="text-[16px] leading-[1.7] text-ink-soft m-0 mb-10">
              {c.google}
              <Link href={`/${locale}/privacy`} className="text-mid underline underline-offset-2">{c.privacy}</Link>.
            </p>

            <h2 className="font-display font-normal text-ink m-0 mb-4" style={{ fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-0.02em' }}>{c.contactTitle}</h2>
            <p className="text-[16px] leading-[1.7] text-ink-soft m-0">
              Hyde Media · {config.address}
              <br />
              <a href={`mailto:${config.email}`} className="text-mid underline underline-offset-2">{config.email}</a>
            </p>
          </div>
        </article>
      </GroundFlow>
    </div>
  );
}
