import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import BorrowRequestModal from '../components/Modals/BorrowRequestModal';
import ItemCard from '../components/ItemCard';
import {
  ArrowLeft,
  Heart,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Share2,
  Sparkles,
  Info,
  ChevronRight,
  Send
} from 'lucide-react';

export default function ItemDetailsPage() {
  const {
    items,
    selectedItemId,
    navigate,
    toggleWishlist,
    isItemInWishlist,
    addToast
  } = useApp();

  const item = items.find((i) => i.id === selectedItemId) || items[0];

  const [activeImage, setActiveImage] = useState(item?.image);
  const [durationDays, setDurationDays] = useState(3);
  const [requestNote, setRequestNote] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Sync active image if item changes
  useEffect(() => {
    if (item) {
      setActiveImage(item.image);
      setDurationDays(Math.min(3, item.maxDurationDays || 7));
    }
  }, [item]);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Item not found</h2>
        <button
          onClick={() => navigate('explore')}
          className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
        >
          Return to Explore
        </button>
      </div>
    );
  }

  const inWishlist = isItemInWishlist(item.id);
  const isAvailable = item.availability === 'Available';
  const maxDays = item.maxDurationDays || 14;

  // Calculate Dynamic Expected Return Date
  const calculateReturnDate = (days) => {
    const today = new Date();
    const returnDate = new Date();
    returnDate.setDate(today.getDate() + parseInt(days, 10));
    return returnDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const expectedReturnDateFormatted = calculateReturnDate(durationDays);
  const dailyRate = item.isFree ? 0 : item.lendingPrice;
  const totalCost = dailyRate * durationDays;

  // Additional images
  const allImages = [item.image, ...(item.additionalImages || [])].filter(Boolean);

  // Other items in same category
  const relatedItems = items
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 4);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Item link copied to clipboard!', 'info');
    }
  };

  const handleOpenBorrowModal = () => {
    if (!isAvailable) {
      addToast('This item is currently borrowed by another student.', 'warning');
      return;
    }
    setIsConfirmModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('explore')}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100/80 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            title="Share with batchmates"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Details Grid: Left Image Gallery (6 cols) & Right Lending Card (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md">
            <img
              src={activeImage}
              alt={item.name}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {item.isFree ? (
                <span className="px-3 py-1 rounded-full bg-emerald-600 text-white font-extrabold text-xs shadow-md">
                  FREE TO BORROW
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-white font-bold text-xs shadow-md">
                  ₹{item.lendingPrice} / day
                </span>
              )}

              <span className="px-3 py-1 rounded-full bg-white/95 text-slate-800 font-bold text-xs shadow-sm border border-slate-200">
                {item.condition}
              </span>
            </div>

            {/* Availability Indicator */}
            <div className="absolute bottom-4 left-4">
              {isAvailable ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Available for Pickup
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
                  <Clock className="w-3.5 h-3.5" />
                  Currently Borrowed
                </span>
              )}
            </div>

            {/* Wishlist Heart */}
            <button
              onClick={(e) => toggleWishlist(item.id, e)}
              className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                inWishlist
                  ? 'bg-rose-500 text-white scale-110'
                  : 'bg-white text-slate-700 hover:text-rose-500 hover:scale-105'
              }`}
              title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Thumbnails Row */}
          {allImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImage === img
                      ? 'border-emerald-600 ring-2 ring-emerald-500/30 scale-105'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Guidelines & Safety Box */}
          <div className="rounded-2xl p-4 bg-emerald-50/70 border border-emerald-200/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-950">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Lender's Borrowing Guidelines</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              {item.guidelines || 'Please handle this item responsibly, clean before return, and adhere to the scheduled return date.'}
            </p>
            <div className="pt-1 text-[11px] text-emerald-800 font-medium">
              ⏰ Pickup Window: {item.pickupTimes || 'Weekdays after 5 PM in common areas'}
            </div>
          </div>
        </div>

        {/* Right Column: Item Information & Borrowing Request Form */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {/* Category & Condition */}
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
              <span>{item.category}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-semibold">{item.condition} Condition</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {item.name}
            </h1>

            {/* Campus Location */}
            <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-600 font-medium">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Campus Pickup:</span>
              <strong className="text-slate-900 font-bold">{item.campusLocation}</strong>
              <span className="text-slate-400">({item.campusZone})</span>
            </div>
          </div>

          {/* Pricing Highlight Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Lending Rate
              </span>
              {item.isFree ? (
                <div className="text-2xl font-black text-emerald-600">
                  FREE <span className="text-xs font-normal text-slate-500">(Campus Peer Courtesy)</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">₹{item.lendingPrice}</span>
                  <span className="text-xs font-bold text-slate-500">/ day</span>
                </div>
              )}
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Max Allowed Duration
              </span>
              <span className="text-sm font-bold text-slate-800">
                Up to {maxDays} Days
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              About This Item
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>

          {/* Lender Profile Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Listed By Verified Student
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {item.lender?.avatar ? (
                  <img
                    src={item.lender.avatar}
                    alt={item.lender.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                    {item.lender?.initials || 'CP'}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {item.lender?.name || 'Fellow Student'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.lender?.department || 'Undergraduate Student'}
                  </p>
                  <p className="text-[11px] text-emerald-700 font-medium">
                    ⚡ Typically replies in {item.lender?.responseTime || '15 mins'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{item.lender?.rating || 4.9}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {item.lender?.reviewCount || 15} reviews
                </div>
              </div>
            </div>
          </div>

          {/* Borrowing Request Interaction Section (Step 3 & 4 of Flow) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-emerald-50/50 border-2 border-emerald-200/80 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-emerald-950 text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Configure Borrow Request</span>
              </h3>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Step 1 of 2
              </span>
            </div>

            {/* Duration Selector */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <label className="font-bold text-slate-700 uppercase tracking-wider">
                  Borrowing Duration: <span className="text-emerald-700 text-sm font-extrabold">{durationDays} {durationDays === 1 ? 'Day' : 'Days'}</span>
                </label>
                <span className="text-slate-400 font-medium">Max: {maxDays} days</span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex items-center gap-2 mb-3">
                {[1, 3, 5, 7, 14]
                  .filter((d) => d <= maxDays)
                  .map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDurationDays(d)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        durationDays === d
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      {d}d
                    </button>
                  ))}
              </div>

              {/* Slider */}
              <input
                type="range"
                min="1"
                max={maxDays}
                value={durationDays}
                onChange={(e) => setDurationDays(parseInt(e.target.value, 10))}
                className="w-full accent-emerald-600 cursor-pointer"
                disabled={!isAvailable}
              />
            </div>

            {/* Dynamic Return Date & Cost Calculation Preview */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-white border border-emerald-200/60 shadow-2xs">
                <div className="text-slate-400 text-[11px] font-semibold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Expected Return
                </div>
                <div className="font-extrabold text-slate-900 text-xs sm:text-sm mt-1">
                  {expectedReturnDateFormatted}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-emerald-200/60 shadow-2xs">
                <div className="text-slate-400 text-[11px] font-semibold">
                  Estimated Total Cost
                </div>
                <div className="font-extrabold text-slate-900 text-xs sm:text-sm mt-1">
                  {item.isFree ? (
                    <span className="text-emerald-700">₹0 (Free)</span>
                  ) : (
                    <span>₹{totalCost} <span className="text-[10px] text-slate-400 font-normal">({durationDays}d × ₹{item.lendingPrice})</span></span>
                  )}
                </div>
              </div>
            </div>

            {/* Note to lender */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Optional Note to Lender
              </label>
              <input
                type="text"
                placeholder="e.g. Needed for Friday's physics practical, can meet at library..."
                value={requestNote}
                onChange={(e) => setRequestNote(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:border-emerald-600 outline-none"
                disabled={!isAvailable}
              />
            </div>

            {/* Actions: Send Borrow Request & Add to Wishlist */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              {/* Send Borrow Request Button (Prompt requirement) */}
              <button
                onClick={handleOpenBorrowModal}
                disabled={!isAvailable}
                className={`w-full sm:flex-1 py-3.5 px-6 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                  isAvailable
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-700/25 hover:shadow-lg active:scale-98'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>{isAvailable ? 'Send Borrow Request' : 'Item Currently Unavailable'}</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={(e) => toggleWishlist(item.id, e)}
                className={`w-full sm:w-auto py-3.5 px-5 rounded-2xl font-bold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  inWishlist
                    ? 'bg-rose-50 border-rose-200 text-rose-700'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current text-rose-500' : ''}`} />
                <span>{inWishlist ? 'In Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <BorrowRequestModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        item={item}
        durationDays={durationDays}
        returnDate={expectedReturnDateFormatted}
        requestNote={requestNote}
        onConfirmSuccess={() => {
          // Navigates to My Activity so student sees their request with 'Pending' status
          navigate('my-activity', { activityTab: 'borrowing' });
        }}
      />

      {/* Related Items Section */}
      {relatedItems.length > 0 && (
        <section className="pt-8 border-t border-slate-200/80">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                More in {item.category}
              </h3>
              <p className="text-xs text-slate-500">
                Other gear students are sharing in this category
              </p>
            </div>
            <button
              onClick={() => {
                navigate('explore', { category: item.category });
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedItems.map((relItem) => (
              <ItemCard key={relItem.id} item={relItem} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

