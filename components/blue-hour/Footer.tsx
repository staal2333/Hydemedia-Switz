'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import NewsletterSignup from '@/components/NewsletterSignup';
import ConsentSettingsButton from '@/components/legal/ConsentSettingsButton';

const HEAD = 'font-ui font-semibold text-[10px] tracking-[0.28em] uppercase text-sky m-0 mb-4';
const LINK = 'block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors';

export default function BlueHourFooter() {
  const locale = useLocale();
  const en = locale === 'en';

  return (
    <footer
      className="relative text-white/85 pt-32 pb-12 overflow-hidden"
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
          {en ? 'Put your brand' : 'Bringen Sie Ihre Marke'}
          <br />
          {en ? 'on the ' : 'auf die '}<span className="italic text-sky">Skyline 2026.</span>
        </div>

        {/* Newsletter — new sites are the reason to sign up, so it sits above the links. */}
        <div className="mb-[72px] max-w-4xl">
          <NewsletterSignup source="footer" variant="footer" />
        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-8 mb-[72px]">
          <div className="col-span-2 md:col-span-1">
            <h5 className={HEAD}>Hyde Media</h5>
            <span className="block py-1.5 text-white/80 text-[15px]">Marktgasse 8</span>
            <span className="block py-1.5 text-white/80 text-[15px]">4051 Basel</span>
            <a href="https://www.instagram.com/hyde.med" target="_blank" rel="noopener" className={LINK}>
              @hyde.med
            </a>
          </div>

          <div>
            <h5 className={HEAD}>{en ? 'Solutions' : 'Lösungen'}</h5>
            <Link href={`/${locale}/services`} className={LINK}>{en ? 'Outdoor advertising' : 'Aussenwerbung'}</Link>
            <Link href={`/${locale}/scaffolding`} className={LINK}>{en ? 'Scaffolding advertising' : 'Gerüstwerbung'}</Link>
            <Link href={`/${locale}/facade`} className={LINK}>{en ? 'Facade advertising' : 'Fassadenwerbung'}</Link>
            <Link href={`/${locale}/standorte`} className={LINK}>{en ? 'Locations' : 'Standorte'}</Link>
            <Link href={`/${locale}/geruestwerbung-basel`} className={LINK}>{en ? 'Scaffolding ads in Basel' : 'Gerüstwerbung Basel'}</Link>
          </div>

          <div>
            <h5 className={HEAD}>{en ? 'Insights' : 'Wissen'}</h5>
            <Link href={`/${locale}/blog`} className={LINK}>{en ? 'Blog' : 'Blog'}</Link>
            <Link href={`/${locale}/kampagnenrechner`} className={LINK}>{en ? 'Campaign calculator' : 'Kampagnenrechner'}</Link>
            <Link href={`/${locale}/ooh-im-medienmix`} className={LINK}>{en ? 'OOH in the media mix' : 'OOH im Medienmix'}</Link>
            <Link href={`/${locale}/glossar`} className={LINK}>{en ? 'OOH glossary' : 'OOH-Glossar'}</Link>
            <Link href={`/${locale}/faq`} className={LINK}>FAQ</Link>
          </div>

          <div>
            <h5 className={HEAD}>{en ? 'Company' : 'Unternehmen'}</h5>
            <Link href={`/${locale}/about`} className={LINK}>{en ? 'About' : 'Über uns'}</Link>
            <Link href={`/${locale}/cases`} className={LINK}>{en ? 'References' : 'Referenzen'}</Link>
            <Link href={`/${locale}/brands`} className={LINK}>{en ? 'For brands' : 'Für Marken'}</Link>
            <Link href={`/${locale}/property-owners`} className={LINK}>{en ? 'For property owners' : 'Für Liegenschaftseigentümer'}</Link>
            <Link href={`/${locale}/presse`} className={LINK}>{en ? 'Press' : 'Presse'}</Link>
          </div>

          <div>
            <h5 className={HEAD}>{en ? 'Contact' : 'Kontakt'}</h5>
            <a href="mailto:theodor.staal@hydemedia.ch" className={`${LINK} break-all`}>theodor.staal@hydemedia.ch</a>
            <a href="tel:+41772338121" className={LINK}>+41 77 233 81 21</a>
            <Link href={`/${locale}/contact`} className={LINK}>{en ? 'Contact form' : 'Kontaktformular'}</Link>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-wrap justify-between gap-4 font-mono text-[11px] tracking-[0.15em] uppercase text-white/50">
          <span>© {new Date().getFullYear()} Hyde Media · {en ? 'All rights reserved' : 'Alle Rechte vorbehalten'}</span>
          <nav aria-label={en ? 'Legal' : 'Rechtliches'} className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">{en ? 'Privacy' : 'Datenschutz'}</Link>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">{en ? 'Terms' : 'AGB'}</Link>
            <Link href={`/${locale}/cookies`} className="hover:text-white transition-colors">Cookies</Link>
            <ConsentSettingsButton
              label={en ? 'Cookie settings' : 'Cookie-Einstellungen'}
              className="print:hidden uppercase tracking-[0.15em] hover:text-white transition-colors"
            />
          </nav>
          <span>{en ? 'Designed in Basel · Installed across Switzerland' : 'Gestaltet in Basel · Installiert in der ganzen Schweiz'}</span>
        </div>
      </div>
    </footer>
  );
}
