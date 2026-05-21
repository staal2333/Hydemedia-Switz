'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CaseStudy {
  id: number;
  name: string;
  logo: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  duration: string;
  type: string;
}

export default function CampaignGallery() {
  const t = useTranslations('home.campaigns');
  const tModal = useTranslations('home.campaigns.modal');
  const tCases = useTranslations('home.campaigns.cases');
  const prefersReducedMotion = useReducedMotion();
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1280); // Tablets count as mobile
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset image index when modal opens
  const handleOpenCase = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
    setCurrentImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedCase(null);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (selectedCase && currentImageIndex < selectedCase.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Client case studies with details - now using translations
  const clients: CaseStudy[] = [
    { 
      id: 1, 
      name: tCases('tv2.name'),
      logo: '/images/campaigns/tv2.png',
      title: tCases('tv2.title'),
      description: tCases('tv2.description'),
      images: ['/images/cases/tv2-1.jpg', '/images/cases/tv2-2.jpg'],
      location: tCases('tv2.location'),
      duration: tCases('tv2.duration'),
      type: tCases('tv2.type')
    },
    { 
      id: 2, 
      name: tCases('lidl.name'),
      logo: '/images/campaigns/lidl.png',
      title: tCases('lidl.title'),
      description: tCases('lidl.description'),
      images: ['/images/cases/lidl-1.jpg'],
      location: tCases('lidl.location'),
      duration: tCases('lidl.duration'),
      type: tCases('lidl.type')
    },
    { 
      id: 3, 
      name: tCases('gomore.name'),
      logo: '/images/campaigns/gomore.png',
      title: tCases('gomore.title'),
      description: tCases('gomore.description'),
      images: ['/images/cases/gomore-1.jpg', '/images/cases/gomore-2.jpg'],
      location: tCases('gomore.location'),
      duration: tCases('gomore.duration'),
      type: tCases('gomore.type')
    },
    { 
      id: 4, 
      name: tCases('moderaterne.name'),
      logo: '/images/campaigns/moderaterne.png',
      title: tCases('moderaterne.title'),
      description: tCases('moderaterne.description'),
      images: ['/images/cases/moderaterne-1.png'],
      location: tCases('moderaterne.location'),
      duration: tCases('moderaterne.duration'),
      type: tCases('moderaterne.type')
    },
    { 
      id: 5, 
      name: tCases('fernetBranca.name'),
      logo: '/images/campaigns/fernet-branca.png',
      title: tCases('fernetBranca.title'),
      description: tCases('fernetBranca.description'),
      images: ['/images/cases/fernet-1.jpg', '/images/cases/fernet-2.jpg'],
      location: tCases('fernetBranca.location'),
      duration: tCases('fernetBranca.duration'),
      type: tCases('fernetBranca.type')
    },
    { 
      id: 6, 
      name: tCases('saxo.name'),
      logo: '/images/campaigns/saxo.png',
      title: tCases('saxo.title'),
      description: tCases('saxo.description'),
      images: ['/images/cases/saxo-1.JPG', '/images/cases/saxo-2.JPG'],
      location: tCases('saxo.location'),
      duration: tCases('saxo.duration'),
      type: tCases('saxo.type')
    },
    { 
      id: 7, 
      name: tCases('olc.name'),
      logo: '/images/campaigns/olc.png',
      title: tCases('olc.title'),
      description: tCases('olc.description'),
      images: ['/images/cases/olc-1.png'],
      location: tCases('olc.location'),
      duration: tCases('olc.duration'),
      type: tCases('olc.type')
    },
    { 
      id: 8, 
      name: tCases('lederne.name'),
      logo: '/images/campaigns/lederne.png',
      title: tCases('lederne.title'),
      description: tCases('lederne.description'),
      images: ['/images/cases/lederne-1.png', '/images/cases/lederne-2.png', '/images/cases/lederne-3.png', '/images/cases/lederne-4.png'],
      location: tCases('lederne.location'),
      duration: tCases('lederne.duration'),
      type: tCases('lederne.type')
    },
    { 
      id: 9, 
      name: tCases('vios.name'),
      logo: '/images/campaigns/vios.png',
      title: tCases('vios.title'),
      description: tCases('vios.description'),
      images: ['/images/cases/vios-1.JPEG', '/images/cases/vios-2.JPEG'],
      location: tCases('vios.location'),
      duration: tCases('vios.duration'),
      type: tCases('vios.type')
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-40 relative bg-paper">

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
        <motion.h2
          initial={prefersReducedMotion || isMobile ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-12 md:mb-16 text-center uppercase tracking-tight"
        >
          {t('title')}
        </motion.h2>

        {/* Logo Grid - Now clickable with proper touch targets */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-16">
          {clients.map((client, index) => (
            <motion.button
              key={client.id}
              onClick={() => handleOpenCase(client)}
              initial={prefersReducedMotion || isMobile ? { opacity: 1 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: isMobile ? 0 : index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={!isMobile && !prefersReducedMotion ? { y: -8, scale: 1.05, transition: { duration: 0.3 } } : {}}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 flex items-center justify-center border border-slate-100 cursor-pointer touch-manipulation min-h-[120px] min-w-[120px]"
              aria-label={`View ${client.name} case study`}
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={200}
                loading="lazy"
                quality={isMobile ? 75 : 85}
                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 20vw"
                className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out bg-white"
                unoptimized={client.logo.includes('lederne') || client.logo.includes('vios')}
              />
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300" />
            </motion.button>
          ))}
        </div>

        {/* Case Study Modal with Carousel */}
        <Modal isOpen={!!selectedCase} onClose={handleCloseModal}>
          {selectedCase && (
            <div className="p-2 md:p-3 lg:p-4">
              {/* Header with logo - Very compact */}
              <div className="flex items-center gap-2 md:gap-3 mb-2 pb-2 border-b border-slate-200">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg shadow-sm p-1 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={selectedCase.logo}
                    alt={selectedCase.name}
                    width={48}
                    height={48}
                    quality={90}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base md:text-lg font-bold text-slate-900 mb-0.5 truncate">
                    {selectedCase.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 text-[10px] md:text-xs text-slate-600">
                    <span className="inline-flex items-center gap-0.5">
                      📍 {selectedCase.location}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      ⏱️ {selectedCase.duration}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      🏢 {selectedCase.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description - Very compact */}
              <p className="text-xs md:text-sm text-slate-700 leading-snug mb-2">
                {selectedCase.description}
              </p>

              {/* Image Carousel - Maximum space for image */}
              <div className="space-y-1.5 md:space-y-2">
                <h4 className="text-sm md:text-base font-semibold text-slate-900 mb-1">
                  {tModal('campaignImages')}
                </h4>
                
                {/* Main Image with Navigation - Wide aspect, object-contain to show full image */}
                <div className="relative aspect-[16/7] md:aspect-[16/6] rounded-lg overflow-hidden bg-slate-100 mb-1.5">
                  <Image
                    src={selectedCase.images[currentImageIndex]}
                    alt={`${selectedCase.name} campaign ${currentImageIndex + 1}`}
                    fill
                    priority
                    quality={90}
                    sizes="95vw"
                    className={`object-contain ${
                      selectedCase.name === 'TV2' && currentImageIndex === 0 ? 'rotate-90' : ''
                    }`}
                  />
                  
                  {/* Navigation Arrows - only show if multiple images */}
                  {selectedCase.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        disabled={currentImageIndex === 0}
                        className={`absolute left-1 md:left-2 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all ${
                          currentImageIndex === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-white hover:scale-110'
                        }`}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4 text-slate-900" />
                      </button>
                      
                      <button
                        onClick={handleNextImage}
                        disabled={currentImageIndex === selectedCase.images.length - 1}
                        className={`absolute right-1 md:right-2 top-1/2 -translate-y-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all ${
                          currentImageIndex === selectedCase.images.length - 1
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-white hover:scale-110'
                        }`}
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4 text-slate-900" />
                      </button>

                      {/* Image counter */}
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-medium">
                        {currentImageIndex + 1}/{selectedCase.images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Strip - only show if multiple images */}
                {selectedCase.images.length > 1 && (
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {selectedCase.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`relative flex-shrink-0 w-14 h-10 md:w-16 md:h-11 rounded-sm overflow-hidden transition-all ${
                          index === currentImageIndex
                            ? 'ring-2 ring-blue-500 scale-105'
                            : 'opacity-60 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          quality={60}
                          sizes="64px"
                          className={`object-cover ${
                            selectedCase.name === 'TV2' && index === 0 ? 'rotate-90' : ''
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA - Minimal spacing */}
              <div className="mt-2 md:mt-3 pt-2 border-t border-slate-200 text-center">
                <p className="text-[10px] md:text-xs text-slate-600 mb-1.5">
                  {tModal('interestedText')}
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 md:px-5 py-1.5 md:py-2 bg-slate-900 text-white rounded-full hover:bg-slate-700 transition-colors font-semibold text-xs md:text-sm"
                >
                  {tModal('contactButton')}
                  <span className="text-xs">→</span>
                </Link>
              </div>
            </div>
          )}
        </Modal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/cases"
            className="inline-flex items-center text-lg font-semibold text-slate-900 hover:text-slate-600 transition-colors group"
          >
            {t('viewAll')}
            <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
