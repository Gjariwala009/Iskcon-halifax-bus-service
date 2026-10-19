import React, { useState, useMemo } from 'react';
import { Booking } from '../types';
import { Download, Printer, Search, Filter, CheckCircle2, Circle, Phone, RefreshCw, ArrowLeft, ShieldCheck } from 'lucide-react';
import { APP_CONFIG } from '../config/appConfig';
import { togglePassengerBoarding } from '../services/firebase';

interface DriverManifestProps {
  bookings: Booking[];
  selectedDate: string;
  onBackToBooking: () => void;
  onRefresh: () => void;
}

export const DriverManifest: React.FC<DriverManifestProps> = ({
  bookings,
  selectedDate,
  onBackToBooking,
  onRefresh,
}) => {
  const [selectedPickupFilter, setSelectedPickupFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Flatten passengers into a manifest row
  const manifestRows = useMemo(() => {
    const rows: {
      bookingId: string;
      reference: string;
      passengerIndex: number;
      passengerName: string;
      pickupPointId: string;
      pickupPointName: string;
      bookerName: string;
      bookerPhone: string;
      bookerEmail: string;
      boarded: boolean;
      notes?: string;
      createdAt: string;
    }[] = [];

    bookings.forEach((b) => {
      b.passengers.forEach((p, idx) => {
        rows.push({
          bookingId: b.id,
          reference: b.reference,
          passengerIndex: idx,
          passengerName: p.fullName,
          pickupPointId: b.pickupPointId,
          pickupPointName: b.pickupPointName,
          bookerName: b.bookerName,
          bookerPhone: b.bookerPhone,
          bookerEmail: b.bookerEmail,
          boarded: Boolean(p.boarded),
          notes: b.notes,
          createdAt: b.createdAt,
        });
      });
    });

    return rows;
  }, [bookings]);

  // Filtered rows
  const filteredRows = useMemo(() => {
    return manifestRows.filter((row) => {
      // Pickup filter
      if (selectedPickupFilter !== 'all' && row.pickupPointId !== selectedPickupFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = row.passengerName.toLowerCase().includes(q);
        const matchBooker = row.bookerName.toLowerCase().includes(q);
        const matchRef = row.reference.toLowerCase().includes(q);
        const matchPhone = row.bookerPhone.includes(q);
        return matchName || matchBooker || matchRef || matchPhone;
      }
      return true;
    });
  }, [manifestRows, selectedPickupFilter, searchQuery]);

  const totalSeats = APP_CONFIG.busCapacity;
  const bookedCount = manifestRows.length;
  const boardedCount = manifestRows.filter((r) => r.boarded).length;

  const handleToggleBoarding = async (bookingId: string, passengerIndex: number, currentBoarded: boolean) => {
    try {
      setIsUpdating(true);
      await togglePassengerBoarding(bookingId, passengerIndex, !currentBoarded);
      onRefresh();
    } catch (err) {
      console.error('Failed to update boarding status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Export to CSV Function
  const exportToCSV = () => {
    const headers = [
      'Booking Reference',
      'Passenger Full Name',
      'Seat #',
      'Pickup Point',
      'Booker Name',
      'Contact Phone',
      'Contact Email',
      'Boarded Status',
      'Special Notes',
      'Booking Date & Time',
    ];

    const csvRows = [headers.join(',')];

    manifestRows.forEach((row, i) => {
      const escape = (val: string | undefined) => `"${(val || '').replace(/"/g, '""')}"`;
      const line = [
        escape(row.reference),
        escape(row.passengerName),
        escape(`Seat ${i + 1}`),
        escape(row.pickupPointName),
        escape(row.bookerName),
        escape(row.bookerPhone),
        escape(row.bookerEmail),
        escape(row.boarded ? 'BOARDED' : 'PENDING'),
        escape(row.notes),
        escape(row.createdAt),
      ].join(',');
      csvRows.push(line);
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `iskcon-halifax-bus-manifest-${selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header / Actions */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToBooking}
            className="p-2 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 transition"
            title="Back to Booking"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Driver & Organizer Portal
              </span>
              <span className="text-xs text-stone-500">Trip: {selectedDate}</span>
            </div>
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">
              Passenger Manifest & Verification
            </h2>
          </div>
        </div>

        {/* Action Buttons: Download CSV & Print */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-xs font-semibold shadow-sm transition"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={exportToCSV}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV for Driver</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold shadow-sm transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Manifest</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <div className="text-xs font-semibold text-stone-500 uppercase">Total Capacity</div>
          <div className="text-2xl font-black text-stone-900 mt-1">{totalSeats} Seats</div>
          <div className="text-[11px] text-stone-400 mt-0.5">Minibus rental</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <div className="text-xs font-semibold text-stone-500 uppercase">Booked Passengers</div>
          <div className="text-2xl font-black text-amber-600 mt-1">{bookedCount} / {totalSeats}</div>
          <div className="text-[11px] text-stone-400 mt-0.5">{totalSeats - bookedCount} seats available</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <div className="text-xs font-semibold text-stone-500 uppercase">Boarded at Door</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{boardedCount} / {bookedCount}</div>
          <div className="text-[11px] text-stone-400 mt-0.5">{bookedCount - boardedCount} yet to board</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <div className="text-xs font-semibold text-stone-500 uppercase">Active Pickup Points</div>
          <div className="text-2xl font-black text-stone-900 mt-1">2 Stops</div>
          <div className="text-[11px] text-stone-400 mt-0.5">Mumford & Lacewood</div>
        </div>
      </div>

      {/* Printable Header (Visible only when printing) */}
      <div className="print-only mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold">ISKCON Halifax Devotee Bus — Driver Manifest</h1>
        <p className="text-sm">Date: Saturday, November 7, 2026 • 14-Seater Bus</p>
        <p className="text-xs text-gray-600 mt-1">
          Stop 1: Mumford Terminal (4:15 PM) | Stop 2: Lacewood Terminal (4:35 PM) | Destination: ISKCON Halifax Temple
        </p>
      </div>

      {/* Filter and Search Bar (no-print) */}
      <div className="no-print bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search passenger, phone, ref..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
          />
        </div>

        {/* Pickup point filter pills */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <button
            onClick={() => setSelectedPickupFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
              selectedPickupFilter === 'all'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Stops ({manifestRows.length})
          </button>
          {APP_CONFIG.pickupPoints.map((p) => {
            const count = manifestRows.filter((r) => r.pickupPointId === p.id).length;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPickupFilter(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
                  selectedPickupFilter === p.id
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {p.shortName.split(' ')[0]} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Passenger Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-100/80 border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">Seat</th>
                <th className="py-3 px-4">Passenger Full Name</th>
                <th className="py-3 px-4">Pickup Location</th>
                <th className="py-3 px-4">Booker / Contact</th>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Notes</th>
                <th className="py-3 px-4 text-center">Boarding Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-stone-400">
                    No passenger records found matching this filter.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, index) => (
                  <tr
                    key={`${row.bookingId}-${row.passengerIndex}`}
                    className={`hover:bg-amber-50/30 transition ${
                      row.boarded ? 'bg-emerald-50/20' : ''
                    }`}
                  >
                    {/* Seat number */}
                    <td className="py-3.5 px-4 text-center font-bold text-stone-500">
                      #{index + 1}
                    </td>

                    {/* Passenger full name */}
                    <td className="py-3.5 px-4 font-bold text-stone-900 text-sm">
                      {row.passengerName}
                    </td>

                    {/* Pickup Point */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-stone-800">
                        {row.pickupPointName}
                      </div>
                    </td>

                    {/* Booker contact info */}
                    <td className="py-3.5 px-4 space-y-0.5">
                      <div className="font-medium text-stone-800">{row.bookerName}</div>
                      <div className="text-stone-500 flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-stone-400" />
                        <span>{row.bookerPhone}</span>
                      </div>
                    </td>

                    {/* Booking Reference */}
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-800">
                      {row.reference}
                    </td>

                    {/* Notes */}
                    <td className="py-3.5 px-4 text-stone-500 max-w-xs truncate">
                      {row.notes || '—'}
                    </td>

                    {/* Boarding Status Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleBoarding(row.bookingId, row.passengerIndex, row.boarded)}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold transition shadow-sm ${
                          row.boarded
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                            : 'bg-stone-100 text-stone-600 border border-stone-300 hover:bg-amber-100 hover:text-amber-900'
                        }`}
                      >
                        {row.boarded ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Boarded</span>
                          </>
                        ) : (
                          <>
                            <Circle className="w-3.5 h-3.5 text-stone-400" />
                            <span>Pending</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Driver Instructions Banner */}
      <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-xs text-stone-600 space-y-1">
        <div className="font-bold text-stone-800 flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Driver Verification Guidelines:</span>
        </div>
        <p>
          1. Match passenger's name against their ID or check their Booking Reference code from their pass.
        </p>
        <p>
          2. Tap the <strong>"Pending"</strong> button above to mark them as <strong>"Boarded"</strong> when they enter the bus.
        </p>
        <p>
          3. If running offline, use the <strong>"Download CSV for Driver"</strong> or <strong>"Print Manifest"</strong> button before departing.
        </p>
      </div>
    </div>
  );
};
