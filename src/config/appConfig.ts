import { PickupPoint, ScheduledTrip } from '../types';

export const APP_CONFIG = {
  appName: 'ISKCON Halifax Devotee Bus Shuttle',
  templeName: 'ISKCON Halifax',
  templeAddress: '29 Westwood Blvd, Upper Tantallon, NS B3M 1G5',
  templeSchedule: {
    arrivalAndDarshan: '4:00 PM',
    kirtan: '5:00 PM',
    discourse: '5:45 PM',
    gauraAarti: '6:30 PM',
    prasadamFeast: '7:15 PM',
  },
  busCapacity: 14, // 14-seater bus
  driverPin: '1471', // Driver PIN for admin manifest access
  
  // Zeffy payment and embed links
  zeffyPaymentUrl: import.meta.env.VITE_ZEFFY_PAYMENT_URL || 'https://www.zeffy.com/en-CA/ticketing/iskcon-halifax-devotee-bus-shuttle',
  zeffyEmbedUrl: import.meta.env.VITE_ZEFFY_EMBED_URL || 'https://www.zeffy.com/embed/ticketing/iskcon-halifax-devotee-bus-shuttle',
  
  // Support contact
  supportPhone: '+1 (902) 000-0000',
  supportEmail: 'iskconhalifax@gmail.com',

  // Child & Family Seating Policy
  childSeatPolicy: {
    title: 'Child & Booster Seat Policy',
    costSummary: 'Same ticket cost as adult seats',
    keyNote: 'Every child occupies an individual seat (14 seats max) and must be seated in an appropriate car seat or booster seat just like in a car. No lap seating allowed.',
    points: [
      {
        title: 'Individual Ticket Required',
        description: 'Because shuttle capacity is strictly limited to 14 seats, every child/infant requires their own reserved ticket at the regular contribution amount.',
      },
      {
        title: 'Car & Booster Seat Safety',
        description: 'Children must be seated following Nova Scotia vehicle safety laws—the same as in a personal car (rear-facing, forward-facing child seat, or booster seat based on age/weight).',
      },
      {
        title: 'Parents Must Bring Child Seats',
        description: 'Parents or guardians are responsible for bringing and securing their child\'s certified car seat or booster seat on the bus.',
      },
      {
        title: 'Strictly No Lap Seating',
        description: 'For safety, passenger comfort, and vehicle insurance compliance, children cannot be seated on adult laps.',
      },
    ],
    passengerAgeCategories: [
      { label: 'Adult (14+ years)', description: 'Standard vehicle seatbelt' },
      { label: 'Child (9 – 13 years)', description: 'Standard vehicle seatbelt' },
      { label: 'Child (Under 9 years) — Passenger will bring Booster / Car Seat', description: 'Required by Nova Scotia law' },
    ],
  },

  // 2 Halifax Pickup Points
  pickupPoints: [
    {
      id: 'mumford-terminal',
      name: 'Pickup Point 1: Mumford Terminal',
      shortName: 'Mumford Terminal',
      address: '7001 Mumford Rd, Halifax, NS (Near Halifax Shopping Centre Terminal)',
      pickupTime: '3:15 PM',
      dropOffTime: '9:00 PM',
      landmark: 'Near the Mumford Bus Terminal entrance / Sobeys parking edge',
      description: 'Convenient central west-end connection point with ample public transit links.',
    },
    {
      id: 'lacewood-terminal',
      name: 'Pickup Point 2: Lacewood Terminal',
      shortName: 'Lacewood Terminal',
      address: '320 Lacewood Drive, Halifax, NS (Near Canada Games Centre)',
      pickupTime: '3:30 PM',
      dropOffTime: '8:45 PM',
      landmark: 'Main transit loop near the shelter / Canada Games Centre',
      description: 'Convenient Clayton Park and Mainland North connection point with Park & Ride options.',
    },
  ] as PickupPoint[],

  // Scheduled dates (Nov 7, 2026 is currently the only open date)
  scheduledTrips: [
    {
      date: '2026-11-07',
      displayDate: 'Saturday, November 7, 2026',
      occasion: 'Grand Saturday Devotee Gathering & Feast',
      totalSeats: 14,
      isOpen: true,
      templeArrivalTime: '4:00 PM',
      returnDepartureTime: '8:15 PM',
      returnArrivalTime: '8:45 PM (Lacewood) / 9:00 PM (Mumford)',
    },
    {
      date: '2026-11-14',
      displayDate: 'Saturday, November 14, 2026',
      occasion: 'Saturday Kirtan & Prasadam Festival',
      totalSeats: 14,
      isOpen: false,
      templeArrivalTime: '4:00 PM',
      returnDepartureTime: '8:15 PM',
      returnArrivalTime: '8:45 PM (Lacewood) / 9:00 PM (Mumford)',
    },
    {
      date: '2026-11-21',
      displayDate: 'Saturday, November 21, 2026',
      occasion: 'Saturday Spiritual Discourse & Feast',
      totalSeats: 14,
      isOpen: false,
      templeArrivalTime: '4:00 PM',
      returnDepartureTime: '8:15 PM',
      returnArrivalTime: '8:45 PM (Lacewood) / 9:00 PM (Mumford)',
    },
    {
      date: '2026-11-28',
      displayDate: 'Saturday, November 28, 2026',
      occasion: 'Special Monthly Devotee Gathering',
      totalSeats: 14,
      isOpen: false,
      templeArrivalTime: '4:00 PM',
      returnDepartureTime: '8:15 PM',
      returnArrivalTime: '8:45 PM (Lacewood) / 9:00 PM (Mumford)',
    },
  ] as ScheduledTrip[],
};
