import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';

export const USPTrustBar: React.FC = () => {
  return (
    <section className="bg-white border-y border-slate-200/80 shadow-xs relative z-10 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* USP 1 */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-mint-light/40 border border-mint/20 hover:border-mint transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-forest text-lime flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-forest">
                  Guarantee #1
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-lime text-charcoal">
                  £0.00
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight mt-0.5">
                100% Zero Deposit / No Upfront Risk
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                We never freeze your bank funds. You only pay for the exact rental days.
              </p>
            </div>
          </div>

          {/* USP 2 */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-forest/30 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-forest text-lime flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-forest">
                  Convenience #2
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-forest">
                  London & M25
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight mt-0.5">
                Free 2-Hour Delivery & Collection
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Straight to your doorstep in padded totes, collected when you’re done.
              </p>
            </div>
          </div>

          {/* USP 3 */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-mint-light/40 border border-mint/20 hover:border-mint transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-forest text-lime flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <RotateCcw className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black uppercase tracking-wider text-forest">
                  Smart Living #3
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-lime text-charcoal">
                  Save 80%+
                </span>
              </div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight mt-0.5">
                Circular Living: Save up to 80% vs Buying New
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Stop wasting thousands on gear gathering dust in closets and sheds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
