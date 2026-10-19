import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ZeffyEmbedBooking } from './components/ZeffyEmbedBooking';
import { ConfirmationView } from './components/ConfirmationView';
import { DriverManifest } from './components/DriverManifest';
import { AdminPinModal } from './components/AdminPinModal';
import { Footer } from './components/Footer';
import { APP_CONFIG } from './config/appConfig';
import { Booking } from './types';
import { subscribeToBookings, fetchBookings } from './services/firebase';

export const App: React.FC = () => {
  const [selectedDate] = useState<string>('2026-11-07');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeBooking] = useState<Booking | null>(null);
  const [viewMode, setViewMode] = useState<'booking' | 'confirmation' | 'manifest'>('booking');
  const [showPinModal, setShowPinModal] = useState<boolean>(false);

  const bookingSectionRef = useRef<HTMLDivElement>(null);

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

  const handleScrollToBook = () => {
    if (viewMode !== 'booking') {
      setViewMode('booking');
    }
    setTimeout(() => {
      bookingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
          /* Public Devotee Booking Flow with Direct Zeffy Integration */
          <>
            <Hero
              onScrollToBook={handleScrollToBook}
              bookedSeatsCount={bookedSeatsCount}
              totalSeats={APP_CONFIG.busCapacity}
            />

            {/* Direct One-Step Zeffy Booking Embed */}
            <ZeffyEmbedBooking bookingSectionRef={bookingSectionRef} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

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
