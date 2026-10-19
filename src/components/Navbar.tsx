import React from 'react';
import { Bus, ShieldCheck, Database, Calendar, Users } from 'lucide-react';
import { isFirebaseConfigured } from '../services/firebase';

interface NavbarProps {
  onOpenDriverManifest: () => void;
  isDriverView: boolean;
  onGoToBooking: () => void;
  bookedSeatsCount: number;
  totalSeats: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDriverManifest,
  isDriverView,
  onGoToBooking,
  bookedSeatsCount,
  totalSeats,
}) => {
  const remaining = Math.max(0, totalSeats - bookedSeatsCount);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Temple Branding */}
          <button
            onClick={onGoToBooking}
            className="flex items-center space-x-3 text-left group transition"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                  Devotee Shuttle
                </span>
                <span className="text-xs text-stone-500 font-medium">14-Seater</span>
              </div>
              <h1 className="text-lg font-bold text-stone-900 tracking-tight leading-tight group-hover:text-amber-700 transition">
                ISKCON Halifax Bus
              </h1>
            </div>
          </button>

          {/* Center Info / Badges */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200/70 text-orange-900 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-orange-600" />
              <span>Next Trip: Sat, Nov 7, 2026</span>
            </div>

            <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
              remaining > 3 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : remaining > 0
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}>
              <Users className="w-3.5 h-3.5" />
              <span>
                {remaining > 0 ? `${remaining} / ${totalSeats} seats open` : 'Bus Full (14/14)'}
              </span>
            </div>

            {/* Database indicator */}
            <div className="flex items-center space-x-1 text-[11px] text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
              <Database className="w-3 h-3 text-stone-500" />
              <span>{isFirebaseConfigured ? 'Firebase Live' : 'Demo Local DB'}</span>
            </div>
          </div>

          {/* Right Action: Driver View / Return */}
          <div className="flex items-center space-x-3">
            {isDriverView ? (
              <button
                onClick={onGoToBooking}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 text-sm font-medium transition shadow-sm"
              >
                <span>Back to Booking</span>
              </button>
            ) : (
              <button
                onClick={onOpenDriverManifest}
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg border border-stone-200 hover:border-amber-400 bg-stone-50/70 hover:bg-amber-50 text-stone-700 hover:text-amber-900 text-xs font-semibold transition"
                title="Driver Verification & Passenger List"
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span className="hidden sm:inline">Driver & Admin Manifest</span>
                <span className="sm:hidden">Manifest</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
