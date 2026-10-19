import React from 'react';
import { Sparkles, MapPin, Clock, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';

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
                <span className="text-sm text-stone-700"><strong>2 Convenient Stops:</strong> Mumford & Dalhousie</span>
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

          {/* Right Column: Visual 14-Seat Bus Blueprint Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-xl shadow-amber-900/5 relative">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Live Bus Availability
                  </div>
                  <div className="text-base font-bold text-stone-800">
                    Saturday, Nov 7, 2026
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-amber-600">
                    {remaining} <span className="text-xs font-normal text-stone-400">/ 14 left</span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-medium">
                    {bookedSeatsCount} booked
                  </div>
                </div>
              </div>

              {/* Visual Mini-Bus Seating Chart (14 passenger seats + driver) */}
              <div className="my-5 p-4 bg-stone-50 rounded-xl border border-stone-200/70">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-400 text-center mb-3">
                  14-Passenger Shuttle Bus Layout
                </div>

                <div className="max-w-[240px] mx-auto space-y-2.5">
                  {/* Front Row (Driver & Co-passenger) */}
                  <div className="flex justify-between items-center px-2 pb-2 border-b border-stone-200">
                    <div className="w-9 h-9 rounded-lg bg-stone-200 border border-stone-300 flex items-center justify-center text-[10px] font-bold text-stone-600">
                      Driver
                    </div>
                    <div className="text-[10px] font-medium text-stone-400 tracking-wider">
                      FRONT
                    </div>
                    {/* Seat 1 */}
                    <SeatIcon index={0} isBooked={0 < bookedSeatsCount} />
                  </div>

                  {/* Row 1 (Seats 2, 3, 4) */}
                  <div className="flex justify-between items-center px-2">
                    <SeatIcon index={1} isBooked={1 < bookedSeatsCount} />
                    <SeatIcon index={2} isBooked={2 < bookedSeatsCount} />
                    <div className="w-5 text-center text-[9px] text-stone-300">|</div>
                    <SeatIcon index={3} isBooked={3 < bookedSeatsCount} />
                  </div>

                  {/* Row 2 (Seats 5, 6, 7) */}
                  <div className="flex justify-between items-center px-2">
                    <SeatIcon index={4} isBooked={4 < bookedSeatsCount} />
                    <SeatIcon index={5} isBooked={5 < bookedSeatsCount} />
                    <div className="w-5 text-center text-[9px] text-stone-300">|</div>
                    <SeatIcon index={6} isBooked={6 < bookedSeatsCount} />
                  </div>

                  {/* Row 3 (Seats 8, 9, 10) */}
                  <div className="flex justify-between items-center px-2">
                    <SeatIcon index={7} isBooked={7 < bookedSeatsCount} />
                    <SeatIcon index={8} isBooked={8 < bookedSeatsCount} />
                    <div className="w-5 text-center text-[9px] text-stone-300">|</div>
                    <SeatIcon index={9} isBooked={9 < bookedSeatsCount} />
                  </div>

                  {/* Back Row (Seats 11, 12, 13, 14) */}
                  <div className="flex justify-between items-center px-2 pt-1 border-t border-stone-200">
                    <SeatIcon index={10} isBooked={10 < bookedSeatsCount} />
                    <SeatIcon index={11} isBooked={11 < bookedSeatsCount} />
                    <SeatIcon index={12} isBooked={12 < bookedSeatsCount} />
                    <SeatIcon index={13} isBooked={13 < bookedSeatsCount} />
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center space-x-5 mt-4 pt-3 border-t border-stone-200 text-xs">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-emerald-500 shadow-sm" />
                    <span className="text-stone-600">Available</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-stone-300" />
                    <span className="text-stone-500">Reserved</span>
                  </div>
                </div>
              </div>

              {/* Fast Trip Schedule Summary */}
              <div className="bg-amber-50/60 rounded-xl p-3 border border-amber-200/50 space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-stone-700">
                  <span className="font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    Pickup Window:
                  </span>
                  <span className="font-bold text-stone-900">4:15 PM – 4:45 PM</span>
                </div>
                <div className="flex items-center justify-between text-stone-700">
                  <span className="font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    Drop-off & Return:
                  </span>
                  <span className="font-bold text-stone-900">Temple 5 PM • Return 8:15 PM</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const SeatIcon: React.FC<{ index: number; isBooked: boolean }> = ({ index, isBooked }) => {
  return (
    <div
      title={`Seat ${index + 1}: ${isBooked ? 'Reserved' : 'Available'}`}
      className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
        isBooked
          ? 'bg-stone-300 text-stone-500 border border-stone-400/50'
          : 'bg-emerald-500 text-white border border-emerald-600 hover:scale-105'
      }`}
    >
      S{index + 1}
    </div>
  );
};
