"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Wrench,
  Users,
  CheckCircle2,
  TrendingUp,
  Shield,
  Coins,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const specialistBenefits = [
  {
    icon: Wrench,
    text: "Strategische Beratung zu Standorten, Formaten und Botschaften – basierend auf unserer Erfahrung aus Dutzenden Kampagnen in Dänemark.",
  },
  {
    icon: Users,
    text: "Persönlicher Ansprechpartner für jedes Projekt. Kein Call-Center, sondern direkte Kommunikation auf Augenhöhe.",
  },
  {
    icon: CheckCircle2,
    text: "Vollservice von A bis Z: Planung, Gestaltung, Bewilligungen, Produktion, Montage, Reporting und Abbau.",
  },
];

const brandBenefits = [
  {
    icon: TrendingUp,
    text: "Enorme Reichweite und Aufmerksamkeit durch Grossflächen in hochfrequentierten Lagen.",
  },
  {
    icon: Shield,
    text: "Exklusive Platzierung – keine Konkurrenz auf der gleichen Fläche, volle Markenpräsenz.",
  },
  {
    icon: CheckCircle2,
    text: "Kreative Unterstützung bei der Adaption Ihrer Sujets für das Grossformat.",
  },
];

const ownerBenefits = [
  {
    icon: Coins,
    text: "Zusätzliche Einnahmen ohne Aufwand – Ihre Gerüstfassade wird zur Werbefläche.",
  },
  {
    icon: CheckCircle2,
    text: "Wir kümmern uns um alle Bewilligungen und koordinieren mit Ihrem Bauunternehmen.",
  },
  {
    icon: Shield,
    text: "Professionelle Abwicklung mit zertifizierten Montageteams und Versicherungsschutz.",
  },
];

export default function SpecialistsAndAudience() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-sky-100/25 rounded-full blur-3xl animate-float-cloud" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-sky-50/20 rounded-full blur-3xl animate-float-cloud" style={{ animationDelay: "4s" }} />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 md:mb-32"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 backdrop-blur-sm rounded-full text-slate-700 font-semibold text-sm mb-6 shadow-sm border border-slate-200"
            >
              <Sparkles className="w-4 h-4" />
              Bewährtes Modell aus Dänemark
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Spezialisten für Grossflächen
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Wir sind keine allgemeine Werbeagentur. Wir sind auf Gerüst- und
              Fassadenwerbung spezialisiert – mit einem Modell, das sich in Dänemark
              vielfach bewährt hat. Dieses Know-how bringen wir jetzt in die Schweiz.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {specialistBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                    <div className="absolute inset-0 bg-slate-100/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 h-full">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-slate-700 leading-relaxed text-base">
                        {benefit.text}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-24 md:mb-32"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Für Marken & Immobilieneigentümer
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-light">
            Zwei Zielgruppen, ein gemeinsames Ziel: das Beste aus jeder Fläche herausholen.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            <div className="relative bg-white rounded-3xl p-10 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 h-full flex flex-col">
              <div className="relative flex-1 flex flex-col">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  Für Marken
                </h3>
                <div className="space-y-4 mb-8 flex-1">
                  {brandBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div key={index} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }} className="flex items-start gap-4 rounded-xl p-4 bg-slate-50 border border-slate-100">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-slate-700" />
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base">
                          {benefit.text}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
                <Link href="/fuer-marken" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-lg">
                  Mehr erfahren <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            <div className="relative bg-white rounded-3xl p-10 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 h-full flex flex-col">
              <div className="relative flex-1 flex flex-col">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center flex-shrink-0">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  Für Eigentümer
                </h3>
                <div className="space-y-4 mb-8 flex-1">
                  {ownerBenefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.div key={index} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }} className="flex items-start gap-4 rounded-xl p-4 bg-slate-50 border border-slate-100">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-slate-700" />
                        </div>
                        <p className="text-slate-600 leading-relaxed text-base">
                          {benefit.text}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
                <Link href="/fuer-immobilien" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all shadow-lg">
                  Mehr erfahren <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
