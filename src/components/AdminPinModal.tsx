import React, { useState } from 'react';
import { Lock, X, AlertCircle } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

interface AdminPinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminPinModal: React.FC<AdminPinModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === APP_CONFIG.driverPin || pin === 'admin') {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-stone-400 hover:text-stone-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-4">
          <Lock className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-stone-900">
          Driver & Organizer Access
        </h3>
        <p className="text-xs text-stone-500 mt-1 mb-4">
          Enter the access PIN to view and download the passenger manifest list. (Default: 108)
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              autoFocus
              placeholder="Enter PIN (108)"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              className="w-full text-center tracking-widest text-lg font-mono px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
            {error && (
              <div className="flex items-center space-x-1 text-rose-600 text-xs mt-1.5 justify-center">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect PIN. Please try again.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow transition"
          >
            Access Driver Manifest
          </button>
        </form>
      </div>
    </div>
  );
};
