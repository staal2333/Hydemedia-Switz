'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Ruler, Calendar, TrendingUp } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  location: string;
  size: string;
  duration: string;
  status: 'available' | 'booked' | 'coming-soon';
  traffic: string;
  image: string;
}

export default function ProductCard({
  id,
  name,
  location,
  size,
  duration,
  status,
  traffic,
  image,
}: ProductCardProps) {
  const statusColors = {
    available: 'bg-green-500',
    booked: 'bg-red-500',
    'coming-soon': 'bg-blue-500',
  };

  const statusLabels = {
    available: 'Available',
    booked: 'Booked',
    'coming-soon': 'Coming Soon',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -12 }}
      className="group"
    >
      <Link href={`/placement/${id}`} className="block">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl mb-4 bg-slate-200 group-hover:shadow-2xl transition-shadow duration-300">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Status badge */}
          <div className="absolute top-4 right-4 z-10">
            <motion.span 
              className={`${statusColors[status]} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg`}
              whileHover={{ scale: 1.1 }}
            >
              {statusLabels[status]}
            </motion.span>
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="space-y-3 bg-white/60 backdrop-blur-sm rounded-xl p-5 group-hover:bg-white/80 transition-colors duration-300">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>

          <div className="space-y-2.5 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 flex-shrink-0" />
              <span>{size}</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{duration}</span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 flex-shrink-0" />
              <span>{traffic}</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
              View Details
              <span className="ml-1 group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
