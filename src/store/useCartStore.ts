import { create } from 'zustand';
import { Product, CartItem, DiscountCode } from '@/types';
import { MOCK_DISCOUNT_CODES } from '@/data/mockData';

interface CartStore {
  items: CartItem[];
  isDrawerOpen: boolean;
  appliedDiscount: DiscountCode | null;
  discountError: string | null;
  deliveryDate: string;
  returnDate: string;
  deliverySlot: string;
  collectionSlot: string;

  // Actions
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  addItem: (product: Product, rentalDays?: number, startDate?: string, endDate?: string) => void;
  removeItem: (productId: string) => void;
  updateItemDays: (productId: string, days: number) => void;
  clearCart: () => void;
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;
  setDeliverySlots: (deliveryDate: string, returnDate: string, deliverySlot: string, collectionSlot: string) => void;

  // Computed Helpers
  getItemTotal: (item: CartItem) => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getTotal: () => number;
  getTotalBuyingRRP: () => number;
  getTotalSavings: () => number;
  getItemCount: () => number;
}

const getDefaultStartDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

const getDefaultEndDate = (days = 2) => {
  const d = new Date();
  d.setDate(d.getDate() + 1 + days);
  return d.toISOString().split('T')[0];
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isDrawerOpen: false,
  appliedDiscount: null,
  discountError: null,
  deliveryDate: getDefaultStartDate(),
  returnDate: getDefaultEndDate(2),
  deliverySlot: '10:00 - 12:00',
  collectionSlot: '14:00 - 16:00',

  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  addItem: (product, rentalDays = 2, startDate, endDate) => {
    const sDate = startDate || get().deliveryDate;
    const eDate = endDate || get().returnDate;

    set((state) => {
      const existingIndex = state.items.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex].rentalDays = Math.max(1, updated[existingIndex].rentalDays + 1);
        return { items: updated, isDrawerOpen: true };
      }

      return {
        items: [
          ...state.items,
          {
            product,
            rentalDays: Math.max(1, rentalDays),
            startDate: sDate,
            endDate: eDate,
            deliverySlot: state.deliverySlot,
            collectionSlot: state.collectionSlot,
          },
        ],
        isDrawerOpen: true,
      };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },

  updateItemDays: (productId, days) => {
    const safeDays = Math.max(1, days);
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, rentalDays: safeDays } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [], appliedDiscount: null, discountError: null });
  },

  applyDiscountCode: (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = MOCK_DISCOUNT_CODES.find((d) => d.code === clean && d.active);
    if (!found) {
      set({ discountError: 'Invalid or expired promo code.' });
      return false;
    }

    const subtotal = get().getSubtotal();
    if (found.minOrder && subtotal < found.minOrder) {
      set({ discountError: `Minimum rental subtotal of £${found.minOrder.toFixed(2)} required.` });
      return false;
    }

    set({ appliedDiscount: found, discountError: null });
    return true;
  },

  removeDiscountCode: () => {
    set({ appliedDiscount: null, discountError: null });
  },

  setDeliverySlots: (deliveryDate, returnDate, deliverySlot, collectionSlot) => {
    set({ deliveryDate, returnDate, deliverySlot, collectionSlot });
  },

  getItemTotal: (item: CartItem) => {
    // Pricing logic: First 28 hours (approx 1 day) base price, plus daily rate for extra days
    const base = item.product.baseRentalPrice28h;
    if (item.rentalDays <= 1) return base;
    const additionalDays = item.rentalDays - 1;
    return base + additionalDays * item.product.dailyRateAfter;
  },

  getSubtotal: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + state.getItemTotal(item), 0);
  },

  getDiscountAmount: () => {
    const state = get();
    if (!state.appliedDiscount) return 0;
    const subtotal = state.getSubtotal();
    if (state.appliedDiscount.discountType === 'percentage') {
      return (subtotal * state.appliedDiscount.value) / 100;
    }
    return Math.min(subtotal, state.appliedDiscount.value);
  },

  getTotal: () => {
    const state = get();
    return Math.max(0, state.getSubtotal() - state.getDiscountAmount());
  },

  getTotalBuyingRRP: () => {
    const state = get();
    return state.items.reduce((sum, item) => sum + item.product.rrpBuying, 0);
  },

  getTotalSavings: () => {
    const state = get();
    const buyingCost = state.getTotalBuyingRRP();
    const rentalCost = state.getTotal();
    return Math.max(0, buyingCost - rentalCost);
  },

  getItemCount: () => {
    const state = get();
    return state.items.reduce((count, item) => count + item.rentalDays, 0);
  },
}));
