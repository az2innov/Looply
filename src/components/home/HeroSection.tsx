'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Star
} from 'lucide-react';
import { usePostcodeStore } from '@/store/usePostcodeStore';
import { useAdminStore } from '@/store/useAdminStore';

export const HeroSection: React.FC = () => {
  const { heroSlides } = useAdminStore();
  const activeSlides = heroSlides.filter((s) => s.active);
  const [currentIdx, setCurrentIdx] = useState(0);

  const { postcode, checkPostcode, openModal } = usePostcodeStore();
  const [postcodeInput, setPostcodeInput] = useState('');
  const [quickChecked, setQuickChecked] = useState(false);

  // Auto rotate slides
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  const slide = activeSlides[currentIdx] || activeSlides[0];

  const handlePostcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcodeInput.trim()) {
      openModal();
      return;
    }
    checkPostcode(postcodeInput);
    setQuickChecked(true);
    openModal();
  };

  return (
    <section className="relative overflow-hidden bg-forest-deep text-white pt-8 pb-16 lg:py-20 transition-colors duration-500">
      {/* Background glow & gradients */}
      <div className="absolute inset-0 bg-radial-gradient from-forest/40 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-mint/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-lime/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline, USPs & Instant Postcode Checker */}
          <div className="lg:col-span-7 space-y-6">
            {/* Seasonal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
              <span>{slide.badge}</span>
            </div>

            {/* Dynamic Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Access premium gear.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime via-mint to-emerald-300">
                Zero deposit.
              </span>{' '}
              Free doorstep delivery & return.
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Why buy gear you’ll use twice a year? Rent industrial Kärcher pressure washers, 800W JBL party rigs, and 4K projectors delivered with 2-hour slots in London & M25.
            </p>

            {/* Instant Postcode Checker Input */}
            <div className="pt-2">
              <form
                onSubmit={handlePostcodeSubmit}
                className="bg-white/10 backdrop-blur-md p-2 rounded-3xl border border-white/20 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-xl"
              >
                <div className="relative flex-1 flex items-center">
                  <MapPin className="absolute left-4 w-5 h-5 text-lime" />
                  <input
                    type="text"
                    value={postcodeInput}
                    onChange={(e) => setPostcodeInput(e.target.value.toUpperCase())}
                    placeholder="Enter UK Postcode (e.g. SW1A, E1, TW10)"
                    className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-slate-400 font-semibold focus:outline-none uppercase tracking-wider text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl btn-lime text-charcoal font-black text-sm flex items-center justify-center gap-2 shadow-lime-glow shrink-0 active:scale-95"
                >
                  <span>Check 2hr Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-400 pl-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>London & M25 2-Hour Delivery • £0 Deposit Hold Guaranteed</span>
              </div>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-3 max-w-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-lime shrink-0">
                  <Star className="w-4 h-4 fill-current text-lime" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-white">Trustpilot 4.9</div>
                  <div className="text-[10px] text-slate-400">Over 850+ reviews</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-lime shrink-0">
                  <ShieldCheck className="w-4 h-4 text-lime" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-white">Zero Deposit</div>
                  <div className="text-[10px] text-slate-400">Never freeze funds</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-lime shrink-0">
                  <Zap className="w-4 h-4 text-lime" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-white">PAT Certified</div>
                  <div className="text-[10px] text-slate-400">100% Safety tested</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Hero Carousel Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-slate-900 aspect-[4/3] sm:aspect-[16/11] group">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Slide Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full bg-forest/80 backdrop-blur-md text-lime text-xs font-black border border-lime/30 shadow-md">
                    {slide.highlightTag}
                  </span>
                  <div className="flex gap-1.5">
                    {activeSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIdx(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === currentIdx ? 'w-6 bg-lime' : 'w-2 bg-white/40'
                        }`}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                    {slide.subtitle}
                  </p>

                  {/* Micro stats banner */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center mb-3">
                    {slide.stats.map((st, idx) => (
                      <div key={idx} className="border-r last:border-r-0 border-white/10 px-1">
                        <div className="text-[10px] text-slate-300 font-medium">{st.label}</div>
                        <div className="text-xs font-black text-lime">{st.value}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={slide.ctaLink}
                    className="w-full py-3 rounded-xl bg-white text-slate-900 hover:bg-lime font-black text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Prev / Next controls */}
              <button
                onClick={() => setCurrentIdx((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentIdx((prev) => (prev + 1) % activeSlides.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-opacity opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
