"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 md:py-20 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-bold text-xl mb-4 text-white">Hyde Media</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Spezialist für Gerüstwerbung und Fassadenwerbung – bewährt in Dänemark,
              jetzt auch in der Schweiz. Wir verbinden Marken mit erstklassigen Grossflächen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold text-lg mb-4 text-white">Lösungen</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/fuer-marken" className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  Für Marken
                </Link>
              </li>
              <li>
                <Link href="/fuer-immobilien" className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  Für Immobilieneigentümer
                </Link>
              </li>
              <li>
                <Link href="/#projekte" className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  Projekte
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-lg mb-4 text-white">Standorte</h4>
            <ul className="space-y-3 text-sm">
              <li className="text-slate-300 font-medium">Schweiz</li>
              <li className="text-slate-400 text-xs pl-3">Basel (im Aufbau)</li>
              <li className="text-slate-300 font-medium mt-3">Dänemark</li>
              <li className="text-slate-400 text-xs pl-3">Kopenhagen & Aarhus</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold text-lg mb-4 text-white">Kontakt</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-slate-400" />
                <a href="mailto:theodor.staal@hydemedia.ch" className="text-slate-300 hover:text-white transition-colors">
                  theodor.staal@hydemedia.ch
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 text-slate-400" />
                <a href="tel:+4552761185" className="text-slate-300 hover:text-white transition-colors">
                  +45 52 76 11 85
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-slate-400" />
                <span className="text-slate-300">Basel, Schweiz</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm"
        >
          <p className="text-slate-200">
            &copy; {currentYear} Hyde Media (2W ApS · CVR 45377393). Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 text-slate-200">
            <a href="https://hydemedia.dk" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">hydemedia.dk</a>
            <Link href="/kontakt" className="hover:text-white transition-colors">Kontakt</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
