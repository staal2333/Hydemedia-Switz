"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";

const benefits = [
  {
    title: "Unvergleichliche Grösse",
    desc: "Einzelne Flächen von 50 bis über 500 Quadratmetern – Ihre Botschaft dominiert das Stadtbild.",
  },
  {
    title: "Langfristige Präsenz",
    desc: "Kampagnen von 4 bis 16 Wochen. Tausende Kontakte pro Tag über einen langen Zeitraum.",
  },
  {
    title: "Exklusiver Standort",
    desc: "Keine Konkurrenz auf der gleichen Fläche. Ihre Marke besetzt den Standort allein.",
  },
  {
    title: "Hohe Aufmerksamkeit",
    desc: "Grossflächen auf Gerüsten durchbrechen die Werbe-Routine und bleiben im Gedächtnis.",
  },
  {
    title: "Sozialer Multiplikator",
    desc: "Spektakuläre Werbung wird fotografiert und geteilt – kostenlose Reichweite über Social Media.",
  },
  {
    title: "Flexible Formate",
    desc: "Von Bannerstreifen bis zur vollflächigen Verhüllung – passend zu Budget und Ziel.",
  },
];

const process = [
  { step: "01", title: "Briefing & Strategieberatung", desc: "Kampagnenziele, Zielgruppen, Regionen und Budgetrahmen klären." },
  { step: "02", title: "Standortauswahl & Verfügbarkeit", desc: "Verfügbare Flächen mit Fotos, Massen, Laufzeiten und Frequenzdaten." },
  { step: "03", title: "Kreative Umsetzung & Produktion", desc: "Motiv-Adaption für Grossformat, Druck auf Premium-Material." },
  { step: "04", title: "Bewilligungen & Montage", desc: "Behördliche Genehmigungen und fachgerechte Installation." },
  { step: "05", title: "Reporting & Abbau", desc: "Fotodokumentation, Reichweitendaten und sauberer Abbau." },
];

const scenarios = [
  { title: "Produktlaunch", desc: "Maximale Aufmerksamkeit an Hauptverkehrsachsen – hunderttausende Blickkontakte." },
  { title: "Rebranding & Image", desc: "Neues Corporate Design verdient eine Bühne – 200 m² in der Zürcher Innenstadt." },
  { title: "Saisonale Promotions", desc: "Weihnachtskampagnen, Sommer-Specials – sofortige Sichtbarkeit." },
  { title: "Employer Branding", desc: "Grossfläche am neuen Firmensitz oder in der Nähe von Hochschulen." },
];

const faqs = [
  { q: "Wie lange dauert es von der Anfrage bis zur fertigen Kampagne?", a: "In der Regel 4 bis 6 Wochen, abhängig von Standortverfügbarkeit und Bewilligungsprozessen." },
  { q: "Muss ich eigenes Bildmaterial mitbringen?", a: "Idealerweise ja. Unser Team unterstützt bei der Adaption auf das Grossformat." },
  { q: "In welchen Städten sind Flächen verfügbar?", a: "Zürich, Basel, Bern, Genf, Lausanne, Luzern, Zug und weitere Standorte." },
  { q: "Was kostet eine Kampagne?", a: "Abhängig von Standort, Grösse und Laufzeit. Kontaktieren Sie uns für eine unverbindliche Offerte." },
  { q: "Kann ich mit anderen OOH-Formaten kombinieren?", a: "Absolut. Gerüstwerbung als Ankerpunkt, ergänzt durch City-Lights, Plakate oder DOOH." },
];

export function FuerMarkenClient() {
  return (
    <div
      className="relative"
      style={{
        background: "linear-gradient(to bottom, rgb(224 242 254) 0%, rgb(240 249 255) 20%, rgb(248 250 252) 40%, white 100%)",
      }}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-[400px] h-[400px] bg-sky-100/20 rounded-full blur-3xl animate-float-cloud" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-sky-50/25 rounded-full blur-3xl animate-float-cloud" style={{ animationDelay: "4s" }} />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 rounded-full text-slate-700 font-semibold text-sm mb-6 shadow-sm border border-slate-200">
              <Sparkles className="w-4 h-4" />
              Für Marken
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.05] mb-6 max-w-3xl">
              Ihre Marke. Die grössten Flächen der Schweiz.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mb-8">
              Gerüst- und Fassadenwerbung ist das wirkungsvollste Format, um Ihre Marke
              im urbanen Raum grossflächig sichtbar zu machen. Wir sind Ihr
              Vollservice-Partner für OOH-Kampagnen in der gesamten Schweiz.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              Kampagne planen
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Warum Gerüstwerbung für Ihre Marke?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Dimensionen, die kein anderes OOH-Format erreicht.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 group"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Von der Idee bis zur fertigen Kampagne
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-10">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex gap-6 items-start"
              >
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg">
                  <span className="text-lg font-bold text-white">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-10 left-20 w-[300px] h-[300px] bg-sky-100/20 rounded-full blur-3xl animate-float-cloud" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Typische Szenarien für Marken
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {scenarios.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Häufige Fragen
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
              >
                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-600/15 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Bereit für Ihre Grossflächenkampagne?
            </h2>
            <p className="text-xl text-white mb-10 max-w-2xl mx-auto leading-relaxed">
              Kontaktieren Sie uns für eine unverbindliche Beratung und massgeschneiderte Offerte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-2xl hover:scale-105"
              >
                Angebot anfordern <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
