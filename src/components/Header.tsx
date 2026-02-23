"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HydeLogo } from "./HydeLogo";

const navItems = [
  { label: "Lösungen", href: "/leistungen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

const dropdownItems = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Für Marken", href: "/fuer-marken" },
  { label: "Für Immobilieneigentümer", href: "/fuer-immobilien" },
  { label: "Projekte", href: "/#projekte" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (isHomePage) return null;

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="mx-auto flex items-center justify-between px-6 sm:px-8 lg:px-12 py-6 md:py-7 max-w-[95rem]">
        <Link href="/" className="flex-shrink-0">
          <motion.div
            className="w-32 sm:w-40 md:w-48 lg:w-56 text-slate-900 hover:opacity-70 transition-opacity"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HydeLogo />
          </motion.div>
        </Link>

        <div className="flex items-center gap-8 lg:gap-10 ml-auto">
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-slate-900">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className="text-2xl lg:text-3xl font-normal transition-opacity hover:opacity-70"
                  style={{ fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="relative">
            <motion.button
              type="button"
              className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-slate-900 text-white transition-all hover:bg-slate-800"
              onClick={() => setMenuOpen(!menuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Menü öffnen"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.svg
                    key="close"
                    className="h-6 w-6 md:h-8 md:w-8"
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
                    className="h-6 w-6 md:h-8 md:w-8"
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

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-64"
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-3 shadow-xl border border-slate-200/50">
                    {dropdownItems.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          className="block px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-100/80 rounded-lg transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
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
