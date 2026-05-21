'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function BlueHourFooter() {
  const locale = useLocale();

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
          {locale === 'en' ? 'Put your brand' : 'Setze deine Marke'}
          <br />
          {locale === 'en' ? 'on the ' : 'auf die '}<span className="italic text-sky">Skyline.</span>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 mb-[72px]">
          <div>
            <h5 className="font-ui font-semibold text-[10px] tracking-[0.28em] uppercase text-sky m-0 mb-4">
              Hyde Media
            </h5>
            <span className="block py-1.5 text-white/80 text-[15px]">Hauptstrasse 30</span>
            <span className="block py-1.5 text-white/80 text-[15px]">4127 Birsfelden</span>
            <a href="https://www.instagram.com/hyde.med" target="_blank" rel="noopener" className="block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors">
              @hyde.med
            </a>
          </div>

          <div>
            <h5 className="font-ui font-semibold text-[10px] tracking-[0.28em] uppercase text-sky m-0 mb-4">
              {locale === 'en' ? 'Solutions' : 'Lösungen'}
            </h5>
            <Link href={`/${locale}/services`} className="block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors">{locale === 'en' ? 'All solutions' : 'Alle Lösungen'}</Link>
            <Link href={`/${locale}/scaffolding`} className="block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors">{locale === 'en' ? 'Scaffolding advertising' : 'Gerüstwerbung'}</Link>
            <Link href={`/${locale}/facade`} className="block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors">{locale === 'en' ? 'Facade advertising' : 'Fassadenwerbung'}</Link>
          </div>

          <div>
            <h5 className="font-ui font-semibold text-[10px] tracking-[0.28em] uppercase text-sky m-0 mb-4">
              {locale === 'en' ? 'Company' : 'Unternehmen'}
            </h5>
            <Link href={`/${locale}/about`} className="block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors">{locale === 'en' ? 'About' : 'Über uns'}</Link>
            <Link href={`/${locale}/cases`} className="block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors">{locale === 'en' ? 'Cases' : 'Referenzen'}</Link>
            <Link href={`/${locale}/brands`} className="block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors">{locale === 'en' ? 'For brands' : 'Für Marken'}</Link>
            <Link href={`/${locale}/property-owners`} className="block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors">{locale === 'en' ? 'For property owners' : 'Für Immobilieneigentümer'}</Link>
          </div>

          <div>
            <h5 className="font-ui font-semibold text-[10px] tracking-[0.28em] uppercase text-sky m-0 mb-4">
              {locale === 'en' ? 'Contact' : 'Kontakt'}
            </h5>
            <a href="mailto:theodor.staal@hydemedia.ch" className="block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors">theodor.staal@hydemedia.ch</a>
            <a href="tel:+41772338121" className="block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors">+41 77 233 81 21</a>
            <Link href={`/${locale}/contact`} className="block py-1.5 text-white/80 text-[15px] hover:text-glow transition-colors">{locale === 'en' ? 'Contact form' : 'Kontaktformular'}</Link>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-wrap justify-between gap-4 font-mono text-[11px] tracking-[0.15em] uppercase text-white/50">
          <span>© {new Date().getFullYear()} Hyde Media · {locale === 'en' ? 'All rights reserved' : 'Alle Rechte vorbehalten'}</span>
          <span>{locale === 'en' ? 'Designed in Birsfelden · Installed across Switzerland' : 'Gestaltet in Birsfelden · Installiert in der ganzen Schweiz'}</span>
        </div>
      </div>
    </footer>
  );
}
