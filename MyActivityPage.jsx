import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  MapPin,
  Eye,
  Check,
  X,
  PlusCircle,
  TrendingUp,
  Award,
  Package
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function MyActivityPage() {
  const {
    borrowingRequests,
    lendingRequests,
    userListings,
    markItemAsReturnedByBorrower,
    approveLendingRequest,
    rejectLendingRequest,
    markItemAsReturnedByLender,
    openItemDetails,
    navigate,
    setIsListItemModalOpen,
    activeActivityTab,
    setActiveActivityTab,
    currentUser
  } = useApp();

  const [borrowFilterStatus, setBorrowFilterStatus] = useState('all');
  const [lendingFilterStatus, setLendingFilterStatus] = useState('all');

  // Stats calculation
  const activeBorrows = borrowingRequests.filter(
    (r) => r.status === 'Approved' || r.status === 'Borrowed'
  ).length;

  const pendingBorrows = borrowingRequests.filter((r) => r.status === 'Pending').length;

  const incomingPendingRequests = lendingRequests.filter(
    (r) => r.status === 'Pending'
  ).length;

  const totalCompletedTransactions =
    borrowingRequests.filter((r) => r.status === 'Returned').length +
    lendingRequests.filter((r) => r.status === 'Returned').length;

  // Chart data for student sharing activity
  const activityChartData = [
    { month: 'Jun', borrows: 1, lends: 0 },
    { month: 'Jul', borrows: 2, lends: 1 },
    { month: 'Aug', borrows: 3, lends: 2 },
    { month: 'Sep', borrows: 4, lends: 3 },
    { month: 'Oct', borrows: 6, lends: 4 },
    { month: 'Nov', borrows: 5, lends: 5 },
  ];

  // Status Badge Helper
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            Pending Approval
          </span>
        );
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approved
          </span>
        );
      case 'Borrowed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <Package className="w-3.5 h-3.5" />
            In Use (Borrowed)
          </span>
        );
      case 'Returned':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Returned & Closed
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" />
            Declined
          </span>
        );
      case 'Overdue':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
            <Clock className="w-3.5 h-3.5" />
            Overdue
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">
            {status}
          </span>
        );
    }
  };

  // Filtered requests lists
  const filteredBorrowing = borrowingRequests.filter((req) => {
    if (borrowFilterStatus === 'all') return true;
    return req.status === borrowFilterStatus;
  });

  const filteredLending = lendingRequests.filter((req) => {
    if (lendingFilterStatus === 'all') return true;
    return req.status === lendingFilterStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>Campus Sharing Activity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Borrow & Lending Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Track your requested items, active loans, and manage peer borrowing requests.
          </p>
        </div>

        <button
          onClick={() => setIsListItemModalOpen(true)}
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-full shadow-md flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>List Another Item</span>
        </button>
      </div>

      {/* KPI Cards Row & Activity Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ArrowDownLeft className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{borrowingRequests.length}</div>
            <div className="text-xs font-semibold text-slate-500">Items I'm Borrowing</div>
            <div className="text-[11px] text-emerald-700 font-medium">
              {activeBorrows} currently active
            </div>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{userListings.length}</div>
            <div className="text-xs font-semibold text-slate-500">My Listed Items</div>
            <div className="text-[11px] text-teal-700 font-medium">
              {incomingPendingRequests} incoming requests
            </div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{currentUser.karmaPoints}</div>
            <div className="text-xs font-semibold text-slate-500">Campus Karma</div>
            <div className="text-[11px] text-amber-700 font-medium">
              ★ {currentUser.rating} Peer Rating
            </div>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 text-green-800 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{currentUser.carbonSavedKg} kg</div>
            <div className="text-xs font-semibold text-slate-500">CO₂ Avoided</div>
            <div className="text-[11px] text-green-700 font-medium">
              {totalCompletedTransactions} items reused
            </div>
          </div>
        </div>
      </div>

      {/* Mini Activity Chart Header */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Monthly Campus Sharing Volume
            </h3>
            <p className="text-xs text-slate-500">
              Overview of your borrowing and lending exchanges across semesters
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
              <span>Borrows</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-teal-500 inline-block" />
              <span>Lends</span>
            </div>
          </div>
        </div>

        <div className="h-44 sm:h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="month" tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tickLine={false} axisLine={{ stroke: '#e2e8f0' }} tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                cursor={{ fill: '#f1f5f9' }}
              />
              <Bar dataKey="borrows" fill="#059669" radius={[4, 4, 0, 0]} name="Items Borrowed" />
              <Bar dataKey="lends" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Items Lent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Two Activity Sections Toggle Tabs */}
      <div className="space-y-6">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveActivityTab('borrowing')}
            className={`pb-3 px-5 text-sm sm:text-base font-extrabold transition-all relative cursor-pointer flex items-center gap-2 ${
              activeActivityTab === 'borrowing'
                ? 'text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
            <span>Items I'm Borrowing</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {borrowingRequests.length}
            </span>
          </button>

          <button
            onClick={() => setActiveActivityTab('lending')}
            className={`pb-3 px-5 text-sm sm:text-base font-extrabold transition-all relative cursor-pointer flex items-center gap-2 ${
              activeActivityTab === 'lending'
                ? 'text-emerald-800 border-b-2 border-emerald-600'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ArrowUpRight className="w-4 h-4 text-teal-600" />
            <span>Items I'm Lending</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
              {lendingRequests.length}
            </span>
          </button>
        </div>

        {/* SECTION 1: Items I'm Borrowing */}
        {activeActivityTab === 'borrowing' && (
          <div className="space-y-4">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                <span className="text-slate-400 font-semibold px-2">Filter:</span>
                {['all', 'Pending', 'Approved', 'Returned'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setBorrowFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer capitalize ${
                      borrowFilterStatus === st
                        ? 'bg-emerald-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'all' ? 'All Requests' : st}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-500 font-medium px-2">
                {filteredBorrowing.length} requests
              </div>
            </div>

            {/* Borrowing Cards List */}
            {filteredBorrowing.length > 0 ? (
              <div className="space-y-3">
                {filteredBorrowing.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:border-emerald-200 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    {/* Item snapshot */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <img
                        src={req.itemImage}
                        alt={req.itemName}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                            {req.category}
                          </span>
                          <span className="text-slate-300">•</span>
                          {renderStatusBadge(req.status)}
                        </div>

                        <h3
                          onClick={() => req.itemId && openItemDetails(req.itemId)}
                          className="font-bold text-slate-900 text-sm sm:text-base hover:text-emerald-700 transition-colors line-clamp-1 cursor-pointer"
                        >
                          {req.itemName}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-0.5">
                          <span className="flex items-center gap-1 font-medium text-slate-700">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                            {req.lender?.location || 'Campus'}
                          </span>
                          <span>Lender: <strong className="text-slate-800">{req.lender?.name}</strong></span>
                        </div>

                        {req.requestNote && (
                          <p className="text-[11px] text-slate-500 italic line-clamp-1 pt-0.5">
                            Note: "{req.requestNote}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Timeline & Price Summary */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <div className="text-left md:text-right text-xs">
                        <div className="text-[11px] text-slate-400 font-semibold">Expected Return</div>
                        <div className="font-bold text-slate-900">{req.returnDate}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {req.dailyRate === 0 ? (
                            <span className="text-emerald-700 font-bold">FREE</span>
                          ) : (
                            <span>Est: ₹{req.estimatedCost} ({req.durationDays}d)</span>
                          )}
                        </div>
                      </div>

                      {/* Action Button: Return Item */}
                      <div className="flex items-center gap-2">
                        {req.status === 'Approved' || req.status === 'Borrowed' ? (
                          <button
                            onClick={() => markItemAsReturnedByBorrower(req.id)}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Return Item</span>
                          </button>
                        ) : req.status === 'Returned' ? (
                          <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded-xl">
                            Returned
                          </span>
                        ) : (
                          <button
                            onClick={() => req.itemId && openItemDetails(req.itemId)}
                            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                          >
                            View Item
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                  <ArrowDownLeft className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">No items currently borrowed</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Need a calculator, lab coat, or book for this week? Explore campus listings and send a quick borrow request.
                </p>
                <button
                  onClick={() => navigate('explore')}
                  className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  <span>Browse Campus Items</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* SECTION 2: Items I'm Lending */}
        {activeActivityTab === 'lending' && (
          <div className="space-y-6">
            {/* Filter Pills for Lending */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80">
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                <span className="text-slate-400 font-semibold px-2">Filter:</span>
                {['all', 'Pending', 'Approved', 'Returned'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setLendingFilterStatus(st)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer capitalize ${
                      lendingFilterStatus === st
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st === 'all' ? 'All Requests' : st}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-500 font-medium px-2">
                {filteredLending.length} incoming requests
              </div>
            </div>

            {/* Incoming Requests Cards */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
                Incoming Borrowing Requests for Your Gear
              </h3>

              {filteredLending.length > 0 ? (
                filteredLending.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs hover:border-teal-200 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    {/* Item & Borrower details */}
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <img
                        src={req.itemImage}
                        alt={req.itemName}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                            Requested Item
                          </span>
                          <span className="text-slate-300">•</span>
                          {renderStatusBadge(req.status)}
                        </div>

                        <h4 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1">
                          {req.itemName}
                        </h4>

                        {/* Borrower Information */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 pt-0.5">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] font-bold">
                              {req.borrower?.initials || 'BP'}
                            </div>
                            <span className="font-bold text-slate-800">{req.borrower?.name}</span>
                          </div>
                          <span>• {req.borrower?.hostel || 'Hostel'}</span>
                          <span>• ★ {req.borrower?.rating || 4.9}</span>
                        </div>

                        {req.requestNote && (
                          <p className="text-[11px] text-slate-500 italic line-clamp-1 pt-0.5">
                            "{req.requestNote}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Timeline & Action Buttons: Approve, Reject, Mark as Returned */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between md:justify-end gap-4 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                      <div className="text-left md:text-right text-xs">
                        <div className="text-[11px] text-slate-400 font-semibold">Duration & Return</div>
                        <div className="font-bold text-slate-900">
                          {req.durationDays} Days • {req.returnDate}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {req.dailyRate === 0 ? 'Free' : `Total: ₹${req.estimatedCost}`}
                        </div>
                      </div>

                      {/* Lender Action Buttons */}
                      <div className="flex items-center gap-2">
                        {req.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => approveLendingRequest(req.id)}
                              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                              title="Approve this borrowing request"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => rejectLendingRequest(req.id)}
                              className="px-3 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                              title="Decline this request"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}

                        {req.status === 'Approved' && (
                          <button
                            onClick={() => markItemAsReturnedByLender(req.id)}
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Mark as Returned</span>
                          </button>
                        )}

                        {req.status === 'Returned' && (
                          <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-semibold rounded-xl">
                            Verified Return
                          </span>
                        )}

                        {req.status === 'Rejected' && (
                          <span className="px-3 py-1.5 bg-rose-50 text-rose-600 text-xs font-semibold rounded-xl">
                            Declined
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200/80 p-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">No incoming borrowing requests</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    When classmates request your listed items, they will appear here for your approval.
                  </p>
                </div>
              )}
            </div>

            {/* User's Listed Items Overview */}
            <div className="pt-6 border-t border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    My Active Listings ({userListings.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Items you are currently sharing on BorrowBox
                  </p>
                </div>

                <button
                  onClick={() => setIsListItemModalOpen(true)}
                  className="px-4 py-2 bg-slate-100 hover:bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Listing</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userListings.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-3 shadow-xs"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-bold text-emerald-700 uppercase">
                          {item.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-xs truncate">
                          {item.name}
                        </h4>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {item.isFree ? 'Free' : `₹${item.lendingPrice}/day`} • {item.availability}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">
                        Borrows: {item.totalBorrows || 0} times
                      </span>
                      <button
                        onClick={() => openItemDetails(item.id)}
                        className="text-emerald-700 font-bold hover:underline cursor-pointer"
                      >
                        View Live
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

