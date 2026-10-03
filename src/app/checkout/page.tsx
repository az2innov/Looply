'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  Lock,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Zap,
  Phone,
  User,
  AlertCircle
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAdminStore } from '@/store/useAdminStore';
import { usePostcodeStore } from '@/store/usePostcodeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { Order } from '@/types';

const DELIVERY_SLOTS = [
  { id: 'slot-1', label: 'Morning Slot (08:00 - 10:00)', popular: false },
  { id: 'slot-2', label: 'Midday Slot (10:00 - 12:00)', popular: true },
  { id: 'slot-3', label: 'Afternoon Slot (14:00 - 16:00)', popular: false },
  { id: 'slot-4', label: 'Evening Slot (17:00 - 19:00)', popular: false },
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    getSubtotal,
    getDiscountAmount,
    getTotal,
    getTotalSavings,
    clearCart,
    getItemTotal,
    appliedDiscount
  } = useCartStore();
  const { addOrder } = useAdminStore();
  const { postcode: savedPostcode } = usePostcodeStore();
  const { currentUser } = useAuthStore();

  const [step, setStep] = useState<1 | 2>(1);

  // Address form
  const [formData, setFormData] = useState({
    fullName: currentUser?.name || 'Oliver Jenkins',
    email: currentUser?.email || 'oliver.j@example.co.uk',
    phone: currentUser?.phone || '07700 900123',
    address: currentUser?.address || '42 Richmond Hill',
    city: 'London',
    postcode: savedPostcode || currentUser?.postcode || 'TW10 6QX',
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    deliverySlot: '10:00 - 12:00',
    collectionDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    collectionSlot: '14:00 - 16:00',
    specialInstructions: 'Ring bell on ground floor, lift available.',
  });

  // Payment tab
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'apple_pay' | 'paypal'>('stripe');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState(formData.fullName);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const total = getTotal();
  const totalSavings = getTotalSavings();

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompletePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = addOrder({
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}`,
        postcode: formData.postcode,
        items: items.map((i) => ({
          productId: i.product.id,
          productName: i.product.name,
          productImage: i.product.image,
          rentalDays: i.rentalDays,
          startDate: formData.deliveryDate,
          endDate: formData.collectionDate,
          itemTotal: getItemTotal(i),
        })),
        subtotal,
        discount: discountAmount,
        totalAmount: total,
        depositAmount: 0, // 100% Zero deposit!
        status: 'Dispatched',
        deliveryDate: formData.deliveryDate,
        deliverySlot: formData.deliverySlot,
        returnDate: formData.collectionDate,
        driverAssigned: 'Liam Henderson (London EV Transit #2)',
        paymentMethod,
      });

      setConfirmedOrder(newOrder);
      clearCart();
      setIsProcessing(false);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4FF00', '#10B981', '#064E3B', '#3B82F6'],
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 1200);
  };

  // If order is completed, show Order Confirmation Screen
  if (confirmedOrder) {
    return (
      <div className="bg-cream min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-mint-light flex items-center justify-center text-forest shadow-sm">
              <CheckCircle2 className="w-10 h-10 text-mint" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-forest text-lime text-xs font-black uppercase tracking-wider">
                Booking Confirmed • £0 Deposit Held
              </span>
              <h1 className="text-3xl font-black text-slate-900 mt-3">
                You&apos;re all set for doorstep delivery!
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Order reference: <strong className="font-mono text-slate-900">{confirmedOrder.orderNumber}</strong>
              </p>
            </div>

            {/* Delivery Dispatch Timeline Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-forest" />
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                    2-Hour Delivery Slot Confirmed
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-lime text-charcoal font-black text-[11px]">
                  Dispatched
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Delivery Address:</span>
                  <p className="font-bold text-slate-900 mt-0.5">{confirmedOrder.address}</p>
                  <p className="font-mono text-slate-700">{confirmedOrder.postcode}</p>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Scheduled Handover:</span>
                  <p className="font-bold text-slate-900 mt-0.5">{confirmedOrder.deliveryDate}</p>
                  <p className="font-bold text-forest">{confirmedOrder.deliverySlot}</p>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Assigned Driver:</span>
                  <p className="font-bold text-slate-900 mt-0.5">{confirmedOrder.driverAssigned}</p>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Doorstep Collection Slot:</span>
                  <p className="font-bold text-slate-900 mt-0.5">{confirmedOrder.returnDate}</p>
                  <p className="text-slate-600">Free return pickup included</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-forest" />
                  Security Deposit Charged:
                </span>
                <span className="text-sm font-black text-forest">£0.00 (Zero)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/admin"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-forest hover:bg-forest-hover text-white font-bold text-xs shadow-md transition-all"
              >
                Track in Admin Dispatch Board
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no items in cart and no confirmed order
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-100 flex items-center justify-center text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your basket is empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Please choose from our high-performance gear catalog before proceeding to checkout.
        </p>
        <Link
          href="/#catalog"
          className="px-6 py-3 rounded-2xl bg-forest text-white font-black text-xs hover:bg-forest-hover inline-block"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Steps Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-xs font-bold text-slate-500 hover:text-forest flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Shopping</span>
            </Link>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-lime" />
              <span>100% Zero Deposit Guarantee Active</span>
            </div>
          </div>

          {/* Stepper visual */}
          <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
            <button
              onClick={() => setStep(1)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-black transition-all ${
                step === 1
                  ? 'bg-forest text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              <span>1. Delivery & Slots</span>
            </button>
            <button
              onClick={() => setStep(2)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-black transition-all ${
                step === 2
                  ? 'bg-forest text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              <span>2. Payment Choice</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form (Steps 1 & 2) */}
          <div className="lg:col-span-7 space-y-6">
            {step === 1 ? (
              /* Step 1: Address & Slots */
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-2xl bg-mint-light flex items-center justify-center text-forest">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      Step 1: Delivery Address & 2-Hour Window
                    </h2>
                    <p className="text-xs text-slate-500">
                      Free delivery and return collection straight to your doorstep
                    </p>
                  </div>
                </div>

                <form onSubmit={handleStep1Submit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        UK Mobile Number (for driver SMS)
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Email Address (for instant receipt & PAT certificate)
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Street Address & Flat / House No.
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        UK Postcode
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.postcode}
                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
                      />
                    </div>
                  </div>

                  {/* 2-Hour Slot Pickers */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-wider text-forest flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-forest" />
                      Select Preferred 2-Hour Doorstep Slots
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Delivery Date
                        </label>
                        <input
                          type="date"
                          value={formData.deliveryDate}
                          onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          2-Hour Delivery Window
                        </label>
                        <select
                          value={formData.deliverySlot}
                          onChange={(e) => setFormData({ ...formData, deliverySlot: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                        >
                          {DELIVERY_SLOTS.map((s) => (
                            <option key={s.id} value={s.label.split(' (')[1]?.replace(')', '') || s.label}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Collection Date
                        </label>
                        <input
                          type="date"
                          value={formData.collectionDate}
                          onChange={(e) => setFormData({ ...formData, collectionDate: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          2-Hour Collection Window
                        </label>
                        <select
                          value={formData.collectionSlot}
                          onChange={(e) => setFormData({ ...formData, collectionSlot: e.target.value })}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900"
                        >
                          {DELIVERY_SLOTS.map((s) => (
                            <option key={s.id} value={s.label.split(' (')[1]?.replace(')', '') || s.label}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl btn-lime text-charcoal font-black text-sm shadow-lime-glow flex items-center justify-center gap-2 mt-4 active:scale-[0.99] transition-all"
                  >
                    <span>Proceed to Payment (£0 Deposit)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              /* Step 2: Payment Choice */
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-mint-light flex items-center justify-center text-forest">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900">
                        Step 2: Choose Payment Method
                      </h2>
                      <p className="text-xs text-slate-500">
                        100% Zero deposit hold — you only pay for the exact rental days
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-forest underline hover:text-forest-dark"
                  >
                    Edit Address
                  </button>
                </div>

                {/* Explicit Deposit Reassurance Banner */}
                <div className="p-4 rounded-2xl bg-forest text-white flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-lime shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-lime">
                      £0 Deposit Hold Guarantee
                    </h4>
                    <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
                      We do not freeze £500+ security deposits on your card. You are only charged the transparent rental fee of £{total.toFixed(2)}.
                    </p>
                  </div>
                </div>

                {/* Payment Tabs */}
                <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('stripe')}
                    className={`py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'stripe'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-forest" />
                    <span>Card / Stripe</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'apple_pay'
                        ? 'bg-black text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span> Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                      paymentMethod === 'paypal'
                        ? 'bg-[#0070BA] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className="italic font-black">PayPal</span>
                  </button>
                </div>

                {/* Tab 1: Stripe Card Input Simulation */}
                {paymentMethod === 'stripe' && (
                  <div className="space-y-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Lock className="w-3.5 h-3.5 text-forest" />
                      <span>256-bit SSL encrypted. Test card prefilled for simulation.</span>
                    </div>
                  </div>
                )}

                {/* Tab 2: Apple Pay Instant Button */}
                {paymentMethod === 'apple_pay' && (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-black text-white flex items-center justify-center font-bold text-xl">
                      
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        Apple Pay One-Touch Checkout
                      </h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                        Authenticate with Face ID or Touch ID. Zero deposit will be held.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 3: PayPal Instant Button */}
                {paymentMethod === 'paypal' && (
                  <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 text-center space-y-4">
                    <div className="text-2xl font-black italic text-[#0070BA]">
                      PayPal
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">
                        PayPal Instant Checkout
                      </h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                        Log in with your PayPal wallet. Pay in 3 installments also eligible.
                      </p>
                    </div>
                  </div>
                )}

                {/* Complete Order CTA */}
                <button
                  type="button"
                  onClick={handleCompletePayment}
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl btn-lime text-charcoal font-black text-sm shadow-lime-glow flex items-center justify-center gap-2 active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                      Securing 2-Hour Delivery Slot...
                    </span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Confirm & Book Rental (£{total.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary & Explicit Reassurance */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6 sticky top-28">
              <h3 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
                Rental Order Summary
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 text-xs">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-slate-900 line-clamp-1">{item.product.name}</h4>
                      <div className="text-[11px] text-slate-500">
                        {item.rentalDays} {item.rentalDays === 1 ? 'day (28h flex)' : 'days'}
                      </div>
                      <div className="font-black text-slate-900 mt-1">
                        £{getItemTotal(item).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Rental Subtotal</span>
                  <span className="font-bold text-slate-900">£{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount Applied</span>
                    <span>-£{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Doorstep 2-Hour Delivery</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Doorstep Return Collection</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-xl bg-forest text-white font-bold">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-lime" />
                    Security Deposit Hold
                  </span>
                  <span className="text-lime font-black text-sm">£0.00 (Zero)</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 text-lg font-black text-slate-900 border-t border-slate-100">
                  <span>Total Due Today</span>
                  <span className="text-2xl font-black text-forest">£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Circular Savings Pill */}
              {totalSavings > 0 && (
                <div className="p-3 rounded-2xl bg-emerald-950 text-white flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-lime" />
                    <span className="font-bold text-lime">Saved vs buying new:</span>
                  </div>
                  <span className="font-black text-lime">£{totalSavings.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
