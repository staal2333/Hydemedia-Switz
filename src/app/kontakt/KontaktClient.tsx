"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

export function KontaktClient() {
  const [inquiryType, setInquiryType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="relative"
      style={{
        background: "linear-gradient(to bottom, rgb(224 242 254) 0%, rgb(240 249 255) 20%, rgb(248 250 252) 40%, white 100%)",
      }}
    >
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl animate-float-cloud" />
        <div className="absolute bottom-20 left-10 w-[350px] h-[350px] bg-sky-100/25 rounded-full blur-3xl animate-float-cloud" style={{ animationDelay: "5s" }} />

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.05] mb-6">
                Kontakt
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10">
                Wir expandieren in die Schweiz und suchen Partner – ob Marke oder
                Immobilieneigentümer. Erzählen Sie uns von Ihrem Projekt und wir
                melden uns in der Regel innerhalb von 24 Stunden.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">E-Mail</p>
                    <a href="mailto:theodor.staal@hydemedia.ch" className="text-slate-600 hover:text-slate-900 transition-colors">
                      theodor.staal@hydemedia.ch
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Telefon</p>
                    <a href="tel:+4552761185" className="text-slate-600 hover:text-slate-900 transition-colors">
                      +45 52 76 11 85
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Standort</p>
                    <p className="text-slate-600">Basel, Schweiz</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Antwortzeit</p>
                    <p className="text-slate-600">In der Regel innerhalb von 24 Stunden</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-lg">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900">Was wir gerne wissen:</strong> In
                  welcher Stadt Ihr Projekt stattfindet, gewünschter Zeitraum und ob
                  Sie als Marke oder Immobilieneigentümer anfragen.
                </p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {submitted ? (
                <div className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-100 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Vielen Dank!</h3>
                  <p className="text-slate-600">Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.</p>
                </div>
              ) : (
                <form
                  className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-100"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">Unverbindliche Anfrage</h2>

                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-900 mb-1.5">Name *</label>
                        <input
                          type="text" id="name" name="name" required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm bg-white"
                          placeholder="Ihr Name"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-slate-900 mb-1.5">Unternehmen</label>
                        <input
                          type="text" id="company" name="company"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm bg-white"
                          placeholder="Firmenname"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-1.5">E-Mail *</label>
                        <input
                          type="email" id="email" name="email" required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm bg-white"
                          placeholder="ihre@email.ch"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-1.5">Telefon</label>
                        <input
                          type="tel" id="phone" name="phone"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm bg-white"
                          placeholder="+41 ..."
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-slate-900 mb-1.5">Stadt / Region *</label>
                        <input
                          type="text" id="city" name="city" required
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm bg-white"
                          placeholder="z.B. Zürich, Basel"
                        />
                      </div>
                      <div>
                        <label htmlFor="type" className="block text-sm font-medium text-slate-900 mb-1.5">Art der Anfrage *</label>
                        <select
                          id="type" name="type" required value={inquiryType}
                          onChange={(e) => setInquiryType(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm bg-white"
                        >
                          <option value="">Bitte wählen</option>
                          <option value="marke">Marke / Kampagne</option>
                          <option value="immobilie">Immobilieneigentümer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-1.5">Projektbeschreibung</label>
                      <textarea
                        id="message" name="message" rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm resize-none bg-white"
                        placeholder="Erzählen Sie uns kurz von Ihrem Projekt..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all text-base shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
                    >
                      Anfrage absenden
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                      Wir melden uns in der Regel innerhalb von 24 Stunden.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
