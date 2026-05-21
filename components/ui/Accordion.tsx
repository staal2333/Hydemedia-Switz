'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  q: string;
  a: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
          >
            <span className="font-semibold text-left text-slate-900">{item.q}</span>
            <ChevronDown
              className={`flex-shrink-0 w-5 h-5 text-nordic-blue transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          {openIndex === index && (
            <div className="px-6 py-4 bg-slate-50 text-slate-700 border-t border-slate-200">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
