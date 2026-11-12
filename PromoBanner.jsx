import React from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, Sparkles, TrendingUp, HeartHandshake, ArrowRight } from 'lucide-react';

export default function PromoBanner() {
  const { setIsListItemModalOpen, navigate } = useApp();

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 text-white p-6 sm:p-10 lg:p-12 shadow-xl shadow-emerald-950/10">
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-500/20 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 rounded-full bg-teal-400/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider backdrop-blur-xs border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Earn Pocket Money & Karma Points</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Got unused textbooks, lab coats, or gadgets lying in your dorm?
              </h2>

              <p className="text-sm sm:text-base text-emerald-100 max-w-2xl leading-relaxed">
                Don't let valuable gear sit idle. List them on BorrowBox in under 60 seconds. Lend for free to support juniors or charge a nominal daily rate to cover your campus canteen coffee!
              </p>

              {/* Perks Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/80 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 text-emerald-200" />
                  </div>
                  <span className="font-medium text-emerald-100">Set your own rates & rules</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/80 flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-4 h-4 text-emerald-200" />
                  </div>
                  <span className="font-medium text-emerald-100">Help juniors & batchmates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/80 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                  </div>
                  <span className="font-medium text-emerald-100">Boost campus sustainability</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => setIsListItemModalOpen(true)}
                  className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-sm rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-700" />
                  <span>List Your Item Now</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => navigate('how-it-works')}
                  className="px-5 py-3 bg-emerald-800/80 hover:bg-emerald-800 text-white font-semibold text-sm rounded-full border border-emerald-500/40 transition-all cursor-pointer"
                >
                  Lending FAQs
                </button>
              </div>
            </div>

            {/* Right Visual Badge Box */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 w-full max-w-xs space-y-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-300 text-slate-900 mx-auto flex items-center justify-center font-black text-2xl shadow-md">
                  ₹0
                </div>
                <div>
                  <div className="font-bold text-base text-white">Zero Listing Fees</div>
                  <div className="text-xs text-emerald-200 mt-1">
                    Free forever for university students. Keep 100% of any daily lending fee.
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10 text-[11px] text-emerald-300 font-mono">
                  Active Listings: 16+ on campus
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

