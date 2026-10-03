'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldCheck,
  Truck,
  Sparkles,
  Plus,
  Minus,
  Star,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShoppingBag
} from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [rentalDays, setRentalDays] = useState(1);
  const { addItem } = useCartStore();

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setRentalDays((prev) => Math.min(30, prev + 1));
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setRentalDays((prev) => Math.max(1, prev - 1));
  };

  const calculateCost = (days: number) => {
    if (days <= 1) return product.baseRentalPrice28h;
    return product.baseRentalPrice28h + (days - 1) * product.dailyRateAfter;
  };

  const currentCost = calculateCost(rentalDays);
  const savingsVsBuy = Math.max(0, product.rrpBuying - currentCost);
  const savingsPercent = Math.round((savingsVsBuy / product.rrpBuying) * 100);

  const handleRentNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addItem(product, rentalDays);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-card hover:shadow-card-hover hover:border-forest/40 transition-all duration-300 flex flex-col overflow-hidden group">
      {/* Product Image & Badges */}
      <Link href={`/product/${product.id}`} className="relative block aspect-[4/3] bg-slate-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-black tracking-wide uppercase bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
            {product.category}
          </span>
          {product.bundleIncludes && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-lime text-charcoal shadow-sm">
              Bundle Kit
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
          {product.patTested && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
              <Zap className="w-3 h-3 text-emerald-400" />
              PAT Tested
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-forest/90 backdrop-blur-md text-lime border border-lime/30 flex items-center gap-1 shadow-sm">
            <ShieldCheck className="w-3 h-3 text-lime" />
            £0 Deposit
          </span>
        </div>

        {/* Rating Floating Pill */}
        <div className="absolute bottom-3 left-3 px-2 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1">
          <Star className="w-3 h-3 text-lime fill-current" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="text-slate-400">({product.reviewsCount})</span>
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Brand & Title */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            {product.brand}
          </div>
          <Link href={`/product/${product.id}`} className="group-hover:text-forest transition-colors">
            <h3 className="text-base font-extrabold text-slate-900 line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>

          {/* Specifications Pills */}
          <div className="mt-3 flex flex-wrap gap-1">
            {product.specifications.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-medium text-slate-600 truncate max-w-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Transparent Pricing Breakdown */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-900">
                  £{product.baseRentalPrice28h.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  / first 28h
                </span>
              </div>
              <div className="text-[11px] text-emerald-700 font-medium">
                +£{product.dailyRateAfter.toFixed(2)}/day after
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">RRP Buying New</span>
              <span className="text-xs font-bold text-slate-400 line-through">
                £{product.rrpBuying.toFixed(2)}
              </span>
              <span className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded ml-1">
                Save {savingsPercent}%
              </span>
            </div>
          </div>

          {/* Duration Selector & Rent Now */}
          <div className="pt-2 flex items-center gap-2">
            {/* Stepper */}
            <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1">
              <button
                onClick={handleDecrement}
                disabled={rentalDays <= 1}
                className="w-7 h-7 rounded-xl flex items-center justify-center hover:bg-white text-slate-700 disabled:opacity-30 transition-all"
                aria-label="Decrease rental days"
              >
                <Minus className="w-3 h-3" />
              </button>
              <div className="w-12 text-center text-xs font-bold text-slate-900">
                {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
              </div>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 rounded-xl flex items-center justify-center hover:bg-white text-slate-700 transition-all"
                aria-label="Increase rental days"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Rent Now CTA Button */}
            <button
              onClick={handleRentNow}
              className="flex-1 py-2.5 px-3 rounded-2xl btn-lime text-charcoal font-black text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Rent • £{currentCost.toFixed(2)}</span>
            </button>
          </div>

          {/* Micro trust assurance */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-forest" /> Free 2hr delivery
            </span>
            <span className="font-semibold text-emerald-700">£0 Deposit hold</span>
          </div>
        </div>
      </div>
    </div>
  );
};
