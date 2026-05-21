'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface NavLink { href: string; label: string; }

interface Props {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  locale: string;
  contactHref: string;
  /** When true the menu styles itself for the dusk hero (white text on dusk).
   *  Otherwise it inverts to dark text on cream. */
  variant?: 'dusk' | 'cream';
}

/**
 * Full-viewport mobile menu — slides down from the top with the same
 * dusk gradient as the hero so the visual stays cohesive. Closes on
 * Escape, on link click, and via the close button.
 */
export default function MobileMenu({ open, onClose, links, locale, contactHref, variant = 'dusk' }: Props) {
  const pathname = usePathname();

  // Lock body scroll while menu is open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const isDusk = variant === 'dusk';

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{
        background: isDusk
          ? 'linear-gradient(180deg, #162a47 0%, #1f3a5f 35%, #2f578c 70%, #4a7bb5 100%)'
          : '#e8ecef',
      }}
    >
      {/* Close button + brand */}
      <div className="flex items-center justify-between px-6 py-5">
        <span
          className={`font-ui font-extrabold uppercase tracking-[0.04em] text-[18px] ${isDusk ? 'text-white' : 'text-ink'}`}
        >
          Hyde Media
        </span>
        <button
          onClick={onClose}
          aria-label={locale === 'en' ? 'Close menu' : 'Menü schliessen'}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
            isDusk
              ? 'border border-white/30 text-white hover:bg-white/10'
              : 'border border-ink/30 text-ink hover:bg-ink/5'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
            <path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Links — large, tactile */}
      <nav className="flex-1 flex flex-col justify-center gap-2 px-6">
        {links.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            onClick={onClose}
            className={`font-display font-normal py-3 transition-opacity ${
              isDusk ? 'text-white hover:opacity-70' : 'text-ink hover:opacity-70'
            }`}
            style={{ fontSize: 'clamp(36px, 9vw, 56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Footer of menu — locale + CTA */}
      <div className="px-6 pb-10 pt-6 space-y-5">
        <div className={`flex gap-3 font-mono text-[11px] tracking-[0.22em] uppercase ${isDusk ? 'text-white/55' : 'text-ink/50'}`}>
          {['de', 'en'].map((l) => (
            <Link
              key={l}
              href={pathname.replace(`/${locale}`, `/${l}`)}
              onClick={onClose}
              className={locale === l ? (isDusk ? 'text-white' : 'text-ink') : 'hover:opacity-80'}
            >
              {l}
            </Link>
          ))}
        </div>

        <Link
          href={contactHref}
          onClick={onClose}
          className={`flex justify-between items-center px-6 py-5 rounded-2xl font-ui font-semibold text-[12px] uppercase tracking-[0.08em] transition-all ${
            isDusk
              ? 'bg-cream text-dusk hover:bg-glow'
              : 'bg-ink text-white hover:bg-dusk'
          }`}
        >
          <span>{locale === 'en' ? 'Get in touch' : 'Kontakt aufnehmen'}</span>
          <span>↗</span>
        </Link>
      </div>
    </div>
  );
}
