export type Category = 'Cleaning' | 'Parties' | 'DIY & Tools' | 'Audio/Visual' | 'Bundles';

export interface Product {
  id: string;
  name: string;
  category: Category;
  brand: string;
  tagline: string;
  description: string;
  specifications: string[];
  image: string;
  gallery: string[];
  baseRentalPrice28h: number; // £ for first 28h
  dailyRateAfter: number;     // £/day after
  rrpBuying: number;          // RRP Buying price in £
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  patTested: boolean;
  popular: boolean;
  featured: boolean;
  bundleIncludes?: string[];
  tags: string[];
}

export interface CartItem {
  product: Product;
  rentalDays: number;
  startDate: string;
  endDate: string;
  deliverySlot: string;
  collectionSlot: string;
}

export interface UKPostcodeResult {
  code: string;
  eligible: boolean;
  areaName?: string;
  freeDelivery: boolean;
  estimatedHours: number;
  message: string;
}

export type OrderStatus = 'Pending' | 'Dispatched' | 'Active Loan' | 'Return Scheduled' | 'Completed';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  rentalDays: number;
  startDate: string;
  endDate: string;
  itemTotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  depositAmount: number; // Always 0 in Looply!
  status: OrderStatus;
  deliveryDate: string;
  deliverySlot: string;
  returnDate: string;
  driverAssigned?: string;
  paymentMethod: 'stripe' | 'apple_pay' | 'paypal';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  identityVerified: boolean;
  activeRentalsCount: number;
  phone?: string;
  postcode?: string;
  address?: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number; // percentage (e.g. 10 for 10%) or fixed amount in £
  minOrder?: number;
  expiresAt: string;
  active: boolean;
  usageCount: number;
}

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  highlightTag: string;
  bgGradient: string;
  image: string;
  stats: { label: string; value: string }[];
  active: boolean;
}
