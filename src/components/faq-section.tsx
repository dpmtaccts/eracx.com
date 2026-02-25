"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  heading?: string;
}

export default function FAQSection({ faqs, heading = "Frequently Asked Questions" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
          {heading}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-border rounded-xl overflow-hidden bg-card"
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-sm md:text-base font-medium text-foreground">
                  {faq.question}
                </span>
                <svg
                  className={`shrink-0 w-5 h-5 text-muted transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
