'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import HydeLogo from './HydeLogo';
import MobileMenu from './MobileMenu';

/**
 * Blue Hour header for inner pages.
 *
 * Sits absolutely at the top of the page so it floats over the DuskHero,
 * scrolling away with it — same behaviour as the homepage's BlueHourNav.
 * Always white-on-transparent for seamless dusk integration.
 */
export default function BlueHourHeader() {
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  if (isHome) return null;

  const links = [
    { href: `/${locale}/services`, label: locale === 'en' ? 'Solutions' : 'Lösungen' },
    { href: `/${locale}/about`, label: locale === 'en' ? 'About' : 'Über uns' },
    { href: `/${locale}/cases`, label: locale === 'en' ? 'Cases' : 'Referenzen' },
  ];

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-30 py-5">
        <div className="shell flex items-center justify-between gap-4">
          <Link
            href={`/${locale}`}
            aria-label={locale === 'en' ? 'Hyde Media — Home' : 'Hyde Media — Startseite'}
            className="block text-white hover:opacity-85 transition-opacity"
            style={{ width: 'clamp(120px, 18vw, 180px)' }}
          >
            <HydeLogo className="w-full h-auto" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 font-ui font-medium">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="px-4 py-2 text-[13.5px] text-white/85 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                {l.label}
              </Link>
            ))}

            <div className="flex gap-1.5 px-3 font-mono text-[10px] tracking-[0.2em] uppercase text-white/55">
              {['de', 'en'].map((l) => (
                <Link
                  key={l}
                  href={pathname.replace(`/${locale}`, `/${l}`)}
                  className={locale === l ? 'text-white' : 'hover:text-white/80'}
                >
                  {l}
                </Link>
              ))}
            </div>

            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 font-ui font-semibold text-[12px] uppercase tracking-[0.08em] rounded-full text-white border border-white/45 bg-white/[0.14] backdrop-blur-md hover:bg-white/25 hover:-translate-y-px transition-all"
            >
              {locale === 'en' ? 'Contact' : 'Kontakt'}
              <span>↗</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={locale === 'en' ? 'Open menu' : 'Menü öffnen'}
            className="md:hidden w-12 h-12 rounded-full border border-white/40 bg-white/[0.10] backdrop-blur-md text-white flex flex-col items-center justify-center gap-1.5 hover:bg-white/20 transition-colors"
          >
            <span className="block w-5 h-px bg-current" />
            <span className="block w-5 h-px bg-current" />
            <span className="block w-5 h-px bg-current" />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={links}
        locale={locale}
        contactHref={`/${locale}/contact`}
        variant="dusk"
      />
    </>
  );
}
