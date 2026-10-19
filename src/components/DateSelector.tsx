import React from 'react';
import { Calendar as CalendarIcon, CheckCircle2, Lock, Sparkles, Info } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { ScheduledTrip } from '../types';

interface DateSelectorProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  availableSeatsForDate: number;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  selectedDate,
  onSelectDate,
  availableSeatsForDate,
}) => {
  // Calendar dates for November 2026
  // Nov 1, 2026 is Sunday, Nov 7 is Saturday, etc.
  const novemberDays = Array.from({ length: 30 }, (_, i) => i + 1);

  // Map of scheduled trips from config
  const tripsMap = new Map<string, ScheduledTrip>();
  APP_CONFIG.scheduledTrips.forEach((trip) => {
    tripsMap.set(trip.date, trip);
  });

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-stone-900">1. Select Journey Date</h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Booking schedule for upcoming ISKCON Halifax Temple Gatherings
          </p>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Only Nov 7, 2026 Opened Currently</span>
        </div>
      </div>

      {/* Mini Calendar View for November 2026 */}
      <div className="bg-stone-50/80 rounded-xl p-4 border border-stone-200/70">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="font-bold text-stone-800 text-sm">November 2026</span>
          <span className="text-xs text-stone-500 font-medium">Halifax, NS</span>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-stone-500 mb-1">
          <div>Su</div>
          <div>Mo</div>
          <div>Tu</div>
          <div>We</div>
          <div>Th</div>
          <div>Fr</div>
          <div className="text-amber-700 font-bold">Sa</div>
        </div>

        {/* Calendar days grid (Nov 1, 2026 starts on Sunday) */}
        <div className="grid grid-cols-7 gap-1">
          {novemberDays.map((day) => {
            const dateStr = `2026-11-${day < 10 ? '0' + day : day}`;
            const trip = tripsMap.get(dateStr);
            const isNov7 = dateStr === '2026-11-07';
            const isSelected = selectedDate === dateStr;
            const isSaturday = (day - 7) % 7 === 0;

            if (isNov7) {
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => onSelectDate(dateStr)}
                  className={`h-10 rounded-lg flex flex-col items-center justify-center relative font-bold text-xs transition border ${
                    isSelected
                      ? 'bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-400'
                      : 'bg-white text-amber-900 border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <span>{day}</span>
                  <span className={`text-[8px] font-bold uppercase tracking-wider ${isSelected ? 'text-amber-100' : 'text-amber-600'}`}>
                    Open
                  </span>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </button>
              );
            }

            if (trip && !trip.isOpen) {
              return (
                <button
                  key={day}
                  type="button"
                  disabled
                  title="Coming Soon: This date will open after current trip"
                  className="h-10 rounded-lg flex flex-col items-center justify-center font-semibold text-xs bg-stone-100/80 text-stone-400 border border-dashed border-stone-300 cursor-not-allowed group relative"
                >
                  <span>{day}</span>
                  <span className="text-[7px] uppercase tracking-tighter text-stone-400">Soon</span>
                  <Lock className="w-2.5 h-2.5 text-stone-300 absolute top-1 right-1" />
                </button>
              );
            }

            return (
              <div
                key={day}
                className={`h-10 rounded-lg flex items-center justify-center text-xs text-stone-400 ${
                  isSaturday ? 'bg-amber-50/30 font-medium' : ''
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduled Trip Card Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {APP_CONFIG.scheduledTrips.map((trip) => {
          const isSelected = selectedDate === trip.date;

          if (trip.isOpen) {
            return (
              <div
                key={trip.date}
                onClick={() => onSelectDate(trip.date)}
                className={`cursor-pointer rounded-xl p-4 border transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/40 shadow-sm ring-1 ring-amber-400'
                    : 'border-stone-200 bg-white hover:border-amber-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Active Booking Date</span>
                    </div>
                    <div className="font-bold text-stone-900 mt-1.5 text-base">
                      {trip.displayDate}
                    </div>
                    <div className="text-xs text-stone-600 mt-0.5">
                      {trip.occasion}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-amber-200/50 flex items-center justify-between text-xs">
                  <span className="text-stone-500">Available capacity:</span>
                  <span className="font-bold text-amber-700">
                    {availableSeatsForDate} of {trip.totalSeats} seats left
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={trip.date}
              className="rounded-xl p-4 border border-dashed border-stone-200 bg-stone-50/50 opacity-75"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="inline-flex items-center space-x-1 text-xs font-medium text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" />
                    <span>Future Trip • Locked</span>
                  </div>
                  <div className="font-bold text-stone-700 mt-1.5 text-sm">
                    {trip.displayDate}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {trip.occasion}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-[11px] text-stone-400">
                Will open for bookings closer to date.
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center space-x-2 text-xs text-stone-500 bg-stone-50 p-3 rounded-lg border border-stone-200/60">
        <Info className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          Future dates will be automatically unlocked as new bus rental schedules are finalized for the temple.
        </span>
      </div>
    </div>
  );
};
