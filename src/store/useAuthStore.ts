import { create } from 'zustand';
import { User } from '@/types';
import { MOCK_USERS } from '@/data/mockData';

interface AuthStore {
  currentUser: User | null;
  isAuthenticated: boolean;
  is2FAChallenged: boolean;
  pendingUser: User | null;
  mockOtpSecret: string;
  expectedDemoCode: string;
  authError: string | null;

  // Actions
  login: (email: string, password: string) => { requires2FA: boolean; success: boolean };
  verify2FA: (code: string) => boolean;
  cancel2FA: () => void;
  logout: () => void;
  enable2FA: () => void;
  disable2FA: () => void;
  updateProfile: (updated: Partial<User>) => void;
  register: (name: string, email: string) => boolean;
  switchUserRole: (role: 'customer' | 'admin') => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Default to a pre-authenticated demo user with 2FA so user can immediately experience the UX
  currentUser: MOCK_USERS[0], // Eleanor Campbell (Admin)
  isAuthenticated: true,
  is2FAChallenged: false,
  pendingUser: null,
  mockOtpSecret: 'JBSWY3DPEHPK3PXP',
  expectedDemoCode: '123456',
  authError: null,

  login: (email: string, password: string) => {
    set({ authError: null });
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Create guest customer on the fly if not in list
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: 'customer',
        twoFactorEnabled: false,
        identityVerified: true,
        activeRentalsCount: 0,
      };
      set({ currentUser: newUser, isAuthenticated: true, is2FAChallenged: false, pendingUser: null });
      return { requires2FA: false, success: true };
    }

    if (user.twoFactorEnabled) {
      set({
        is2FAChallenged: true,
        pendingUser: user,
        authError: null,
      });
      return { requires2FA: true, success: false };
    }

    set({ currentUser: user, isAuthenticated: true, is2FAChallenged: false, pendingUser: null });
    return { requires2FA: false, success: true };
  },

  verify2FA: (code: string) => {
    const cleanCode = code.trim();
    // Allow either the demo code '123456' or any 6 digit number in testing
    const isValid = cleanCode === '123456' || (/^\d{6}$/.test(cleanCode));
    
    if (isValid && get().pendingUser) {
      set({
        currentUser: get().pendingUser,
        isAuthenticated: true,
        is2FAChallenged: false,
        pendingUser: null,
        authError: null,
      });
      return true;
    }

    set({ authError: 'Invalid 6-digit authentication code. (Try 123456)' });
    return false;
  },

  cancel2FA: () => {
    set({ is2FAChallenged: false, pendingUser: null, authError: null });
  },

  logout: () => {
    set({
      currentUser: null,
      isAuthenticated: false,
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
      twoFactorEnabled: true, // Default high-security for looply
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
    } else {
      set({ currentUser: role === 'admin' ? MOCK_USERS[0] : MOCK_USERS[1], isAuthenticated: true });
    }
  },
}));
