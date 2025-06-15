"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  id: string;
  question: string | React.ReactNode;
  answer: string | React.ReactNode;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "Here are the most common questions we receive.",
  faqs,
  className = "",
}: FAQSectionProps) {
  return (
    <section className={`w-full py-20 ${className}`} id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="container mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white/5 rounded-lg border border-white/10"
              >
                <AccordionTrigger className="px-6 py-4 cursor-pointer hover:text-blue-300 text-white [&[data-state=open]]:text-blue-300">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-left md:text-2xl text-lg md:tracking-wider">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <div className="text-gray-300 md:text-xl text-md leading-relaxed">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
