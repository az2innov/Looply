import { create } from 'zustand';
import { Product, Order, HeroSlide, DiscountCode, User, OrderStatus } from '@/types';
import {
  INITIAL_PRODUCTS,
  MOCK_ORDERS,
  MOCK_HERO_SLIDES,
  MOCK_DISCOUNT_CODES,
  MOCK_USERS,
} from '@/data/mockData';

interface AdminStore {
  products: Product[];
  orders: Order[];
  heroSlides: HeroSlide[];
  discountCodes: DiscountCode[];
  users: User[];

  // Product CRUD
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;

  // Orders Management
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  assignDriver: (orderId: string, driver: string) => void;
  addOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;

  // Carousel & Banner Management
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  updateHeroSlide: (id: string, updates: Partial<HeroSlide>) => void;
  deleteHeroSlide: (id: string) => void;
  toggleHeroSlide: (id: string) => void;

  // Discount Codes Engine
  addDiscountCode: (code: Omit<DiscountCode, 'id' | 'usageCount'>) => void;
  toggleDiscountCode: (id: string) => void;
  deleteDiscountCode: (id: string) => void;

  // Users Directory
  verifyUserIdentity: (userId: string) => void;
  toggleUser2FA: (userId: string) => void;

  // Analytics Helpers
  getStats: () => {
    totalRevenue: number;
    activeLoans: number;
    totalRentals: number;
    returnRate: number;
    patTestedRate: number;
  };
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  products: INITIAL_PRODUCTS,
  orders: MOCK_ORDERS,
  heroSlides: MOCK_HERO_SLIDES,
  discountCodes: MOCK_DISCOUNT_CODES,
  users: MOCK_USERS,

  // Products
  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
    };
    set((state) => ({ products: [newProduct, ...state.products] }));
  },

  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  },

  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },

  toggleStock: (id) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, inStock: !p.inStock } : p
      ),
    }));
  },

  // Orders
  updateOrderStatus: (id, status) => {
    set((state) => ({
      orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
    }));
  },

  assignDriver: (orderId, driver) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, driverAssigned: driver } : o
      ),
    }));
  },

  addOrder: (orderData) => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `LP-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ orders: [newOrder, ...state.orders] }));
    return newOrder;
  },

  // Hero Slides
  addHeroSlide: (slideData) => {
    const newSlide: HeroSlide = {
      ...slideData,
      id: `slide-${Date.now()}`,
    };
    set((state) => ({ heroSlides: [...state.heroSlides, newSlide] }));
  },

  updateHeroSlide: (id, updates) => {
    set((state) => ({
      heroSlides: state.heroSlides.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  },

  deleteHeroSlide: (id) => {
    set((state) => ({
      heroSlides: state.heroSlides.filter((s) => s.id !== id),
    }));
  },

  toggleHeroSlide: (id) => {
    set((state) => ({
      heroSlides: state.heroSlides.map((s) =>
        s.id === id ? { ...s, active: !s.active } : s
      ),
    }));
  },

  // Discounts
  addDiscountCode: (codeData) => {
    const newCode: DiscountCode = {
      ...codeData,
      id: `disc-${Date.now()}`,
      usageCount: 0,
    };
    set((state) => ({ discountCodes: [newCode, ...state.discountCodes] }));
  },

  toggleDiscountCode: (id) => {
    set((state) => ({
      discountCodes: state.discountCodes.map((d) =>
        d.id === id ? { ...d, active: !d.active } : d
      ),
    }));
  },

  deleteDiscountCode: (id) => {
    set((state) => ({
      discountCodes: state.discountCodes.filter((d) => d.id !== id),
    }));
  },

  // Users
  verifyUserIdentity: (userId) => {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, identityVerified: !u.identityVerified } : u
      ),
    }));
  },

  toggleUser2FA: (userId) => {
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, twoFactorEnabled: !u.twoFactorEnabled } : u
      ),
    }));
  },

  // Analytics
  getStats: () => {
    const state = get();
    const totalRevenue = state.orders.reduce((acc, o) => acc + o.totalAmount, 0);
    const activeLoans = state.orders.filter((o) => o.status === 'Active Loan').length;
    const totalRentals = state.orders.length;
    const completedOrders = state.orders.filter((o) => o.status === 'Completed').length;
    const returnRate = totalRentals > 0 ? (completedOrders / totalRentals) * 100 : 99.4;
    const patTestedCount = state.products.filter((p) => p.patTested).length;
    const patTestedRate = state.products.length > 0 ? (patTestedCount / state.products.length) * 100 : 100;

    return {
      totalRevenue,
      activeLoans,
      totalRentals,
      returnRate: Number(returnRate.toFixed(1)),
      patTestedRate: Number(patTestedRate.toFixed(0)),
    };
  },
}));
