# ISKCON Halifax Devotee Bus Shuttle 🛕🚌

Web application for managing seat bookings on the dedicated 14-seater devotee bus shuttle service in Halifax, bringing devotees to the ISKCON Halifax Temple.

## Key Features

1. **14-Seater Bus Capacity Management**:
   - Real-time seat tracking preventing overbooking.
   - Interactive visual mini-bus seating layout.
2. **Date Scheduling (Calendar)**:
   - Calendar selector with **November 7, 2026** currently active for bookings.
   - Designed for future trips (future dates displayed with automatic lock/unlock structure).
3. **2 Halifax Pickup Points**:
   - **Stop 1**: Halifax Shopping Centre / Mumford Terminal (4:15 PM departure)
   - **Stop 2**: Dalhousie University / Downtown SUB (4:35 PM departure)
   - Fully customizable in `src/config/appConfig.ts`.
4. **Multi-Passenger Booking Flow**:
   - Primary Booker details (Full name, phone number, email address).
   - Dynamic inputs for each passenger's full name (for 1 to multiple seats).
   - Generates a unique booking reference code (`ISK-261107-XXXX`).
5. **Zeffy Payment Integration**:
   - Directs attendees to complete payment via Zeffy.
   - Prompts attendees to input their Booking Reference for automatic matching.
   - Configurable in `.env` (`VITE_ZEFFY_PAYMENT_URL`).
6. **Driver & Organizer Manifest**:
   - Dedicated driver dashboard (protected by PIN, default: `108`).
   - Real-time passenger list with door check-in ("Boarded" toggle).
   - **1-Click Download CSV**: Generates ready-to-use CSV list for driver / spreadsheet verification.
   - **1-Click Print Manifest**: Clean, high-contrast clipboard-ready driver sheet.
7. **Firebase & Resilient Fallback**:
   - Pre-configured Firestore integration (`bookings` collection).
   - Seamless local storage fallback with sample data so the app runs out-of-the-box before Firebase keys are entered!

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
- Enter PIN: `108` (can be changed in `src/config/appConfig.ts`).
- Filter by pickup stop or search any passenger name.
- Click **"Download CSV for Driver"** to export the list.
