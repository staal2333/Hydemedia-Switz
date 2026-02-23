"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, CheckCircle2 } from "lucide-react";

const benefits = [
  { title: "Zusätzliche Einnahmen", desc: "Ihre Gerüstfassade generiert Einnahmen zur Deckung von Sanierungskosten." },
  { title: "Kein Aufwand für Sie", desc: "Wir übernehmen Vermarktung, Bewilligungen, Produktion, Montage und Abbau." },
  { title: "Wertige Optik", desc: "Hochwertige Banner verwandeln das Gerüst in einen Blickfang statt Baustellenoptik." },
  { title: "Renommierte Partner", desc: "Auf Ihrer Fassade werben etablierte Marken, die das Image stärken." },
  { title: "Keine Beschädigung", desc: "Befestigung am Gerüst, nicht an der Fassade. Rückstandsfreier Abbau." },
  { title: "Schweizweites Netzwerk", desc: "Werbepartner für Objekte in Zürich, Basel, Bern, Genf und weiteren Städten." },
];

const process = [
  { step: "01", title: "Erstgespräch & Objektprüfung", desc: "Standort, Fassadengrösse und Sanierungszeitraum besprechen." },
  { step: "02", title: "Flächenbewertung & Prognose", desc: "Werbewert und realistische Einnahmenprognose erstellen." },
  { step: "03", title: "Marke & Kampagne vermitteln", desc: "Passende Marke finden, die zu Standort und Objekt passt." },
  { step: "04", title: "Bewilligungen einholen", desc: "Behördliche Genehmigungen koordinieren." },
  { step: "05", title: "Produktion & Montage", desc: "Premium-Druck und fachgerechte Installation." },
  { step: "06", title: "Laufzeit & Abbau", desc: "Überwachung und saubere Demontage." },
];

const objectTypes = [
  { title: "Wohnhäuser", desc: "Sanierungen in zentralen Lagen mit hoher Passantenfrequenz." },
  { title: "Bürogebäude", desc: "Gewerbeimmobilien an Hauptverkehrsachsen oder Innenstadtlagen." },
  { title: "Hotels & Gastronomie", desc: "Renovationen in touristischen Zonen oder Altstadtlagen." },
  { title: "Öffentliche Gebäude", desc: "Unter Einhaltung von Denkmalschutz und Vorschriften." },
];

const safety = [
  "Zertifizierte Montageteams",
  "Kommunale Bewilligungen",
  "Statische Prüfung",
  "Versicherungsschutz",
  "Brandschutz-konforme Materialien",
  "Rückstandsfreier Abbau",
];

const faqs = [
  { q: "Entstehen mir als Eigentümer Kosten?", a: "Nein. Alle Kosten trägt die werbende Marke. Sie erhalten eine Vergütung." },
  { q: "Beeinflusst die Werbung die Sanierung?", a: "In der Regel nicht. Banner am Gerüst, nicht an der Fassade. Abstimmung mit Bauunternehmen." },
  { q: "Wie hoch sind die Einnahmen?", a: "Abhängig von Standort, Grösse und Laufzeit. Kontaktieren Sie uns für eine Einschätzung." },
  { q: "Welche Marken werben auf meiner Fassade?", a: "Nur seriöse, etablierte Marken. Sie haben ein Mitspracherecht." },
  { q: "Was bei vorzeitigem Sanierungsende?", a: "Die Laufzeit wird vertraglich festgelegt und berücksichtigt den Sanierungszeitraum." },
];

export function FuerImmobilienClient() {
  return (
    <div
      className="relative"
      style={{
        background: "linear-gradient(to bottom, rgb(224 242 254) 0%, rgb(240 249 255) 20%, rgb(248 250 252) 40%, white 100%)",
      }}
    >
      {/* Hero */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="absolute top-10 left-20 w-[400px] h-[400px] bg-sky-100/20 rounded-full blur-3xl animate-float-cloud" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-sky-50/25 rounded-full blur-3xl animate-float-cloud" style={{ animationDelay: "4s" }} />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 rounded-full text-slate-700 font-semibold text-sm mb-6 shadow-sm border border-slate-200">
              <Sparkles className="w-4 h-4" />
              Für Immobilieneigentümer
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.05] mb-6 max-w-3xl">
              Ihre Fassade. Eine neue Einnahmequelle.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mb-8">
              Während Ihr Gebäude saniert wird, verwandeln wir die Gerüstfassade in
              eine Werbefläche. Zusätzliche Einnahmen – wir übernehmen alles.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              Flächenpotenzial prüfen
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-28 relative">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Warum Fassadenwerbung für Eigentümer?
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {benefits.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              So funktioniert die Zusammenarbeit
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

      {/* Object Types */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-[300px] h-[300px] bg-sky-100/20 rounded-full blur-3xl animate-float-cloud" />
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Welche Objekte eignen sich?
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {objectTypes.map((item, index) => (
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

      {/* Safety & Compliance */}
      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8" />
              Sicherheit & Bewilligungen
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {safety.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="flex items-center gap-3 bg-slate-50 rounded-xl p-5 border border-slate-100"
              >
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="font-medium text-slate-900">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Häufige Fragen</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((item, index) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
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
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Haben Sie ein Objekt mit Potenzial?
            </h2>
            <p className="text-xl text-white mb-10 leading-relaxed">
              Kontaktieren Sie uns – wir prüfen das Potenzial und erstellen eine unverbindliche Einschätzung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-2xl hover:scale-105"
              >
                Flächenpotenzial prüfen <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="tel:+41440000000"
                className="inline-flex items-center justify-center px-10 py-5 border-2 border-white/40 text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/60 transition-all"
              >
                +41 44 000 00 00
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
