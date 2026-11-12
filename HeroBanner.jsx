import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Compass,
  PlusCircle,
  ShieldCheck,
  Zap,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export default function HeroBanner() {
  const { navigate, setIsListItemModalOpen } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#e8f8f0] via-[#edf9f3] to-[#f7faf7] py-8 sm:py-12 md:py-16 border-b border-emerald-100">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -ml-20 w-80 h-80 rounded-full bg-teal-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Campus Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-xs border border-emerald-200/70 text-xs font-semibold text-emerald-800">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Campus Peer-to-Peer Sharing Community</span>
              <span className="text-emerald-300">•</span>
              <span className="text-emerald-700">100% Student Verified</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Borrow What You Need.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 block sm:inline">
                Share What You Have.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Need a scientific calculator for your 2 PM midterm? A lab coat for organic chem? Or an umbrella before a sudden downpour? BorrowBox connects you with dorm-mates and batchmates to borrow essentials in minutes instead of buying new.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <button
                onClick={() => navigate('explore')}
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm sm:text-base rounded-full shadow-md shadow-emerald-800/20 hover:shadow-lg hover:shadow-emerald-800/30 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Compass className="w-5 h-5 text-emerald-200 group-hover:rotate-45 transition-transform" />
                <span>Explore Items</span>
                <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsListItemModalOpen(true)}
                className="px-6 py-3.5 bg-white hover:bg-emerald-50/80 text-emerald-900 border-2 border-emerald-300 font-semibold text-sm sm:text-base rounded-full shadow-xs hover:border-emerald-500 transition-all flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                <span>List an Item</span>
              </button>
            </div>

            {/* Quick Campus Feature Badges */}
            <div className="pt-3 border-t border-emerald-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Free or ₹15-50</div>
                  <div className="text-[11px] text-slate-500">Zero commission</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Campus Pickup</div>
                  <div className="text-[11px] text-slate-500">Hostels & Blocks</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Student Verified</div>
                  <div className="text-[11px] text-slate-500">College email auth</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Eco-Friendly</div>
                  <div className="text-[11px] text-slate-500">Cut campus waste</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Illustration / Interactive Card Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card */}
              <div className="bg-white rounded-3xl p-5 shadow-xl shadow-emerald-950/5 border border-emerald-100/80 relative">
                {/* Visual Header */}
                <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden mb-4 group">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                    alt="College students sharing study essentials"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-600/90 text-[11px] font-semibold mb-1">
                      <Clock className="w-3 h-3" /> Quick 5-min Meetups
                    </div>
                    <p className="text-sm font-semibold leading-snug drop-shadow-xs">
                      "Borrowed a TI-84 calculator in Hostel C 30 mins before my physics midterm!"
                    </p>
                  </div>
                </div>

                {/* Micro Live Borrowing Ticker */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-1">
                    <span>Recent Campus Activity</span>
                    <span className="text-emerald-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" /> Live
                    </span>
                  </div>

                  {/* Activity Pill 1 */}
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <img
                      src="https://images.unsplash.com/photo-1611125832047-1d7ad1e8e485?auto=format&fit=crop&w=100&q=80"
                      alt="TI-84"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 truncate">TI-84 Plus Graphing Calculator</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" /> Hostel Block C • ₹40/day
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-100 rounded-md">
                      Available
                    </span>
                  </div>

                  {/* Activity Pill 2 */}
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <img
                      src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=100&q=80"
                      alt="Lab Coat"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 truncate">Cotton Chemistry Lab Coat (M)</div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" /> Academic Block 2 • Free
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-semibold text-teal-700 bg-teal-100 rounded-md">
                      FREE
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge (Dorm Trust Badge) */}
              <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-lg border border-emerald-100 flex items-center gap-3 animate-bounce-subtle">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-sm shadow-emerald-600/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">480+ Items Borrowed</div>
                  <div className="text-[11px] text-slate-500">Across 8 campus blocks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

