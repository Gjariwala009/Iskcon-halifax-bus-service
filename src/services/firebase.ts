import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  onSnapshot,
  Firestore,
  Unsubscribe
} from 'firebase/firestore';
import { Booking } from '../types';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if valid Firebase configuration is present
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'YOUR_API_KEY'
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    console.info('Connected to Firebase Firestore');
  } catch (error) {
    console.warn('Firebase initialization error, falling back to local storage:', error);
  }
} else {
  console.info('Firebase credentials not set in .env. Using mock local persistence.');
}

// Local storage key for fallback
const LOCAL_STORAGE_KEY = 'iskcon_halifax_bus_bookings';

// Initial local storage starts empty so seats booked is zero
function getLocalBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    // Sanitize any previous demo bookings so seats booked defaults to 0
    const filtered = Array.isArray(parsed) 
      ? parsed.filter((b: any) => !b.id?.startsWith('demo-'))
      : [];
    if (filtered.length !== (Array.isArray(parsed) ? parsed.length : 0)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
    }
    return filtered;
  } catch (e) {
    console.error('Error reading local storage:', e);
    return [];
  }
}

function saveLocalBookings(bookings: Booking[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
    // Dispatch custom event for real-time local updates across components
    window.dispatchEvent(new Event('iskcon_bookings_updated'));
  } catch (e) {
    console.error('Error saving to local storage:', e);
  }
}

// Generate unique booking reference: ISK-YYMMDD-XXXX
export function generateReference(dateStr: string): string {
  const cleanDate = dateStr.replace(/-/g, '').slice(2); // e.g., '261107'
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // exclude confusing chars like 0, O, 1, I
  let randomCode = '';
  for (let i = 0; i < 4; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ISK-${cleanDate}-${randomCode}`;
}

export async function fetchBookings(tripDate: string): Promise<Booking[]> {
  if (db) {
    try {
      const q = query(collection(db, 'bookings'), where('tripDate', '==', tripDate));
      const querySnapshot = await getDocs(q);
      const bookings: Booking[] = [];
      querySnapshot.forEach((docSnap) => {
        bookings.push({ id: docSnap.id, ...(docSnap.data() as Omit<Booking, 'id'>) });
      });
      return bookings;
    } catch (error) {
      console.warn('Firestore fetch failed, falling back to local data:', error);
    }
  }

  // Fallback to local storage
  const all = getLocalBookings();
  return all.filter((b) => b.tripDate === tripDate);
}

export async function saveBooking(
  bookingData: Omit<Booking, 'id' | 'reference' | 'createdAt'>
): Promise<Booking> {
  const reference = generateReference(bookingData.tripDate);
  const newBooking: Booking = {
    ...bookingData,
    id: `booking-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    reference,
    createdAt: new Date().toISOString(),
    boardedCount: 0,
  };

  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...newBooking,
      });
      return { ...newBooking, id: docRef.id };
    } catch (error) {
      console.warn('Firestore save failed, saving locally:', error);
    }
  }

  // Save to local storage
  const current = getLocalBookings();
  current.push(newBooking);
  saveLocalBookings(current);
  return newBooking;
}

export async function togglePassengerBoarding(
  bookingId: string,
  passengerIndex: number,
  boarded: boolean
): Promise<void> {
  if (db) {
    try {
      const docRef = doc(db, 'bookings', bookingId);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data() as Booking;
        const updatedPassengers = [...data.passengers];
        if (updatedPassengers[passengerIndex]) {
          updatedPassengers[passengerIndex].boarded = boarded;
          const boardedCount = updatedPassengers.filter((p) => p.boarded).length;
          await updateDoc(docRef, {
            passengers: updatedPassengers,
            boardedCount,
          });
        }
      }
    } catch (error) {
      console.warn('Firestore update failed:', error);
    }
  }

  // Local storage update
  const current = getLocalBookings();
  const bookingIndex = current.findIndex((b) => b.id === bookingId);
  if (bookingIndex !== -1) {
    const booking = current[bookingIndex];
    if (booking.passengers[passengerIndex]) {
      booking.passengers[passengerIndex].boarded = boarded;
      booking.boardedCount = booking.passengers.filter((p) => p.boarded).length;
      saveLocalBookings(current);
    }
  }
}

export function subscribeToBookings(
  tripDate: string,
  onUpdate: (bookings: Booking[]) => void
): Unsubscribe {
  if (db) {
    try {
      const q = query(collection(db, 'bookings'), where('tripDate', '==', tripDate));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const bookings: Booking[] = [];
        snapshot.forEach((docSnap) => {
          bookings.push({ id: docSnap.id, ...(docSnap.data() as Omit<Booking, 'id'>) });
        });
        onUpdate(bookings);
      });
      return unsubscribe;
    } catch (err) {
      console.warn('Firestore subscription failed, falling back to local events:', err);
    }
  }

  // Fallback local subscription
  const handleStorage = () => {
    const all = getLocalBookings();
    onUpdate(all.filter((b) => b.tripDate === tripDate));
  };

  // Initial call
  handleStorage();

  window.addEventListener('iskcon_bookings_updated', handleStorage);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener('iskcon_bookings_updated', handleStorage);
    window.removeEventListener('storage', handleStorage);
  };
}
