import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import HowItWorks from '../components/HowItWorks';
import {
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Clock,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function HowItWorksPage() {
  const { navigate, setIsListItemModalOpen } = useApp();
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'How does borrowing work between campus students?',
      a: 'Browse the catalog or search for the item you need. When you find an available item, click "View & Borrow", pick your duration and expected return date, and send a request. Once the lender approves, you meet at an agreed campus location (e.g. hostel reception, central library reading hall) to pick it up.'
    },
    {
      q: 'Are items free or do they cost money?',
      a: 'Many items—especially lab coats, textbooks, and calculators lent by seniors—are completely FREE (₹0). Other lenders may charge a nominal daily rate (typically ₹15 to ₹50/day) to cover maintenance or batteries. You can filter by "Free" anytime in the Explore page.'
    },
    {
      q: 'What if an item is damaged or returned late?',
      a: 'BorrowBox operates on the campus student honor code and peer ratings. Every student signs in with verified college credentials. Damaging gear or failing to return affects your campus trust score, restricting future borrows. Lenders can report issues directly, and replacement costs follow university student association guidelines.'
    },
    {
      q: 'How do I list an item I own?',
      a: 'Click the "List an Item" button in the navigation bar. Fill in your item name, category, condition, upload a photo (or pick one of our presets), set whether it is Free or Paid, and state your dorm or campus pickup location. It goes live immediately.'
    },
    {
      q: 'Where do meetups happen?',
      a: 'Always meet in public, well-lit campus zones: the Central Library entrance, Student Activity Center (SAC), department lobbies, or hostel front desks. Never request deliveries to unverified private quarters.'
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* 3 Step Visual */}
      <HowItWorks />

      {/* Safety & Honor Code Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Campus Community Honor Code</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Built on Student Trust, Respect & Mutual Help
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs space-y-2 border border-white/10">
              <div className="font-bold text-white text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Clean & On-Time Return
              </div>
              <p className="text-emerald-100/90 leading-relaxed">
                Treat all borrowed items as if they were your own. Return clean and charged by the agreed return date.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs space-y-2 border border-white/10">
              <div className="font-bold text-white text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Public Campus Meetups
              </div>
              <p className="text-emerald-100/90 leading-relaxed">
                Always exchange items at hostel lobbies, departmental lawns, or the central library for safety and convenience.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs space-y-2 border border-white/10">
              <div className="font-bold text-white text-base flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Transparent Feedback
              </div>
              <p className="text-emerald-100/90 leading-relaxed">
                Rate fellow students after every exchange to maintain community accountability and earn Karma points.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to know about borrowing and lending on BorrowBox.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-slate-900 text-sm sm:text-base cursor-pointer hover:bg-slate-50/50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

