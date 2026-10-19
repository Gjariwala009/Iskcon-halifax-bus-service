import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DateSelector } from './components/DateSelector';
import { PickupSelector } from './components/PickupSelector';
import { BookingForm } from './components/BookingForm';
import { ConfirmationView } from './components/ConfirmationView';
import { DriverManifest } from './components/DriverManifest';
import { ZeffyPaymentModal } from './components/ZeffyPaymentModal';
import { AdminPinModal } from './components/AdminPinModal';
import { Footer } from './components/Footer';
import { APP_CONFIG } from './config/appConfig';
import { Booking, PickupPoint } from './types';
import { subscribeToBookings, saveBooking, fetchBookings } from './services/firebase';

export const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-07');
  const [selectedPickup, setSelectedPickup] = useState<PickupPoint>(APP_CONFIG.pickupPoints[0]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [viewMode, setViewMode] = useState<'booking' | 'confirmation' | 'manifest'>('booking');
  const [showZeffyModal, setShowZeffyModal] = useState<boolean>(false);
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const bookingFormRef = useRef<HTMLDivElement>(null);

  // Subscribe to bookings for the selected date
  useEffect(() => {
    const unsubscribe = subscribeToBookings(selectedDate, (updatedBookings) => {
      setBookings(updatedBookings);
    });

    return () => {
      unsubscribe();
    };
  }, [selectedDate]);

  // Total booked seats for current date
  const bookedSeatsCount = useMemo(() => {
    return bookings.reduce((sum, b) => sum + (b.passengers?.length || b.seatCount || 0), 0);
  }, [bookings]);

  const availableSeats = Math.max(0, APP_CONFIG.busCapacity - bookedSeatsCount);

  const handleScrollToBook = () => {
    if (viewMode !== 'booking') {
      setViewMode('booking');
    }
    setTimeout(() => {
      bookingFormRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleBookingSubmit = async (formData: {
    bookerName: string;
    bookerEmail: string;
    bookerPhone: string;
    seatCount: number;
    passengers: { id: string; fullName: string }[];
    notes?: string;
  }) => {
    setIsSubmitting(true);
    try {
      const created = await saveBooking({
        tripDate: selectedDate,
        pickupPointId: selectedPickup.id,
        pickupPointName: selectedPickup.shortName,
        bookerName: formData.bookerName,
        bookerEmail: formData.bookerEmail,
        bookerPhone: formData.bookerPhone,
        seatCount: formData.seatCount,
        passengers: formData.passengers,
        notes: formData.notes,
        paymentStatus: 'pending',
      });

      setActiveBooking(created);
      setShowZeffyModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const refreshBookings = async () => {
    const list = await fetchBookings(selectedDate);
    setBookings(list);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200">
      {/* Top Navigation */}
      <Navbar
        onOpenDriverManifest={() => setShowPinModal(true)}
        isDriverView={viewMode === 'manifest'}
        onGoToBooking={() => setViewMode('booking')}
        bookedSeatsCount={bookedSeatsCount}
        totalSeats={APP_CONFIG.busCapacity}
      />

      <main className="flex-1">
        {viewMode === 'manifest' ? (
          /* Driver & Organizer Manifest View */
          <DriverManifest
            bookings={bookings}
            selectedDate={selectedDate}
            onBackToBooking={() => setViewMode('booking')}
            onRefresh={refreshBookings}
          />
        ) : viewMode === 'confirmation' && activeBooking ? (
          /* Confirmation / Bus Pass View */
          <ConfirmationView
            booking={activeBooking}
            onBackToBooking={() => setViewMode('booking')}
          />
        ) : (
          /* Public Devotee Booking Flow */
          <>
            <Hero
              onScrollToBook={handleScrollToBook}
              bookedSeatsCount={bookedSeatsCount}
              totalSeats={APP_CONFIG.busCapacity}
            />

            <div
              ref={bookingFormRef}
              className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8"
            >
              <div className="text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Easy Online Booking
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                  Reserve Your Seat on the 14-Seater Bus
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
                  Follow the steps below to guarantee transportation to the ISKCON Halifax Temple.
                </p>
              </div>

              {/* Step 1: Calendar Date Selection */}
              <DateSelector
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                availableSeatsForDate={availableSeats}
              />

              {/* Step 2: Halifax Pickup Point Selection */}
              <PickupSelector
                selectedPickupId={selectedPickup.id}
                onSelectPickup={setSelectedPickup}
              />

              {/* Step 3: Multi-Passenger Details & Reservation Form */}
              <BookingForm
                selectedDate={selectedDate}
                selectedPickup={selectedPickup}
                availableSeats={availableSeats}
                onSubmitBooking={handleBookingSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Zeffy Payment Transition Modal */}
      {showZeffyModal && activeBooking && (
        <ZeffyPaymentModal
          booking={activeBooking}
          onClose={() => {
            setShowZeffyModal(false);
            setViewMode('confirmation');
          }}
          onViewTicket={() => {
            setShowZeffyModal(false);
            setViewMode('confirmation');
          }}
        />
      )}

      {/* Admin / Driver PIN Security Modal */}
      <AdminPinModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={() => {
          setShowPinModal(false);
          setViewMode('manifest');
        }}
      />
    </div>
  );
};
