import React, { useState, useEffect } from 'react';
import { Users, User, Mail, Phone, FileText, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { PickupPoint } from '../types';

interface BookingFormProps {
  selectedDate: string;
  selectedPickup: PickupPoint;
  availableSeats: number;
  onSubmitBooking: (bookingData: {
    bookerName: string;
    bookerEmail: string;
    bookerPhone: string;
    seatCount: number;
    passengers: { id: string; fullName: string }[];
    notes?: string;
  }) => Promise<void>;
  isSubmitting: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  selectedDate,
  selectedPickup,
  availableSeats,
  onSubmitBooking,
  isSubmitting,
}) => {
  const [seatCount, setSeatCount] = useState<number>(1);
  const [bookerName, setBookerName] = useState<string>('');
  const [bookerEmail, setBookerEmail] = useState<string>('');
  const [bookerPhone, setBookerPhone] = useState<string>('');
  const [passengers, setPassengers] = useState<string[]>(['']);
  const [notes, setNotes] = useState<string>('');
  const [sameAsBooker, setSameAsBooker] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync passenger array when seatCount changes
  useEffect(() => {
    setPassengers((prev) => {
      const updated = [...prev];
      if (updated.length < seatCount) {
        while (updated.length < seatCount) {
          updated.push('');
        }
      } else if (updated.length > seatCount) {
        return updated.slice(0, seatCount);
      }
      return updated;
    });
  }, [seatCount]);

  // Keep passenger 1 in sync with booker name if checked
  useEffect(() => {
    if (sameAsBooker && bookerName) {
      setPassengers((prev) => {
        const next = [...prev];
        next[0] = bookerName;
        return next;
      });
    }
  }, [bookerName, sameAsBooker]);

  const handlePassengerNameChange = (index: number, value: string) => {
    if (index === 0 && sameAsBooker) {
      setSameAsBooker(false);
    }
    setPassengers((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!bookerName.trim()) {
      setErrorMsg('Please enter the booker’s full name.');
      return;
    }
    if (!bookerEmail.trim() || !bookerEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address for booking confirmation.');
      return;
    }
    if (!bookerPhone.trim() || bookerPhone.length < 10) {
      setErrorMsg('Please provide a valid 10-digit phone number for the driver/organizers to contact.');
      return;
    }

    // Check all passenger names
    for (let i = 0; i < seatCount; i++) {
      if (!passengers[i] || !passengers[i].trim()) {
        setErrorMsg(`Please enter the full name for Passenger #${i + 1}.`);
        return;
      }
    }

    if (seatCount > availableSeats) {
      setErrorMsg(`Only ${availableSeats} seat(s) remain on this 14-seater bus.`);
      return;
    }

    try {
      await onSubmitBooking({
        bookerName: bookerName.trim(),
        bookerEmail: bookerEmail.trim(),
        bookerPhone: bookerPhone.trim(),
        seatCount,
        passengers: passengers.map((name, i) => ({
          id: `p-${Date.now()}-${i}`,
          fullName: name.trim(),
        })),
        notes: notes.trim() || undefined,
      });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save booking. Please try again.');
    }
  };

  const maxSelectable = Math.min(Math.max(availableSeats, 1), 6); // Max 6 per party or remaining

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-6">
      <div className="border-b border-stone-100 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-stone-900">3. Passenger & Booker Details</h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Details will be securely stored in our database for the driver's manifest
          </p>
        </div>

        <div className="text-xs text-stone-600 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200">
          Selected: <strong className="text-stone-900">{selectedPickup.shortName}</strong>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Number of Seats Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
            How many seats do you need? (14-seater total)
          </label>
          <div className="flex items-center space-x-2">
            {Array.from({ length: maxSelectable }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setSeatCount(num)}
                className={`w-11 h-11 rounded-xl font-bold text-sm transition-all border ${
                  seatCount === num
                    ? 'bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-300 scale-105'
                    : 'bg-stone-50 text-stone-700 border-stone-300 hover:border-amber-400 hover:bg-amber-50'
                }`}
              >
                {num}
              </button>
            ))}
            <span className="text-xs text-stone-500 pl-2">
              ({availableSeats} remaining)
            </span>
          </div>
        </div>

        {/* Booker Information */}
        <div className="bg-stone-50/70 rounded-xl p-4 border border-stone-200 space-y-4">
          <div className="flex items-center space-x-2 text-stone-800 font-bold text-sm">
            <User className="w-4 h-4 text-amber-600" />
            <span>Primary Booker Information</span>
            <span className="text-[11px] font-normal text-stone-500">(Person making this booking)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Booker Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g., Haridas Sharma"
                  value={bookerName}
                  onChange={(e) => setBookerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Phone Number (Driver Contact) *
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="(902) 555-0199"
                  value={bookerPhone}
                  onChange={(e) => setBookerPhone(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Email Address (For Confirmation) *
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="devotee@example.com"
                  value={bookerEmail}
                  onChange={(e) => setBookerEmail(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Passenger Names (Required for Driver Verification) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Full Names of All Passengers ({seatCount} {seatCount === 1 ? 'Person' : 'People'})
            </label>
            <span className="text-[11px] text-amber-700 font-medium">
              * Needed for driver check-in sheet
            </span>
          </div>

          {seatCount > 1 && (
            <label className="flex items-center space-x-2 text-xs text-stone-600 cursor-pointer">
              <input
                type="checkbox"
                checked={sameAsBooker}
                onChange={(e) => setSameAsBooker(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span>Passenger 1 is the same as the Booker</span>
            </label>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {passengers.map((passengerName, idx) => (
              <div key={idx} className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Passenger #{idx + 1} Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder={`Passenger ${idx + 1} legal or full name`}
                  value={passengerName}
                  onChange={(e) => handlePassengerNameChange(idx, e.target.value)}
                  className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notes / Special Instructions */}
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center space-x-1">
            <FileText className="w-3.5 h-3.5 text-stone-400" />
            <span>Special Requests or Notes (Optional)</span>
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., traveling with elderly family member, stroller, or questions for organizers"
            className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
          />
        </div>

        {/* Submit & Payment flow overview */}
        <div className="pt-2">
          <div className="bg-amber-50/60 rounded-xl p-4 border border-amber-200 mb-4 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-amber-900">
                Reservation Summary
              </div>
              <div className="text-xs text-stone-600">
                {seatCount} Seat(s) • {selectedPickup.shortName} • {selectedDate}
              </div>
            </div>
            <div className="flex items-center space-x-1 text-xs text-stone-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Zeffy Payment</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || availableSeats === 0}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-base shadow-lg shadow-orange-600/25 transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span>Saving Reservation...</span>
            ) : (
              <>
                <span>Reserve {seatCount} Seat{seatCount > 1 ? 's' : ''} & Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-[11px] text-stone-400 text-center mt-2">
            You will receive a unique booking reference and be directed to Zeffy for payment processing.
          </p>
        </div>
      </form>
    </div>
  );
};
