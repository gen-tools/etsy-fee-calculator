"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQAccordion({ items, title, subtitle }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 p-6 md:p-8 transition-all duration-300 shadow-sm" id="faq-section">
      {(title || subtitle) && (
        <div className="mb-8 text-center max-w-2xl mx-auto">
          {title && (
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <dl className="space-y-3 max-w-3xl mx-auto">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`rounded-xl border transition-all duration-200 ${
                isOpen 
                  ? 'border-orange-200 bg-orange-50/20 dark:border-orange-500/30 dark:bg-orange-500/5' 
                  : 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700'
              }`}
            >
              <dt>
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-slate-900 dark:text-slate-100 focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-btn-${index}`}
                >
                  <span className="font-display text-base tracking-tight">{item.question}</span>
                  <span className="ml-4 flex h-6 w-6 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 group-hover:text-slate-700">
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-orange-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </span>
                </button>
              </dt>
              <dd 
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-btn-${index}`}
                className={`transition-all duration-200 overflow-hidden ${
                  isOpen ? 'max-h-96 opacity-100 border-t border-slate-100 dark:border-slate-900' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 py-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.answer}
                </div>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
