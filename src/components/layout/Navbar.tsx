'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  MapPin,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  User as UserIcon,
  Shield,
  Layers,
  ArrowRight,
  LogOut,
  Sliders,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { usePostcodeStore } from '@/store/usePostcodeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Category } from '@/types';

const CATEGORIES: { name: Category; desc: string; icon: string }[] = [
  { name: 'Cleaning', desc: 'Carpet extractors, Kärcher washers & steam', icon: '✨' },
  { name: 'Parties', desc: 'JBL 800W sound, chocolate fountains & bars', icon: '🎉' },
  { name: 'DIY & Tools', desc: 'Festool saws, Bosch twin-packs & drills', icon: '🔨' },
  { name: 'Audio/Visual', desc: '4K cinema projectors, 6K cameras & disco', icon: '🎬' },
  { name: 'Bundles', desc: 'Curated weekend kits with up to 30% savings', icon: '📦' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { items, openDrawer, getSubtotal, getTotalSavings } = useCartStore();
  const { postcode, result, openModal: openPostcodeModal } = usePostcodeStore();
  const { currentUser, isAuthenticated, logout, switchUserRole } = useAuthStore();

  const totalCartCount = items.length;
  const subtotal = getSubtotal();

  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      {/* 1. Global Announcement Ribbon */}
      <div className="bg-forest-deep text-white text-xs sm:text-sm py-2 px-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-lime text-charcoal tracking-wide">
              <Sparkles className="w-3 h-3 text-charcoal" />
              CIRCULAR SAVINGS
            </span>
            <span className="hidden sm:inline text-slate-200">
              Free delivery & return on all orders • No deposit required • London & M25
            </span>
            <span className="sm:hidden text-slate-200 truncate">
              Zero Deposit • Free 2-Hour Delivery & Return
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs shrink-0">
            <div className="hidden md:flex items-center gap-1.5 text-emerald-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-lime" />
              <span>100% Zero Deposit Guarantee</span>
            </div>
            <Link
              href="/#faq"
              className="text-slate-300 hover:text-white underline underline-offset-2 transition-colors"
            >
              How it works
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-2xl bg-forest flex items-center justify-center text-lime font-black text-xl shadow-card group-hover:scale-105 transition-transform">
                <span className="tracking-tighter">∞</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-forest-deep flex items-center gap-1">
                  Looply
                  <span className="w-2 h-2 rounded-full bg-lime inline-block"></span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
                  Zero Deposit Rental
                </span>
              </div>
            </Link>

            {/* Postcode Quick Chip */}
            <button
              onClick={openPostcodeModal}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-mint-light/80 hover:bg-mint-subtle text-forest border border-mint/30 text-xs font-semibold transition-all group"
            >
              <div className="w-5 h-5 rounded-full bg-mint/20 flex items-center justify-center text-forest group-hover:scale-110 transition-transform">
                <MapPin className="w-3 h-3 text-forest" />
              </div>
              <span>
                {result?.eligible ? (
                  <>
                    Deliver to <span className="font-bold underline">{postcode}</span> • 2hr Slot
                  </>
                ) : (
                  <>Check Postcode Eligibility</>
                )}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-forest/70" />
            </button>
          </div>

          {/* Desktop Links & Dropdowns */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                onMouseEnter={() => setCategoryDropdownOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-forest transition-colors rounded-xl hover:bg-slate-50"
              >
                <span>Gear Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Dropdown */}
              {categoryDropdownOpen && (
                <div
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                  className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 grid gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Premium Gear Library
                  </div>
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.name}
                      href={`/#catalog?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setCategoryDropdownOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-mint-light/60 transition-colors group"
                    >
                      <span className="text-xl p-2 rounded-lg bg-slate-50 group-hover:bg-white shadow-xs">
                        {cat.icon}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-forest">
                          {cat.name}
                        </span>
                        <span className="text-xs text-slate-500 line-clamp-1">
                          {cat.desc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/#timeline"
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-forest transition-colors rounded-xl hover:bg-slate-50"
            >
              How It Works
            </Link>

            <Link
              href="/#savings"
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-forest transition-colors rounded-xl hover:bg-slate-50"
            >
              Why Rent vs Buy
            </Link>

            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-all"
            >
              <Lock className="w-3 h-3 text-emerald-700" />
              <span>Admin Hub</span>
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Postcode Mobile Quick Button */}
            <button
              onClick={openPostcodeModal}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              title="Check Postcode"
            >
              <MapPin className="w-5 h-5 text-forest" />
            </button>

            {/* User Account / 2FA Status */}
            <div className="relative">
              {isAuthenticated && currentUser ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-200 hover:border-forest/40 hover:bg-slate-50 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-forest text-lime font-bold flex items-center justify-center text-xs relative">
                    {currentUser.name.charAt(0)}
                    {currentUser.twoFactorEnabled && (
                      <span
                        className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center"
                        title="2FA Protected"
                      >
                        <Shield className="w-2 h-2 text-white fill-current" />
                      </span>
                    )}
                  </div>
                  <div className="hidden xl:flex flex-col text-left">
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] font-medium text-emerald-700 flex items-center gap-0.5">
                      {currentUser.twoFactorEnabled ? '2FA Secured' : 'Account'}
                    </span>
                  </div>
                  <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
                </button>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold text-forest hover:bg-forest/5 rounded-xl border border-forest/20"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              )}

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div
                  onMouseLeave={() => setUserMenuOpen(false)}
                  className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2"
                >
                  <div className="px-3 py-2.5 border-b border-slate-100">
                    <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {currentUser?.email}
                    </p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" />
                        {currentUser?.twoFactorEnabled ? '2FA Enabled' : 'Standard'}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 capitalize">
                        {currentUser?.role}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/account"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                    >
                      <span>Security & 2FA Settings</span>
                      <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    </Link>

                    <Link
                      href="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
                    >
                      <span>Backoffice Administration</span>
                      <Layers className="w-3.5 h-3.5 text-forest" />
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Trigger Button */}
            <button
              onClick={openDrawer}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-forest hover:bg-forest-hover text-white shadow-subtle hover:shadow-card transition-all active:scale-95 group"
              aria-label="View Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-lime transition-transform group-hover:-translate-y-0.5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-lime text-charcoal text-[11px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-emerald-300 leading-tight">
                  Zero Deposit Cart
                </span>
                <span className="text-xs font-black text-white">
                  £{subtotal.toFixed(2)}
                </span>
              </div>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-4 animate-in fade-in duration-150">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
              Rental Categories
            </div>
            {CATEGORIES.map((c) => (
              <Link
                key={c.name}
                href={`/#catalog?category=${encodeURIComponent(c.name)}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/#timeline"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800"
            >
              How 2-Hour Delivery Works
            </Link>
            <Link
              href="/#savings"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-semibold text-slate-800"
            >
              Circular Living Savings
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-bold text-forest bg-mint-light rounded-xl flex items-center justify-between"
            >
              <span>Admin Backoffice</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
