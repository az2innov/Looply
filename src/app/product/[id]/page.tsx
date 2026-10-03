'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  Plus,
  Minus,
  Zap,
  ArrowLeft,
  ShoppingBag,
  HelpCircle,
  Share2
} from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';
import { useCartStore } from '@/store/useCartStore';
import { usePostcodeStore } from '@/store/usePostcodeStore';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const { products } = useAdminStore();
  const { addItem } = useCartStore();
  const { postcode, openModal: openPostcodeModal } = usePostcodeStore();

  const product = products.find((p) => p.id === productId) || products[0];

  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [rentalDays, setRentalDays] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState('10:00 - 12:00');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link href="/#catalog" className="text-forest underline mt-4 inline-block">
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Calculate pricing
  const calculateTotal = (days: number) => {
    if (days <= 1) return product.baseRentalPrice28h;
    return product.baseRentalPrice28h + (days - 1) * product.dailyRateAfter;
  };

  const totalCost = calculateTotal(rentalDays);
  const totalSavings = Math.max(0, product.rrpBuying - totalCost);
  const savingsPct = Math.round((totalSavings / product.rrpBuying) * 100);

  const handleAddToCart = () => {
    addItem(product, rentalDays);
  };

  const handleInstantRent = () => {
    addItem(product, rentalDays);
    router.push('/checkout');
  };

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="bg-cream py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/#catalog" className="hover:text-forest flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Gear</span>
          </Link>
          <span>/</span>
          <span className="text-slate-700">{product.category}</span>
          <span>/</span>
          <span className="font-semibold text-slate-900 truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Gallery & In-Depth Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Image Frame */}
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-card">
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100">
                <Image
                  src={selectedImage || product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 600px"
                  priority
                />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-white/95 backdrop-blur-md text-forest shadow-sm">
                    {product.category}
                  </span>
                  {product.bundleIncludes && (
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-lime text-charcoal shadow-sm">
                      Super Bundle Kit
                    </span>
                  )}
                </div>

                <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                  {product.patTested && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-950/85 backdrop-blur-md text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5 shadow-sm">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      100% PAT Safety Certified
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-forest/90 backdrop-blur-md text-lime border border-lime/30 flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-lime" />
                    £0.00 Deposit Hold
                  </span>
                </div>
              </div>

              {/* Thumbnail Selector */}
              {product.gallery && product.gallery.length > 1 && (
                <div className="flex items-center gap-3 mt-4">
                  {product.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === img ? 'border-forest scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="Thumb" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description & Technical Specifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  Overview & Capabilities
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Bundle Contents if applicable */}
              {product.bundleIncludes && (
                <div className="p-4 rounded-2xl bg-mint-light/60 border border-mint/30 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-forest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-forest" />
                    Included in this Curated Bundle:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-800">
                    {product.bundleIncludes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.specifications.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PAT Testing Reassurance Badge */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-lime flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-extrabold text-lime uppercase tracking-wider">
                    London Depot Safety Stamp
                  </h5>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    This unit has passed our full electrical surge, insulation resistance, and functional PAT test. Includes PAT test sticker with test date and inspector initials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Rental Booking Widget */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6 sticky top-28">
              {/* Product Title & Brand */}
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                  <span>{product.brand}</span>
                  <div className="flex items-center gap-1 text-slate-900">
                    <Star className="w-3.5 h-3.5 fill-current text-lime" />
                    <span>{product.rating.toFixed(1)} ({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl font-black text-slate-900 leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Transparent Price Breakdown */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-black text-forest">
                      £{product.baseRentalPrice28h.toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold ml-1">
                      first 28 hours
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-600">
                    +£{product.dailyRateAfter.toFixed(2)} / extra day
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-500">RRP to buy new:</span>
                  <div className="flex items-center gap-2">
                    <span className="line-through text-slate-400">£{product.rrpBuying.toFixed(2)}</span>
                    <span className="px-2 py-0.5 rounded-full bg-lime text-charcoal font-black text-[10px]">
                      Save £{totalSavings.toFixed(0)} ({savingsPct}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Interactive Duration Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Rental Duration:
                </label>

                <div className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-white">
                  <div>
                    <div className="text-sm font-black text-slate-900">
                      {rentalDays} {rentalDays === 1 ? 'Day (28h Base Flex)' : 'Days'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Delivery tomorrow • Return in {rentalDays} days
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                      disabled={rentalDays <= 1}
                      className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-30 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-slate-700" />
                    </button>
                    <span className="w-6 text-center font-black text-base text-slate-900">
                      {rentalDays}
                    </span>
                    <button
                      onClick={() => setRentalDays(rentalDays + 1)}
                      className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-slate-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Postcode Eligibility Mini Check */}
              <div className="p-3.5 rounded-2xl bg-mint-light border border-mint/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-forest font-semibold">
                  <Truck className="w-4 h-4 text-forest shrink-0" />
                  <span>
                    Delivery to <strong>{postcode || 'SW1A'}</strong> • 2hr Slot
                  </span>
                </div>
                <button
                  onClick={openPostcodeModal}
                  className="text-forest underline font-bold hover:text-forest-dark"
                >
                  Change
                </button>
              </div>

              {/* Total Calculation & Zero Deposit Guarantee */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Rental Total ({rentalDays} {rentalDays === 1 ? 'day' : 'days'})</span>
                  <span className="font-bold text-slate-900">£{totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Free 2-Hour Delivery & Return</span>
                  <span className="font-bold text-emerald-700">FREE (£0.00)</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-xl bg-forest text-white font-bold">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-lime" />
                    Security Deposit Hold
                  </span>
                  <span className="text-lime font-black text-sm">£0.00 (Zero)</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 text-lg font-black text-slate-900">
                  <span>Total Pay Now</span>
                  <span className="text-2xl font-black text-forest">£{totalCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleInstantRent}
                  className="w-full py-4 rounded-2xl btn-lime text-charcoal font-black text-sm shadow-lime-glow flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Instant Rent Now (£0 Deposit)</span>
                </button>

                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Add to Rental Basket</span>
                </button>
              </div>

              {/* Guarantee highlights */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                  <span>Free doorstep collection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
                  <span>Damage cover included</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Gear */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-black text-slate-900 mb-6">
              You may also need for this project
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl p-4 border border-slate-200 shadow-card flex gap-4 items-center group hover:border-forest/40 transition-all"
                >
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <Image src={p.image} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      {p.category}
                    </span>
                    <h4 className="text-xs font-black text-slate-900 truncate mt-0.5">
                      {p.name}
                    </h4>
                    <div className="text-xs font-extrabold text-forest mt-1">
                      £{p.baseRentalPrice28h.toFixed(2)} / 28h
                    </div>
                    <Link
                      href={`/product/${p.id}`}
                      className="text-xs font-bold text-forest underline mt-2 block"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
