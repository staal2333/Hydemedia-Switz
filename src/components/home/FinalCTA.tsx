"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Clock } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-600/15 rounded-full blur-3xl" />

      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
            <Clock className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              Antwort innerhalb von 24 Stunden
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Bereit für die Schweiz?
          </h2>

          <p className="text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed">
            Wir suchen Marken und Immobilieneigentümer, die gemeinsam mit uns
            Grossflächenwerbung in der Schweiz lancieren möchten. Kontaktieren Sie uns
            für ein unverbindliches Gespräch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-2xl hover:scale-105"
            >
              Kontakt aufnehmen <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <a
              href="tel:+41772338121"
              className="inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-white/40 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/60 transition-all"
            >
              <Phone className="mr-2 w-5 h-5" /> Jetzt anrufen
            </a>
          </div>

          <p className="text-white mt-8 text-sm">
            theodor.staal@hydemedia.dk · +41 77 233 81 21 · Hauptstrasse 30, 4127 Birsfelden
          </p>
        </motion.div>
      </div>
    </section>
  );
}
