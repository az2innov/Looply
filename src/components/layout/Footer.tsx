import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle2,
  Lock,
  HeartHandshake
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Highlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 border-b border-slate-800">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-forest flex items-center justify-center text-lime shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                100% Zero Deposit Hold
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We never freeze your funds. You only pay for the exact rental days with instant soft-identity verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-forest flex items-center justify-center text-lime shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                Free 2-Hour Doorstep Delivery
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose a 2-hour delivery and return collection window. Cleaned, sanitized, and PAT tested before every drop-off.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-forest flex items-center justify-center text-lime shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">
                Circular Living: Save up to 80%
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Why buy gear you use twice a year? Eliminate clutter, save hundreds of pounds, and protect the planet.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
          {/* Brand Info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <div className="w-9 h-9 rounded-2xl bg-forest flex items-center justify-center text-lime font-black text-lg shadow-card">
                ∞
              </div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                Looply
                <span className="w-2 h-2 rounded-full bg-lime inline-block"></span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Access premium tools, event sound rigs, and cinema gear on demand. Delivered to your door across London & the M25 with £0 deposit.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-lime" />
                Trustpilot 4.9 / 5.0
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5 font-medium">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                100% PAT Safety Certified
              </span>
            </div>
          </div>

          {/* Column 1: Gear Library */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Rent by Category
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#catalog" className="text-slate-400 hover:text-white transition-colors">
                  Pressure Washers & Cleaning
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="text-slate-400 hover:text-white transition-colors">
                  Parties & PA Sound Systems
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="text-slate-400 hover:text-white transition-colors">
                  DIY & Power Tools
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="text-slate-400 hover:text-white transition-colors">
                  4K Projectors & AV Kits
                </Link>
              </li>
              <li>
                <Link href="/#catalog" className="text-slate-400 hover:text-white transition-colors">
                  Curated Weekend Bundles
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: How It Works */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              The Looply Way
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/#timeline" className="text-slate-400 hover:text-white transition-colors">
                  Zero Deposit Policy
                </Link>
              </li>
              <li>
                <Link href="/#timeline" className="text-slate-400 hover:text-white transition-colors">
                  2-Hour Delivery Slots
                </Link>
              </li>
              <li>
                <Link href="/#savings" className="text-slate-400 hover:text-white transition-colors">
                  Savings Calculator
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-slate-400 hover:text-white transition-colors">
                  Accidental Damage Cover
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-slate-400 hover:text-white transition-colors">
                  PAT Electrical Testing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Security */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Platform & Security
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/admin" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1">
                  <span>Admin Backoffice</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-900/60 text-lime font-mono">v1.0</span>
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>2FA Security Setup</span>
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-slate-400 hover:text-white transition-colors">
                  Customer Portal
                </Link>
              </li>
              <li>
                <span className="text-xs text-slate-500 block pt-1">
                  Registered in England & Wales • VAT GB 432 998 12
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Looply Rentals Ltd. All rights reserved. Access over ownership.</p>
          <div className="flex items-center gap-6">
            <span>London Depot: Units 4-6 River Gardens, SE10 0FZ</span>
            <span className="text-slate-400 font-mono">Currency: £ GBP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
