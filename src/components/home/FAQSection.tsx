'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

const FAQS = [
  {
    q: 'How does the 100% Zero Deposit policy work?',
    a: 'Unlike traditional tool hire or AV rental companies that freeze hundreds or thousands of pounds on your card, Looply performs an instant, frictionless soft identity check when you book. We never hold or block your funds — you only pay for the exact rental duration.'
  },
  {
    q: 'How does the Free 2-Hour Delivery & Collection work?',
    a: 'During checkout, you choose a 2-hour morning or afternoon delivery window (e.g. 10:00 - 12:00) and your preferred collection window. Our dedicated London EV fleet brings the gear in reusable padded totes right to your doorstep, and collects it from you when your rental period ends.'
  },
  {
    q: 'What happens if equipment gets accidentally damaged or scratched?',
    a: 'Every Looply rental includes basic accidental damage cover for normal wear and tear. Minor cosmetic scuffs, lawn debris, or normal wear are fully expected and covered. For catastrophic accidental drops, we cap customer liability at a low fixed fee rather than charging full replacement RRP.'
  },
  {
    q: 'What is PAT Safety Testing?',
    a: 'Portable Appliance Testing (PAT) is the UK gold-standard safety inspection for electrical equipment. Every single Looply electrical tool, speaker, projector, and cable undergoes certified PAT testing before leaving our London depot, accompanied by a verified safety certificate label.'
  },
  {
    q: 'What if I need the gear for an extra day?',
    a: 'Extending your rental is simple. Just head to your account or chat with our dispatch team. You will only be billed the low daily continuation rate (e.g. £9 - £18/day) with zero penalty fees.'
  },
  {
    q: 'Do I need to clean or wash down the equipment before returning?',
    a: 'Just shake off loose surface dirt or empty out excess water. Our depot features specialized industrial wash bays and steam sanitation stations, so our team handles the heavy deep cleaning and sterilization for you.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-lime text-xs font-bold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Everything you need to know about renting with Looply.
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Clear, transparent answers on zero-deposit holds, delivery slots, and accidental cover.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50/50 transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-extrabold text-slate-900 text-sm hover:text-forest transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-forest' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-5 rounded-2xl bg-mint-light/60 border border-mint/30 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-forest shrink-0" />
            <div>
              <span className="font-extrabold text-slate-900 block">
                Have a question about a specific post-code or bespoke event?
              </span>
              <span className="text-slate-600">
                Our London dispatch hub is active 7 days a week from 7am to 9pm.
              </span>
            </div>
          </div>
          <a
            href="mailto:support@looply.co.uk"
            className="px-4 py-2 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest-hover shrink-0 transition-colors"
          >
            Contact Depot
          </a>
        </div>
      </div>
    </section>
  );
};
