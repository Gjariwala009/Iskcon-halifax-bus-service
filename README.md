# ISKCON Halifax Devotee Bus Shuttle 🛕🚌

Web application for managing seat bookings on the dedicated 14-seater devotee bus shuttle service in Halifax, bringing devotees to the ISKCON Halifax Temple (29 Westwood Blvd, Upper Tantallon, NS B3M 1G5).

## Key Features

1. **Direct One-Step Zeffy Ticketing**:
   - Embedded Zeffy checkout right on the home page.
   - Devotees select ticket quantity, enter passenger details, and choose their pickup stop directly in Zeffy without filling out duplicate forms.
   - 100% of contributions go to ISKCON Halifax with zero platform transaction fees.
2. **2 Halifax Pickup & Drop-off Points**:
   - **Stop 1**: Mumford Terminal (Pickup: 3:15 PM | Return drop-off: 9:00 PM)
   - **Stop 2**: Lacewood Terminal (Pickup: 3:30 PM | Return drop-off: 8:45 PM)
   - **Temple Destination**: 29 Westwood Blvd, Upper Tantallon (Arrival & Darshan: 4:00 PM | Program: 5:00 PM | Return departure: 8:15 PM)
   - Fully customizable in `src/config/appConfig.ts`.
3. **Trip Details & Visual Route Timeline**:
   - Complete outbound & return schedule displayed prominently.
   - Clear arrival timing for early Darshan and association before the 5:00 PM festival program.
4. **Organizer Passenger Management**:
   - Organizers log into Zeffy (`zeffy.com`) to view real-time attendee lists, download Excel/CSV, or check in passengers at boarding.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Connecting Firebase

1. Create a project in [Firebase Console](https://console.firebase.google.com/).
2. Create a **Firestore Database** in test or production mode.
3. Create a **Web App** in project settings and copy your config.
4. Copy `.env.example` to `.env` and fill in your keys:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef

# Zeffy Payment Link (Update when available)
VITE_ZEFFY_PAYMENT_URL=https://www.zeffy.com/en-CA/ticketing/...
```

Once `.env` is configured, the application automatically switches to live Firebase Firestore.

---

## Driver Manifest Access
- Click **"Driver & Admin Manifest"** in the top navigation bar.
- Enter PIN: `1471` (can be changed in `src/config/appConfig.ts`).
- Filter by pickup stop or search any passenger name.
- Click **"Download CSV for Driver"** to export the list.
