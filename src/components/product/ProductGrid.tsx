'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, X, Check } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Category } from '@/types';
import { useAdminStore } from '@/store/useAdminStore';

const CATEGORIES: ('All' | Category)[] = [
  'All',
  'Cleaning',
  'Parties',
  'DIY & Tools',
  'Audio/Visual',
  'Bundles',
];

export const ProductGrid: React.FC = () => {
  const { products } = useAdminStore();
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'savings'>('popular');
  const [onlyBundles, setOnlyBundles] = useState(false);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesBundle = !onlyBundles || p.category === 'Bundles' || !!p.bundleIncludes;

        return matchesCategory && matchesSearch && matchesBundle;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
        if (sortBy === 'price-asc') return a.baseRentalPrice28h - b.baseRentalPrice28h;
        if (sortBy === 'price-desc') return b.baseRentalPrice28h - a.baseRentalPrice28h;
        if (sortBy === 'savings') {
          const savingsA = a.rrpBuying - a.baseRentalPrice28h;
          const savingsB = b.rrpBuying - b.baseRentalPrice28h;
          return savingsB - savingsA;
        }
        return 0;
      });
  }, [products, selectedCategory, searchQuery, sortBy, onlyBundles]);

  return (
    <section id="catalog" className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-lime text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMERCIAL & PREMIUM SPEC</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Explore the Looply Gear Library
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              All rentals include zero deposit hold, free 2-hour doorstep delivery, & full PAT safety certification.
            </p>
          </div>

          <div className="text-xs font-bold text-slate-500">
            Showing <span className="text-forest font-black">{filteredProducts.length}</span> verified gear items
          </div>
        </div>

        {/* Controls: Search & Category Tabs */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pressure washers, 4K projectors, JBL sound, drills..."
                className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-forest shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full sm:w-auto px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-forest shadow-xs"
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="savings">Biggest Savings vs Buy</option>
              </select>

              <button
                onClick={() => setOnlyBundles(!onlyBundles)}
                className={`px-3.5 py-3 rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                  onlyBundles
                    ? 'bg-lime text-charcoal border-lime shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>Bundles</span>
                {onlyBundles && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-forest text-lime shadow-md scale-102'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="text-lg font-bold text-slate-900">No matching gear found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn’t find anything matching &quot;{searchQuery}&quot;. Try clearing your search or browsing another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setOnlyBundles(false);
              }}
              className="px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-hover"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
