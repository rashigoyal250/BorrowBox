import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Send,
  RotateCcw,
  ShieldCheck,
  Award,
  Users2,
  ArrowRight
} from 'lucide-react';

export default function HowItWorks() {
  const { navigate, setIsListItemModalOpen } = useApp();

  const steps = [
    {
      number: '01',
      title: 'Find an Item',
      description:
        'Search our campus catalog for textbooks, lab coats, calculators, chargers, or sports gear. Filter by hostel, department or price.',
      icon: Search,
      badge: 'Fast Campus Search',
      bgColor: 'bg-emerald-50',
      iconBg: 'bg-emerald-600',
    },
    {
      number: '02',
      title: 'Send a Borrow Request',
      description:
        'Select how many days you need the item and your return date. Send a direct request to the student lender with an optional note.',
      icon: Send,
      badge: 'Direct Peer Request',
      bgColor: 'bg-teal-50',
      iconBg: 'bg-teal-600',
    },
    {
      number: '03',
      title: 'Collect and Return It',
      description:
        'Meet at the agreed hostel lounge or library desk to collect. Use it responsibly, return on time, and earn Campus Karma points!',
      icon: RotateCcw,
      badge: 'Zero Campus Waste',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-600',
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-emerald-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Users2 className="w-3.5 h-3.5" />
            <span>How BorrowBox Works</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Borrowing on campus made simple in 3 steps
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2">
            No shopping carts, no courier delays, no wasted money. Just peer-to-peer sharing between fellow students.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${step.bgColor}`}
              >
                <div>
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-900/30 font-mono tracking-tighter">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/80 text-emerald-800 border border-emerald-200/60 shadow-2xs">
                      {step.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl ${step.iconBg} text-white flex items-center justify-center shadow-md mb-5`}>
                    <Icon className="w-7 h-7 stroke-[2.2]" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Step connector arrow for desktop */}
                {idx < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-emerald-700">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Community Trust Callout */}
        <div className="mt-12 bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Campus Trust Guarantee</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold">
              All members are verified using university student IDs.
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Meetups happen in verified campus locations like library desks, academic blocks, or hostel receptions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigate('explore')}
              className="px-5 py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-xs sm:text-sm rounded-full transition-all shadow-sm cursor-pointer"
            >
              Browse Catalog
            </button>
            <button
              onClick={() => setIsListItemModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-full border border-emerald-500 transition-all cursor-pointer"
            >
              List an Item
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

