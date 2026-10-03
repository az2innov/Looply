'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, authError, currentUser } = useAuthStore();
  const [email, setEmail] = useState('admin@looply.co.uk');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      router.push('/admin');
    }
    // If requires2FA is true, the global TwoFactorModal automatically triggers!
  };

  const handleDemoFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
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
            Sign in to your account
          </h2>
          <p className="text-xs text-slate-500">
            Access your zero-deposit gear rentals & delivery schedules
          </p>
        </div>

        {/* Demo Switcher Pill */}
        <div className="p-3.5 rounded-2xl bg-mint-light/60 border border-mint/40 text-xs text-forest space-y-2">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-4 h-4 text-forest" />
            <span>Quick Login Presets (with 2FA):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill('admin@looply.co.uk')}
              className="px-2.5 py-1 rounded-lg bg-forest text-white font-bold text-[11px] hover:bg-forest-hover transition-colors"
            >
              Admin (2FA Enabled)
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('oliver.j@example.co.uk')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-bold text-[11px] hover:bg-slate-50 transition-colors"
            >
              Customer (2FA Enabled)
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Password
              </label>
              <a href="#" className="text-[11px] text-forest hover:underline font-semibold">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
              />
            </div>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-forest hover:bg-forest-hover text-white font-black text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4 text-lime" />
          </button>
        </form>

        {/* 2FA Reassurance Note */}
        <div className="pt-2 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-forest" />
            <span>Protected by Looply Two-Factor Security (2FA)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Accounts with 2FA will be prompted for their 6-digit TOTP code.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Don&apos;t have an account yet?{' '}
          <Link href="/auth/register" className="font-bold text-forest underline hover:text-forest-dark">
            Register with £0 Deposit
          </Link>
        </div>
      </div>
    </div>
  );
}
