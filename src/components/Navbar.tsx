import React from 'react';
import { Bus, Calendar, Ticket, MapPin } from 'lucide-react';

interface NavbarProps {
  onScrollToBook: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToBook }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Temple Branding */}
          <div className="flex items-center space-x-3 text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                  Devotee Shuttle
                </span>
                <span className="text-xs text-stone-500 font-medium">14-Seater Bus</span>
              </div>
              <h1 className="text-lg font-bold text-stone-900 tracking-tight leading-tight">
                ISKCON Halifax Bus
              </h1>
            </div>
          </div>

          {/* Center Info / Badges */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200/70 text-orange-900 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-orange-600" />
              <span>Next Trip: Saturday, Nov 7, 2026</span>
            </div>

            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              <span>Mumford & Lacewood Stops</span>
            </div>
          </div>

          {/* Right Action: Book Seat Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onScrollToBook}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition transform active:scale-95"
            >
              <Ticket className="w-4 h-4" />
              <span>Reserve Seat</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
