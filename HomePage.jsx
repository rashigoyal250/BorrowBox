import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import ItemCard from '../components/ItemCard';
import CampusLocationFilter from '../components/CampusLocationFilter';
import HowItWorks from '../components/HowItWorks';
import PromoBanner from '../components/PromoBanner';
import {
  Sparkles,
  ArrowRight,
  Filter,
  SlidersHorizontal,
  TrendingUp,
  Gift,
  CheckCircle2
} from 'lucide-react';

export default function HomePage() {
  const { items, navigate, setSelectedCategory, setSelectedLocation } = useApp();
  const [popularFilter, setPopularFilter] = useState('all'); // 'all' | 'free' | 'electronics' | 'books' | 'lab'
  const [popularSort, setPopularSort] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc'

  // Filter popular section items
  const filteredPopularItems = items.filter((item) => {
    if (popularFilter === 'free') return item.isFree;
    if (popularFilter === 'electronics') return item.category === 'Electronics';
    if (popularFilter === 'books') return item.category === 'Books & Notes';
    if (popularFilter === 'lab') return item.category === 'Lab Essentials';
    return true; // 'all'
  }).sort((a, b) => {
    if (popularSort === 'price-asc') return a.lendingPrice - b.lendingPrice;
    if (popularSort === 'price-desc') return b.lendingPrice - a.lendingPrice;
    // Featured / Popular first
    return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
  });

  return (
    <div className="space-y-4">
      {/* 1. Large Mint-Green Hero Banner */}
      <HeroBanner />

      {/* 2. Browse Categories Section */}
      <CategoryGrid />

      {/* 3. Popular Items Section */}
      <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4 border-b border-slate-200/80 pb-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Trending on Campus</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Items Available to Borrow
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              High-demand exam essentials, lab gear, and tech gadgets ready for quick pickup.
            </p>
          </div>

          {/* Quick Filter Tabs & Sorting */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'free', label: 'Free (₹0)' },
                { id: 'electronics', label: 'Electronics' },
                { id: 'books', label: 'Books' },
                { id: 'lab', label: 'Lab Gear' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPopularFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    popularFilter === tab.id
                      ? 'bg-white text-emerald-800 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={popularSort}
              onChange={(e) => setPopularSort(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 focus:border-emerald-600 outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPopularItems.slice(0, 8).map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Explore All CTA Bar */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              setSelectedCategory('all');
              navigate('explore');
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Explore All {items.length} Campus Listings</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </section>

      {/* 4. Campus Location Discovery Section ("Available Near You") */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CampusLocationFilter />
      </div>

      {/* 5. How BorrowBox Works */}
      <HowItWorks />

      {/* 6. Promotional Banner (Encourage listing unused items) */}
      <PromoBanner />
    </div>
  );
}

