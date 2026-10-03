'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Tag,
  TrendingUp,
  ShieldCheck,
  Truck,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Search,
  ExternalLink,
  Sliders,
  Sparkles,
  Zap,
  RotateCcw,
  Lock,
  KeyRound,
  Mail,
  AlertCircle,
  RefreshCw,
  LogOut,
  Send
} from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Product, OrderStatus, Category, HeroSlide, DiscountCode } from '@/types';

type AdminTab = 'overview' | 'catalog' | 'orders' | 'carousel' | 'users' | 'discounts';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const {
    products,
    orders,
    heroSlides,
    discountCodes,
    users,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    updateOrderStatus,
    assignDriver,
    addHeroSlide,
    toggleHeroSlide,
    deleteHeroSlide,
    addDiscountCode,
    toggleDiscountCode,
    deleteDiscountCode,
    verifyUserIdentity,
    toggleUser2FA,
    getStats,
  } = useAdminStore();

  const {
    currentUser,
    isAuthenticated,
    isAdmin2FAVerified,
    login,
    verify2FA,
    logout,
    send2FAEmailCode,
    cancel2FA,
    authError,
  } = useAuthStore();

  const stats = getStats();

  // Search & Filters state
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Admin Auth Gate State
  const [adminEmail, setAdminEmail] = useState('admin@looply.co.uk');
  const [adminPassword, setAdminPassword] = useState('password123');
  const [adminStep, setAdminStep] = useState<'credentials' | '2fa'>('credentials');
  const [adminDigits, setAdminDigits] = useState(['', '', '', '', '', '']);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [mailSentNotice, setMailSentNotice] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (adminStep === '2fa' && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [adminStep]);

  // Handle Admin Credentials Login
  const handleAdminLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setMailSentNotice(null);

    const res = await login(adminEmail, adminPassword);
    setIsAuthLoading(false);

    if (res.requires2FA) {
      setAdminStep('2fa');
      setMailSentNotice(`A 6-digit security code was dispatched to ${adminEmail} via Mailtrap SMTP. Check your Mailtrap inbox!`);
    }
  };

  // Handle Digit changes
  const handleDigitChange = (index: number, val: string) => {
    const char = val.replace(/\D/g, '').slice(-1);
    const updated = [...adminDigits];
    updated[index] = char;
    setAdminDigits(updated);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && char) {
      const full = updated.join('');
      handleAdminVerifyCode(full);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !adminDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleAdminVerifyCode = async (codeToVerify?: string) => {
    const code = codeToVerify || adminDigits.join('');
    setIsAuthLoading(true);
    await verify2FA(code);
    setIsAuthLoading(false);
  };

  const handleResendMailtrapCode = async () => {
    setIsAuthLoading(true);
    const code = await send2FAEmailCode(adminEmail);
    setIsAuthLoading(false);
    setMailSentNotice(`New verification email dispatched to ${adminEmail} via Mailtrap! (OTP: ${code || 'sent'})`);
  };

  const handleAutoFillAdminCode = async () => {
    setAdminDigits(['1', '2', '3', '4', '5', '6']);
    setIsAuthLoading(true);
    await verify2FA('123456');
    setIsAuthLoading(false);
  };

  // Modals for CRUD
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductData, setNewProductData] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'Cleaning',
    brand: '',
    tagline: '',
    description: '',
    specifications: ['Commercial grade motor', 'PAT tested safety cable'],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
    gallery: ['https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80'],
    baseRentalPrice28h: 25.00,
    dailyRateAfter: 12.00,
    rrpBuying: 399.00,
    rating: 5.0,
    reviewsCount: 1,
    inStock: true,
    stockCount: 5,
    patTested: true,
    popular: false,
    featured: false,
    tags: ['New Gear', 'London Depot'],
  });

  const [showAddDiscountModal, setShowAddDiscountModal] = useState(false);
  const [newDiscountData, setNewDiscountData] = useState<Omit<DiscountCode, 'id' | 'usageCount'>>({
    code: '',
    discountType: 'percentage',
    value: 15,
    minOrder: 25,
    expiresAt: '2026-12-31',
    active: true,
  });

  const [showAddSlideModal, setShowAddSlideModal] = useState(false);
  const [newSlideData, setNewSlideData] = useState<Omit<HeroSlide, 'id'>>({
    badge: 'Limited Promo',
    title: 'Festival Sound Rig Weekend',
    subtitle: 'High-power speakers & disco gear with £0 deposit and free doorstep handover.',
    ctaText: 'Rent Party Gear',
    ctaLink: '/#catalog',
    highlightTag: 'London Same Day',
    bgGradient: 'from-emerald-950 via-forest to-charcoal',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Deposit', value: '£0.00' },
      { label: 'Slot', value: '2 Hours' },
    ],
    active: true,
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductData.name || !newProductData.brand) return;
    addProduct(newProductData);
    setShowAddProductModal(false);
  };

  const handleCreateDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscountData.code) return;
    addDiscountCode({
      ...newDiscountData,
      code: newDiscountData.code.toUpperCase().trim(),
    });
    setShowAddDiscountModal(false);
  };

  const handleCreateSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideData.title) return;
    addHeroSlide(newSlideData);
    setShowAddSlideModal(false);
  };

  // ============================================================================
  // STRICT ADMIN AUTHENTICATION GATE
  // If not logged in, or not admin role, or 2FA not verified: Block access!
  // ============================================================================
  if (!isAuthenticated || currentUser?.role !== 'admin' || !isAdmin2FAVerified) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-forest/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lime/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-forest/20 border border-forest/40 flex items-center justify-center text-lime shadow-inner">
              <Lock className="w-8 h-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-lime border border-slate-700 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-lime" />
              <span>Restricted Administration Hub</span>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight">
              Looply Backoffice Security
            </h1>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Access is restricted to authorized operators with mandatory Two-Factor Authentication.
            </p>
          </div>

          {/* STEP 1: ADMIN CREDENTIALS */}
          {adminStep === 'credentials' && (
            <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Operator Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-2xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-lime"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Master Password
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-2xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-lime"
                  />
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full py-4 rounded-2xl btn-lime text-charcoal font-black text-sm shadow-lime-glow flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
              >
                {isAuthLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                    Sending Mailtrap 2FA Code...
                  </span>
                ) : (
                  <>
                    <span>Authenticate & Request 2FA Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 text-[11px] text-slate-400 space-y-1">
                <span className="font-bold text-slate-200 block">⚡ Mailtrap SMTP Integration:</span>
                <span>Submitting credentials automatically generates an OTP and sends an email via Mailtrap to test in local.</span>
              </div>
            </form>
          )}

          {/* STEP 2: 2FA OTP CHALLENGE VIA MAILTRAP & REDIS */}
          {adminStep === '2fa' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {mailSentNotice && (
                <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 text-xs flex items-start gap-2.5">
                  <Send className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{mailSentNotice}</span>
                </div>
              )}

              <div className="text-center">
                <span className="text-xs text-slate-400">Enter the 6-digit code sent to</span>
                <div className="font-mono text-xs font-black text-lime mt-0.5">{adminEmail}</div>
              </div>

              {/* 6-Digit Inputs */}
              <div className="flex justify-between gap-2">
                {adminDigits.map((digit, idx) => (
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
                    className="w-11 h-14 sm:w-12 sm:h-16 text-center text-2xl font-black rounded-2xl border border-slate-700 bg-slate-800 text-lime focus:border-lime focus:ring-2 focus:ring-lime/20 focus:outline-none transition-all shadow-inner"
                  />
                ))}
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleAdminVerifyCode()}
                  disabled={isAuthLoading}
                  className="w-full py-4 rounded-2xl btn-lime text-charcoal font-black text-sm shadow-lime-glow flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                >
                  {isAuthLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                      Verifying with Upstash Redis...
                    </span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify 2FA & Access Dashboard</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResendMailtrapCode}
                    disabled={isAuthLoading}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-lime" />
                    <span>Resend Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAutoFillAdminCode}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-lime" />
                    <span>Auto-fill (123456)</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAdminStep('credentials');
                    cancel2FA();
                  }}
                  className="w-full text-center text-xs text-slate-500 hover:text-slate-300 pt-2 block font-medium"
                >
                  ← Back to master credentials
                </button>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500">
            <Link href="/" className="text-slate-400 hover:text-white underline">
              Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // AUTHENTICATED ADMIN BACKOFFICE
  // Rendered only when authenticated AND admin role AND 2FA verified
  // ============================================================================
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-charcoal text-slate-300 p-6 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-forest flex items-center justify-center text-lime font-black text-xl shadow-md">
              ∞
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight flex items-center gap-1">
                Looply
                <span className="w-1.5 h-1.5 rounded-full bg-lime inline-block" />
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider -mt-1">
                Backoffice Admin
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-forest text-lime shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'catalog'
                  ? 'bg-forest text-lime shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <div className="flex-1 flex items-center justify-between">
                <span>Gear Catalog (CRUD)</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                  {products.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orders'
                  ? 'bg-forest text-lime shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Truck className="w-4 h-4" />
              <div className="flex-1 flex items-center justify-between">
                <span>Orders & Pipeline</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime text-charcoal font-black">
                  {orders.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('carousel')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'carousel'
                  ? 'bg-forest text-lime shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Carousel & Banners</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'users'
                  ? 'bg-forest text-lime shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>User Registrations & 2FA</span>
            </button>

            <button
              onClick={() => setActiveTab('discounts')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'discounts'
                  ? 'bg-forest text-lime shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Offers & Discounts</span>
            </button>
          </nav>
        </div>

        {/* Footer Sidebar info */}
        <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>London Dispatch Hub Active</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to Storefront</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl overflow-x-hidden">
        {/* Admin Session Security Bar */}
        <div className="mb-6 p-4 rounded-3xl bg-white border border-slate-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-forest text-lime font-black text-sm flex items-center justify-center shadow-md">
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900">{currentUser?.name}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  2FA Session Verified (Mailtrap SMTP)
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{currentUser?.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => logout()}
              className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-200 shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Admin Session</span>
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Operations & Revenue Overview
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Live KPI metrics for London & Greater M25 zero-deposit rental fleet
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Hub Status</span>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Gross Rental Revenue</span>
                  <div className="w-8 h-8 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
                    £
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">
                  £{stats.totalRevenue.toFixed(2)}
                </div>
                <div className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>+18.4% vs last week</span>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Active Loans Out</span>
                  <div className="w-8 h-8 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {stats.activeLoans}
                </div>
                <div className="text-[11px] text-slate-500 font-medium mt-1">
                  {orders.length} total customer bookings
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Return Rate</span>
                  <div className="w-8 h-8 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {stats.returnRate}%
                </div>
                <div className="text-[11px] text-emerald-600 font-bold mt-1">
                  Zero unrecovered gear
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
                <div className="flex items-center justify-between text-slate-400 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">PAT Safety Rate</span>
                  <div className="w-8 h-8 rounded-xl bg-forest/10 text-forest flex items-center justify-center">
                    <Zap className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
                <div className="text-3xl font-black text-slate-900">
                  {stats.patTestedRate}%
                </div>
                <div className="text-[11px] text-emerald-600 font-bold mt-1">
                  100% Certified fleet
                </div>
              </div>
            </div>

            {/* Quick Orders Stream Preview */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-extrabold text-slate-900">
                  Recent Dispatch Activity
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-forest underline"
                >
                  View full dispatch pipeline →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                      <th className="pb-3">Order Ref</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Gear Items</th>
                      <th className="pb-3">Delivery Slot</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 4).map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50">
                        <td className="py-3 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                        <td className="py-3 font-semibold text-slate-800">{o.customerName}</td>
                        <td className="py-3 text-slate-600">{o.items[0]?.productName}</td>
                        <td className="py-3 text-slate-600">{o.deliverySlot}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              o.status === 'Active Loan'
                                ? 'bg-emerald-100 text-emerald-800'
                                : o.status === 'Dispatched'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-100 text-slate-800'
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="py-3 text-right font-black text-slate-900">£{o.totalAmount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CATALOG MANAGEMENT (CRUD) */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Gear Catalog Management (CRUD)
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Add new rental items, adjust 28h starter rates, update stock, and manage PAT testing
                </p>
              </div>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-forest hover:bg-forest-hover text-white text-xs font-black flex items-center gap-1.5 shadow-md transition-all shrink-0"
              >
                <Plus className="w-4 h-4 text-lime" />
                <span>Add New Rental Gear</span>
              </button>
            </div>

            {/* Catalog Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter catalog by brand or name..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3.5 px-4">Product</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">28h Rate</th>
                      <th className="py-3.5 px-4">Daily Rate</th>
                      <th className="py-3.5 px-4">Stock Status</th>
                      <th className="py-3.5 px-4">PAT Tested</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products
                      .filter(
                        (p) =>
                          p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.brand.toLowerCase().includes(productSearch.toLowerCase())
                      )
                      .map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                              </div>
                              <div className="min-w-0">
                                <div className="font-extrabold text-slate-900 truncate max-w-xs">
                                  {product.name}
                                </div>
                                <div className="text-[11px] text-slate-400">{product.brand}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-700">
                            {product.category}
                          </td>
                          <td className="py-3 px-4 font-black text-slate-900">
                            £{product.baseRentalPrice28h.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-600">
                            £{product.dailyRateAfter.toFixed(2)}/day
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => toggleStock(product.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-colors ${
                                product.inStock
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-emerald-800 flex items-center gap-1 w-max">
                              <Zap className="w-3 h-3 text-emerald-600" />
                              {product.patTested ? 'Passed' : 'Pending'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => {
                                  const newRate = prompt('Enter new 28h rental rate (£):', product.baseRentalPrice28h.toString());
                                  if (newRate) {
                                    updateProduct(product.id, { baseRentalPrice28h: parseFloat(newRate) });
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                                title="Edit Rate"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete "${product.name}" from catalog?`)) {
                                    deleteProduct(product.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                title="Delete Gear"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS & DELIVERIES PIPELINE */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Orders & Delivery Dispatch Pipeline
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Full lifecycle pipeline: Pending → Dispatched → Active Loan → Return Scheduled → Completed
              </p>
            </div>

            {/* Orders Pipeline List */}
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-black text-slate-900">
                        {ord.orderNumber}
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {ord.customerName} ({ord.phone})
                      </span>
                      <span className="text-xs text-slate-400">
                        • {ord.postcode}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-forest">
                        £{ord.totalAmount.toFixed(2)}
                      </span>
                      {/* Status Selector Dropdown */}
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className={`text-xs font-black rounded-xl px-3 py-1.5 border focus:outline-none ${
                          ord.status === 'Active Loan'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : ord.status === 'Dispatched'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : ord.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800 border-amber-300'
                            : ord.status === 'Return Scheduled'
                            ? 'bg-purple-100 text-purple-800 border-purple-300'
                            : 'bg-slate-200 text-slate-800 border-slate-300'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Active Loan">Active Loan</option>
                        <option value="Return Scheduled">Return Scheduled</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Details & Driver Slot Assigner */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                        Equipment On Loan
                      </span>
                      {ord.items.map((i, idx) => (
                        <div key={idx} className="font-semibold text-slate-800">
                          {i.productName} ({i.rentalDays} days)
                        </div>
                      ))}
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                        Scheduled Slots
                      </span>
                      <div className="text-slate-700">
                        Delivery: <strong>{ord.deliveryDate} ({ord.deliverySlot})</strong>
                      </div>
                      <div className="text-slate-700">
                        Return: <strong>{ord.returnDate}</strong>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                        Driver Assignment
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          defaultValue={ord.driverAssigned || 'Unassigned'}
                          onBlur={(e) => assignDriver(ord.id, e.target.value)}
                          placeholder="Assign driver name..."
                          className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 flex-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CAROUSEL & BANNERS */}
        {activeTab === 'carousel' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Carousel & Homepage Banner Manager
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Manage seasonal hero slides, dynamic copy, and high-conversion call-to-actions
                </p>
              </div>
              <button
                onClick={() => setShowAddSlideModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-forest hover:bg-forest-hover text-white text-xs font-black flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4 text-lime" />
                <span>Create New Slide</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heroSlides.map((slide) => (
                <div
                  key={slide.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/9] bg-slate-900">
                    <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-slate-950/40 p-4 flex flex-col justify-between text-white">
                      <span className="text-[10px] font-black uppercase tracking-wider bg-forest/80 px-2 py-0.5 rounded w-max text-lime">
                        {slide.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-black text-slate-900 leading-snug">
                        {slide.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {slide.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => toggleHeroSlide(slide.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black ${
                          slide.active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {slide.active ? 'Active' : 'Draft'}
                      </button>

                      <button
                        onClick={() => deleteHeroSlide(slide.id)}
                        className="text-slate-400 hover:text-rose-600 text-xs p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: USERS & 2FA SECURITY DIRECTORY */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                User Registrations & 2FA Directory
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Customer directory, soft identity check status, and Two-Factor Authentication enforcement
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                    <tr>
                      <th className="py-3.5 px-4">User</th>
                      <th className="py-3.5 px-4">Role</th>
                      <th className="py-3.5 px-4">Postcode / City</th>
                      <th className="py-3.5 px-4">Identity Check</th>
                      <th className="py-3.5 px-4">2FA Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{u.name}</div>
                          <div className="text-[11px] text-slate-400">{u.email}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-700">
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-700">
                          {u.postcode || 'SW1A 1AA'}
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => verifyUserIdentity(u.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                              u.identityVerified
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            {u.identityVerified ? 'Verified (£0 Deposit)' : 'Pending Check'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleUser2FA(u.id)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                              u.twoFactorEnabled
                                ? 'bg-forest text-lime'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            <ShieldCheck className="w-3 h-3" />
                            {u.twoFactorEnabled ? '2FA Active' : '2FA Off'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => toggleUser2FA(u.id)}
                            className="text-xs font-bold text-forest underline"
                          >
                            Toggle 2FA
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: OFFERS & DISCOUNTS ENGINE */}
        {activeTab === 'discounts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  Offers & Discount Promo Engine
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Create and manage promo vouchers (e.g. FIRST10, SUMMERFEST) with fixed or percentage discounts
                </p>
              </div>
              <button
                onClick={() => setShowAddDiscountModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-forest hover:bg-forest-hover text-white text-xs font-black flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4 text-lime" />
                <span>Create Promo Voucher</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {discountCodes.map((disc) => (
                <div
                  key={disc.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-card flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-base font-black text-forest bg-mint-light px-3 py-1 rounded-xl">
                        {disc.code}
                      </span>
                      <button
                        onClick={() => toggleDiscountCode(disc.id)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          disc.active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {disc.active ? 'Active' : 'Disabled'}
                      </button>
                    </div>

                    <div className="text-2xl font-black text-slate-900 mt-2">
                      {disc.discountType === 'percentage'
                        ? `${disc.value}% OFF`
                        : `£${disc.value} OFF`}
                    </div>

                    <div className="text-xs text-slate-500 space-y-1">
                      <div>Min order: £{disc.minOrder || 0}</div>
                      <div>Valid until: {disc.expiresAt}</div>
                      <div>Times used: {disc.usageCount}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Coupon Code</span>
                    <button
                      onClick={() => deleteDiscountCode(disc.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODAL: ADD PRODUCT */}
        {showAddProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl">
              <h3 className="text-lg font-black text-slate-900">Add New Rental Equipment</h3>
              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bosch 18V Cordless Twin Pack"
                    value={newProductData.name}
                    onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold block mb-1">Brand</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bosch"
                      value={newProductData.brand}
                      onChange={(e) => setNewProductData({ ...newProductData, brand: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Category</label>
                    <select
                      value={newProductData.category}
                      onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value as Category })}
                      className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                    >
                      <option value="Cleaning">Cleaning</option>
                      <option value="Parties">Parties</option>
                      <option value="DIY & Tools">DIY & Tools</option>
                      <option value="Audio/Visual">Audio/Visual</option>
                      <option value="Bundles">Bundles</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-bold block mb-1">Tagline</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief USP summary..."
                    value={newProductData.tagline}
                    onChange={(e) => setNewProductData({ ...newProductData, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold block mb-1">First 28h (£)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newProductData.baseRentalPrice28h}
                      onChange={(e) => setNewProductData({ ...newProductData, baseRentalPrice28h: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Daily After (£)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newProductData.dailyRateAfter}
                      onChange={(e) => setNewProductData({ ...newProductData, dailyRateAfter: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">RRP Buying (£)</label>
                    <input
                      type="number"
                      step="1"
                      value={newProductData.rrpBuying}
                      onChange={(e) => setNewProductData({ ...newProductData, rrpBuying: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-forest text-white font-bold"
                  >
                    Save Equipment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD DISCOUNT */}
        {showAddDiscountModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl">
              <h3 className="text-lg font-black text-slate-900">Create Discount Voucher</h3>
              <form onSubmit={handleCreateDiscount} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Coupon Code (e.g. AUTUMN25)</label>
                  <input
                    type="text"
                    required
                    value={newDiscountData.code}
                    onChange={(e) => setNewDiscountData({ ...newDiscountData, code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl font-mono uppercase"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold block mb-1">Discount Type</label>
                    <select
                      value={newDiscountData.discountType}
                      onChange={(e) => setNewDiscountData({ ...newDiscountData, discountType: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed (£)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Value (% or £)</label>
                    <input
                      type="number"
                      required
                      value={newDiscountData.value}
                      onChange={(e) => setNewDiscountData({ ...newDiscountData, value: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddDiscountModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-forest text-white font-bold"
                  >
                    Create Coupon
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD HERO SLIDE */}
        {showAddSlideModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl">
              <h3 className="text-lg font-black text-slate-900">Create Hero Slide</h3>
              <form onSubmit={handleCreateSlide} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold block mb-1">Badge</label>
                  <input
                    type="text"
                    required
                    value={newSlideData.badge}
                    onChange={(e) => setNewSlideData({ ...newSlideData, badge: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Slide Title</label>
                  <input
                    type="text"
                    required
                    value={newSlideData.title}
                    onChange={(e) => setNewSlideData({ ...newSlideData, title: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Subtitle</label>
                  <input
                    type="text"
                    required
                    value={newSlideData.subtitle}
                    onChange={(e) => setNewSlideData({ ...newSlideData, subtitle: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddSlideModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-forest text-white font-bold"
                  >
                    Save Slide
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
