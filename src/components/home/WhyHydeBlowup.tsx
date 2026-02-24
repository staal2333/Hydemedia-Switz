"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";

const teamMembers = [
  { name: "Mads Rønn Olesen", role: "Direktor" },
  { name: "Louis Lerche", role: "Sales & Relations" },
  { name: "Sebastian Staal", role: "Partner" },
  { name: "Theodor Staal", role: "Country Manager Schweiz" },
];

const benefits = [
  "Erfolgreiche Kampagnen für TV2, Lidl, Saxo Bank, Fernet-Branca u.v.m.",
  "Über 250'000 tägliche Impressionen auf unseren dänischen Standorten",
  "Vollservice: Planung, Druck, Montage, Bewilligungen, Abbau",
  "Persönliche Betreuung – ein Ansprechpartner für Ihr Projekt",
  "Eigener Country Manager für die Schweiz vor Ort",
];

export default function WhyHydeBlowup() {
  return (
    <section id="team" className="py-24 md:py-40 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-sky-100/20 rounded-full blur-3xl animate-float-cloud" />
      <div className="absolute bottom-20 right-10 w-[350px] h-[350px] bg-sky-50/25 rounded-full blur-3xl animate-float-cloud" style={{ animationDelay: "5s" }} />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Left: Team photos */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Group photo */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-slate-200/40 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/50">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/images/about/team-full.png"
                    alt="Das Hyde Media Team – Mads, Sebastian, Louis und Theodor"
                    fill
                    loading="lazy"
                    quality={90}
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              </div>
            </div>

            {/* Team names row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-slate-100 shadow-sm"
                >
                  <p className="font-semibold text-slate-900 text-sm">{member.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{member.role}</p>
                </motion.div>
              ))}
            </div>

            {/* Country Manager highlight */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-6 bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-lg"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-md ring-2 ring-white">
                <Image
                  src="/images/about/theodor-staal.png"
                  alt="Theodor Staal – Country Manager Schweiz"
                  fill
                  quality={90}
                  className="object-cover object-top"
                  sizes="112px"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Ihr Ansprechpartner in der Schweiz</p>
                <p className="text-xl font-bold text-slate-900">Theodor Staal</p>
                <p className="text-sm text-slate-600 mb-2">Country Manager Schweiz</p>
                <a href="mailto:theodor.staal@hydemedia.dk" className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium underline underline-offset-2">
                  theodor.staal@hydemedia.dk
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
              Warum Hyde Media?
            </h2>

            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              Seit 2025 setzen wir in Dänemark erfolgreiche Grossflächen-Kampagnen
              für namhafte Marken um. Jetzt bringen wir unser Know-how in die Schweiz –
              mit eigenem Country Manager vor Ort und demselben Fokus auf Qualität und Transparenz.
            </p>

            <ul className="space-y-5 mb-10">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  className="flex items-start text-slate-900 font-semibold text-base md:text-lg"
                >
                  <Check className="w-6 h-6 mr-4 text-slate-900 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  {benefit}
                </motion.li>
              ))}
            </ul>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/kontakt"
                className="inline-flex items-center px-8 py-4 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl group"
              >
                Kontakt aufnehmen
                <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
