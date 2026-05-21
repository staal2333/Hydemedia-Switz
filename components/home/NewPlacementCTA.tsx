'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

const placements = [
  {
    key: 'bredgade',
    image: '/images/placements/scaffolding-bredgade.png',
    alt: 'Bredgade 71 – 140m² stilladsreklame København K',
    address: 'Bredgade 71, København K',
    size: '140m²',
  },
  {
    key: 'norrebrogade',
    image: '/images/placements/scaffolding-norrebrogade.png',
    alt: 'Nørrebrogade 195 – 160m² stilladsreklame',
    address: 'Nørrebrogade 195, København N',
    size: '160m²',
  },
];

export default function NewPlacementCTA() {
  const t = useTranslations('home.newPlacements');
  const locale = useLocale();

  return (
    <section className="py-6 md:py-8">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-5">
          {placements.map((p, i) => (
            <Link key={p.key} href={`/${locale}/scaffolding`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative overflow-hidden rounded-2xl bg-slate-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer group h-full"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {t('badge')}
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1.5">
                    {t(`${p.key}.title`)}
                  </h3>
                  <div className="flex items-center gap-2 text-blue-300 text-sm mb-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{p.address}</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                    {t(`${p.key}.description`)}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 text-xs">
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full">{p.size}</span>
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full">{t(`${p.key}.traffic`)}</span>
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full">{t(`${p.key}.weeks`)}</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                    {t('cta')}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
