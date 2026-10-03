'use client';

import React, { useState } from 'react';
import {
  CalendarDays,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PackageCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  {
    step: 1,
    title: 'Pick your dates',
    subtitle: 'From a 28-hour weekend blast to a full month project',
    badge: 'Step 1 • Total Flexibility',
    icon: CalendarDays,
    description: 'Select exactly how long you need the gear. Our unique 28-hour weekend base rental gives you extra buffer time without charging a second full day. 100% Zero deposit hold on your card.',
    details: [
      'Transparent 28h starter rate + low fixed daily rate after',
      '£0 deposit hold: you only pay for the rental days',
      'Instant soft ID check without credit impact',
      'Reschedule dates anytime up to 4 hours before dispatch'
    ],
    highlight: '28h Weekend Base Rate + £0 Deposit'
  },
  {
    step: 2,
    title: 'Free 2-Hour Delivery',
    subtitle: 'Delivered in padded reusable totes, fully PAT safety tested',
    badge: 'Step 2 • Doorstep Handover',
    icon: Truck,
    description: 'Choose your preferred 2-hour morning or afternoon delivery window. Our friendly London EV drivers deliver the sanitized, tested equipment right to your door with full accessories and user manuals.',
    details: [
      'Live GPS driver tracking and SMS notification before arrival',
      '100% PAT tested with valid safety certificate sticker',
      'Supplied in weatherproof eco-friendly protective crates',
      'All drill bits, hoses, and power cables included ready to use'
    ],
    highlight: 'Tracked 2-Hour Window & PAT Certified'
  },
  {
    step: 3,
    title: 'Free Pack & Return Collection',
    subtitle: 'Just put it back in the tote — we collect straight from your doorstep',
    badge: 'Step 3 • Zero Hassle Return',
    icon: RotateCcw,
    description: 'When your rental wraps up, simply pop the equipment back in the reusable Looply tote. Our driver returns at your chosen 2-hour slot to collect it. No postage labels, no post office queues, zero hassle.',
    details: [
      'Driver collects directly from your flat or house',
      'No need to wash down or scrub — we deep sanitize at depot',
      'Instant return receipt sent to your email & SMS',
      'Earn Looply Circular Credits for every rental completed'
    ],
    highlight: 'No Cleaning Required & Free Doorstep Pickup'
  }
];

export const InteractiveTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const current = STEPS.find((s) => s.step === activeStep) || STEPS[0];
  const IconComponent = current.icon;

  return (
    <section id="timeline" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-forest text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-forest" />
            <span>HOW LOOPLY WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Rent top-tier gear in 3 effortless steps.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Designed for urban living: No storage required, no frozen deposits, no post office trips.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {STEPS.map((s) => {
            const isCurrent = s.step === activeStep;
            const StepIcon = s.icon;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step)}
                className={`p-5 rounded-3xl text-left border transition-all relative overflow-hidden ${
                  isCurrent
                    ? 'bg-white border-forest shadow-card ring-2 ring-forest/10'
                    : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                {isCurrent && (
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-forest" />
                )}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                      isCurrent ? 'bg-forest text-lime' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs font-black px-2.5 py-1 rounded-full ${
                      isCurrent
                        ? 'bg-lime text-charcoal'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    Step 0{s.step}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                  {s.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Showcase Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left detail */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-lime text-xs font-black tracking-wide">
                <IconComponent className="w-3.5 h-3.5" />
                <span>{current.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {current.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {current.description}
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {current.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-mint shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-700 leading-snug">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/#catalog"
                  className="px-6 py-3.5 rounded-2xl bg-forest hover:bg-forest-hover text-white font-black text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <span>Browse Available Gear</span>
                  <ArrowRight className="w-4 h-4 text-lime" />
                </Link>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-forest" />
                  <span>{current.highlight}</span>
                </div>
              </div>
            </div>

            {/* Right preview graphic / card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-forest-deep via-forest to-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-lime/10 blur-2xl" />

              <div className="relative space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                    Live Dispatch Simulator
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-lime text-charcoal font-black text-[10px]">
                    2-Hour Slot
                  </span>
                </div>

                {activeStep === 1 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                      <div className="text-xs text-slate-300">Selected Rental Window</div>
                      <div className="text-lg font-black text-lime mt-1">Friday 14:00 → Saturday 18:00</div>
                      <div className="text-xs text-slate-400 mt-0.5">28-Hour Weekend Flex Rate</div>
                    </div>
                    <div className="flex justify-between items-center text-xs px-1">
                      <span>Deposit Hold Amount:</span>
                      <span className="font-black text-lime">£0.00 (Zero)</span>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                      <div className="text-xs text-slate-300">Driver En Route</div>
                      <div className="text-lg font-black text-white mt-1">Dave Miller • Electric Transit</div>
                      <div className="text-xs text-emerald-300 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Estimated arrival: 10:24 AM (Slot 10:00 - 12:00)</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 text-xs text-slate-300">
                      Equipment PAT Safety Certificate: <strong>#PAT-2026-994</strong> (Passed)
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                      <div className="text-xs text-slate-300">Doorstep Collection</div>
                      <div className="text-lg font-black text-white mt-1">No packaging or labels needed</div>
                      <div className="text-xs text-slate-300 mt-1">
                        Driver collects directly from your doorstep at your booked 2-hour window.
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs px-1">
                      <span>Return Fee:</span>
                      <span className="font-black text-lime">FREE (£0.00)</span>
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Carbon-neutral electric fleet</span>
                  <PackageCheck className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
