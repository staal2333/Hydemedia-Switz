'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useConsent } from '@/components/consent/ConsentProvider';
import { COMPANY, companyName } from '@/content/legal/types';
import NewsletterSignup from '@/components/NewsletterSignup';

const COPY = {
  de: {
    tagA: 'Ihre Marke',
    tagB: 'auf der ',
    tagAccent: 'Skyline.',
    solutions: 'Lösungen',
    allSolutions: 'Aussenwerbung',
    scaffolding: 'Gerüstwerbung',
    facade: 'Fassadenwerbung',
    calculator: 'Kampagnenrechner',
    glossary: 'OOH-Glossar',
    mix: 'OOH im Medienmix',
    press: 'Presse',
    locations: 'Standorte',
    allLocations: 'Alle Standorte',
    basel: 'Gerüstwerbung Basel',
    company: 'Unternehmen',
    about: 'Über uns',
    cases: 'Referenzen',
    insights: 'Wissen',
    brands: 'Für Marken',
    owners: 'Für Liegenschaftseigentümer',
    contact: 'Kontakt',
    contactForm: 'Kontaktformular',
    legal: 'Rechtliches',
    terms: 'AGB',
    privacy: 'Datenschutzerklärung',
    cookies: 'Cookie-Richtlinie',
    cookieSettings: 'Cookie-Einstellungen',
    rights: 'Alle Rechte vorbehalten',
    tagline: 'Gestaltet in Basel · Installiert in der ganzen Schweiz',
  },
  en: {
    tagA: 'Put your brand',
    tagB: 'on the ',
    tagAccent: 'skyline.',
    solutions: 'Solutions',
    allSolutions: 'Outdoor advertising',
    scaffolding: 'Scaffolding advertising',
    facade: 'Facade advertising',
    calculator: 'Campaign calculator',
    glossary: 'OOH glossary',
    mix: 'OOH in the media mix',
    press: 'Press',
    locations: 'Locations',
    allLocations: 'All locations',
    basel: 'Scaffolding ads in Basel',
    company: 'Company',
    about: 'About',
    cases: 'References',
    insights: 'Insights',
    brands: 'For brands',
    owners: 'For property owners',
    contact: 'Contact',
    contactForm: 'Contact form',
    legal: 'Legal',
    terms: 'Terms of sale',
    privacy: 'Privacy policy',
    cookies: 'Cookie policy',
    cookieSettings: 'Cookie settings',
    rights: 'All rights reserved',
    tagline: 'Designed in Basel · Installed across Switzerland',
  },
} as const;

const linkCls = 'block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors';
const headCls = 'font-ui font-semibold text-[10px] tracking-[0.28em] uppercase text-sky m-0 mb-4';

export default function BlueHourFooter() {
  const locale = useLocale();
  const t = COPY[locale === 'en' ? 'en' : 'de'];
  const { openSettings } = useConsent();

  return (
    <footer
      className="relative text-white/85 pt-32 pb-12 overflow-hidden print:hidden"
      style={{ background: 'linear-gradient(180deg, #4a525b 0%, #2c3338 50%, #1f2428 100%)' }}
    >
      {/* Pavement tile grid — slightly larger, more pronounced */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 49.5%, rgba(255,255,255,0.04) 50%, transparent 50.5%), linear-gradient(0deg, transparent 49.5%, rgba(255,255,255,0.04) 50%, transparent 50.5%)`,
          backgroundSize: '160px 100px',
        }}
      />
      <div className="shell relative z-10">
        <div
          className="font-display font-normal text-white m-0 mb-[72px]"
          style={{ fontSize: 'clamp(64px, 12vw, 200px)', lineHeight: 0.88, letterSpacing: '-0.045em' }}
        >
          {t.tagA}
          <br />
          {t.tagB}<span className="italic text-sky">{t.tagAccent}</span>
        </div>

        <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-1 gap-8 mb-[72px]">
          {/* Company particulars: name, address, UID once known, email. */}
          <div>
            <h5 className={headCls}>Hyde Media</h5>
            {COMPANY.legalName && <span className="block py-1.5 text-white/80 text-[15px]">{COMPANY.legalName}</span>}
            <span className="block py-1.5 text-white/80 text-[15px]">{COMPANY.street}</span>
            <span className="block py-1.5 text-white/80 text-[15px]">{COMPANY.postal}</span>
            {COMPANY.uid && <span className="block py-1.5 text-white/80 text-[15px]">UID {COMPANY.uid}</span>}
            <a href="https://www.instagram.com/hyde.med" target="_blank" rel="noopener noreferrer" className={linkCls}>
              @hyde.med
            </a>
          </div>

          <div>
            <h5 className={headCls}>{t.solutions}</h5>
            <Link href={`/${locale}/services`} className={linkCls}>{t.allSolutions}</Link>
            <Link href={`/${locale}/scaffolding`} className={linkCls}>{t.scaffolding}</Link>
            <Link href={`/${locale}/facade`} className={linkCls}>{t.facade}</Link>
            <Link href={`/${locale}/kampagnenrechner`} className={linkCls}>{t.calculator}</Link>
          </div>

          <div>
            <h5 className={headCls}>{t.locations}</h5>
            <Link href={`/${locale}/standorte`} className={linkCls}>{t.allLocations}</Link>
            <Link href={`/${locale}/geruestwerbung-basel`} className={linkCls}>{t.basel}</Link>
          </div>

          <div>
            <h5 className={headCls}>{t.company}</h5>
            <Link href={`/${locale}/about`} className={linkCls}>{t.about}</Link>
            <Link href={`/${locale}/cases`} className={linkCls}>{t.cases}</Link>
            <Link href={`/${locale}/blog`} className={linkCls}>{t.insights}</Link>
            <Link href={`/${locale}/ooh-im-medienmix`} className={linkCls}>{t.mix}</Link>
            <Link href={`/${locale}/glossar`} className={linkCls}>{t.glossary}</Link>
            <Link href={`/${locale}/presse`} className={linkCls}>{t.press}</Link>
            <Link href={`/${locale}/brands`} className={linkCls}>{t.brands}</Link>
            <Link href={`/${locale}/property-owners`} className={linkCls}>{t.owners}</Link>
          </div>

          <div>
            <h5 className={headCls}>{t.contact}</h5>
            <a href={`mailto:${COMPANY.email}`} className={`${linkCls} break-all`}>{COMPANY.email}</a>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className={linkCls}>{COMPANY.phone}</a>
            <Link href={`/${locale}/contact`} className={linkCls}>{t.contactForm}</Link>
          </div>

          <div>
            <h5 className={headCls}>{t.legal}</h5>
            <Link href={`/${locale}/terms`} className={linkCls}>{t.terms}</Link>
            <Link href={`/${locale}/privacy`} className={linkCls}>{t.privacy}</Link>
            <Link href={`/${locale}/cookies`} className={linkCls}>{t.cookies}</Link>
            <button type="button" onClick={openSettings} className={`${linkCls} text-left`}>
              {t.cookieSettings}
            </button>
          </div>
        </div>

        <div className="py-10 mb-2 border-t border-white/10">
          <NewsletterSignup variant="footer" source="footer" />
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-wrap justify-between gap-4 font-mono text-[11px] tracking-[0.15em] uppercase text-white/50">
          <span>© {new Date().getFullYear()} {companyName()} · {t.rights}</span>
          <span>{t.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
