'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Maximize2, Building2, ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const solutions = [
  {
    key: 'scaffolding',
    icon: Maximize2,
    benefits: [
      'Flexible placement on scaffolding structures',
      'Cost-effective for short to mid-term campaigns',
      'High visibility in traffic hubs',
      'Quick deployment & setup',
    ],
    specs: {
      'Formats': '10m × 30m typical',
      'Material': 'Heavy-duty mesh or vinyl',
      'Locations': 'Copenhagen, Frederiksberg, Aarhus',
      'Min Duration': '3 months',
    },
  },
  {
    key: 'facade',
    icon: Building2,
    benefits: [
      'Maximum impact with large-format design',
      'Premium locations on building facades',
      'Professional installation & removal',
      'Long-term brand visibility',
    ],
    specs: {
      'Formats': 'Up to 500m²',
      'Material': 'UV-resistant vinyl',
      'Locations': 'Prime city center buildings',
      'Min Duration': '6 months',
    },
  },
];

export default function ServicesDetail() {
  const t = useTranslations('solutions');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <div className="space-y-24">
      {solutions.map((solution, index) => {
        const Icon = solution.icon;
        const isReversed = index % 2 === 1;

        return (
          <motion.div
            key={solution.key}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              isReversed ? 'lg:grid-flow-dense' : ''
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            {/* Image/Visual Column */}
            <div className={`${isReversed ? 'lg:col-start-2' : ''}`}>
              <Card className="p-8 bg-gradient-to-br from-sky-50 to-slate-50">
                <div className="aspect-video flex items-center justify-center">
                  <Icon className="w-32 h-32 text-nordic-blue" strokeWidth={1.5} />
                </div>
              </Card>
            </div>

            {/* Content Column */}
            <div className={`${isReversed ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: isReversed ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold text-slate-900 mb-4">
                  {t(`${solution.key}.headline`)}
                </h2>
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  {t(`${solution.key}.body`)}
                </p>

                {/* Benefits List */}
                <div className="mb-6">
                  <h3 className="font-semibold text-slate-900 mb-3">Key Benefits:</h3>
                  <ul className="space-y-2">
                    {solution.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-slate-700">
                        <ArrowRight className="w-5 h-5 text-nordic-blue flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Specs */}
                <div className="mb-8">
                  <h3 className="font-semibold text-slate-900 mb-3">Specifications:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(solution.specs).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <div className="font-medium text-slate-900">{key}</div>
                        <div className="text-slate-600">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button href={`/${locale}/contact`} variant="primary" size="lg">
                  {tCommon('getStarted')}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

