"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Project {
  id: number;
  brand: string;
  logo: string;
  city: string;
  size: string;
  duration: string;
  type: string;
  result: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    brand: "TV2",
    logo: "/images/campaigns/tv2.png",
    city: "Frederiksberg",
    size: "170 m²",
    duration: "2 Wochen",
    type: "Gerüstbanner",
    result:
      "320'000+ wöchentliche Impressionen. 45 % mehr Social-Media-Engagement während der Launchwoche der Dramaserie «KLOVN».",
    image: "/images/cases/tv2-2.jpg",
  },
  {
    id: 2,
    brand: "Lidl",
    logo: "/images/campaigns/lidl.png",
    city: "Aarhus",
    size: "50 m²",
    duration: "2 Wochen",
    type: "Fassadenwrap",
    result:
      "400'000+ wöchentliche Impressionen. 38 % mehr Laufkundschaft, 60 % über den Besucherzielen – anlässlich 20 Jahre Lidl in Dänemark.",
    image: "/images/cases/lidl-1.jpg",
  },
  {
    id: 3,
    brand: "GoMore",
    logo: "/images/campaigns/gomore.png",
    city: "Aarhus",
    size: "36 m²",
    duration: "2 Wochen",
    type: "Fassadenbanner",
    result:
      "400'000+ wöchentliche Impressionen. 34 % mehr App-Downloads und 52 % Steigerung der Markenbekanntheit bei urbanen Pendlern.",
    image: "/images/cases/gomore-1.jpg",
  },
  {
    id: 4,
    brand: "Fernet-Branca",
    logo: "/images/campaigns/fernet-branca.png",
    city: "Kopenhagen & Aarhus",
    size: "170 m² + 53 m²",
    duration: "2 Wochen",
    type: "Gerüstbanner & Fassade",
    result:
      "670'000+ kombinierte wöchentliche Impressionen in beiden Städten. 28 % mehr Distributionsanfragen im Anschluss.",
    image: "/images/cases/fernet-1.jpg",
  },
  {
    id: 5,
    brand: "Saxo Bank",
    logo: "/images/campaigns/saxo.png",
    city: "Aarhus",
    size: "50 m²",
    duration: "2 Wochen",
    type: "Fassaden- & Giebelwrap",
    result:
      "400'000+ wöchentliche Impressionen. 41 % Steigerung der gestützten Bekanntheit und 23 % mehr Consideration bei Investoren.",
    image: "/images/cases/saxo-1.jpg",
  },
  {
    id: 6,
    brand: "OLC",
    logo: "/images/campaigns/olc.png",
    city: "Aarhus",
    size: "21 m²",
    duration: "4 Wochen",
    type: "Fassadenbanner",
    result:
      "1'000'000+ Gesamtimpressionen über 4 Wochen. 37 % Steigerung der ungestützten Markenerinnerung.",
    image: "/images/cases/fernet-2.jpg",
  },
];

export default function CampaignGallery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1280);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="projekte" className="py-16 md:py-24 lg:py-40 relative overflow-hidden">
      {!isMobile && (
        <>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sky-100/20 rounded-full blur-3xl animate-float-cloud" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-sky-50/20 rounded-full blur-3xl animate-float-cloud" style={{ animationDelay: "5s" }} />
        </>
      )}

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Unsere Projekte
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            Erfolgreiche Kampagnen, die wir in Dänemark umgesetzt haben –
            mit derselben Qualität und Leidenschaft starten wir jetzt in der Schweiz.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: isMobile ? 0 : index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={!isMobile ? { y: -8, transition: { duration: 0.3 } } : {}}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                <Image
                  src={project.image}
                  alt={`${project.brand} – ${project.city}`}
                  fill
                  loading="lazy"
                  quality={75}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-semibold rounded-full">
                    {project.city}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center p-1.5">
                    <Image
                      src={project.logo}
                      alt={project.brand}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {project.brand}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500">{project.duration}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500">{project.size}</span>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{project.type}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{project.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
