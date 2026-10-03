'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  Mail,
  User as UserIcon,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    register(name, email);
    router.push('/account');
  };

  return (
    <div className="bg-cream min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-card">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-10 h-10 rounded-2xl bg-forest flex items-center justify-center text-lime font-black text-xl shadow-card">
              ∞
            </div>
            <span className="text-2xl font-black tracking-tight text-forest-deep">
              Looply
            </span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Create your Looply account
          </h2>
          <p className="text-xs text-slate-500">
            Enjoy 100% Zero Deposit rentals & free 2-hour doorstep deliveries
          </p>
        </div>

        {/* Benefits banner */}
        <div className="p-3.5 rounded-2xl bg-mint-light/60 border border-mint/40 text-xs text-forest space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-4 h-4 text-forest" />
            <span>Instant Soft Identity Verification</span>
          </div>
          <p className="text-[11px] text-slate-600">
            No credit score footprint. Never freeze large deposit holds on your debit/credit card.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Eleanor Campbell"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="you@example.co.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-forest hover:bg-forest-hover text-white font-black text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>Create Account (£0 Deposit)</span>
            <ArrowRight className="w-4 h-4 text-lime" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-bold text-forest underline hover:text-forest-dark">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
