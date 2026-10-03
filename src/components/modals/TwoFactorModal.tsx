'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  X,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export const TwoFactorModal: React.FC = () => {
  const { is2FAChallenged, pendingUser, verify2FA, cancel2FA, authError, expectedDemoCode } = useAuthStore();
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (is2FAChallenged && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [is2FAChallenged]);

  if (!is2FAChallenged) return null;

  const handleDigitChange = (index: number, val: string) => {
    const char = val.replace(/\D/g, '').slice(-1);
    const updated = [...digits];
    updated[index] = char;
    setDigits(updated);

    // Auto advance focus
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit if all 6 filled
    if (index === 5 && char) {
      const fullCode = updated.join('');
      verify2FA(fullCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const updated = ['', '', '', '', '', ''];
    for (let i = 0; i < pasted.length; i++) {
      updated[i] = pasted[i];
    }
    setDigits(updated);
    if (pasted.length === 6) {
      verify2FA(pasted);
    } else {
      inputRefs.current[Math.min(5, pasted.length)]?.focus();
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = digits.join('');
    verify2FA(fullCode);
  };

  const handleAutoFill = () => {
    const demo = ['1', '2', '3', '4', '5', '6'];
    setDigits(demo);
    verify2FA('123456');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8">
        {/* Cancel button */}
        <button
          onClick={cancel2FA}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Cancel 2FA"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Security Shield Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-forest/10 border-2 border-forest/20 flex items-center justify-center text-forest mb-4 relative shadow-sm">
            <ShieldAlert className="w-8 h-8 text-forest" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-lime border-2 border-white flex items-center justify-center shadow-xs">
              <KeyRound className="w-3.5 h-3.5 text-charcoal" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Two-Factor Verification
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Looply high-security verification required for account{' '}
            <span className="font-bold text-slate-800">{pendingUser?.email}</span>
          </p>
        </div>

        {/* Demo Helper Banner */}
        <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Demo TOTP Code: <strong className="font-mono text-sm">123456</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleAutoFill}
            className="px-2.5 py-1 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold text-[11px] transition-colors"
          >
            Auto-fill
          </button>
        </div>

        {/* 6-Digit Form */}
        <form onSubmit={handleManualSubmit}>
          <div className="flex justify-between gap-2 mb-6">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className="w-12 h-14 sm:w-13 sm:h-16 text-center text-2xl font-black rounded-2xl border-2 border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:border-forest focus:ring-4 focus:ring-forest/10 focus:outline-none transition-all shadow-inner"
              />
            ))}
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-forest hover:bg-forest-hover text-white font-extrabold text-sm shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-lime" />
              <span>Confirm & Access Account</span>
            </button>

            <button
              type="button"
              onClick={cancel2FA}
              className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
            >
              Cancel Login
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Looply Secure Authenticator & SMS OTP Engine</span>
        </div>
      </div>
    </div>
  );
};
