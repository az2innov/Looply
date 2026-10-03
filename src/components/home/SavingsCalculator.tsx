'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Sparkles,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Zap,
  ShoppingBag
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { INITIAL_PRODUCTS } from '@/data/mockData';

const COMPARISON_ITEMS = [
  {
    product: INITIAL_PRODUCTS[0], // Kärcher K5
    usesPerYear: 1,
    storageImpact: 'Takes up 0.5m³ garage / cupboard space',
  },
  {
    product: INITIAL_PRODUCTS[8], // JBL PartyBox 710
    usesPerYear: 2,
    storageImpact: 'Bulky 32kg heavy box sitting unused 360 days/year',
  },
  {
    product: INITIAL_PRODUCTS[12], // Epson 4K Projector
    usesPerYear: 2,
    storageImpact: 'Depreciates 40% year 1, bulb degrades in storage',
  },
  {
    product: INITIAL_PRODUCTS[9], // Chocolate Fountain
    usesPerYear: 1,
    storageImpact: 'Messy commercial cleaning and storage headaches',
  }
];

export const SavingsCalculator: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const { addItem } = useCartStore();

  const selected = COMPARISON_ITEMS[selectedIdx];
  const prod = selected.product;

  const buyCost = prod.rrpBuying;
  const rentCost = prod.baseRentalPrice28h;
  const netSavings = buyCost - rentCost;
  const savingsPercent = Math.round((netSavings / buyCost) * 100);

  return (
    <section id="savings" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/30 border border-lime text-charcoal text-xs font-black mb-3">
            <Sparkles className="w-3.5 h-3.5 text-forest" />
            <span>CIRCULAR LIVING CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Stop buying gear you only need for 28 hours.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            The average UK household stores £1,800+ of specialized equipment used less than twice a year. See how much you save with Looply.
          </p>
        </div>

        {/* Item Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {COMPARISON_ITEMS.map((item, idx) => (
            <button
              key={item.product.id}
              onClick={() => setSelectedIdx(idx)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-2 ${
                idx === selectedIdx
                  ? 'bg-forest text-lime shadow-md scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{item.product.name.split(' ')[0]} {item.product.category}</span>
            </button>
          ))}
        </div>

        {/* Main Side-by-Side Comparison Matrix */}
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Traditional Buying */}
            <div className="p-6 rounded-3xl bg-white border border-rose-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-extrabold text-xs">
                  Option A: Buying New
                </span>
                <XCircle className="w-5 h-5 text-rose-500" />
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 leading-snug">
                  {prod.name}
                </h4>
                <div className="text-3xl font-black text-slate-900 mt-2">
                  £{buyCost.toFixed(2)}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  High upfront capital outlay
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Huge cash hit frozen on your credit card</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>{selected.storageImpact}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>You pay for repairs, replacement parts, & PAT checks</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>Depreciates 50%+ in 18 months</span>
                </div>
              </div>
            </div>

            {/* Right: Looply Zero-Deposit Rental */}
            <div className="p-6 rounded-3xl bg-forest text-white shadow-xl space-y-4 relative overflow-hidden ring-2 ring-lime/50">
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-lime/20 blur-xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-lime text-charcoal font-black text-xs">
                  Option B: Looply 28h Rental
                </span>
                <CheckCircle2 className="w-5 h-5 text-lime" />
              </div>

              <div>
                <h4 className="text-lg font-black text-white leading-snug">
                  Rent When You Need It
                </h4>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-lime">
                    £{rentCost.toFixed(2)}
                  </span>
                  <span className="text-xs text-emerald-200">
                    (First 28 hours)
                  </span>
                </div>
                <div className="text-xs text-emerald-300 font-semibold mt-0.5">
                  Deposit: £0.00 (Never frozen)
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-emerald-800/80 text-xs text-slate-200">
                <div className="flex items-start gap-2">
                  <span className="text-lime font-bold">✓</span>
                  <span>Free 2-Hour Delivery & Collection straight to door</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lime font-bold">✓</span>
                  <span>100% PAT Safety Certified before every handover</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lime font-bold">✓</span>
                  <span>Zero cupboard clutter: collected immediately when done</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-lime font-bold">✓</span>
                  <span>Accidental damage cover included</span>
                </div>
              </div>

              {/* Instant Savings Badge */}
              <div className="pt-2">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-300 uppercase tracking-wider block">
                      Instant Cash Saved
                    </span>
                    <span className="text-base font-black text-lime">
                      £{netSavings.toFixed(2)} ({savingsPercent}%)
                    </span>
                  </div>
                  <button
                    onClick={() => addItem(prod)}
                    className="px-4 py-2 rounded-xl btn-lime text-charcoal font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Rent Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
