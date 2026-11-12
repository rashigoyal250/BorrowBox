import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, Edit3 } from 'lucide-react';

export default function EditItemModal({ isOpen, onClose, item }) {
  const { categories, editItemListing } = useApp();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [condition, setCondition] = useState('Like New');
  const [isFree, setIsFree] = useState(false);
  const [lendingPrice, setLendingPrice] = useState('0');
  const [campusLocation, setCampusLocation] = useState('');
  const [campusZone, setCampusZone] = useState('Hostels');
  const [maxDurationDays, setMaxDurationDays] = useState(7);

  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setCategory(item.category || 'Electronics');
      setDescription(item.description || '');
      setImageUrl(item.image || '');
      setCondition(item.condition || 'Like New');
      setIsFree(Boolean(item.isFree));
      setLendingPrice(item.lendingPrice?.toString() || '0');
      setCampusLocation(item.campusLocation || '');
      setCampusZone(item.campusZone || 'Hostels');
      setMaxDurationDays(item.maxDurationDays || 7);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    editItemListing(item.id, {
      name,
      category,
      description,
      image: imageUrl,
      condition,
      isFree,
      lendingPrice: isFree ? 0 : Number(lendingPrice),
      campusLocation,
      campusZone,
      maxDurationDays: Number(maxDurationDays),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-emerald-100 flex flex-col max-h-[90vh]">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-base">Edit Listing Details</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none bg-white"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none bg-white"
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Image URL</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="text-xs font-semibold text-slate-800">
              Free to borrow?
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsFree(true)}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isFree ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600'
                }`}
              >
                Free
              </button>
              <button
                type="button"
                onClick={() => setIsFree(false)}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  !isFree ? 'bg-emerald-700 text-white' : 'bg-white text-slate-600'
                }`}
              >
                Paid (₹/day)
              </button>
            </div>
          </div>

          {!isFree && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rate per day (₹)</label>
              <input
                type="number"
                value={lendingPrice}
                onChange={(e) => setLendingPrice(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pickup Location</label>
              <input
                type="text"
                value={campusLocation}
                onChange={(e) => setCampusLocation(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Max Duration (Days)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={maxDurationDays}
                onChange={(e) => setMaxDurationDays(e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-600 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

