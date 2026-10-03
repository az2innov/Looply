import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { USPTrustBar } from '@/components/home/USPTrustBar';
import { InteractiveTimeline } from '@/components/home/InteractiveTimeline';
import { SavingsCalculator } from '@/components/home/SavingsCalculator';
import { ProductGrid } from '@/components/product/ProductGrid';
import { TrustpilotReviews } from '@/components/home/TrustpilotReviews';
import { FAQSection } from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section with Carousel & Instant Postcode Checker */}
      <HeroSection />

      {/* 2. Key Value Propositions Trust Bar */}
      <USPTrustBar />

      {/* 3. Interactive Product Catalog */}
      <ProductGrid />

      {/* 4. 3-Step Interactive Timeline */}
      <InteractiveTimeline />

      {/* 5. Circular Living Savings & Comparison Matrix */}
      <SavingsCalculator />

      {/* 6. Customer Reviews Reel */}
      <TrustpilotReviews />

      {/* 7. UK Rental FAQs */}
      <FAQSection />
    </div>
  );
}
