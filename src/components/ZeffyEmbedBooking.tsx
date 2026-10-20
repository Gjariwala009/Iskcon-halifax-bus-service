import React from 'react';
import { ShieldCheck, ExternalLink, Heart, Sparkles, MapPin, Baby, Car, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

interface ZeffyEmbedBookingProps {
  bookingSectionRef?: React.RefObject<HTMLDivElement | null>;
}

export const ZeffyEmbedBooking: React.FC<ZeffyEmbedBookingProps> = ({ bookingSectionRef }) => {
  return (
    <section
      ref={bookingSectionRef}
      id="booking-section"
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6"
    >
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>One-Step Online Booking & Contribution</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Reserve Your Seat on the Devotee Shuttle
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
          Select your ticket and pickup location in one single step below. 100% of your contribution goes to ISKCON Halifax with zero platform fees.
        </p>
      </div>

      {/* Quick Route & Destination Reminder Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gradient-to-r from-amber-50 to-orange-50/70 p-4 rounded-2xl border border-amber-200/80 text-xs">
        <div className="flex items-start space-x-2.5">
          <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            1
          </div>
          <div>
            <div className="font-bold text-stone-900">Stop 1: Mumford</div>
            <div className="text-amber-900 font-semibold mt-0.5">Pickup: 3:15 PM • Return: 9:00 PM</div>
            <div className="text-stone-500 text-[11px] mt-0.5">Mumford Terminal transit loop</div>
          </div>
        </div>

        <div className="flex items-start space-x-2.5">
          <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            2
          </div>
          <div>
            <div className="font-bold text-stone-900">Stop 2: Lacewood</div>
            <div className="text-amber-900 font-semibold mt-0.5">Pickup: 3:30 PM • Return: 8:45 PM</div>
            <div className="text-stone-500 text-[11px] mt-0.5">Canada Games Centre transit loop</div>
          </div>
        </div>

        <div className="flex items-start space-x-2.5">
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-bold text-stone-900">Temple Destination</div>
            <div className="text-emerald-900 font-semibold mt-0.5">Arrive: 4:00 PM (Darshan) • Depart: 8:15 PM</div>
            <div className="text-stone-500 text-[11px] mt-0.5">{APP_CONFIG.templeAddress}</div>
          </div>
        </div>
      </div>

      {/* Child & Booster Seat Policy Card */}
      <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-stone-50 rounded-2xl border border-amber-200/90 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Baby className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
                Child & Booster Seat Policy
              </h3>
              <p className="text-[11px] text-stone-500">
                Essential safety and seating guidelines for families traveling with children
              </p>
            </div>
          </div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white border border-amber-300 text-amber-900 text-[11px] font-bold self-start sm:self-auto shadow-xs">
            <span>Same Ticket Cost • 1 Dedicated Seat Per Child</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/90 rounded-xl p-3.5 border border-amber-100 space-y-1">
            <div className="font-bold text-stone-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Same Cost as Adult Tickets</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Because shuttle capacity is strictly limited to 14 seats, every child/infant occupies an individual seat and requires a standard seat reservation.
            </p>
          </div>

          <div className="bg-white/90 rounded-xl p-3.5 border border-amber-100 space-y-1">
            <div className="font-bold text-stone-900 flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Same Safety Rules as a Car</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Children must be seated following Nova Scotia vehicle safety laws just like in a personal car (e.g., booster seat, or forward/rear-facing child seat).
            </p>
          </div>

          <div className="bg-white/90 rounded-xl p-3.5 border border-amber-100 space-y-1">
            <div className="font-bold text-stone-900 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Bring Seat • No Lap Sitting</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Parents/guardians are responsible for bringing and securing the child's car or booster seat. For vehicle safety and insurance compliance, children cannot ride on laps.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Zeffy Form Card */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xl overflow-hidden relative">
        <div className="bg-stone-900 text-white px-4 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">Official ISKCON Halifax Bus Shuttle Checkout</span>
          </div>
          <a
            href={APP_CONFIG.zeffyPaymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-300 hover:text-white flex items-center space-x-1 underline text-[11px] transition"
          >
            <span>Open in separate tab</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Embedded iFrame */}
        <div className="w-full h-[680px] sm:h-[750px] bg-white relative">
          <iframe
            title="ISKCON Halifax Devotee Bus Shuttle Payment"
            src={APP_CONFIG.zeffyEmbedUrl}
            className="w-full h-full border-0"
            allow="payment"
          />
        </div>
      </div>

      {/* Support & Transparency Note */}
      <div className="text-center text-xs text-stone-500 space-y-1">
        <div className="flex items-center justify-center space-x-1">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Need help or have questions about transportation?</span>
        </div>
        <p>
          Contact temple coordinators at{' '}
          <strong className="text-stone-700">{APP_CONFIG.supportEmail}</strong>
        </p>
      </div>
    </section>
  );
};
