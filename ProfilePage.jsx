import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import EditItemModal from '../components/Modals/EditItemModal';
import {
  User,
  Mail,
  Building,
  GraduationCap,
  Award,
  Sparkles,
  Star,
  CheckCircle2,
  Trash2,
  Edit,
  PlusCircle,
  RotateCcw,
  ShieldCheck,
  Package,
  Calendar,
  Phone
} from 'lucide-react';

export default function ProfilePage() {
  const {
    currentUser,
    userListings,
    borrowingRequests,
    lendingRequests,
    deleteItemListing,
    openItemDetails,
    setIsListItemModalOpen,
    resetToDemoData,
    navigate
  } = useApp();

  const [editingItem, setEditingItem] = useState(null);
  const [profileTab, setProfileTab] = useState('listings'); // 'listings' | 'borrowed' | 'impact'

  const completedTransactions =
    borrowingRequests.filter((r) => r.status === 'Returned').length +
    lendingRequests.filter((r) => r.status === 'Returned').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Student Profile Card (University ID Card Aesthetic) */}
      <div className="bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/30 rounded-3xl border border-emerald-100 p-6 sm:p-8 shadow-md relative overflow-hidden">
        {/* Background decorative corner mark */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar & Student Credentials */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-emerald-200/80 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow-xs" title="Verified Campus Student">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Student Verified
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                  {currentUser.department} ({currentUser.year})
                </span>
                <span className="flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-emerald-700" />
                  {currentUser.hostel}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-0.5">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {currentUser.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Member since {currentUser.joinedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-stretch sm:self-auto">
            <button
              onClick={() => setIsListItemModalOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List an Item</span>
            </button>
            <button
              onClick={resetToDemoData}
              className="px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Reset sample data"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* Key Metrics Stats Grid (4 Cards) */}
        <div className="mt-8 pt-6 border-t border-emerald-100/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white/90 rounded-2xl p-3.5 border border-emerald-100 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Items Listed
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {userListings.length}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">Active on marketplace</span>
          </div>

          <div className="bg-white/90 rounded-2xl p-3.5 border border-emerald-100 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Items Borrowed
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {borrowingRequests.length}
            </div>
            <span className="text-[10px] text-teal-700 font-medium">Requested gear</span>
          </div>

          <div className="bg-white/90 rounded-2xl p-3.5 border border-emerald-100 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Completed Deals
            </span>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {completedTransactions}
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Safe returns verified</span>
          </div>

          <div className="bg-white/90 rounded-2xl p-3.5 border border-emerald-100 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Average Rating
            </span>
            <div className="flex items-center gap-1 text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span>{currentUser.rating}</span>
            </div>
            <span className="text-[10px] text-amber-700 font-medium">
              {currentUser.reviewCount} peer reviews
            </span>
          </div>
        </div>
      </div>

      {/* Profile Tabs Navigation */}
      <div className="space-y-6">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setProfileTab('listings')}
            className={`pb-3 px-4 sm:px-6 text-sm font-bold transition-all cursor-pointer ${
              profileTab === 'listings'
                ? 'text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            My Listed Items ({userListings.length})
          </button>
          <button
            onClick={() => setProfileTab('borrowed')}
            className={`pb-3 px-4 sm:px-6 text-sm font-bold transition-all cursor-pointer ${
              profileTab === 'borrowed'
                ? 'text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Borrowing Records ({borrowingRequests.length})
          </button>
          <button
            onClick={() => setProfileTab('impact')}
            className={`pb-3 px-4 sm:px-6 text-sm font-bold transition-all cursor-pointer ${
              profileTab === 'impact'
                ? 'text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Karma & Campus Impact
          </button>
        </div>

        {/* Tab 1: My Listed Items (with Edit & Delete options required by Prompt 8) */}
        {profileTab === 'listings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Manage Your Gear Listings
                </h3>
                <p className="text-xs text-slate-500">
                  Edit descriptions, update availability, or delete items you no longer wish to lend.
                </p>
              </div>

              <button
                onClick={() => setIsListItemModalOpen(true)}
                className="px-3.5 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            {userListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userListings.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-xs hover:border-emerald-200 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase">
                            {item.category}
                          </span>
                          <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                            {item.name}
                          </h4>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {item.isFree ? 'Free' : `₹${item.lendingPrice}/day`} • {item.condition}
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Actions: View Live, Edit, Delete */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                      <button
                        onClick={() => openItemDetails(item.id)}
                        className="text-emerald-700 font-bold hover:underline"
                      >
                        View Live
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Listing"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete listing "${item.name}"?`)) {
                              deleteItemListing(item.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">No items listed yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Have an extra charger, lab manual, or sports gear? List it now to help classmates and earn campus karma.
                </p>
                <button
                  onClick={() => setIsListItemModalOpen(true)}
                  className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>List Your First Item</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Borrowing Records */}
        {profileTab === 'borrowed' && (
          <div className="space-y-3">
            {borrowingRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={req.itemImage}
                    alt={req.itemName}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{req.itemName}</h4>
                    <p className="text-xs text-slate-500">
                      Lender: {req.lender?.name} • Return by {req.returnDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {req.status}
                  </span>
                  <button
                    onClick={() => navigate('my-activity', { activityTab: 'borrowing' })}
                    className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    View in Activity →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Karma & Campus Impact */}
        {profileTab === 'impact' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
                ★
              </div>
              <h4 className="font-bold text-slate-900 text-base">Campus Karma Points</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                You've earned <strong className="text-amber-800">{currentUser.karmaPoints} karma</strong> by returning borrowed items promptly, lending gear to classmates, and maintaining high review ratings.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
                🌱
              </div>
              <h4 className="font-bold text-slate-900 text-base">Carbon Footprint Saved</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reusing existing campus gear instead of purchasing new single-use products has saved an estimated <strong className="text-emerald-800">{currentUser.carbonSavedKg} kg of CO₂</strong> emissions.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xl">
                🛡️
              </div>
              <h4 className="font-bold text-slate-900 text-base">Trust & Honor Level: Gold</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% on-time return rate with zero reported damages. Eligible for borrowing high-value lab equipment and digital tools.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <EditItemModal
          isOpen={Boolean(editingItem)}
          onClose={() => setEditingItem(null)}
          item={editingItem}
        />
      )}
    </div>
  );
}

