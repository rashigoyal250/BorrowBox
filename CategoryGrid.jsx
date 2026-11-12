import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Laptop,
  BookOpen,
  FlaskConical,
  PenTool,
  Shirt,
  Trophy,
  Coffee,
  Wrench,
  ArrowRight,
  Layers
} from 'lucide-react';

const iconMap = {
  Laptop,
  BookOpen,
  FlaskConical,
  PenTool,
  Shirt,
  Trophy,
  Coffee,
  Wrench,
};

export default function CategoryGrid({ onSelectCategory, activeCategory }) {
  const { categories, navigate, setSelectedCategory } = useApp();

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      setSelectedCategory(catId);
      navigate('explore', { category: catId });
    }
  };

  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Campus Essentials Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Browse by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Tap any category to quickly filter items available across campus dorms, labs, and student centers.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              navigate('explore');
            }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:underline underline-offset-4 cursor-pointer self-start sm:self-auto"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.iconName] || Laptop;
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group relative rounded-2xl p-4 sm:p-5 cursor-pointer border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'ring-2 ring-emerald-600 border-emerald-400 bg-emerald-50/80 shadow-md scale-[1.02]'
                    : `${cat.bgLight} ${cat.borderLight} hover:shadow-lg hover:-translate-y-1 hover:border-emerald-300`
                }`}
              >
                {/* Background image overlay with soft gradient */}
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden opacity-25 group-hover:opacity-40 transition-opacity -mr-6 -mt-6 pointer-events-none">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500"
                  />
                </div>

                <div className="relative z-10">
                  {/* Icon badge */}
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shadow-sm mb-3 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: cat.accentColor }}
                  >
                    <IconComponent className="w-6 h-6 stroke-[2]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-emerald-800 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-1 hidden sm:block leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Footer Count & Arrow */}
                <div className="relative z-10 mt-3 pt-2.5 border-t border-black/5 flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-800 text-[11px]">
                    {cat.itemCount} items
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/80 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center text-slate-600 transition-all shadow-2xs">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

