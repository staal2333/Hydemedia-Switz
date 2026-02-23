"use client";

import { BarChart3, Clock, MapPin, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
  {
    icon: BarChart3,
    text: "250K+ Impressionen/Tag",
    subtext: "Auf unseren Premium-Standorten in Dänemark",
  },
  {
    icon: Clock,
    text: "Antwort in 24h",
    subtext: "Schnelle & persönliche Beratung",
  },
  {
    icon: MapPin,
    text: "Bewährt in Dänemark",
    subtext: "Kopenhagen, Aarhus & weitere Städte",
  },
  {
    icon: CheckCircle,
    text: "Alles inklusive",
    subtext: "Von Planung bis Abbau – ein Ansprechpartner",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-12 bg-white/50 border-y border-slate-200/50">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <badge.icon className="w-8 h-8 md:w-10 md:h-10 text-slate-700 mb-3" />
              <div className="font-semibold text-slate-900 text-sm md:text-base mb-1">
                {badge.text}
              </div>
              <div className="text-xs md:text-sm text-slate-600">
                {badge.subtext}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
