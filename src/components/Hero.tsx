import React from 'react';
import { Sparkles, MapPin, Clock, ArrowRight, Shield, CheckCircle2, Bus, Users } from 'lucide-react';

interface HeroProps {
  onScrollToBook: () => void;
  bookedSeatsCount: number;
  totalSeats: number;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToBook,
  bookedSeatsCount,
  totalSeats,
}) => {
  const remaining = Math.max(0, totalSeats - bookedSeatsCount);
  const occupancyPercentage = Math.round((bookedSeatsCount / totalSeats) * 100);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-stone-50 to-white pt-8 pb-14 border-b border-amber-100">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-20 left-10 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines & Benefits */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Saturday Temple Shuttle • Special Gathering</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
              Ride Together to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
                ISKCON Halifax
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              We are arranging a dedicated <strong>14-seater bus</strong> with two convenient Halifax pickup points to bring devotees comfortably to the temple for Kirtan, spiritual discourse, and the evening Prasadam feast.
            </p>

            {/* Quick feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-700"><strong>2 Convenient Stops:</strong> Mumford & Lacewood</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-700"><strong>Round-trip included:</strong> Return ride after Prasadam</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-700"><strong>Guaranteed 14 Seats:</strong> Pre-reserved passenger manifest</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span className="text-sm text-stone-700"><strong>Secure Payment:</strong> Processed via Zeffy</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={onScrollToBook}
                disabled={remaining === 0}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-base shadow-lg shadow-orange-600/25 hover:shadow-xl hover:shadow-orange-600/35 transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{remaining > 0 ? 'Reserve Your Seat' : 'Bus is Full'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-xs text-stone-500 justify-center sm:justify-start">
                <Shield className="w-4 h-4 text-stone-400" />
                <span>Instant reference ID • Driver verifies name</span>
              </div>
            </div>
          </div>

          {/* Right Column: Trip Overview & Live Availability Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xl shadow-amber-900/5 relative space-y-5">
              {/* Header with live availability */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                    <Bus className="w-3.5 h-3.5 text-amber-600" />
                    Live Bus Availability
                  </div>
                  <div className="text-base font-bold text-stone-800">
                    Saturday, Nov 7, 2026
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-amber-600">
                    {remaining} <span className="text-xs font-normal text-stone-400">/ {totalSeats} left</span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">
                    {bookedSeatsCount} booked
                  </div>
                </div>
              </div>

              {/* Capacity Progress Bar */}
              <div className="space-y-1.5 bg-stone-50 p-3.5 rounded-xl border border-stone-200/70">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-700 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    Seat Reservation Status
                  </span>
                  <span className="font-bold text-emerald-700">
                    {remaining > 0 ? `${remaining} Open Seats` : 'Full'}
                  </span>
                </div>
                <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${occupancyPercentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-400 pt-0.5">
                  <span>{bookedSeatsCount} reserved</span>
                  <span>14 seats max</span>
                </div>
              </div>

              {/* Route Timeline */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Shuttle Route & Schedule
                </div>

                <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-amber-200">
                  {/* Stop 1 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm ring-4 ring-white">
                      1
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-xs">Mumford Terminal</span>
                        <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/70">
                          3:15 PM
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Near Halifax Shopping Centre Terminal entrance
                      </p>
                    </div>
                  </div>

                  {/* Stop 2 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm ring-4 ring-white">
                      2
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-xs">Lacewood Terminal</span>
                        <span className="text-xs font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/70">
                          3:30 PM
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Clayton Park • Near Canada Games Centre transit loop
                      </p>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm ring-4 ring-white">
                      <MapPin className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 text-xs">ISKCON Halifax Temple</span>
                        <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          4:00 PM
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        29 Westwood Blvd, Upper Tantallon • Darshan & Welcome (Program starts 5:00 PM)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Return Window Footer */}
              <div className="bg-amber-50/70 rounded-xl p-3 border border-amber-200/60 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    Return Departure:
                  </span>
                  <span className="font-bold text-stone-900">
                    8:15 PM from Temple
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-600 pt-1 border-t border-amber-200/50">
                  <span className="font-medium text-amber-950">Drop-offs:</span>
                  <span className="font-semibold text-stone-800">
                    Lacewood 8:45 PM • Mumford 9:00 PM
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

