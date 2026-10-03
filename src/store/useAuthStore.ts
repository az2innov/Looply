import { create } from 'zustand';
import { User } from '@/types';
import { MOCK_USERS } from '@/data/mockData';

interface AuthStore {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin2FAVerified: boolean;
  is2FAChallenged: boolean;
  pendingUser: User | null;
  mockOtpSecret: string;
  expectedDemoCode: string;
  authError: string | null;
  lastSentOtpCode: string | null;

  // Actions
  login: (email: string, password: string) => Promise<{ requires2FA: boolean; success: boolean }>;
  verify2FA: (code: string) => Promise<boolean>;
  send2FAEmailCode: (email: string) => Promise<string | null>;
  cancel2FA: () => void;
  logout: () => void;
  enable2FA: () => void;
  disable2FA: () => void;
  updateProfile: (updated: Partial<User>) => void;
  register: (name: string, email: string) => boolean;
  switchUserRole: (role: 'customer' | 'admin') => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Default to NULL / UNLOGGED for strict security
  currentUser: null,
  isAuthenticated: false,
  isAdmin2FAVerified: false,
  is2FAChallenged: false,
  pendingUser: null,
  mockOtpSecret: 'JBSWY3DPEHPK3PXP',
  expectedDemoCode: '123456',
  authError: null,
  lastSentOtpCode: null,

  send2FAEmailCode: async (email: string) => {
    try {
      const res = await fetch('/api/auth/2fa/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.demoCode) {
        set({ lastSentOtpCode: data.demoCode });
        return data.demoCode;
      }
    } catch (e) {
      console.warn('Error calling 2FA send API:', e);
    }
    return null;
  },

  login: async (email: string, password: string) => {
    set({ authError: null });
    const cleanEmail = email.trim().toLowerCase();
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      // Guest customer on the fly
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email: cleanEmail,
        role: 'customer',
        twoFactorEnabled: false,
        identityVerified: true,
        activeRentalsCount: 0,
      };
      set({ currentUser: newUser, isAuthenticated: true, is2FAChallenged: false, pendingUser: null });
      return { requires2FA: false, success: true };
    }

    // Admin or 2FA enabled users MUST pass 2FA
    if (user.twoFactorEnabled || user.role === 'admin') {
      set({
        is2FAChallenged: true,
        pendingUser: user,
        authError: null,
      });

      // Dispatch real email via Mailtrap SMTP
      await get().send2FAEmailCode(cleanEmail);

      return { requires2FA: true, success: false };
    }

    set({ currentUser: user, isAuthenticated: true, is2FAChallenged: false, pendingUser: null });
    return { requires2FA: false, success: true };
  },

  verify2FA: async (code: string) => {
    const cleanCode = code.trim();
    const pending = get().pendingUser;
    if (!pending) return false;

    try {
      // Call Redis verification API
      const res = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pending.email, code: cleanCode }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        set({
          currentUser: pending,
          isAuthenticated: true,
          isAdmin2FAVerified: pending.role === 'admin',
          is2FAChallenged: false,
          pendingUser: null,
          authError: null,
        });
        return true;
      }
    } catch (e) {
      console.warn('API verify fallback check');
    }

    // Fallback: allow demo code '123456' or last generated code
    const isLocalValid =
      cleanCode === '123456' ||
      cleanCode === get().lastSentOtpCode ||
      (/^\d{6}$/.test(cleanCode) && process.env.NODE_ENV !== 'production');

    if (isLocalValid) {
      set({
        currentUser: pending,
        isAuthenticated: true,
        isAdmin2FAVerified: pending.role === 'admin',
        is2FAChallenged: false,
        pendingUser: null,
        authError: null,
      });
      return true;
    }

    set({ authError: 'Invalid 6-digit authentication code. Check your Mailtrap inbox.' });
    return false;
  },

  cancel2FA: () => {
    set({ is2FAChallenged: false, pendingUser: null, authError: null });
  },

  logout: () => {
    set({
      currentUser: null,
      isAuthenticated: false,
      isAdmin2FAVerified: false,
      is2FAChallenged: false,
      pendingUser: null,
      authError: null,
    });
  },

  enable2FA: () => {
    const curr = get().currentUser;
    if (curr) {
      const updated = {
        ...curr,
        twoFactorEnabled: true,
        twoFactorSecret: 'LOOPLY' + Math.random().toString(36).substring(2, 10).toUpperCase(),
      };
      set({ currentUser: updated });
    }
  },

  disable2FA: () => {
    const curr = get().currentUser;
    if (curr) {
      set({ currentUser: { ...curr, twoFactorEnabled: false, twoFactorSecret: undefined } });
    }
  },

  updateProfile: (updated: Partial<User>) => {
    const curr = get().currentUser;
    if (curr) {
      set({ currentUser: { ...curr, ...updated } });
    }
  },

  register: (name: string, email: string) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'customer',
      twoFactorEnabled: true,
      twoFactorSecret: 'JBSWY3DPEHPK3PXP',
      identityVerified: true,
      activeRentalsCount: 0,
      postcode: 'SW1A 1AA',
      address: '10 Downing St, Westminster, London',
    };
    set({ currentUser: newUser, isAuthenticated: true, is2FAChallenged: false });
    return true;
  },

  switchUserRole: (role: 'customer' | 'admin') => {
    const curr = get().currentUser;
    if (curr) {
      set({ currentUser: { ...curr, role } });
    }
  },
}));
