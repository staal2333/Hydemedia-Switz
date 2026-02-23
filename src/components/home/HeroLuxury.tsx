"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { HydeLogo } from "../HydeLogo";
import { useState, useEffect } from "react";

const HeroBuildingScene = dynamic(
  () => import("./HeroBuildingScene"),
  { ssr: false }
);

const navItems = [
  { label: "Projekte", href: "/#projekte" },
  { label: "Über uns", href: "/#team" },
  { label: "Kontakt", href: "/kontakt" },
];

const dropdownItems = [
  { label: "Für Marken", href: "/fuer-marken" },
  { label: "Für Eigentümer", href: "/fuer-immobilien" },
  { label: "Projekte", href: "/#projekte" },
  { label: "Über uns", href: "/#team" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function HeroLuxury() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1280);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute top-0 left-0 right-0 h-[55vh] bg-gradient-to-b from-sky-200/20 via-sky-100/15 to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none z-[2]">
        <div className="absolute top-[10%] left-[15%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-sky-200/20 rounded-full blur-3xl animate-float-cloud" />
        <div className="hidden md:block absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-sky-100/25 rounded-full blur-3xl animate-float-cloud" style={{ animationDelay: "4s" }} />
        <div className="hidden md:block absolute bottom-[15%] left-[30%] w-[350px] h-[350px] bg-white/20 rounded-full blur-3xl animate-float-cloud" style={{ animationDelay: "8s" }} />
      </div>

      {/* Navigation */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
        <div className="mx-auto max-w-[1800px] px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6 md:py-8">
          <div className="flex items-center justify-end gap-4 sm:gap-6 md:gap-10 pointer-events-auto">
            <nav className="hidden md:flex items-center gap-6 lg:gap-10 xl:gap-14" style={{ maxWidth: "562px" }}>
              {navItems.map((item, index) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}>
                  <Link href={item.href} className="text-black transition-opacity hover:opacity-60 whitespace-nowrap" style={{ fontWeight: 400, fontSize: "clamp(16px, 2vw, 23px)", letterSpacing: "0" }}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="relative">
              <motion.button type="button" className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-black text-white transition-all hover:bg-gray-900 shadow-md touch-manipulation" onClick={() => setMenuOpen(!menuOpen)} whileHover={!isMobile ? { scale: 1.05 } : {}} whileTap={{ scale: 0.95 }} aria-label="Menü">
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.svg key="close" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </motion.svg>
                  ) : (
                    <motion.svg key="menu" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div className="absolute top-full right-0 mt-3 w-56 sm:w-64" initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}>
                    <div className="glass-blue rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-2xl border border-white/30 backdrop-blur-xl">
                      {dropdownItems.map((item, index) => (
                        <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05, duration: 0.2 }}>
                          <Link href={item.href} className="block px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-black hover:bg-white/50 rounded-xl sm:rounded-2xl transition-all" onClick={() => setMenuOpen(false)}>
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
      </div>

      {/* 3D Building Scene */}
      <div className="absolute inset-0 z-[3]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full"
        >
          <HeroBuildingScene />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen pointer-events-none">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="absolute top-20 sm:top-16 left-4 sm:left-8 lg:left-16 w-[75%] sm:w-[65%] md:w-[52%] lg:w-[48%] xl:w-[45%] max-w-4xl pointer-events-auto" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.04))", willChange: "transform" }}>
          <Link href="/" className="block text-black hover:opacity-90 transition-opacity duration-500" aria-label="Home">
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <HydeLogo />
            </motion.div>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }} className="absolute top-[24vh] sm:top-[26vh] md:top-[28vh] left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-8 md:right-12 lg:right-24 max-w-[85%] sm:max-w-[500px]">
          <h1
            className="leading-none whitespace-pre-line text-slate-900"
            style={{
              fontSize: "44px",
              fontWeight: 600,
              letterSpacing: "0em",
              lineHeight: "1.1",
              maxWidth: "488px",
            }}
          >
            {`Gerüstwerbung &\nFassadenwerbung\n– jetzt in der Schweiz`}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-32 sm:bottom-36 md:bottom-40 left-4 sm:left-8 md:left-12 lg:left-20 max-w-[85%] sm:max-w-md pointer-events-auto"
        >
          <p
            className="text-slate-700"
            style={{
              fontSize: "clamp(16px, 2.5vw, 23px)",
              fontWeight: 600,
              letterSpacing: "0",
              lineHeight: "1.5",
            }}
          >
            Aus Dänemark bewährt, für die Schweiz bereit. Grossflächenwerbung auf Gerüsten und Fassaden – Vollservice aus einer Hand.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-12 sm:bottom-14 md:bottom-16 right-4 sm:right-8 md:right-12 lg:right-24 flex flex-col sm:flex-row gap-3 sm:gap-4 w-auto pointer-events-auto"
        >
          <Link href="/fuer-marken" className="inline-flex items-center justify-center bg-black text-white px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium shadow-lg transition-all hover:bg-gray-900 hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap touch-manipulation min-h-[48px]" style={{ borderRadius: "50px", fontWeight: 500 }}>
            Für Marken
          </Link>
          <Link href="/fuer-immobilien" className="inline-flex items-center justify-center bg-black text-white px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium shadow-lg transition-all hover:bg-gray-900 hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap touch-manipulation min-h-[48px]" style={{ borderRadius: "50px", fontWeight: 500 }}>
            Für Immobilieneigentümer
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
