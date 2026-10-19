import React, { useState } from 'react';
import { ExternalLink, Check, Copy, ShieldCheck, Ticket, AlertCircle } from 'lucide-react';
import { Booking } from '../types';
import { APP_CONFIG } from '../config/appConfig';

interface ZeffyPaymentModalProps {
  booking: Booking;
  onClose: () => void;
  onViewTicket: () => void;
}

export const ZeffyPaymentModal: React.FC<ZeffyPaymentModalProps> = ({
  booking,
  onClose,
  onViewTicket,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(booking.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const zeffyUrl = APP_CONFIG.zeffyPaymentUrl;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-200 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 mx-auto shadow-sm">
          <Ticket className="w-8 h-8" />
        </div>

        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Seats Reserved in System</span>
          </div>
          <h3 className="text-2xl font-black text-stone-900 tracking-tight pt-1">
            Complete Payment on Zeffy
          </h3>
          <p className="text-xs text-stone-500">
            Trip Date: {booking.tripDate} • {booking.seatCount} Seat{booking.seatCount > 1 ? 's' : ''}
          </p>
        </div>

        {/* Prominent Booking Reference Card */}
        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-center space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Your Booking Reference Code
          </div>
          <div className="flex items-center justify-center space-x-3">
            <span className="text-2xl sm:text-3xl font-mono font-black text-amber-700 tracking-wider">
              {booking.reference}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white border border-stone-300 hover:border-amber-400 text-stone-600 hover:text-amber-700 transition shadow-sm"
              title="Copy Reference"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[11px] text-stone-500">
            Save this code! Driver will verify this on boarding.
          </p>
        </div>

        {/* Steps / Instructions for Zeffy */}
        <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200/80 space-y-2.5 text-xs text-stone-700">
          <div className="font-bold text-amber-900 flex items-center space-x-1.5">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Payment Instructions:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-stone-600 pl-1 leading-relaxed">
            <li>Click <strong>"Pay via Zeffy"</strong> below to open our 100% free nonprofit payment portal.</li>
            <li>In the Zeffy form notes or reference field, please enter your code: <strong className="font-mono text-amber-800">{booking.reference}</strong>.</li>
            <li>Once payment is complete, your seat is 100% secured!</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <a
            href={zeffyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-base shadow-lg shadow-orange-600/25 transition"
          >
            <span>Proceed to Zeffy Payment</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={onViewTicket}
            className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition"
          >
            <span>View & Print Boarding Pass</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="block w-full text-center text-xs text-stone-400 hover:text-stone-600 transition"
        >
          Close this window
        </button>
      </div>
    </div>
  );
};
