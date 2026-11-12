import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Package,
  Search,
  Heart,
  User,
  PlusCircle,
  Menu,
  X,
  Compass,
  Layers,
  HelpCircle,
  Activity,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const {
    currentPage,
    navigate,
    searchQuery,
    setSearchQuery,
    wishlist,
    borrowingRequests,
    lendingRequests,
    currentUser,
    setIsListItemModalOpen,
    categories,
    setSelectedCategory
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

  // Active requests counter for Activity indicator
  const pendingBorrowing = borrowingRequests.filter((r) => r.status === 'Pending' || r.status === 'Approved').length;
  const pendingLending = lendingRequests.filter((r) => r.status === 'Pending').length;
  const totalActivityCount = pendingBorrowing + pendingLending;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (currentPage !== 'explore') {
      navigate('explore');
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home', icon: Package },
    { id: 'explore', label: 'Explore Items', icon: Compass },
    { id: 'categories', label: 'Categories', icon: Layers, isDropdown: true },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'my-activity', label: 'My Activity', icon: Activity, badge: totalActivityCount },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top micro-bar for campus notice */}
      <div className="bg-emerald-800 text-emerald-100 text-xs py-1.5 px-4 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-700 text-emerald-100">
            CAMPUS ONLY
          </span>
          <span>Verified peer-to-peer student borrowing network • Zero platform commission</span>
        </div>
        <div className="flex items-center gap-4 text-emerald-200">
          <span>📍 Student Hub: All Hostels & Academic Blocks</span>
          <button 
            onClick={() => navigate('how-it-works')}
            className="hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
          >
            Safety Guidelines
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-3 sm:gap-6">
          {/* Logo */}
          <div
            onClick={() => navigate('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-sm shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              <Package className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-emerald-950 font-sans">
                  Borrow<span className="text-emerald-600">Box</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Campus
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block -mt-1">
                Student Sharing Network
              </p>
            </div>
          </div>

          {/* Search bar (Center) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md lg:max-w-lg items-center relative"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search calculators, lab coats, books, tools..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (currentPage !== 'explore' && e.target.value.length > 2) {
                    navigate('explore');
                  }
                }}
                className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-full transition-colors cursor-pointer flex items-center gap-1"
              >
                Search
              </button>
            </div>
          </form>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;

              if (link.isDropdown) {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={() => setCategoriesDropdownOpen(true)}
                    onMouseLeave={() => setCategoriesDropdownOpen(false)}
                  >
                    <button
                      onClick={() => {
                        navigate('explore');
                        setSelectedCategory('all');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                        currentPage === 'explore'
                          ? 'text-emerald-700 bg-emerald-50/80'
                          : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-emerald-600" />
                      <span>{link.label}</span>
                    </button>

                    {/* Dropdown menu */}
                    {categoriesDropdownOpen && (
                      <div className="absolute top-full left-0 w-64 pt-1 z-50">
                        <div className="bg-white rounded-xl shadow-xl border border-slate-100 py-2 px-1 grid gap-0.5 animate-in fade-in-50 zoom-in-95">
                          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            Popular Categories
                          </div>
                          {categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setSelectedCategory(cat.id);
                                navigate('explore', { category: cat.id });
                                setCategoriesDropdownOpen(false);
                              }}
                              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors text-left"
                            >
                              <span>{cat.name}</span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {cat.itemCount}+
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer relative ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{link.label}</span>
                  {link.badge > 0 && (
                    <span className="ml-0.5 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-emerald-600 rounded-full animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Wishlist, Profile & "List an Item" */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button */}
            <button
              onClick={() => navigate('wishlist')}
              className={`relative p-2.5 rounded-full transition-colors cursor-pointer ${
                currentPage === 'wishlist'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
              }`}
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[2]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[11px] font-bold flex items-center justify-center ring-2 ring-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Profile Avatar / Quick Nav */}
            <button
              onClick={() => navigate('profile')}
              className={`flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border transition-all cursor-pointer ${
                currentPage === 'profile'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-emerald-300 text-slate-700 hover:bg-slate-50'
              }`}
              title="Student Profile"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold ring-1 ring-white">
                {currentUser.initials}
              </div>
              <div className="hidden lg:block text-left text-xs">
                <span className="font-semibold block text-slate-800 leading-tight">
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-emerald-600 font-medium leading-none">
                  {currentUser.karmaPoints} Karma
                </span>
              </div>
            </button>

            {/* Prominent "List an Item" Button */}
            <button
              onClick={() => setIsListItemModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm shadow-emerald-700/20 hover:shadow-md hover:shadow-emerald-700/30 active:scale-98 transition-all cursor-pointer shrink-0"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden xs:inline">List an Item</span>
              <span className="xs:hidden">List</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded-lg xl:hidden cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar row */}
        <div className="md:hidden pb-3 pt-1">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search items, books, calculators..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentPage !== 'explore' && e.target.value.length > 2) {
                  navigate('explore');
                }
              }}
              className="w-full pl-9 pr-20 py-2 text-xs bg-slate-50 text-slate-900 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-emerald-600 text-white text-[11px] font-semibold rounded-full"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => {
                navigate('home');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                currentPage === 'home' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Package className="w-4 h-4 text-emerald-600" />
              Home
            </button>
            <button
              onClick={() => {
                navigate('explore');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                currentPage === 'explore' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              Explore Items
            </button>
            <button
              onClick={() => {
                navigate('my-activity');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 relative ${
                currentPage === 'my-activity' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              My Activity
              {totalActivityCount > 0 && (
                <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-emerald-600 text-white rounded-full">
                  {totalActivityCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                navigate('how-it-works');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl text-left text-xs font-semibold flex items-center gap-2 ${
                currentPage === 'how-it-works' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              How It Works
            </button>
          </div>

          {/* Quick Categories Bar in Mobile */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Browse by Category
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    navigate('explore', { category: cat.id });
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1.5 text-xs text-left rounded-lg bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 font-medium truncate"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

