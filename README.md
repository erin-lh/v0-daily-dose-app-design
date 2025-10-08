# DailyDose+ 💊

**Tech Enabled Wellness**

DailyDose+ is a luxury wellness app designed to make medication and vitamin routines effortless. More than just functional, it's a beautiful lifestyle accessory that seamlessly integrates into modern life—whether at home, work, or on the go.

![DailyDose+ Brand](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-08%20at%2010.39.59%E2%80%AFam-p1QrIEt9E9GJDPtqvRlKa7NCzpW52N.png)

## 🌟 Overview

DailyDose+ combines a sleek, app-connected weekly pill organizer with intelligent software to help users maintain consistent medication routines. The app connects to a physical smart pill box with sensors, LED lighting, and fingerprint security to create a complete wellness ecosystem.

### Target Market

- **9 million Australians** take at least one prescription medicine daily (35%+ of population)
- **2 in 3 people over 65** take 5+ daily medications
- **7 in 10 adults** regularly take vitamins
- **88% of Australians** take some form of medication or vitamin each year

### The Problem We Solve

The WHO reports that up to **50% of people do not take medications as prescribed**, leading to billions in preventable healthcare costs globally. DailyDose+ addresses this with a stylish, tech-enabled solution that makes adherence effortless and motivating.

---

## ✨ Features

### Core Functionality (MVP)

#### 📱 Smart Reminders & Notifications
- Pill box LED glow/chime + app/smartwatch nudges
- Customizable reminder times for each medication
- Quiet hours mode for sleep, meetings, or travel
- Friendly, supportive notifications (not clinical alarms)

#### 📊 Adherence Tracking & Streaks
- Timestamped dose logs (e.g., "Monday at 2pm, Tuesday at 7pm")
- Streak tracking with celebratory confetti animations
- Consistency scores and progress visualization
- Motivating rewards system (like Strava for wellness)

#### 💊 Medication Management
- Multi-dose scheduling (supports 1-3+ times per day)
- Temporary medication support (antibiotics, short-term regimens)
- Quick add for supplements from database or free text
- Color identifiers for easy recognition
- Refill reminders when compartments run low

#### 🔗 Hardware Integration
- Real-time pill box connection status
- Battery monitoring with low-battery alerts
- Lid sensor tracking (detects when doses are taken)
- Customizable LED, sound, and vibration alerts
- Test alert functionality

#### 👨‍👩‍👧‍👦 Family & Caregiver Mode
- Generate family access codes
- Allow parents, partners, or carers to monitor adherence remotely
- Family members can mark doses for loved ones
- Limited access (no streak visibility or personal data)
- Exportable reports for doctors or health professionals

#### ✈️ Travel Mode
- Automatic time zone adjustment
- Maintains routine consistency across locations
- Adapts reminder times to local time

#### 🔒 Security & Privacy
- Optional fingerprint unlock for child-proof access
- Secure authentication (Sign in with Apple, Google, or SMS code)
- Privacy-focused design

---

## 🎨 Design System

### Brand Identity

**Tone of Voice:** Supportive, empowering, lifestyle-oriented  
**Personality:** Wellness coach, not doctor  
**Visual Style:** Luxury, minimal, Instagrammable

### Color Palette

