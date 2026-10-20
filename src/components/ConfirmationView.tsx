import React from 'react';
import { Booking } from '../types';
import { CheckCircle2, Printer, ArrowLeft, ExternalLink, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

interface ConfirmationViewProps {
  booking: Booking;
  onBackToBooking: () => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({
  booking,
  onBackToBooking,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      {/* Top back button (no-print) */}
      <div className="no-print flex items-center justify-between">
        <button
          onClick={onBackToBooking}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Page</span>
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-stone-900 text-white hover:bg-stone-800 text-xs font-semibold shadow-sm transition"
        >
          <Printer className="w-4 h-4" />
          <span>Print Boarding Pass</span>
        </button>
      </div>

      {/* Devotee Bus Pass Card */}
      <div className="bg-white rounded-2xl border-2 border-amber-300 shadow-xl overflow-hidden">
        {/* Pass Top Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 text-white text-center relative">
          <div className="text-xs uppercase font-bold tracking-widest text-amber-200">
            Official Devotee Shuttle Pass
          </div>
          <h2 className="text-2xl font-black tracking-tight mt-1">
            ISKCON Halifax Bus Service
          </h2>
          <p className="text-xs text-amber-100 mt-1">
            Trip Date: {booking.tripDate} • 14-Seater Devotee Bus
          </p>

          <div className="mt-4 inline-block bg-white text-stone-900 px-5 py-2 rounded-xl shadow-md border border-amber-200">
            <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Booking Reference
            </div>
            <div className="text-2xl font-black font-mono text-amber-700 tracking-wider">
              {booking.reference}
            </div>
          </div>
        </div>

        {/* Pass Details Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-2 text-emerald-700 bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>
              Your seats are registered! Show this pass or your Reference ID to the driver upon boarding.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pickup & Trip Timing */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Boarding Information
              </h4>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900">Pickup Location:</span>
                    <p className="text-stone-700">{booking.pickupPointName}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 pt-1 border-t border-stone-200">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900">Pickup Timing:</span>
                    <p className="text-stone-600">Please arrive 10 minutes before departure</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booker Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Booker Information
              </h4>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-stone-900">Booked By:</span>
                  <span className="text-stone-700">{booking.bookerName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span className="text-stone-700">{booking.bookerPhone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-stone-400" />
                  <span className="text-stone-700">{booking.bookerEmail}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Names List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center justify-between">
              <span>Passenger Manifest ({booking.passengers.length} Reserved Seats)</span>
              <span className="text-[11px] font-normal text-stone-500">Driver Check-in List</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {booking.passengers.map((passenger, i) => (
                <div
                  key={passenger.id || i}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-stone-50 border border-stone-200"
                >
                  <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-bold text-stone-900 text-sm">
                      {passenger.fullName}
                    </div>
                    <div className="text-[10px] text-stone-500">Seat #{i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes if any */}
          {booking.notes && (
            <div className="text-xs bg-stone-50 p-3 rounded-lg border border-stone-200">
              <strong className="text-stone-700">Notes/Requests: </strong>
              <span className="text-stone-600">{booking.notes}</span>
            </div>
          )}

          {/* Important instructions for attendees */}
          <div className="rounded-xl bg-amber-50/70 border border-amber-200 p-4 text-xs text-stone-700 space-y-1.5">
            <div className="font-bold text-amber-900">Important Reminders for Saturday, Nov 7:</div>
            <ul className="list-disc list-inside space-y-1 text-stone-600">
              <li>Please be at the pickup stop 10 minutes prior to scheduled departure.</li>
              <li>Return bus departs ISKCON Halifax Temple (29 Westwood Blvd) at approximately 8:15 PM following Gaura Aarti and Prasadam feast.</li>
              <li>Return drop-offs: <strong>Lacewood Terminal at 8:45 PM</strong>, then <strong>Mumford Terminal at 9:00 PM</strong>.</li>
              <li>For any last-minute questions or delays, contact temple transport volunteers.</li>
            </ul>
          </div>
        </div>

        {/* Footer in Pass */}
        <div className="bg-stone-50 px-6 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            ISKCON Halifax • Registered Non-Profit Society
          </div>
          <div className="no-print flex items-center space-x-3">
            <a
              href={APP_CONFIG.zeffyPaymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-amber-700 font-bold hover:underline"
            >
              <span>Online Contribution Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
