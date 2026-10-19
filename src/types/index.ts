export interface Passenger {
  id: string;
  fullName: string;
  boarded?: boolean;
}

export interface Booking {
  id: string;
  reference: string;
  tripDate: string; // e.g., '2026-11-07'
  pickupPointId: string;
  pickupPointName: string;
  bookerName: string;
  bookerEmail: string;
  bookerPhone: string;
  seatCount: number;
  passengers: Passenger[];
  notes?: string;
  paymentStatus: 'pending' | 'completed' | 'pay_at_boarding';
  boardedCount?: number;
  createdAt: string;
}

export interface PickupPoint {
  id: string;
  name: string;
  shortName: string;
  address: string;
  pickupTime: string;
  dropOffTime?: string;
  description: string;
  landmark: string;
}

export interface ScheduledTrip {
  date: string; // YYYY-MM-DD
  displayDate: string;
  occasion: string;
  totalSeats: number;
  isOpen: boolean;
  templeArrivalTime: string;
  returnDepartureTime: string;
  returnArrivalTime: string;
}
