import { PickupPoint, ScheduledTrip } from '../types';

export const APP_CONFIG = {
  appName: 'ISKCON Halifax Devotee Bus Shuttle',
  templeName: 'ISKCON Halifax',
  templeAddress: 'ISKCON Halifax Temple, Halifax, NS',
  templeSchedule: {
    kirtan: '5:00 PM',
    discourse: '5:45 PM',
    gauraAarti: '6:30 PM',
    prasadamFeast: '7:15 PM',
  },
  busCapacity: 14, // 14-seater bus
  driverPin: '108', // Default driver PIN for admin manifest access
  
  // Zeffy payment link (can be overridden via VITE_ZEFFY_PAYMENT_URL env var)
  zeffyPaymentUrl: import.meta.env.VITE_ZEFFY_PAYMENT_URL || 'https://www.zeffy.com/en-CA/ticketing/iskcon-halifax-bus-nov7',
  
  // Support contact
  supportPhone: '+1 (902) 000-0000',
  supportEmail: 'iskconhalifax@gmail.com',

  // 2 Halifax Pickup Points
  pickupPoints: [
    {
      id: 'mumford-terminal',
      name: 'Pickup Point 1: Halifax Shopping Centre / Mumford Terminal',
      shortName: 'Mumford Terminal (Halifax Shopping Centre)',
      address: '7001 Mumford Rd, Halifax, NS (Near Halifax Shopping Centre Terminal)',
      pickupTime: '4:15 PM',
      landmark: 'Near the Mumford Bus Terminal entrance / Sobeys parking edge',
      description: 'Convenient central west-end connection point with ample public transit links.',
    },
    {
      id: 'dalhousie-sub',
      name: 'Pickup Point 2: Dalhousie University / Downtown Halifax',
      shortName: 'Dalhousie SUB (University Ave)',
      address: '6136 University Ave, Halifax, NS (In front of Dalhousie Student Union Building)',
      pickupTime: '4:35 PM',
      landmark: 'Main loop in front of Student Union Building (SUB)',
      description: 'Ideal for students, downtown residents, and South End devotees.',
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
      templeArrivalTime: '5:00 PM',
      returnDepartureTime: '8:15 PM',
      returnArrivalTime: '8:50 PM',
    },
    {
      date: '2026-11-14',
      displayDate: 'Saturday, November 14, 2026',
      occasion: 'Saturday Kirtan & Prasadam Festival',
      totalSeats: 14,
      isOpen: false,
      templeArrivalTime: '5:00 PM',
      returnDepartureTime: '8:15 PM',
      returnArrivalTime: '8:50 PM',
    },
    {
      date: '2026-11-21',
      displayDate: 'Saturday, November 21, 2026',
      occasion: 'Saturday Spiritual Discourse & Feast',
      totalSeats: 14,
      isOpen: false,
      templeArrivalTime: '5:00 PM',
      returnDepartureTime: '8:15 PM',
      returnArrivalTime: '8:50 PM',
    },
    {
      date: '2026-11-28',
      displayDate: 'Saturday, November 28, 2026',
      occasion: 'Special Monthly Devotee Gathering',
      totalSeats: 14,
      isOpen: false,
      templeArrivalTime: '5:00 PM',
      returnDepartureTime: '8:15 PM',
      returnArrivalTime: '8:50 PM',
    },
  ] as ScheduledTrip[],
};
