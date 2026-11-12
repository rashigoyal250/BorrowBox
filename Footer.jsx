import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Package,
  Heart,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  MapPin,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const { navigate, categories, campusLocations, resetToDemoData, setSelectedCategory, setSelectedLocation } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Bio (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => navigate('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-sm shadow-emerald-500/30">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Borrow<span className="text-emerald-400">Box</span>
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Campus
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              BorrowBox is a student-built campus borrowing platform. We help college students access textbooks, calculators, lab coats, and essentials without spending unnecessary money or creating campus waste.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Peer-to-Peer • No Platform Commission</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(c.id);
                      navigate('explore', { category: c.id });
                    }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Campus Locations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Campus Locations
            </h4>
            <ul className="space-y-2 text-xs">
              {campusLocations.slice(1).map((loc) => (
                <li key={loc.id}>
                  <button
                    onClick={() => {
                      setSelectedLocation(loc.id);
                      navigate('explore', { location: loc.id });
                    }}
                    className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    {loc.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Navigation & Demo Helper */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate('explore')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Explore All Items
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('how-it-works')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('my-activity')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  My Borrow & Lend Activity
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('wishlist')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('profile')}
                  className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Student Profile
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={resetToDemoData}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3 text-emerald-400" />
                  <span>Reset Demo Data</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 BorrowBox Campus Network. Built for students, by students.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy Guidelines</span>
            <span>•</span>
            <span>Community Honor Code</span>
            <span>•</span>
            <span>Campus Safety Hotline: Ext 404</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

