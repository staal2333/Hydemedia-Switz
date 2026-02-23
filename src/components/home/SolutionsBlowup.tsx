"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const solutions = [
  {
    key: "scaffolding",
    title: "Gerüstwerbung",
    cta: "Gerüstwerbung entdecken",
    href: "/fuer-marken",
    image: "/Scaffolding-banner.jpg",
  },
  {
    key: "facade",
    title: "Fassadenwerbung",
    cta: "Fassadenwerbung entdecken",
    href: "/fuer-marken",
    image: "/images/solutions/Facade-banner.avif",
  },
];

export default function SolutionsBlowup() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1280);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-16 md:py-24 lg:py-40 relative overflow-hidden">
      {!isMobile && (
        <>
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-100/20 rounded-full blur-3xl animate-float-cloud" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-sky-50/25 rounded-full blur-3xl animate-float-cloud" style={{ animationDelay: "5s" }} />
        </>
      )}

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-3 md:mb-4">
            Unsere Lösungen
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto px-4">
            Zwei Formate, eine Mission: Ihre Marke unvergesslich sichtbar machen –
            auf Gerüsten und Fassaden in der ganzen Schweiz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {solutions.map((solution, index) => (
            <Link key={solution.key} href={solution.href} className="group block touch-manipulation">
              <motion.div
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: isMobile ? 0 : index * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={!isMobile ? { y: -8 } : {}}
                className="relative aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl"
              >
                <Image
                  src={solution.image}
                  alt={solution.title}
                  fill
                  loading="lazy"
                  quality={60}
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/20" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-10">
                  <motion.div
                    initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: isMobile ? 0 : index * 0.2 + 0.3, duration: 0.6 }}
                    className="space-y-4"
                  >
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight leading-tight">
                      {solution.title}
                    </h3>
                    <div className="inline-flex items-center text-sm md:text-base font-semibold text-white/95 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 group">
                      {solution.cta}
                      <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
