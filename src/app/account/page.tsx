'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  QrCode,
  Copy,
  CheckCircle2,
  Smartphone,
  Truck,
  Package,
  Clock,
  User as UserIcon,
  MapPin,
  Lock,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useAdminStore } from '@/store/useAdminStore';

export default function AccountPage() {
  const { currentUser, enable2FA, disable2FA, updateProfile } = useAuthStore();
  const { orders } = useAdminStore();

  const [copiedKey, setCopiedKey] = useState(false);
  const [activeTab, setActiveTab] = useState<'security' | 'orders' | 'profile'>('security');

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Please sign in to view your account</h2>
        <Link
          href="/auth/login"
          className="px-6 py-3 rounded-2xl bg-forest text-white font-bold text-xs hover:bg-forest-hover inline-block"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  // Filter orders for this customer (or all mock orders for demo viewing)
  const userOrders = orders.filter(
    (o) => o.email.toLowerCase() === currentUser.email.toLowerCase()
  );
  const displayOrders = userOrders.length > 0 ? userOrders : orders.slice(0, 2);

  const handleCopySecret = () => {
    navigator.clipboard.writeText(currentUser.twoFactorSecret || 'JBSWY3DPEHPK3PXP');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Profile Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-forest text-lime font-black text-2xl flex items-center justify-center shadow-card relative">
              {currentUser.name.charAt(0)}
              {currentUser.twoFactorEnabled && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                  <ShieldCheck className="w-3 h-3 text-white" />
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900">
                  {currentUser.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-100 text-slate-700">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{currentUser.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                    currentUser.twoFactorEnabled
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {currentUser.twoFactorEnabled ? '2FA Protection Enabled' : '2FA Recommended'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-mint-light text-forest flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Identity Soft-Verified (£0 Deposit)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-hover text-white text-xs font-bold transition-all shadow-sm"
            >
              Open Admin Backoffice
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
              activeTab === 'security'
                ? 'bg-forest text-lime shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Two-Factor Security (2FA)
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
              activeTab === 'orders'
                ? 'bg-forest text-lime shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            My Rentals & Deliveries
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
              activeTab === 'profile'
                ? 'bg-forest text-lime shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
          >
            Address & Delivery Preferences
          </button>
        </div>

        {/* Tab 1: Two-Factor Security (2FA) */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left: 2FA Status & Toggle */}
            <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
                    <KeyRound className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Two-Factor Authentication (2FA)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Add a mandatory 6-digit TOTP verification layer to your account
                    </p>
                  </div>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => (currentUser.twoFactorEnabled ? disable2FA() : enable2FA())}
                  className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shadow-xs ${
                    currentUser.twoFactorEnabled
                      ? 'bg-rose-100 hover:bg-rose-200 text-rose-800'
                      : 'bg-forest hover:bg-forest-hover text-white'
                  }`}
                >
                  {currentUser.twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA Now'}
                </button>
              </div>

              {currentUser.twoFactorEnabled ? (
                <div className="space-y-4 pt-2">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1">
                    <div className="flex items-center gap-2 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>2FA Layer Active & Enforced</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      Every time you log in or authorize sensitive rental actions, Looply will require a 6-digit code from your authenticator app (Google Authenticator, Microsoft Authenticator, etc.).
                    </p>
                  </div>

                  {/* Secret Key Display */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Authenticator Secret Key (Base32)
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs font-bold text-slate-800 truncate">
                        {currentUser.twoFactorSecret || 'JBSWY3DPEHPK3PXP'}
                      </div>
                      <button
                        onClick={handleCopySecret}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedKey ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Backup recovery codes */}
                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Emergency Recovery Codes
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold text-slate-700">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">8841-9921</div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">3104-5829</div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">7201-4412</div>
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center">9012-6638</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <ShieldAlert className="w-4 h-4 text-amber-700" />
                    <span>2FA Currently Disabled</span>
                  </div>
                  <p className="text-slate-600">
                    We strongly encourage activating 2FA to safeguard your rental reservations and delivery schedules.
                  </p>
                </div>
              )}
            </div>

            {/* Right: Authenticator App QR Simulation */}
            <div className="md:col-span-5 bg-gradient-to-br from-forest-deep via-forest to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full bg-lime text-charcoal font-black text-xs uppercase tracking-wider">
                  Authenticator Setup
                </span>
                <h3 className="text-xl font-black text-white mt-3">
                  Scan QR with your phone
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Works with Google Authenticator, 1Password, Authy or Apple Passwords.
                </p>
              </div>

              {/* QR Code Container Simulation */}
              <div className="bg-white p-4 rounded-2xl shadow-xl w-44 h-44 mx-auto flex flex-col items-center justify-center text-slate-900">
                <QrCode className="w-32 h-32 text-slate-900" />
                <span className="text-[10px] font-bold text-slate-400 mt-1">otpauth://looply</span>
              </div>

              <div className="text-center text-xs text-slate-300">
                <p>
                  Test code during login: <strong className="text-lime font-mono">123456</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders & Deliveries */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <h3 className="text-lg font-black text-slate-900">
              Active Rentals & Past Deliveries
            </h3>

            <div className="space-y-4">
              {displayOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <span className="font-mono text-xs font-black text-slate-900">
                        {ord.orderNumber}
                      </span>
                      <span className="text-xs text-slate-500 ml-2">
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black ${
                          ord.status === 'Active Loan'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'Dispatched'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-200 text-slate-800'
                        }`}
                      >
                        {ord.status}
                      </span>
                      <span className="font-black text-forest text-sm">
                        £{ord.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Items in this order */}
                  <div className="space-y-2">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">
                          {it.productName} ({it.rentalDays} days)
                        </span>
                        <span className="text-slate-500 font-mono">
                          £{it.itemTotal.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Delivery & Driver metadata */}
                  <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-forest" />
                      <span>Delivery: <strong>{ord.deliveryDate} ({ord.deliverySlot})</strong></span>
                    </div>
                    {ord.driverAssigned && (
                      <div className="flex items-center gap-1.5 text-forest font-semibold">
                        <UserIcon className="w-3.5 h-3.5" />
                        <span>Driver: {ord.driverAssigned}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>£0 Deposit Held</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Address & Preferences */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
            <h3 className="text-lg font-black text-slate-900">
              Address & Delivery Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={currentUser.name}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  defaultValue={currentUser.email}
                  className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">UK Postcode</label>
                <input
                  type="text"
                  defaultValue={currentUser.postcode || 'TW10 6QX'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold uppercase"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Primary Address</label>
                <input
                  type="text"
                  defaultValue={currentUser.address || '42 Richmond Hill, Richmond'}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-hover text-white text-xs font-bold transition-all"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
