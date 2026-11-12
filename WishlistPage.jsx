import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Trash2, Eye, MapPin, ArrowRight, PackageOpen } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist, items, toggleWishlist, openItemDetails, navigate } = useApp();

  const savedItems = items.filter((item) => wishlist.includes(item.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-current" />
            <span>Saved Essentials</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Wishlist ({savedItems.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Keep track of items you plan to borrow for upcoming exams, labs, or campus events.
          </p>
        </div>

        {savedItems.length > 0 && (
          <button
            onClick={() => navigate('explore')}
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>Continue Browsing</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Grid of Wishlist Items */}
      {savedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {savedItems.map((item) => {
            const isAvailable = item.availability === 'Available';

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
              >
                {/* Image Box */}
                <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    {item.isFree ? (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold">
                        FREE
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-900/85 text-white text-[10px] font-bold">
                        ₹{item.lendingPrice}/day
                      </span>
                    )}

                    <span className="px-2 py-0.5 rounded-full bg-white/90 text-slate-800 text-[10px] font-semibold">
                      {item.condition}
                    </span>
                  </div>

                  {/* Remove from wishlist button */}
                  <button
                    onClick={(e) => toggleWishlist(item.id, e)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 hover:bg-rose-50 text-slate-600 hover:text-rose-600 flex items-center justify-center transition-all shadow-sm cursor-pointer"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Availability badge */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white bg-slate-900/70 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    <span className="truncate">📍 {item.campusLocation}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 rounded ${
                        isAvailable ? 'text-emerald-300' : 'text-amber-300'
                      }`}
                    >
                      {item.availability}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3
                      onClick={() => openItemDetails(item.id)}
                      className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {item.name}
                    </h3>
                  </div>

                  {/* Footer Price & View & Borrow Button */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Rate</div>
                      {item.isFree ? (
                        <span className="text-base font-extrabold text-emerald-600">FREE</span>
                      ) : (
                        <div className="flex items-baseline">
                          <span className="text-base font-extrabold text-slate-900">₹{item.lendingPrice}</span>
                          <span className="text-[11px] text-slate-500 font-medium">/day</span>
                        </div>
                      )}
                    </div>

                    {/* View & Borrow Button */}
                    <button
                      onClick={() => openItemDetails(item.id)}
                      className="py-2 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View & Borrow</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center space-y-4 max-w-md mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Your wishlist is empty</h3>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Save items by tapping the heart icon on any product card while browsing textbooks, electronics, or lab gear.
          </p>
          <button
            onClick={() => navigate('explore')}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer inline-flex items-center gap-2"
          >
            <span>Explore Campus Items</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