\`\`\`css
/* Primary Brand Color */
--sage-green: #88a596;

/* Neutrals */
--white: #ffffff;
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-200: #e5e7eb;
--gray-900: #111827;

/* Semantic Colors */
--success: #10b981;
--warning: #f59e0b;
--error: #ef4444;
\`\`\`

### Typography

**Font Family:** Inter (rounded, modern, Apple-like aesthetic)

\`\`\`css
--font-sans: 'Inter', system-ui, sans-serif;
\`\`\`

**Font Weights:**
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

**Type Scale:**
- Headings: 24px - 32px (bold, tight leading)
- Body: 16px (regular, relaxed leading)
- Small: 14px (medium)
- Tiny: 12px (medium)

### Design Principles

1. **Mobile-First:** Optimized for iPhone with safe area insets
2. **White Space:** Generous padding and spacing for luxury feel
3. **Soft Shadows:** Subtle elevation with soft shadows
4. **Rounded Corners:** 16px-24px border radius for friendly feel
5. **Smooth Animations:** 200-300ms transitions with ease-in-out
6. **Touch Targets:** Minimum 44px height for accessibility

---

## 🛠 Tech Stack

### Frontend Framework
- **Next.js 14+** (App Router)
- **React 18+** with Server Components
- **TypeScript** for type safety

### Styling
- **Tailwind CSS v4** (inline theme configuration)
- **CSS Variables** for design tokens
- **Framer Motion** for animations (confetti, transitions)

### UI Components
- **shadcn/ui** component library
- **Lucide React** for icons
- **Radix UI** primitives for accessibility

### State Management
- **React useState/useEffect** for local state
- **localStorage** for persistence across sessions
- **Context API** ready for global state (future enhancement)

### Future Integrations (Planned)
- **Supabase** for database and authentication
- **Push Notifications** via Firebase or OneSignal
- **Bluetooth API** for hardware connection
- **Health Kit / Google Fit** integration

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser (Chrome, Safari, Firefox)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/yourusername/dailydose-plus.git
cd dailydose-plus
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. **Run the development server**
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. **Open in browser**
\`\`\`
http://localhost:3000
\`\`\`

### Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

---

## 📁 Project Structure

\`\`\`
dailydose-plus/
├── app/
│   ├── page.tsx                    # Login/landing page
│   ├── dashboard/
│   │   └── page.tsx                # Main dashboard (home)
│   ├── medications/
│   │   └── page.tsx                # Medication management
│   ├── device/
│   │   └── page.tsx                # Hardware connection & settings
│   ├── notifications/
│   │   └── page.tsx                # Notification center
│   ├── settings/
│   │   ├── page.tsx                # General settings
│   │   └── family/
│   │       ├── page.tsx            # Family management
│   │       └── [memberId]/
│   │           └── medications/
│   │               └── page.tsx    # Family member medication access
│   ├── family-dashboard/
│   │   └── page.tsx                # Limited dashboard for family members
│   ├── layout.tsx                  # Root layout with fonts
│   └── globals.css                 # Global styles & design tokens
├── components/
│   ├── brand-logo.tsx              # DailyDose+ logo component
│   ├── confetti-celebration.tsx    # Streak celebration animation
│   ├── streak-card.tsx             # Streak tracking display
│   ├── today-schedule.tsx          # Today's medication schedule
│   ├── quick-stats.tsx             # Adherence statistics
│   ├── add-medication-dialog.tsx   # Add/edit medication modal
│   ├── medication-list.tsx         # Medication list display
│   ├── pill-box-status.tsx         # Hardware status widget
│   ├── hardware-settings.tsx       # Hardware configuration
│   ├── notifications-panel.tsx     # Notification list
│   ├── reminder-settings.tsx       # Reminder preferences
│   ├── travel-mode-settings.tsx    # Travel mode configuration
│   ├── general-settings.tsx        # App preferences
│   └── account-settings.tsx        # User account management
├── lib/
│   ├── types.ts                    # TypeScript type definitions
│   ├── mock-data.ts                # Mock data for development
│   └── utils.ts                    # Utility functions (cn, etc.)
└── public/
    └── images/                     # Static assets
\`\`\`

---

## 🔑 Key Components

### Authentication Flow

**Location:** `app/page.tsx`

The login page offers two paths:

1. **For Myself** - Full access to personal medication tracking
   - Sign in with Apple (black button)
   - Sign in with Google (white button with logo)
   - SMS code verification (phone number input)

2. **Join Family** - Limited caregiver access
   - Enter family code
   - Mark doses for loved ones
   - No access to streaks or personal data

\`\`\`tsx
// Example: Login mode selection
const [mode, setMode] = useState<"select" | "myself" | "family">("select")
\`\`\`

### Dashboard

**Location:** `app/dashboard/page.tsx`

The main dashboard displays:
- Current streak with confetti celebration on tap
- Today's medication schedule with mark-as-taken functionality
- Quick stats (consistency rate, doses this week)
- Add medication button

\`\`\`tsx
// Example: Medication state management
const [medications, setMedications] = useState<Medication[]>([])

useEffect(() => {
  const stored = localStorage.getItem("dailydose_medications")
  if (stored) setMedications(JSON.parse(stored))
}, [])
\`\`\`

### Medication Management

**Location:** `app/medications/page.tsx`

Full CRUD operations for medications:
- Add new medications with name, dosage, frequency, times
- Edit existing medications
- Delete medications
- Color coding for easy identification
- Temporary medication support (end date)

### Hardware Integration

**Location:** `app/device/page.tsx`

Monitors and controls the physical pill box:
- Connection status (connected/disconnected)
- Battery level with charging indicator
- Last activity timestamp
- Test alert functionality (LED, sound, vibration)
- Hardware settings (brightness, volume, vibration intensity)

### Family Management

**Location:** `app/settings/family/page.tsx`

Caregiver access control:
- Generate unique family code
- View family members list
- Manage medication access per member
- Remove family members
- Export adherence reports

---

## 💾 State Management

### Local Storage Schema

**Medications:**
\`\`\`typescript
interface Medication {
  id: string
  name: string
  dosage: string
  frequency: "daily" | "twice-daily" | "three-times-daily" | "as-needed"
  times: string[]
  color: string
  notes?: string
  isTemporary?: boolean
  endDate?: string
}

// Storage key: "dailydose_medications"
\`\`\`

**Dose History:**
\`\`\`typescript
interface DoseLog {
  medicationId: string
  timestamp: string
  marked: boolean
}

// Storage key: "dailydose_dose_history"
\`\`\`

**User Preferences:**
\`\`\`typescript
interface UserSettings {
  notifications: boolean
  quietHours: { start: string; end: string }
  travelMode: boolean
  theme: "light" | "dark"
}

// Storage key: "dailydose_settings"
\`\`\`

---

## 🎯 User Flows

### 1. First-Time User Setup

\`\`\`
Login Page → Select "For Myself" → Choose Auth Method → 
Dashboard → Add First Medication → Set Reminder Times → 
Connect Pill Box → Complete Setup
\`\`\`

### 2. Daily Medication Routine

\`\`\`
Receive Notification → Open App → View Today's Schedule → 
Mark Dose as Taken → See Confetti Celebration → 
Check Streak Progress
\`\`\`

### 3. Family Member Access

\`\`\`
Receive Family Code → Login Page → Select "Join Family" → 
Enter Code → Family Dashboard → View Assigned Medications → 
Mark Dose for Loved One → Confirmation
\`\`\`

### 4. Travel Mode

\`\`\`
Settings → Travel Mode → Enable → Enter Destination Timezone → 
App Auto-Adjusts Reminder Times → Maintain Consistency
\`\`\`

---

## 🎨 Design Patterns

### Wellness-Focused Copy

Replace clinical language with supportive, lifestyle-oriented messaging:

❌ **Clinical:** "Dose adherence rate"  
✅ **Wellness:** "Routine consistency"

❌ **Clinical:** "Medication compliance"  
✅ **Wellness:** "Stay on track"

❌ **Clinical:** "Take your pills"  
✅ **Wellness:** "Time for your wellness routine"

### Animation Guidelines

**Confetti Celebration:**
- Triggers when user taps streak card
- 50 particles with sage green and white colors
- 3-second duration with gravity effect
- Smooth fade-out

**Transitions:**
- Page transitions: 200ms ease-in-out
- Button hover: 150ms ease-in-out
- Modal open/close: 300ms ease-in-out
- Slide-up animations: 400ms ease-out

### Accessibility

- Minimum 44px touch targets
- WCAG AA contrast ratios (4.5:1 for text)
- Semantic HTML elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly

---

## 🔌 Hardware Integration (Future)

### Pill Box Specifications

**Physical Design:**
- 7-day organizer (Mon-Sun compartments)
- Slim, handbag-friendly (glasses case size)
- Matte finish (black, white, olive green, beige)
- Magnetic-close lids with sensors

**Smart Features:**
- Lid sensors detect when dose is taken
- Edge LED ring (pulses at reminder times)
- USB-C rechargeable (1-2 weeks per charge)
- Optional fingerprint unlock
- Bluetooth 5.0 connectivity

**App Communication:**
\`\`\`typescript
interface PillBoxStatus {
  connected: boolean
  batteryLevel: number
  charging: boolean
  lastActivity: string
  firmwareVersion: string
}

// Bluetooth API integration (planned)
navigator.bluetooth.requestDevice({
  filters: [{ services: ['dailydose-service'] }]
})
\`\`\`

---

## 📊 Business Model

**Retail Price:** $149 AUD  
**Target Market:** 9M+ daily medication users in Australia  
**Revenue Streams:**
- Direct-to-consumer sales
- Retail partnerships (pharmacies, wellness stores)
- Future subscription features (premium analytics, family plans)

**Break-Even:** 9,600 units  
**12-Month Target:** 10,000-20,000 units

---

## 🚧 Roadmap

### Phase 1: MVP (Current)
- ✅ Core UI/UX design
- ✅ Medication management
- ✅ Streak tracking
- ✅ Family access system
- ✅ Mock hardware integration

### Phase 2: Backend Integration (Next)
- [ ] Supabase authentication
- [ ] Database for medication storage
- [ ] Push notifications
- [ ] User accounts and profiles
- [ ] Cloud sync across devices

### Phase 3: Hardware Connection
- [ ] Bluetooth API integration
- [ ] Real-time pill box communication
- [ ] Battery monitoring
- [ ] Lid sensor event handling
- [ ] LED/sound/vibration control

### Phase 4: Advanced Features
- [ ] Health Kit / Google Fit integration
- [ ] Medication interaction warnings
- [ ] Pharmacy integration for refills
- [ ] AI-powered adherence insights
- [ ] Gamification enhancements

### Phase 5: Scale
- [ ] Multi-language support
- [ ] International markets
- [ ] Prescription import via photo
- [ ] Telehealth integration
- [ ] Insurance partnerships

---

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Login page displays correctly
- [ ] "For Myself" flow works
- [ ] "Join Family" flow works
- [ ] Auth buttons are styled correctly

**Medication Management:**
- [ ] Add medication saves to localStorage
- [ ] Medications appear in list immediately
- [ ] Edit medication updates correctly
- [ ] Delete medication removes from list
- [ ] Medications persist after page refresh

**Dashboard:**
- [ ] Streak displays correctly
- [ ] Confetti triggers on streak tap
- [ ] Today's schedule shows medications
- [ ] Mark as taken updates status
- [ ] Quick stats calculate correctly

**Navigation:**
- [ ] All back buttons go to dashboard
- [ ] Bottom navigation works
- [ ] Settings pages accessible
- [ ] Family management accessible

**Hardware:**
- [ ] Device status displays
- [ ] Battery indicator shows
- [ ] Test alerts work (mock)
- [ ] Settings save correctly

---

## 🤝 Contributing

### Development Guidelines

1. **Code Style:**
   - Use TypeScript for all new files
   - Follow existing component patterns
   - Use Tailwind classes (avoid arbitrary values)
   - Keep components small and focused

2. **Naming Conventions:**
   - Components: PascalCase (e.g., `MedicationList.tsx`)
   - Files: kebab-case (e.g., `add-medication-dialog.tsx`)
   - Functions: camelCase (e.g., `handleAddMedication`)
   - Constants: UPPER_SNAKE_CASE (e.g., `MAX_MEDICATIONS`)

3. **Component Structure:**
\`\`\`tsx
"use client" // if needed

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ComponentProps {
  // props
}

export function ComponentName({ prop }: ComponentProps) {
  // hooks
  // handlers
  // render
}
\`\`\`

4. **Commit Messages:**
   - Use conventional commits format
   - Examples: `feat: add medication export`, `fix: streak calculation`, `docs: update README`

---

## 📄 License

Copyright © 2025 DailyDose+. All rights reserved.

---

## 📞 Support

For questions or support, please contact:
- Email: support@dailydoseplus.com
- Website: https://dailydoseplus.com

---

## 🙏 Acknowledgments

- Design inspiration from Apple, Strava, and modern wellness apps
- shadcn/ui for beautiful, accessible components
- Vercel for hosting and deployment platform
- The wellness community for feedback and support

---

**Built with ❤️ for better health outcomes**
