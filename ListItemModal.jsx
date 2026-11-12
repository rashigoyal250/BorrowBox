import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  PlusCircle,
  Upload,
  Image,
  DollarSign,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle,
  Eye
} from 'lucide-react';

const PRESET_SAMPLE_IMAGES = [
  { label: 'Calculator', url: 'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e485?auto=format&fit=crop&w=800&q=80' },
  { label: 'Lab Coat', url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Textbook', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { label: 'Charger', url: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tool Kit', url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sports Gear', url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80' },
  { label: 'Umbrella', url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80' },
];

export default function ListItemModal({ isOpen, onClose }) {
  const { categories, addItemListing, currentUser, navigate } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_SAMPLE_IMAGES[0].url);
  const [condition, setCondition] = useState('Like New');
  const [isFree, setIsFree] = useState(false);
  const [lendingPrice, setLendingPrice] = useState('30');
  const [campusLocation, setCampusLocation] = useState(currentUser.hostel || 'Hostel Block B - Room 215');
  const [campusZone, setCampusZone] = useState('Hostels');
  const [maxDurationDays, setMaxDurationDays] = useState(7);
  const [pickupTimes, setPickupTimes] = useState('Weekdays 5 PM - 9 PM, weekends flexible');
  const [guidelines, setGuidelines] = useState('Please handle with care and return on time.');

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Item title is required';
    if (!description.trim() || description.length < 10) {
      errs.description = 'Please provide a descriptive explanation (at least 10 characters)';
    }
    if (!isFree && (!lendingPrice || Number(lendingPrice) < 0)) {
      errs.lendingPrice = 'Please provide a valid lending price';
    }
    if (!campusLocation.trim()) {
      errs.campusLocation = 'Pickup location is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newItem = addItemListing({
      name,
      category,
      description,
      image: imageUrl,
      condition,
      isFree,
      lendingPrice: isFree ? 0 : lendingPrice,
      campusLocation,
      campusZone,
      maxDurationDays,
      pickupTimes,
      guidelines,
    });

    onClose();
    // Navigate to see the new item
    navigate('explore');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto shadow-2xl border border-emerald-100 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-5 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">List an Item on BorrowBox</h2>
              <p className="text-xs text-emerald-200">Share your gear with dorm-mates and batchmates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Item Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Item Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. TI-84 Plus Graphing Calculator, Sedgewick DSA Book..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none transition-all ${
                    errors.name
                      ? 'border-rose-400 bg-rose-50/50'
                      : 'border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
              </div>

              {/* Category & Condition Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Condition
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white cursor-pointer"
                  >
                    <option value="Brand New">Brand New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description & Details *
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention brand, edition, included cables, condition notes, or exam relevance..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border outline-none transition-all ${
                    errors.description
                      ? 'border-rose-400 bg-rose-50/50'
                      : 'border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                />
                {errors.description && <p className="text-xs text-rose-600 mt-1">{errors.description}</p>}
              </div>

              {/* Free vs Paid Toggle + Price */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                      Lending Type
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Lend for free to batchmates or set a sample daily rate
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsFree(true)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        isFree
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Free (₹0)
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFree(false)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        !isFree
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      Daily Rate (₹)
                    </button>
                  </div>
                </div>

                {!isFree && (
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Rate per Day (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="5"
                        max="500"
                        step="5"
                        value={lendingPrice}
                        onChange={(e) => setLendingPrice(e.target.value)}
                        className="w-full pl-8 pr-4 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                      />
                    </div>
                    {errors.lendingPrice && <p className="text-xs text-rose-600 mt-1">{errors.lendingPrice}</p>}
                  </div>
                )}
              </div>

              {/* Campus Location & Zone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Pickup Zone *
                  </label>
                  <select
                    value={campusZone}
                    onChange={(e) => setCampusZone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none bg-white cursor-pointer"
                  >
                    <option value="Hostels">Hostels (Blocks A-D)</option>
                    <option value="Academic Blocks">Academic Blocks</option>
                    <option value="Library">Central Library</option>
                    <option value="Sports Complex">Sports Complex</option>
                    <option value="Student Center">Student Activity Center</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Exact Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hostel Block B - Room 215"
                    value={campusLocation}
                    onChange={(e) => setCampusLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
                  />
                  {errors.campusLocation && <p className="text-xs text-rose-600 mt-1">{errors.campusLocation}</p>}
                </div>
              </div>

              {/* Max Duration Days */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Max Borrowing Duration: <span className="text-emerald-700">{maxDurationDays} Days</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={maxDurationDays}
                  onChange={(e) => setMaxDurationDays(e.target.value)}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>1 day</span>
                  <span>7 days</span>
                  <span>14 days</span>
                  <span>30 days</span>
                </div>
              </div>
            </div>

            {/* Right Column: Image Selection & Live Preview (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Item Photo *
                </label>
                
                {/* Upload or URL input */}
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Paste image URL..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
                  />

                  {/* Quick Preset Selector */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Or pick sample photo preset:
                    </span>
                    <div className="grid grid-cols-4 gap-1.5">
                      {PRESET_SAMPLE_IMAGES.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setImageUrl(preset.url)}
                          className={`p-1 text-[10px] rounded-lg border text-center transition-all truncate cursor-pointer ${
                            imageUrl === preset.url
                              ? 'bg-emerald-600 text-white font-bold border-emerald-600'
                              : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Local File upload button */}
                  <label className="flex items-center justify-center gap-2 p-2.5 rounded-xl border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 text-emerald-800 text-xs font-semibold cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Upload from device</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-2">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" /> Live Marketplace Preview
                </span>

                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200/80 shadow-xs">
                  <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-200 relative mb-3">
                    <img
                      src={imageUrl || PRESET_SAMPLE_IMAGES[0].url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      {isFree ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                          FREE
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold">
                          ₹{lendingPrice}/day
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-slate-900/70 text-white text-[10px] px-2 py-0.5 rounded-md truncate">
                      📍 {campusLocation}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-emerald-700 uppercase">
                      {category} • {condition}
                    </div>
                    <div className="font-bold text-slate-900 text-xs line-clamp-1">
                      {name || 'Your Item Title'}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-2">
                      {description || 'Item description will appear here.'}
                    </div>
                    <div className="pt-2 flex items-center justify-between text-[11px] border-t border-slate-200">
                      <span className="text-slate-600 font-medium">{currentUser.name}</span>
                      <span className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[10px]">
                        View & Borrow
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              <span>List Item on BorrowBox</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

