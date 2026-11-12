import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Building,
  GraduationCap,
  BookOpen,
  Trophy,
  Users,
  Compass,
  ArrowRight
} from 'lucide-react';

const zoneMeta = {
  all: {
    label: 'All Campus Zones',
    icon: Compass,
    color: 'emerald',
    sub: 'Browse all items across university premises',
  },
  Hostels: {
    label: 'Hostels (Blocks A-D)',
    icon: Building,
    color: 'teal',
    sub: 'Dorm rooms, common lounges & quad',
  },
  'Academic Blocks': {
    label: 'Academic Blocks',
    icon: GraduationCap,
    color: 'green',
    sub: 'Classrooms, lecture halls & department labs',
  },
  Library: {
    label: 'Central Library',
    icon: BookOpen,
    color: 'lime',
    sub: 'Quiet study pods & main reading halls',
  },
  'Sports Complex': {
    label: 'Sports Complex',
    icon: Trophy,
    color: 'emerald',
    sub: 'Stadium, indoor courts & sports pavilion',
  },
  'Student Center': {
    label: 'Student Activity Center',
    icon: Users,
    color: 'cyan',
    sub: 'Club rooms, maker spaces & cafeteria',
  },
};

export default function CampusLocationFilter({ onLocationChange, selectedLocation }) {
  const { items, navigate, setSelectedLocation } = useApp();

  const handleSelect = (zoneKey) => {
    if (onLocationChange) {
      onLocationChange(zoneKey);
    } else {
      setSelectedLocation(zoneKey);
      navigate('explore', { location: zoneKey });
    }
  };

  // Calculate real items count per zone
  const getZoneCount = (zoneKey) => {
    if (zoneKey === 'all') return items.length;
    return items.filter((i) => i.campusZone === zoneKey || i.campusLocation.toLowerCase().includes(zoneKey.toLowerCase())).length;
  };

  const zones = ['all', 'Hostels', 'Academic Blocks', 'Library', 'Sports Complex', 'Student Center'];

  return (
    <section className="py-8 bg-gradient-to-b from-[#f0f9f4]/60 to-transparent rounded-3xl my-6 border border-emerald-100/60 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
            <MapPin className="w-4 h-4" />
            <span>Campus Location Discovery</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Available Near You On Campus
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Grab what you need right where you study, rest, or play. Fast 5-minute dorm meetups.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedLocation('all');
            navigate('explore');
          }}
          className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start md:self-auto cursor-pointer"
        >
          <span>Explore All Locations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Campus Location Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
        {zones.map((zoneKey) => {
          const meta = zoneMeta[zoneKey] || zoneMeta.all;
          const Icon = meta.icon;
          const count = getZoneCount(zoneKey);
          const isSelected = selectedLocation === zoneKey;

          return (
            <button
              key={zoneKey}
              onClick={() => handleSelect(zoneKey)}
              className={`text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md shadow-emerald-700/20 scale-[1.02]'
                  : 'bg-white hover:bg-emerald-50/60 border-slate-200/80 hover:border-emerald-300 shadow-2xs hover:shadow-sm'
              }`}
            >
              <div>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 transition-colors ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div
                  className={`text-xs font-bold leading-snug line-clamp-1 ${
                    isSelected ? 'text-white' : 'text-slate-800 group-hover:text-emerald-800'
                  }`}
                >
                  {meta.label}
                </div>
                <div
                  className={`text-[10px] mt-0.5 line-clamp-1 ${
                    isSelected ? 'text-emerald-100' : 'text-slate-400'
                  }`}
                >
                  {meta.sub}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-black/5 flex items-center justify-between text-[11px] font-semibold">
                <span className={isSelected ? 'text-emerald-100' : 'text-emerald-700'}>
                  {count} items
                </span>
                <span className={isSelected ? 'text-emerald-200' : 'text-slate-400'}>→</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

