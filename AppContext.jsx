import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_ITEMS,
  INITIAL_BORROWING_REQUESTS,
  INITIAL_LENDING_REQUESTS,
  INITIAL_USER_LISTINGS,
  INITIAL_WISHLIST,
  CURRENT_USER,
  CATEGORIES,
  CAMPUS_LOCATIONS
} from '../data/initialData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [activeActivityTab, setActiveActivityTab] = useState('borrowing'); // 'borrowing' | 'lending'

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all'); // 'all' | 'free' | 'paid'
  const [conditionFilter, setConditionFilter] = useState('all'); // 'all' | 'Brand New' | 'Like New' | 'Good'
  const [availabilityFilter, setAvailabilityFilter] = useState('all'); // 'all' | 'Available' | 'Borrowed'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'newest' | 'price-asc' | 'price-desc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Persistent States
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('borrowbox_items');
      return saved ? JSON.parse(saved) : INITIAL_ITEMS;
    } catch {
      return INITIAL_ITEMS;
    }
  });

  const [userListings, setUserListings] = useState(() => {
    try {
      const saved = localStorage.getItem('borrowbox_user_listings');
      return saved ? JSON.parse(saved) : INITIAL_USER_LISTINGS;
    } catch {
      return INITIAL_USER_LISTINGS;
    }
  });

  const [borrowingRequests, setBorrowingRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('borrowbox_borrowing_requests');
      return saved ? JSON.parse(saved) : INITIAL_BORROWING_REQUESTS;
    } catch {
      return INITIAL_BORROWING_REQUESTS;
    }
  });

  const [lendingRequests, setLendingRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('borrowbox_lending_requests');
      return saved ? JSON.parse(saved) : INITIAL_LENDING_REQUESTS;
    } catch {
      return INITIAL_LENDING_REQUESTS;
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('borrowbox_wishlist');
      return saved ? JSON.parse(saved) : INITIAL_WISHLIST;
    } catch {
      return INITIAL_WISHLIST;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('borrowbox_user');
      return saved ? JSON.parse(saved) : CURRENT_USER;
    } catch {
      return CURRENT_USER;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Modals
  const [borrowModalItem, setBorrowModalItem] = useState(null);
  const [isListItemModalOpen, setIsListItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem('borrowbox_items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('borrowbox_user_listings', JSON.stringify(userListings));
  }, [userListings]);

  useEffect(() => {
    localStorage.setItem('borrowbox_borrowing_requests', JSON.stringify(borrowingRequests));
  }, [borrowingRequests]);

  useEffect(() => {
    localStorage.setItem('borrowbox_lending_requests', JSON.stringify(lendingRequests));
  }, [lendingRequests]);

  useEffect(() => {
    localStorage.setItem('borrowbox_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('borrowbox_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Toast dispatch
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper
  const navigate = (page, options = {}) => {
    setCurrentPage(page);
    if (options.itemId) {
      setSelectedItemId(options.itemId);
    }
    if (options.category) {
      setSelectedCategory(options.category);
    }
    if (options.location) {
      setSelectedLocation(options.location);
    }
    if (options.activityTab) {
      setActiveActivityTab(options.activityTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open item details page
  const openItemDetails = (itemId) => {
    setSelectedItemId(itemId);
    navigate('item-details', { itemId });
  };

  // Wishlist Actions
  const toggleWishlist = (itemId, e) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    const item = items.find((i) => i.id === itemId);
    const itemName = item ? item.name : 'Item';
    
    if (wishlist.includes(itemId)) {
      setWishlist((prev) => prev.filter((id) => id !== itemId));
      addToast(`Removed "${itemName.slice(0, 28)}..." from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, itemId]);
      addToast(`Saved "${itemName.slice(0, 28)}..." to your wishlist!`, 'success');
    }
  };

  const isItemInWishlist = (itemId) => wishlist.includes(itemId);

  // Borrow Request Actions
  const createBorrowRequest = ({
    item,
    durationDays,
    startDate,
    returnDate,
    requestNote,
  }) => {
    const dailyRate = item.isFree ? 0 : item.lendingPrice;
    const estimatedCost = dailyRate * durationDays;

    const newRequest = {
      id: `req-b-${Date.now()}`,
      itemId: item.id,
      itemName: item.name,
      itemImage: item.image,
      category: item.category,
      lender: {
        name: item.lender?.name || 'Campus Peer',
        initials: item.lender?.initials || 'CP',
        avatar: item.lender?.avatar || '',
        location: item.campusLocation || 'Campus',
        phone: '+91 98765 00000',
      },
      durationDays: parseInt(durationDays, 10),
      startDate: startDate || new Date().toISOString().split('T')[0],
      returnDate: returnDate,
      dailyRate: dailyRate,
      estimatedCost: estimatedCost,
      status: 'Pending',
      requestNote: requestNote || 'Standard campus borrow request via BorrowBox.',
      createdAt: new Date().toISOString(),
    };

    setBorrowingRequests((prev) => [newRequest, ...prev]);

    // Check if this item belongs to current user's listings to also add to incoming requests
    const isUserItem = userListings.some((ul) => ul.id === item.id);
    if (isUserItem) {
      const incomingReq = {
        id: `req-l-${Date.now()}`,
        itemId: item.id,
        itemName: item.name,
        itemImage: item.image,
        borrower: {
          id: currentUser.id,
          name: currentUser.name,
          initials: currentUser.initials,
          avatar: currentUser.avatar,
          hostel: currentUser.hostel,
          department: currentUser.department,
          rating: currentUser.rating,
        },
        durationDays: parseInt(durationDays, 10),
        startDate: startDate || new Date().toISOString().split('T')[0],
        returnDate: returnDate,
        dailyRate: dailyRate,
        estimatedCost: estimatedCost,
        status: 'Pending',
        requestNote: requestNote || 'Campus peer borrow request.',
        createdAt: new Date().toISOString(),
      };
      setLendingRequests((prev) => [incomingReq, ...prev]);
    }

    addToast(`Borrow request sent to ${item.lender?.name || 'lender'}!`, 'success');
  };

  // Return Item action (for borrower)
  const markItemAsReturnedByBorrower = (requestId) => {
    setBorrowingRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          return { ...req, status: 'Returned' };
        }
        return req;
      })
    );

    // Update karma and carbon points
    setCurrentUser((prev) => ({
      ...prev,
      karmaPoints: prev.karmaPoints + 25,
      carbonSavedKg: Number((prev.carbonSavedKg + 1.2).toFixed(1)),
    }));

    addToast('Item marked as returned! Earned +25 Campus Karma.', 'success');
  };

  // Lender Actions
  const approveLendingRequest = (requestId) => {
    const target = lendingRequests.find((r) => r.id === requestId);
    if (!target) return;

    setLendingRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: 'Approved' } : req))
    );

    // Update item availability in marketplace and user listings to 'Borrowed'
    setItems((prev) =>
      prev.map((i) => (i.id === target.itemId ? { ...i, availability: 'Borrowed' } : i))
    );
    setUserListings((prev) =>
      prev.map((i) => (i.id === target.itemId ? { ...i, availability: 'Borrowed' } : i))
    );

    addToast(`Approved request from ${target.borrower?.name}!`, 'success');
  };

  const rejectLendingRequest = (requestId) => {
    const target = lendingRequests.find((r) => r.id === requestId);
    if (!target) return;

    setLendingRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: 'Rejected' } : req))
    );

    addToast(`Declined request from ${target.borrower?.name}`, 'info');
  };

  const markItemAsReturnedByLender = (requestId) => {
    const target = lendingRequests.find((r) => r.id === requestId);
    if (!target) return;

    setLendingRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: 'Returned' } : req))
    );

    // Restore item availability to Available
    setItems((prev) =>
      prev.map((i) => (i.id === target.itemId ? { ...i, availability: 'Available' } : i))
    );
    setUserListings((prev) =>
      prev.map((i) => (i.id === target.itemId ? { ...i, availability: 'Available' } : i))
    );

    // Add lender points
    setCurrentUser((prev) => ({
      ...prev,
      karmaPoints: prev.karmaPoints + 50,
      carbonSavedKg: Number((prev.carbonSavedKg + 2.5).toFixed(1)),
    }));

    addToast('Item return verified! Listing is now Available again.', 'success');
  };

  // Add Item Listing (User lists an item)
  const addItemListing = (newItemData) => {
    const newItemId = `item-${Date.now()}`;
    const formattedItem = {
      id: newItemId,
      name: newItemData.name.trim(),
      category: newItemData.category,
      condition: newItemData.condition || 'Good',
      lendingPrice: newItemData.isFree ? 0 : Number(newItemData.lendingPrice || 0),
      isFree: Boolean(newItemData.isFree),
      availability: 'Available',
      campusLocation: newItemData.campusLocation || currentUser.hostel,
      campusZone: newItemData.campusZone || 'Hostels',
      lender: {
        id: currentUser.id,
        name: currentUser.name,
        initials: currentUser.initials,
        avatar: currentUser.avatar,
        rating: currentUser.rating,
        reviewCount: currentUser.reviewCount,
        department: currentUser.department,
        responseTime: 'Under 15 mins',
      },
      description: newItemData.description || 'Available for campus peers to borrow.',
      image: newItemData.image || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      additionalImages: newItemData.additionalImages || [],
      maxDurationDays: Number(newItemData.maxDurationDays || 7),
      featured: false,
      popular: false,
      pickupTimes: newItemData.pickupTimes || 'Available weekdays after 5 PM',
      guidelines: newItemData.guidelines || 'Please handle responsibly and return on time.',
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Add to marketplace items
    setItems((prev) => [formattedItem, ...prev]);

    // Also add to user listings
    const userListingItem = {
      id: newItemId,
      name: formattedItem.name,
      category: formattedItem.category,
      condition: formattedItem.condition,
      lendingPrice: formattedItem.lendingPrice,
      isFree: formattedItem.isFree,
      availability: 'Available',
      campusLocation: formattedItem.campusLocation,
      campusZone: formattedItem.campusZone,
      description: formattedItem.description,
      image: formattedItem.image,
      maxDurationDays: formattedItem.maxDurationDays,
      totalBorrows: 0,
      activeRequestsCount: 0,
      createdAt: formattedItem.createdAt,
    };
    setUserListings((prev) => [userListingItem, ...prev]);

    // Give karma points for listing
    setCurrentUser((prev) => ({
      ...prev,
      karmaPoints: prev.karmaPoints + 30,
    }));

    addToast(`"${formattedItem.name}" listed successfully on BorrowBox!`, 'success');
    return formattedItem;
  };

  // Edit Item Listing
  const editItemListing = (itemId, updatedData) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id === itemId) {
          return {
            ...i,
            ...updatedData,
            lendingPrice: updatedData.isFree ? 0 : Number(updatedData.lendingPrice || 0),
          };
        }
        return i;
      })
    );

    setUserListings((prev) =>
      prev.map((i) => {
        if (i.id === itemId) {
          return {
            ...i,
            ...updatedData,
            lendingPrice: updatedData.isFree ? 0 : Number(updatedData.lendingPrice || 0),
          };
        }
        return i;
      })
    );

    addToast('Item listing updated successfully!', 'success');
  };

  // Delete Item Listing
  const deleteItemListing = (itemId) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
    setUserListings((prev) => prev.filter((i) => i.id !== itemId));
    setWishlist((prev) => prev.filter((id) => id !== itemId));

    addToast('Listing deleted from marketplace.', 'info');
  };

  // Reset to Demo Data
  const resetToDemoData = () => {
    localStorage.removeItem('borrowbox_items');
    localStorage.removeItem('borrowbox_user_listings');
    localStorage.removeItem('borrowbox_borrowing_requests');
    localStorage.removeItem('borrowbox_lending_requests');
    localStorage.removeItem('borrowbox_wishlist');
    localStorage.removeItem('borrowbox_user');

    setItems(INITIAL_ITEMS);
    setUserListings(INITIAL_USER_LISTINGS);
    setBorrowingRequests(INITIAL_BORROWING_REQUESTS);
    setLendingRequests(INITIAL_LENDING_REQUESTS);
    setWishlist(INITIAL_WISHLIST);
    setCurrentUser(CURRENT_USER);

    addToast('Restored original BorrowBox demo data!', 'info');
  };

  // Filtered Items logic
  const getFilteredItems = () => {
    return items.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesCategory = item.category?.toLowerCase().includes(query);
        const matchesLoc = item.campusLocation?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesLoc) {
          return false;
        }
      }

      // Category
      if (selectedCategory !== 'all') {
        const cat = CATEGORIES.find((c) => c.id === selectedCategory);
        if (cat && item.category !== cat.name) {
          return false;
        }
      }

      // Location / Campus Zone
      if (selectedLocation !== 'all') {
        if (item.campusZone !== selectedLocation && !item.campusLocation.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      // Price filter
      if (priceFilter === 'free' && !item.isFree) {
        return false;
      }
      if (priceFilter === 'paid' && item.isFree) {
        return false;
      }

      // Condition filter
      if (conditionFilter !== 'all' && item.condition !== conditionFilter) {
        return false;
      }

      // Availability filter
      if (availabilityFilter !== 'all') {
        if (availabilityFilter.toLowerCase() === 'available' && item.availability !== 'Available') {
          return false;
        }
        if (availabilityFilter.toLowerCase() === 'borrowed' && item.availability !== 'Borrowed') {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortBy === 'price-asc') {
        return a.lendingPrice - b.lendingPrice;
      }
      if (sortBy === 'price-desc') {
        return b.lendingPrice - a.lendingPrice;
      }
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  };

  const value = {
    // Nav
    currentPage,
    setCurrentPage,
    navigate,
    selectedItemId,
    setSelectedItemId,
    openItemDetails,
    activeActivityTab,
    setActiveActivityTab,

    // Data
    items,
    userListings,
    borrowingRequests,
    lendingRequests,
    wishlist,
    currentUser,
    categories: CATEGORIES,
    campusLocations: CAMPUS_LOCATIONS,

    // Filters
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    priceFilter,
    setPriceFilter,
    conditionFilter,
    setConditionFilter,
    availabilityFilter,
    setAvailabilityFilter,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode,
    getFilteredItems,

    // Actions
    toggleWishlist,
    isItemInWishlist,
    createBorrowRequest,
    markItemAsReturnedByBorrower,
    approveLendingRequest,
    rejectLendingRequest,
    markItemAsReturnedByLender,
    addItemListing,
    editItemListing,
    deleteItemListing,
    resetToDemoData,

    // Toasts
    toasts,
    addToast,
    removeToast,

    // Modals
    borrowModalItem,
    setBorrowModalItem,
    isListItemModalOpen,
    setIsListItemModalOpen,
    editingItem,
    setEditingItem,
    confirmDialog,
    setConfirmDialog,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

