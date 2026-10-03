'use client';

import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  AlertCircle,
  Truck,
  ShieldCheck,
  X,
  Clock,
  Sparkles
} from 'lucide-react';
import { usePostcodeStore } from '@/store/usePostcodeStore';

const QUICK_POSTCODES = [
  { code: 'SW1A 1AA', label: 'Westminster (2hr Slot)' },
  { code: 'E1 6AN', label: 'Shoreditch (2hr Slot)' },
  { code: 'TW10 6QX', label: 'Richmond (2hr Slot)' },
  { code: 'NW1 4RY', label: 'Camden (2hr Slot)' },
  { code: 'CR0 1EA', label: 'Croydon M25 (2hr Slot)' },
  { code: 'M1 1AD', label: 'Manchester (Next-day)' },
];

export const PostcodeModal: React.FC = () => {
  const { isModalOpen, closeModal, postcode, result, checkPostcode } = usePostcodeStore();
  const [inputVal, setInputVal] = useState(postcode || '');
  const [hasSearched, setHasSearched] = useState(false);

  if (!isModalOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;
    checkPostcode(inputVal);
    setHasSearched(true);
  };

  const handleQuickSelect = (code: string) => {
    setInputVal(code);
    checkPostcode(code);
    setHasSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-mint-light flex items-center justify-center text-forest">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Check UK Delivery Eligibility
            </h3>
            <p className="text-xs text-slate-500">
              Free 2-Hour Delivery & Collection straight to your doorstep
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSearch} className="mt-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value.toUpperCase())}
                placeholder="Enter UK Postcode (e.g. SW1A 1AA)"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent uppercase tracking-wider text-sm transition-all"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-forest hover:bg-forest-hover text-white font-bold text-sm shadow-md transition-all shrink-0"
            >
              Verify
            </button>
          </div>

          {/* Quick presets */}
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Quick test postcodes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_POSTCODES.map((p) => (
                <button
                  type="button"
                  key={p.code}
                  onClick={() => handleQuickSelect(p.code)}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 hover:bg-mint-light hover:text-forest text-slate-700 font-medium transition-colors"
                >
                  {p.code}
                </button>
              ))}
            </div>
          </div>
        </form>

        {/* Result Card */}
        {result && (
          <div
            className={`p-4 rounded-2xl border transition-all ${
              result.eligible
                ? 'bg-mint-light/60 border-mint/40 text-forest'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            <div className="flex items-start gap-3">
              {result.eligible ? (
                <CheckCircle2 className="w-5 h-5 text-mint mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
              )}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900">
                    {result.code}:
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">
                    {result.areaName || 'Coverage Confirmed'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {result.message}
                </p>
                {result.eligible && (
                  <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-700">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-forest" />
                      {result.estimatedHours <= 2 ? '2-Hour Delivery Slot' : 'Next-Day Delivery'}
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                      £0 Security Deposit
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Modal Action CTA */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>London Central Depot dispatch</span>
          </div>
          <button
            onClick={closeModal}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
