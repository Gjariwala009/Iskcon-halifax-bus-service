import React, { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ZeffyEmbedBooking } from './components/ZeffyEmbedBooking';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const bookingSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToBook = () => {
    bookingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200">
      {/* Top Navigation */}
      <Navbar onScrollToBook={handleScrollToBook} />

      <main className="flex-1">
        {/* Hero Section with Route & Itinerary */}
        <Hero onScrollToBook={handleScrollToBook} />

        {/* Embedded Zeffy Booking & Payment */}
        <ZeffyEmbedBooking bookingSectionRef={bookingSectionRef} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
