import React from 'react';
import { MapPin, Clock, Check, Navigation, AlertCircle } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { PickupPoint } from '../types';

interface PickupSelectorProps {
  selectedPickupId: string;
  onSelectPickup: (pickup: PickupPoint) => void;
}

export const PickupSelector: React.FC<PickupSelectorProps> = ({
  selectedPickupId,
  onSelectPickup,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm space-y-5">
      <div className="border-b border-stone-100 pb-3">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-stone-900">2. Select Your Pickup Point in Halifax</h3>
        </div>
        <p className="text-xs text-stone-500 mt-0.5">
          Choose where you and your party will board the shuttle bus
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {APP_CONFIG.pickupPoints.map((pickup, index) => {
          const isSelected = selectedPickupId === pickup.id;

          return (
            <div
              key={pickup.id}
              onClick={() => onSelectPickup(pickup)}
              className={`relative cursor-pointer rounded-xl p-5 border-2 transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-600 bg-amber-50/40 shadow-md ring-2 ring-amber-300'
                  : 'border-stone-200 bg-white hover:border-amber-300 hover:bg-stone-50/50'
              }`}
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full border border-amber-200">
                    Stop #{index + 1}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition ${
                      isSelected
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'border border-stone-300 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="font-bold text-stone-900 text-base mt-2.5">
                  {pickup.shortName}
                </h4>

                <div className="mt-3 space-y-2 text-xs text-stone-600">
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-stone-900">Pickup: {pickup.pickupTime}</div>
                      {pickup.dropOffTime && (
                        <div className="text-amber-800 font-semibold text-[11px] mt-0.5">
                          Return Drop-off: {pickup.dropOffTime}
                        </div>
                      )}
                      <p className="text-stone-500 text-[11px]">Please arrive 10 mins early for boarding</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Navigation className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span className="text-stone-700">{pickup.address}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200/60 text-[11px] text-stone-500 bg-white/70 p-2.5 rounded-lg border border-stone-100">
                <strong className="text-stone-700">Landmark:</strong> {pickup.landmark}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-orange-50/70 border border-orange-200/70 p-4 text-xs text-orange-950 flex items-start space-x-3">
        <AlertCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <div className="font-semibold text-orange-900">
            Shuttle Itinerary Note:
          </div>
          <p className="text-stone-600">
            <strong>Outbound:</strong> Devotees are picked up at <strong>Mumford Terminal</strong> at <strong>3:15 PM</strong>, then <strong>Lacewood Terminal</strong> at <strong>3:30 PM</strong>, arriving at ISKCON Halifax Temple (29 Westwood Blvd, Upper Tantallon, B3M 1G5) for the 5:00 PM program.
          </p>
          <p className="text-stone-600">
            <strong>Return:</strong> Departs temple at <strong>8:15 PM</strong>, dropping off at <strong>Lacewood Terminal</strong> at <strong>8:45 PM</strong>, then <strong>Mumford Terminal</strong> at <strong>9:00 PM</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
