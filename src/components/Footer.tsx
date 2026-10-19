import React from 'react';
import { Bus, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 border-t border-stone-800 no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Spiritual Maha-Mantra Banner */}
        <div className="bg-stone-800/80 rounded-2xl p-6 text-center border border-stone-700/60">
          <div className="text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-1">
            Maha-Mantra
          </div>
          <p className="text-base sm:text-lg font-bold text-amber-200 tracking-wide">
            Hare Krishna Hare Krishna • Krishna Krishna Hare Hare <br className="hidden sm:inline" />
            Hare Rama Hare Rama • Rama Rama Hare Hare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          {/* Col 1: About */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base">
              <Bus className="w-5 h-5 text-amber-500" />
              <span>{APP_CONFIG.appName}</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Providing safe, comfortable, and unified travel for devotees across Halifax to join our weekly temple festival, Kirtan, and sacred Prasadam feast.
            </p>
          </div>

          {/* Col 2: Temple Information */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {APP_CONFIG.templeName}
            </h4>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{APP_CONFIG.templeAddress}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{APP_CONFIG.supportPhone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{APP_CONFIG.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Bus Itinerary */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Saturday Schedule
            </h4>
            <div className="space-y-1.5 text-stone-400">
              <div className="flex justify-between">
                <span>Mumford Pickup:</span>
                <span className="text-white font-medium">3:15 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Lacewood Pickup:</span>
                <span className="text-white font-medium">3:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Temple Arrival & Darshan:</span>
                <span className="text-white font-medium">4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Main Kirtan & Program:</span>
                <span className="text-white font-medium">5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Temple Return Departs:</span>
                <span className="text-white font-medium">8:15 PM</span>
              </div>
              <div className="flex justify-between text-amber-400/90 font-medium">
                <span>Lacewood Drop-off:</span>
                <span className="text-amber-400">8:45 PM</span>
              </div>
              <div className="flex justify-between text-amber-400/90 font-medium">
                <span>Mumford Drop-off:</span>
                <span className="text-amber-400">9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-stone-800 text-center text-[11px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} ISKCON Halifax. All Glories to Srila Prabhupada.
          </div>
          <div className="flex items-center space-x-1">
            <span>Built with devotion</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
            <span>for the Halifax Devotee Community</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
