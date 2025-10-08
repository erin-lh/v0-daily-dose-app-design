# DailyDose+ Technical Architecture

## 🏗 System Overview

DailyDose+ is built as a **mobile-first Progressive Web App (PWA)** using Next.js 14+ with the App Router. The architecture is designed for future scalability while maintaining simplicity in the MVP phase.

---

## 📊 Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│  (Next.js App Router + React Server Components)         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Client State Layer                     │
│  (React useState + localStorage for persistence)        │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Component Library                       │
│         (shadcn/ui + Custom Components)                  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                   Future: Backend API                    │
│  (Supabase for Auth, Database, Real-time subscriptions) │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Future: Hardware Integration                │
│         (Bluetooth API for Pill Box Connection)         │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## 🗂 Data Flow

### Current (MVP) - Client-Side Only

\`\`\`
User Action → Component Handler → State Update → 
localStorage Write → UI Re-render
\`\`\`

**Example: Adding a Medication**

1. User fills form in `AddMedicationDialog`
2. Clicks "Add Medication" button
3. `handleAddMedication` function called
4. New medication object created with unique ID
5. State updated: `setMedications([...medications, newMed])`
6. localStorage updated: `localStorage.setItem("dailydose_medications", JSON.stringify(updatedMeds))`
7. Dialog closes, UI shows new medication in list

### Future - Full Stack

\`\`\`
User Action → Component Handler → API Request → 
Database Write → Real-time Subscription → 
UI Update Across All Devices
\`\`\`

---

## 🗄 Data Models

### Medication

\`\`\`typescript
interface Medication {
  id: string                    // UUID
  name: string                  // e.g., "Vitamin D"
  dosage: string                // e.g., "1000 IU"
  frequency: MedicationFrequency
  times: string[]               // e.g., ["08:00", "20:00"]
  color: string                 // Hex color for identification
  notes?: string                // Optional user notes
  isTemporary?: boolean         // For short-term medications
  endDate?: string              // ISO date string
  createdAt: string             // ISO timestamp
  userId?: string               // Future: link to user account
}

type MedicationFrequency = 
  | "daily" 
  | "twice-daily" 
  | "three-times-daily" 
  | "as-needed"
\`\`\`

### Dose Log

\`\`\`typescript
interface DoseLog {
  id: string                    // UUID
  medicationId: string          // Foreign key to Medication
  scheduledTime: string         // ISO timestamp
  takenTime?: string            // ISO timestamp (when marked)
  status: DoseStatus
  method: "manual" | "sensor"   // How it was logged
  userId?: string               // Future: link to user account
}

type DoseStatus = "pending" | "taken" | "missed" | "skipped"
\`\`\`

### User Settings

\`\`\`typescript
interface UserSettings {
  userId: string
  notifications: {
    enabled: boolean
    sound: boolean
    vibration: boolean
    smartwatch: boolean
  }
  quietHours: {
    enabled: boolean
    start: string               // e.g., "22:00"
    end: string                 // e.g., "07:00"
  }
  travelMode: {
    enabled: boolean
    timezone?: string           // e.g., "America/New_York"
  }
  theme: "light" | "dark" | "system"
  language: string              // e.g., "en-US"
}
\`\`\`

### Hardware Status

\`\`\`typescript
interface PillBoxStatus {
  deviceId: string
  connected: boolean
  batteryLevel: number          // 0-100
  charging: boolean
  lastActivity: string          // ISO timestamp
  firmwareVersion: string
  settings: {
    ledBrightness: number       // 0-100
    soundVolume: number         // 0-100
    vibrationIntensity: number  // 0-100
    lockEnabled: boolean
  }
}
\`\`\`

### Family Member

\`\`\`typescript
interface FamilyMember {
  id: string
  name: string
  email?: string
  phone?: string
  relationship: string          // e.g., "Parent", "Spouse", "Caregiver"
  accessLevel: "view" | "mark"  // Permissions
  allowedMedications: string[]  // Array of medication IDs
  joinedAt: string              // ISO timestamp
  invitedBy: string             // User ID
}
\`\`\`

---

## 🔐 Authentication Strategy

### Current (MVP) - Mock Authentication

\`\`\`typescript
// Simple mode-based routing
const [mode, setMode] = useState<"select" | "myself" | "family">("select")

// No real authentication, just UI flow
if (mode === "myself") {
  router.push("/dashboard")
} else if (mode === "family") {
  router.push("/family-dashboard")
}
\`\`\`

### Future - Real Authentication

**Providers:**
1. **Sign in with Apple** - Native iOS integration
2. **Sign in with Google** - OAuth 2.0
3. **SMS Code** - Phone number verification via Twilio/Supabase

**Implementation with Supabase:**

\`\`\`typescript
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Sign in with Apple
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "apple",
  options: {
    redirectTo: `${window.location.origin}/dashboard`
  }
})

// Sign in with Google
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${window.location.origin}/dashboard`
  }
})

