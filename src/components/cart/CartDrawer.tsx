'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  ArrowRight,
  Tag,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateItemDays,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    getTotalSavings,
    appliedDiscount,
    discountError,
    applyDiscountCode,
    removeDiscountCode,
    getItemTotal,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');

  if (!isDrawerOpen) return null;

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const total = getTotal();
  const totalSavings = getTotalSavings();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = applyDiscountCode(promoInput);
    if (ok) setPromoInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-100 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-forest flex items-center justify-center text-lime font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Your Rental Basket
                </h3>
                <p className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                  100% Zero Deposit Guarantee
                </p>
              </div>
            </div>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Your basket is empty</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                    Select any professional tool or party gear to start your zero-deposit rental.
                  </p>
                </div>
                <button
                  onClick={closeDrawer}
                  className="px-6 py-2.5 rounded-xl bg-forest text-white font-bold text-xs hover:bg-forest-hover transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <>
                {/* Free 2-Hour Delivery Ribbon */}
                <div className="p-3 rounded-2xl bg-mint-light border border-mint/30 flex items-center gap-2 text-xs font-semibold text-forest">
                  <Truck className="w-4 h-4 text-forest shrink-0" />
                  <span>Free 2-Hour Delivery & Collection Included</span>
                </div>

                {items.map((item) => {
                  const itemCost = getItemTotal(item);
                  return (
                    <div
                      key={item.product.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-3 group hover:border-forest/30 transition-all"
                    >
                      <div className="flex gap-3">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              {item.product.category}
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <h5 className="text-xs font-bold text-slate-900 line-clamp-2 mt-1 leading-snug">
                            {item.product.name}
                          </h5>

                          <div className="mt-1 flex items-baseline justify-between">
                            <span className="text-sm font-black text-slate-900">
                              £{itemCost.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              RRP: <span className="line-through">£{item.product.rrpBuying}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Rental Days Stepper */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-600 font-medium">
                          Duration: <strong className="text-slate-900">{item.rentalDays} {item.rentalDays === 1 ? 'day (28h)' : 'days'}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateItemDays(item.product.id, item.rentalDays - 1)}
                            disabled={item.rentalDays <= 1}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 transition-colors"
                          >
                            <Minus className="w-3 h-3 text-slate-700" />
                          </button>
                          <span className="w-5 text-center font-bold text-slate-800">
                            {item.rentalDays}
                          </span>
                          <button
                            onClick={() => updateItemDays(item.product.id, item.rentalDays + 1)}
                            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                          >
                            <Plus className="w-3 h-3 text-slate-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Savings Pill */}
                {totalSavings > 0 && (
                  <div className="p-3.5 rounded-2xl bg-emerald-950 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-lime" />
                      <div>
                        <p className="text-xs font-bold text-lime">
                          Circular Savings vs Buying New
                        </p>
                        <p className="text-[11px] text-slate-300">
                          Eliminated upfront clutter & depreciation
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-lime">
                      Save £{totalSavings.toFixed(2)}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-white space-y-4">
              {/* Promo Code Input */}
              <div>
                {appliedDiscount ? (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold">
                      <Tag className="w-3.5 h-3.5 text-forest" />
                      <span>Code: {appliedDiscount.code} ({appliedDiscount.discountType === 'percentage' ? `${appliedDiscount.value}% OFF` : `£${appliedDiscount.value} OFF`})</span>
                    </div>
                    <button
                      onClick={removeDiscountCode}
                      className="text-slate-400 hover:text-rose-600 text-xs font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Promo code (e.g. FIRST10)"
                      className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase font-semibold focus:outline-none focus:ring-1 focus:ring-forest"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {discountError && (
                  <p className="text-[11px] text-rose-600 mt-1 font-medium">{discountError}</p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span>Rental Subtotal</span>
                  <span className="font-semibold text-slate-900">£{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount Applied</span>
                    <span>-£{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Doorstep 2-Hour Delivery</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span>Doorstep Return Collection</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center bg-mint-light/60 p-2 rounded-xl text-forest font-bold">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Security Deposit Hold
                  </span>
                  <span className="text-sm font-black">£0.00 (Zero)</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Pay Now</span>
                  <span className="text-xl font-black text-forest">£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="w-full py-4 rounded-2xl btn-lime flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] font-black text-sm tracking-wide"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
                <ShieldCheck className="w-3 h-3 text-forest" />
                <span>Zero funds held • Instant soft check • UK PAT tested</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
