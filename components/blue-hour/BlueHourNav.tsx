'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import HydeLogo from './HydeLogo';
import MobileMenu from './MobileMenu';
import { useEasterEggs } from './easter-eggs/EasterEggsProvider';

/**
 * Top nav for the homepage — sits inside the Blue Hour stage,
 * white-on-dusk. Triple-clicking the wordmark briefly switches the dusk
 * to "daylight" — sunrise.
 */
export default function BlueHourNav() {
  const locale = useLocale();
  const pathname = usePathname();
  const { setDuskMode, duskMode } = useEasterEggs();
  const [mobileOpen, setMobileOpen] = useState(false);

  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  const onLogoClick = (e: React.MouseEvent) => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => { clickCount.current = 0; }, 600);

    if (clickCount.current >= 3) {
      e.preventDefault();
      clickCount.current = 0;
      const prev = duskMode;
      setDuskMode('daylight');
      setTimeout(() => setDuskMode(prev), 5000);
    }
  };

  const links = [
    { href: `/${locale}/services`, label: locale === 'en' ? 'Solutions' : 'Lösungen' },
    { href: `/${locale}/about`, label: locale === 'en' ? 'About' : 'Über uns' },
    { href: `/${locale}/cases`, label: locale === 'en' ? 'Cases' : 'Referenzen' },
  ];

  const isLocaleActive = (l: string) => locale === l;

  return (
    <>
      <nav className="relative z-20 py-5">
        <div className="shell flex items-center justify-between gap-4">
          {/* Brand wordmark */}
          <Link
            href={`/${locale}`}
            onClick={onLogoClick}
            aria-label={locale === 'en' ? 'Hyde Media — Home' : 'Hyde Media — Startseite'}
            className="block text-white hover:opacity-90 transition-opacity"
            style={{ width: 'clamp(120px, 18vw, 180px)' }}
          >
            <HydeLogo className="w-full h-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 font-ui font-medium">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="px-4 py-2 text-[13.5px] text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                {l.label}
              </Link>
            ))}

            <div className="flex gap-1.5 px-3 font-mono text-[10px] tracking-[0.2em] uppercase text-white/55">
              {['de', 'en'].map((l) => (
                <Link
                  key={l}
                  href={pathname.replace(`/${locale}`, `/${l}`)}
                  className={isLocaleActive(l) ? 'text-white' : 'hover:text-white/80'}
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