// SMS Code
const { data, error } = await supabase.auth.signInWithOtp({
  phone: "+61412345678",
  options: {
    channel: "sms"
  }
})
\`\`\`

**Session Management:**
- JWT tokens stored in httpOnly cookies
- Automatic token refresh
- Middleware for protected routes

---

## 💾 State Management

### Current Approach - Local State + localStorage

**Pros:**
- Simple and fast for MVP
- No backend required
- Works offline by default
- Easy to debug

**Cons:**
- No sync across devices
- Data lost if localStorage cleared
- No real-time updates
- Limited to single browser

**Implementation:**

\`\`\`typescript
// Custom hook for persistent state
function usePersistentState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState] as const
}

// Usage
const [medications, setMedications] = usePersistentState<Medication[]>(
  "dailydose_medications",
  []
)
\`\`\`

### Future Approach - Global State + Database

**Options:**

1. **React Context API** (for simple global state)
\`\`\`typescript
const MedicationContext = createContext<MedicationContextType | null>(null)

export function MedicationProvider({ children }: { children: ReactNode }) {
  const [medications, setMedications] = useState<Medication[]>([])
  
  // Sync with Supabase
  useEffect(() => {
    const subscription = supabase
      .channel("medications")
      .on("postgres_changes", { 
        event: "*", 
        schema: "public", 
        table: "medications" 
      }, handleChange)
      .subscribe()
    
    return () => subscription.unsubscribe()
  }, [])
  
  return (
    <MedicationContext.Provider value={{ medications, setMedications }}>
      {children}
    </MedicationContext.Provider>
  )
}
\`\`\`

2. **Zustand** (for more complex state)
\`\`\`typescript
import create from "zustand"

interface MedicationStore {
  medications: Medication[]
  addMedication: (med: Medication) => void
  updateMedication: (id: string, updates: Partial<Medication>) => void
  deleteMedication: (id: string) => void
}

export const useMedicationStore = create<MedicationStore>((set) => ({
  medications: [],
  addMedication: (med) => set((state) => ({ 
    medications: [...state.medications, med] 
  })),
  updateMedication: (id, updates) => set((state) => ({
    medications: state.medications.map(m => 
      m.id === id ? { ...m, ...updates } : m
    )
  })),
  deleteMedication: (id) => set((state) => ({
    medications: state.medications.filter(m => m.id !== id)
  }))
}))
\`\`\`

---

## 🔌 API Design (Future)

### RESTful Endpoints

\`\`\`
POST   /api/auth/login              # Authenticate user
POST   /api/auth/logout             # End session
GET    /api/auth/me                 # Get current user

GET    /api/medications             # List all medications
POST   /api/medications             # Create medication
GET    /api/medications/:id         # Get single medication
PATCH  /api/medications/:id         # Update medication
DELETE /api/medications/:id         # Delete medication

GET    /api/doses                   # List dose logs
POST   /api/doses                   # Log a dose
GET    /api/doses/history           # Get adherence history
GET    /api/doses/streak            # Calculate current streak

GET    /api/family                  # List family members
POST   /api/family/invite           # Invite family member
DELETE /api/family/:id              # Remove family member
PATCH  /api/family/:id/permissions  # Update permissions

GET    /api/device/status           # Get pill box status
POST   /api/device/test-alert       # Trigger test alert
PATCH  /api/device/settings         # Update device settings
\`\`\`

### Real-time Subscriptions (Supabase)

\`\`\`typescript
// Subscribe to medication changes
supabase
  .channel("medications")
  .on("postgres_changes", {
    event: "*",
    schema: "public",
    table: "medications",
    filter: `user_id=eq.${userId}`
  }, (payload) => {
    console.log("Medication changed:", payload)
    // Update local state
  })
  .subscribe()

// Subscribe to dose logs (for family members)
supabase
  .channel("dose_logs")
  .on("postgres_changes", {
    event: "INSERT",
    schema: "public",
    table: "dose_logs",
    filter: `user_id=eq.${lovedOneId}`
  }, (payload) => {
    // Notify family member
    showNotification("Dose taken by loved one")
  })
  .subscribe()
\`\`\`

---

## 🔔 Notification System (Future)

### Push Notifications

**Service Worker Registration:**

\`\`\`typescript
// public/sw.js
self.addEventListener("push", (event) => {
  const data = event.data.json()
  
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icon-192.png",
    badge: "/badge-72.png",
    tag: "medication-reminder",
    requireInteraction: true,
    actions: [
      { action: "mark-taken", title: "Mark as Taken" },
      { action: "snooze", title: "Snooze 15 min" }
    ]
  })
})

self.addEventListener("notificationclick", (event) => {
  if (event.action === "mark-taken") {
    // API call to mark dose as taken
  } else if (event.action === "snooze") {
    // Reschedule notification
  }
})
\`\`\`

**Scheduling:**

\`\`\`typescript
// Schedule daily reminders
medications.forEach(med => {
  med.times.forEach(time => {
    scheduleNotification({
      title: "Time for your wellness routine",
      body: `${med.name} - ${med.dosage}`,
      time: time,
      repeat: med.frequency
    })
  })
})
\`\`\`

---

## 📱 Hardware Integration (Future)

### Bluetooth Connection

\`\`\`typescript
// Request device
const device = await navigator.bluetooth.requestDevice({
  filters: [{ services: ["dailydose-service-uuid"] }],
  optionalServices: ["battery-service"]
})

// Connect to GATT server
const server = await device.gatt.connect()

// Get services
const service = await server.getPrimaryService("dailydose-service-uuid")

// Subscribe to lid sensor notifications
const lidCharacteristic = await service.getCharacteristic("lid-sensor-uuid")
await lidCharacteristic.startNotifications()

lidCharacteristic.addEventListener("characteristicvaluechanged", (event) => {
  const value = event.target.value
  const compartment = value.getUint8(0) // 0-6 for Mon-Sun
  const opened = value.getUint8(1) === 1
  
  if (opened) {
    // Log dose as taken
    logDose(compartment)
  }
})

// Control LED
const ledCharacteristic = await service.getCharacteristic("led-control-uuid")
await ledCharacteristic.writeValue(new Uint8Array([brightness, r, g, b]))
\`\`\`

### Battery Monitoring

\`\`\`typescript
const batteryService = await server.getPrimaryService("battery_service")
const batteryCharacteristic = await batteryService.getCharacteristic("battery_level")

const batteryLevel = await batteryCharacteristic.readValue()
const level = batteryLevel.getUint8(0) // 0-100

if (level < 20) {
  showNotification("Pill box battery low. Please charge soon.")
}
\`\`\`

---

## 🧪 Testing Strategy

### Unit Tests (Jest + React Testing Library)

\`\`\`typescript
// components/__tests__/AddMedicationDialog.test.tsx
import { render, screen, fireEvent } from "@testing-library/react"
import { AddMedicationDialog } from "../add-medication-dialog"

describe("AddMedicationDialog", () => {
  it("calls onAdd with correct data when form is submitted", () => {
    const onAdd = jest.fn()
    render(<AddMedicationDialog open={true} onAdd={onAdd} />)
    
    fireEvent.change(screen.getByLabelText("Medication Name"), {
      target: { value: "Vitamin D" }
    })
    fireEvent.change(screen.getByLabelText("Dosage"), {
      target: { value: "1000 IU" }
    })
    fireEvent.click(screen.getByText("Add Medication"))
    
    expect(onAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Vitamin D",
        dosage: "1000 IU"
      })
    )
  })
})
\`\`\`

### Integration Tests (Playwright)

\`\`\`typescript
// e2e/medication-flow.spec.ts
import { test, expect } from "@playwright/test"

test("user can add and view medication", async ({ page }) => {
  await page.goto("/dashboard")
  
  // Click add medication
  await page.click("text=Add Medication")
  
  // Fill form
  await page.fill('input[name="name"]', "Vitamin D")
  await page.fill('input[name="dosage"]', "1000 IU")
  await page.selectOption('select[name="frequency"]', "daily")
  
  // Submit
  await page.click("text=Add Medication")
  
  // Verify it appears in list
  await expect(page.locator("text=Vitamin D")).toBeVisible()
  await expect(page.locator("text=1000 IU")).toBeVisible()
})
\`\`\`

---

## 🚀 Deployment

### Vercel (Recommended)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
\`\`\`

**Environment Variables:**
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
\`\`\`

### Performance Optimizations

1. **Image Optimization:** Use Next.js `<Image>` component
2. **Code Splitting:** Automatic with App Router
3. **Font Optimization:** Use `next/font` for Inter
4. **Caching:** Leverage Vercel Edge Network
5. **Analytics:** Vercel Analytics for performance monitoring

---

## 📈 Scalability Considerations

### Database Indexing (Future)

\`\`\`sql
-- Index on user_id for fast medication lookups
CREATE INDEX idx_medications_user_id ON medications(user_id);

-- Index on medication_id and scheduled_time for dose logs
CREATE INDEX idx_dose_logs_med_time ON dose_logs(medication_id, scheduled_time);

-- Index on user_id and status for pending doses
CREATE INDEX idx_dose_logs_user_status ON dose_logs(user_id, status);
\`\`\`

### Caching Strategy

\`\`\`typescript
// Redis cache for frequently accessed data
const cachedMedications = await redis.get(`medications:${userId}`)

if (cachedMedications) {
  return JSON.parse(cachedMedications)
}

const medications = await db.medications.findMany({ where: { userId } })
await redis.set(`medications:${userId}`, JSON.stringify(medications), "EX", 3600)

return medications
\`\`\`

### Rate Limiting

\`\`\`typescript
// Protect API endpoints
import rateLimit from "express-rate-limit"

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

app.use("/api/", limiter)
\`\`\`

---

**Last Updated:** January 2025  
**Version:** 1.0.0
