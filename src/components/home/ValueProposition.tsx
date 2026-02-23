"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const features = [
  {
    title: "Strategische Standorte",
    description:
      "Wir identifizieren und sichern hochfrequentierte Flächen – so wie wir es in Kopenhagen und Aarhus erfolgreich praktizieren.",
  },
  {
    title: "Massgeschneiderte Kampagnen",
    description:
      "Von der Motivgestaltung bis zur Flächenauswahl – jede Kampagne wird individuell auf Ihre Marke und Ziele zugeschnitten.",
  },
  {
    title: "Bewilligungen & Montage",
    description:
      "Wir koordinieren alle behördlichen Genehmigungen und arbeiten mit professionellen, zertifizierten Montageteams.",
  },
  {
    title: "Transparentes Reporting",
    description:
      "Fotodokumentation, Reichweitenschätzungen und detaillierte Abschlussberichte – volle Transparenz über Ihre Kampagne.",
  },
];

export default function ValueProposition() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-32 lg:py-40 relative overflow-hidden bg-transparent">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-16 relative z-10">
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <motion.div
            ref={videoRef}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ flex: "0 0 300px", maxWidth: "300px" }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900 shadow-xl sticky top-24" style={{ aspectRatio: "9/16", maxHeight: "500px" }}>
              {shouldLoadVideo ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="/images/about/building-campaign.mp4" type="video/mp4" />
                </video>
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-slate-400" />
                </div>
              )}
            </div>
          </motion.div>

          <div style={{ flex: "1 1 0%", minWidth: "0" }} className="space-y-8 lg:space-y-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight text-slate-900"
              style={{ letterSpacing: "-0.02em", lineHeight: "1.2" }}
            >
              So arbeiten wir – von der Idee bis zum fertigen Banner
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-0 border-t border-l border-slate-200"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative p-6 lg:p-8 xl:p-10 border-r border-b border-slate-200 bg-white hover:bg-slate-50/50 transition-colors duration-300"
                >
                  <h3
                    className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 mb-3"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
