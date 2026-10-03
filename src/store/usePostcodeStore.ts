import { create } from 'zustand';
import { UKPostcodeResult } from '@/types';
import { MOCK_ELIGIBLE_PREFIXES } from '@/data/mockData';

interface PostcodeStore {
  postcode: string;
  result: UKPostcodeResult | null;
  isModalOpen: boolean;
  
  // Actions
  openModal: () => void;
  closeModal: () => void;
  setPostcode: (code: string) => void;
  checkPostcode: (code: string) => UKPostcodeResult;
}

export const usePostcodeStore = create<PostcodeStore>((set) => ({
  postcode: 'SW1A 1AA',
  result: {
    code: 'SW1A 1AA',
    eligible: true,
    areaName: 'Central London & Westminster',
    freeDelivery: true,
    estimatedHours: 2,
    message: 'Awesome news! You qualify for Free 2-Hour Delivery & Collection straight to your door.',
  },
  isModalOpen: false,

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  setPostcode: (code: string) => set({ postcode: code }),

  checkPostcode: (inputCode: string) => {
    const raw = inputCode.trim().toUpperCase();
    if (!raw || raw.length < 2) {
      const res: UKPostcodeResult = {
        code: inputCode,
        eligible: false,
        freeDelivery: false,
        estimatedHours: 0,
        message: 'Please enter a valid UK postcode (e.g. SW1A 1AA, E1 6AN, NW1 4RY).',
      };
      set({ result: res });
      return res;
    }

    // Extract letters prefix (e.g. SW from SW1A, E from E1, CR from CR0)
    const match = raw.match(/^([A-Z]{1,2})/);
    const prefix = match ? match[1] : '';

    if (prefix && MOCK_ELIGIBLE_PREFIXES[prefix]) {
      const zone = MOCK_ELIGIBLE_PREFIXES[prefix];
      const res: UKPostcodeResult = {
        code: raw,
        eligible: true,
        areaName: zone.area,
        freeDelivery: true,
        estimatedHours: zone.estimatedHours,
        message: `Great news! ${zone.area} is in our Free 2-Hour Doorstep Delivery & Return zone.`,
      };
      set({ postcode: raw, result: res });
      return res;
    }

    // Check if it's generally a UK postcode format
    const isGeneralUK = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(raw) || raw.length >= 5;
    if (isGeneralUK) {
      const res: UKPostcodeResult = {
        code: raw,
        eligible: true,
        areaName: 'UK Nationwide Courier Zone',
        freeDelivery: true,
        estimatedHours: 24,
        message: 'You are eligible for Looply Next-Day Carbon-Neutral Courier with £0 Deposit Guarantee.',
      };
      set({ postcode: raw, result: res });
      return res;
    }

    const res: UKPostcodeResult = {
      code: raw,
      eligible: false,
      freeDelivery: false,
      estimatedHours: 0,
      message: 'Postcode not recognised. Please verify your UK postcode format.',
    };
    set({ result: res });
    return res;
  },
}));
