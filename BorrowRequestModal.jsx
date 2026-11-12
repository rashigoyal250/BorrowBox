import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  X,
  AlertTriangle,
  ShieldCheck,
  Send
} from 'lucide-react';

export default function BorrowRequestModal({
  isOpen,
  onClose,
  item,
  durationDays,
  startDate,
  returnDate,
  requestNote,
  onConfirmSuccess
}) {
  const { createBorrowRequest, navigate } = useApp();

  if (!isOpen || !item) return null;

  const dailyRate = item.isFree ? 0 : item.lendingPrice;
  const estimatedCost = dailyRate * durationDays;

  const handleConfirm = () => {
    createBorrowRequest({
      item,
      durationDays,
      startDate,
      returnDate,
      requestNote,
    });

    if (onConfirmSuccess) {
      onConfirmSuccess();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/60 flex items-center justify-center text-emerald-300">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Confirm Borrowing Request</h3>
              <p className="text-xs text-emerald-200">Review request details before notifying lender</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Item Snapshot */}
          <div className="flex gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                {item.category}
              </span>
              <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
              <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{item.campusLocation}</span>
              </div>
            </div>
          </div>

          {/* Key Summary Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-slate-500 text-[11px] block">Duration</span>
              <span className="font-extrabold text-emerald-950 text-sm mt-0.5 block">
                {durationDays} {durationDays === 1 ? 'Day' : 'Days'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-slate-500 text-[11px] block">Expected Return Date</span>
              <span className="font-extrabold text-emerald-950 text-sm mt-0.5 block">
                {returnDate}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 text-[11px] block">Lender Name</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 block truncate">
                {item.lender?.name || 'Campus Student'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 text-[11px] block">Estimated Cost</span>
              <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
                {item.isFree ? (
                  <span className="text-emerald-700">FREE</span>
                ) : (
                  <>₹{estimatedCost} <span className="text-[10px] text-slate-400 font-normal">({durationDays}d × ₹{item.lendingPrice})</span></>
                )}
              </span>
            </div>
          </div>

          {/* Student Note */}
          {requestNote && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <span className="text-[11px] font-bold text-slate-500 block mb-1">Your message to lender:</span>
              <p className="text-slate-700 italic">"{requestNote}"</p>
            </div>
          )}

          {/* Trust & Safe Return Reminder */}
          <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/70 text-xs text-emerald-900 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">BorrowBox Safe Campus Guarantee</span>
              <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                By sending this request, you agree to treat the item with care, meet at a designated public campus area, and return it by the expected date.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm & Send Request</span>
          </button>
        </div>
      </div>
    </div>
  );
}

