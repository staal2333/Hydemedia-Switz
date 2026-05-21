'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';

// Small HYDE logo for header
function SmallHydeLogo() {
  return (
    <svg
      viewBox="0 0 800 285"
      className="w-full h-auto"
    >
      {/* H */}
      <rect x="0" y="0" width="40" height="200" fill="currentColor" />
      <rect x="0" y="80" width="120" height="40" fill="currentColor" />
      <rect x="80" y="0" width="40" height="200" fill="currentColor" />

      {/* Y */}
      <rect x="180" y="0" width="40" height="100" fill="currentColor" />
      <rect x="270" y="0" width="40" height="100" fill="currentColor" />
      <rect x="180" y="80" width="130" height="40" fill="currentColor" />
      <rect x="225" y="100" width="40" height="100" fill="currentColor" />

      {/* D */}
      <rect x="370" y="0" width="40" height="200" fill="currentColor" />
      <path
        d="M 410 0 L 490 0 Q 550 0 550 100 Q 550 200 490 200 L 410 200 L 410 160 L 490 160 Q 510 160 510 100 Q 510 40 490 40 L 410 40 Z"
        fill="currentColor"
      />

      {/* E */}
      <rect x="590" y="0" width="40" height="200" fill="currentColor" />
      <rect x="590" y="0" width="140" height="40" fill="currentColor" />
      <rect x="590" y="80" width="120" height="40" fill="currentColor" />
      <rect x="590" y="160" width="140" height="40" fill="currentColor" />

      {/* MEDIA text underneath - THIN bars, perfect alignment */}
      {/* M */}
      <rect x="0" y="225" width="14" height="50" fill="currentColor" />
      <rect x="0" y="225" width="50" height="14" fill="currentColor" />
      <rect x="18" y="239" width="14" height="36" fill="currentColor" />
      <rect x="36" y="225" width="14" height="50" fill="currentColor" />

      {/* E */}
      <rect x="70" y="225" width="14" height="50" fill="currentColor" />
      <rect x="70" y="225" width="48" height="14" fill="currentColor" />
      <rect x="70" y="243" width="43" height="14" fill="currentColor" />
      <rect x="70" y="261" width="48" height="14" fill="currentColor" />

      {/* D */}
      <rect x="138" y="225" width="14" height="50" fill="currentColor" />
      <path
        d="M 152 225 L 182 225 Q 205 225 205 250 Q 205 275 182 275 L 152 275 L 152 263 L 182 263 Q 193 263 193 250 Q 193 237 182 237 L 152 237 Z"
        fill="currentColor"
      />

      {/* I */}
      <rect x="225" y="225" width="14" height="50" fill="currentColor" />

      {/* A */}
      <rect x="259" y="225" width="14" height="50" fill="currentColor" />
      <rect x="259" y="225" width="50" height="14" fill="currentColor" />
      <rect x="259" y="243" width="50" height="14" fill="currentColor" />
      <rect x="295" y="225" width="14" height="50" fill="currentColor" />
    </svg>
  );
}

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if we're on homepage - if so, don't render header
  const isHomePage = pathname === `/${locale}` || pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Track if scrolled for background
      setIsScrolled(currentScrollY > 20);

      // Show header if at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Don't render header on homepage - AFTER all hooks
  if (isHomePage) {
    return null;
  }

  const navItems = [
    { key: 'solutions', href: `/${locale}/services` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  const dropdownItems = [
    { key: 'solutions', href: `/${locale}/services` },
    { key: 'caseStudies', href: `/${locale}/cases` },
    { key: 'partners', href: `/${locale}/partners` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="mx-auto flex items-center justify-between px-6 sm:px-8 lg:px-12 py-6 md:py-7 max-w-[95rem]">
        {/* Large HYDE Logo - Always visible on left */}
        <Link href={`/${locale}`} className="flex-shrink-0">
          <motion.div
            className="w-32 sm:w-40 md:w-48 lg:w-56 text-slate-900 hover:opacity-70 transition-opacity"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SmallHydeLogo />
          </motion.div>
        </Link>

            {/* Desktop Navigation - Right side, next to hamburger */}
            <div className="flex items-center gap-8 lg:gap-10 ml-auto">
              <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-slate-900">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      className="text-2xl lg:text-3xl font-normal transition-opacity hover:opacity-70"
                      style={{ fontWeight: 400, letterSpacing: '-0.01em' }}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}
              </nav>

          {/* Hamburger/Menu Button - Far Right */}
          <div className="relative">
            <motion.button
              type="button"
              className="flex h-12 w-12 md:h-16 md:w-16 lg:h-18 lg:w-18 items-center justify-center rounded-full bg-slate-900 text-white transition-all hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.svg
                    key="close"
                    className="h-6 w-6 md:h-8 md:w-8 lg:h-9 lg:w-9"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="menu"
                    className="h-6 w-6 md:h-8 md:w-8 lg:h-9 lg:w-9"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Compact Dropdown Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-56"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-3 shadow-xl border border-slate-200/50">
                    {dropdownItems.map((item, index) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          className="block px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-100/80 rounded-lg transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {t(item.key)}
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div
                      className="mt-2 pt-2 border-t border-slate-200/70"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: dropdownItems.length * 0.05, duration: 0.2 }}
                    >
                      <div className="px-4 py-2">
                        <LanguageSwitcher />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
