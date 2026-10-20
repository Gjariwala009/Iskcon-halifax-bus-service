import React, { useState } from 'react';
import { ExternalLink, Check, Copy, ShieldCheck, Ticket, X } from 'lucide-react';
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
  const zeffyEmbedUrl = APP_CONFIG.zeffyEmbedUrl;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-amber-200 relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-gradient-to-r from-amber-50/80 to-orange-50/50 flex items-start justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0 shadow-sm">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Seat Reserved in System</span>
                </span>
                <span className="text-xs text-stone-500 hidden sm:inline">
                  {booking.seatCount} Seat{booking.seatCount > 1 ? 's' : ''} • {booking.tripDate}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-stone-900 tracking-tight mt-0.5">
                Complete Online Contribution
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-white/80 transition shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reference Code Helper Card (Crucial for matching) */}
        <div className="px-4 sm:px-5 py-3 bg-amber-500/10 border-b border-amber-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-stone-700">Your Booking Reference:</span>
            <span className="font-mono font-black text-amber-900 bg-white px-2.5 py-1 rounded-md border border-amber-300 shadow-sm text-sm tracking-wide">
              {booking.reference}
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center space-x-1 px-2 py-1 rounded bg-white hover:bg-amber-50 border border-stone-300 text-stone-700 font-semibold text-xs transition shadow-sm"
              title="Copy Reference"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="text-[11px] text-amber-900/90 font-medium">
            👇 Paste this code into the reference question in the form below
          </div>
        </div>

        {/* Embedded Zeffy Checkout Form */}
        <div className="flex-1 w-full min-h-[460px] sm:min-h-[520px] bg-stone-50 overflow-hidden relative">
          <iframe
            title="ISKCON Halifax Devotee Bus Shuttle Payment"
            src={zeffyEmbedUrl}
            className="w-full h-full min-h-[460px] sm:min-h-[520px] border-0"
            allow="payment"
          />
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
          <a
            href={zeffyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-500 hover:text-amber-800 flex items-center space-x-1.5 transition order-2 sm:order-1"
          >
            <span>Having trouble with the form? Open in separate tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end order-1 sm:order-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-xl border border-stone-300 hover:bg-white text-stone-600 font-semibold text-xs transition"
            >
              Close
            </button>
            <button
              type="button"
              onClick={onViewTicket}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition"
            >
              View & Print Boarding Pass
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
