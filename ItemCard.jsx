import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  AlertCircle,
  Eye,
  Calendar,
  Sparkles
} from 'lucide-react';

export default function ItemCard({ item, viewMode = 'grid' }) {
  const { openItemDetails, toggleWishlist, isItemInWishlist } = useApp();
  const inWishlist = isItemInWishlist(item.id);
  const isAvailable = item.availability === 'Available';

  // Condition styling
  const conditionBadgeStyles = {
    'Brand New': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Like New': 'bg-teal-100 text-teal-800 border-teal-200',
    'Good': 'bg-sky-100 text-sky-800 border-sky-200',
    'Fair': 'bg-amber-100 text-amber-800 border-amber-200',
  }[item.condition] || 'bg-slate-100 text-slate-800 border-slate-200';

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 p-3 sm:p-4 flex flex-col sm:flex-row gap-4 items-center relative overflow-hidden">
        {/* Image Container */}
        <div
          onClick={() => openItemDetails(item.id)}
          className="relative w-full sm:w-48 h-44 sm:h-36 rounded-xl overflow-hidden shrink-0 cursor-pointer bg-slate-100"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Wishlist Button */}
          <button
            onClick={(e) => toggleWishlist(item.id, e)}
            className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
              inWishlist
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-slate-600 hover:bg-white hover:text-rose-500'
            }`}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Availability Overlay if not available */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-xs">
                Currently Borrowed
              </span>
            </div>
          )}
        </div>

        {/* Content details */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full space-y-2 w-full">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                {item.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${conditionBadgeStyles}`}>
                {item.condition}
              </span>
            </div>

            <h3
              onClick={() => openItemDetails(item.id)}
              className="text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer"
            >
              {item.name}
            </h3>

            <p className="text-xs text-slate-500 line-clamp-2 mt-1">
              {item.description}
            </p>
          </div>

          {/* Location & Lender info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-1 text-slate-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{item.campusLocation}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
                {item.lender?.initials || 'CP'}
              </div>
              <span className="text-slate-700">{item.lender?.name}</span>
              <span className="flex items-center text-amber-500 font-semibold text-[11px]">
                <Star className="w-3 h-3 fill-current ml-0.5" />
                {item.lender?.rating || 4.9}
              </span>
            </div>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 w-full sm:w-auto sm:border-l sm:border-slate-100 sm:pl-4">
          <div className="text-left sm:text-right">
            <div className="text-[11px] font-semibold text-slate-400 uppercase">Lending Rate</div>
            {item.isFree ? (
              <span className="text-lg font-extrabold text-emerald-600">FREE</span>
            ) : (
              <div className="flex items-baseline gap-0.5">
                <span className="text-xl font-extrabold text-slate-900">₹{item.lendingPrice}</span>
                <span className="text-xs text-slate-500 font-medium">/day</span>
              </div>
            )}
          </div>

          <button
            onClick={() => openItemDetails(item.id)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>View & Borrow</span>
          </button>
        </div>
      </div>
    );
  }

  // Modern E-Commerce Grid Card
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      {/* Top Image Box */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges Row */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5 z-10">
          {item.isFree ? (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold tracking-wide shadow-xs">
              FREE
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold tracking-wide">
              ₹{item.lendingPrice}/day
            </span>
          )}

          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border backdrop-blur-xs ${conditionBadgeStyles}`}>
            {item.condition}
          </span>
        </div>

        {/* Heart Wishlist Button */}
        <button
          onClick={(e) => toggleWishlist(item.id, e)}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 shadow-sm cursor-pointer ${
            inWishlist
              ? 'bg-rose-500 text-white scale-105'
              : 'bg-white/90 text-slate-600 hover:bg-white hover:text-rose-500 hover:scale-105'
          }`}
          title={inWishlist ? 'Remove from Wishlist' : 'Save to Wishlist'}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Not Available Overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-xs">
              Currently Borrowed
            </span>
          </div>
        )}

        {/* Quick Location Badge overlay at bottom of image */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white bg-slate-900/70 backdrop-blur-md px-2.5 py-1 rounded-lg">
          <div className="flex items-center gap-1 truncate font-medium">
            <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">{item.campusLocation}</span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              {item.category}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span>{item.lender?.rating || 4.9}</span>
              <span className="text-slate-400 font-normal">({item.lender?.reviewCount || 12})</span>
            </div>
          </div>

          {/* Item Name */}
          <h3
            onClick={() => openItemDetails(item.id)}
            className="font-bold text-slate-900 text-sm hover:text-emerald-700 transition-colors line-clamp-2 leading-snug cursor-pointer"
            title={item.name}
          >
            {item.name}
          </h3>
        </div>

        {/* Lender Profile Micro-Bar */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 min-w-0">
            {item.lender?.avatar ? (
              <img
                src={item.lender.avatar}
                alt={item.lender.name}
                className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-emerald-200"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                {item.lender?.initials || 'CP'}
              </div>
            )}
            <div className="truncate">
              <div className="font-semibold text-slate-800 text-[11px] truncate">
                {item.lender?.name}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {item.lender?.department?.split(',')[0] || 'Student Peer'}
              </div>
            </div>
          </div>

          {/* Max Days indicator */}
          <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
            Up to {item.maxDurationDays || 7}d
          </span>
        </div>

        {/* Price & "View & Borrow" Button */}
        <div className="pt-2 flex items-center justify-between gap-2">
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

          {/* Prominent "View & Borrow" Button - explicitly required */}
          <button
            onClick={() => openItemDetails(item.id)}
            className="flex-1 max-w-[130px] py-2 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View & Borrow</span>
          </button>
        </div>
      </div>
    </div>
  );
}

