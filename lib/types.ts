export interface Medication {
  id: string
  name: string
  description?: string
  dosage: string
  color?: string // For visual identification (e.g., "red pill")
  format?: "pill" | "cream" | "injection" | "liquid" | "inhaler" | "patch" | "other" // Optional medication format
  notInPillBox?: boolean // True if medication is stored elsewhere (fridge, etc.)
  frequency: "daily" | "multiple" | "as-needed" | "temporary"
  times: string[] // Array of time strings like ["08:00", "20:00"]
  startDate: Date
  endDate?: Date // For temporary medications
  isActive: boolean
  archived?: boolean // True if medication is archived (stays in history but not active)
  reminderEnabled: boolean
  createdAt: Date
}

export interface DoseLog {
  id: string
  medicationId: string
  scheduledTime: Date
  takenTime?: Date
  status: "taken" | "missed" | "pending" | "skipped"
  skipReason?: string // Reason provided when skipping a dose
  pillBoxOpened?: boolean // Hardware integration
  createdAt: Date
}

export interface Streak {
  currentStreak: number
  longestStreak: number
  totalDosesTaken: number
  adherenceRate: number // Percentage
  lastUpdated: Date
}

export interface PillBoxStatus {
  isConnected: boolean
  batteryLevel: number
  lastOpened?: Date
  lastClosed?: Date
  firmwareVersion?: string
}

export type PillBoxStatusType = PillBoxStatus

export interface PillBox {
  id: string
  ownerName: string
  emoji: string // Emoji avatar for visual identification
  medications: Medication[]
  doseLogs: DoseLog[]
  streak: Streak
  hardwareId?: string // Physical pill box device ID
  isActive: boolean
  createdAt: Date
}

export interface FamilyMember {
  id: string
  name: string
  email: string
  joinedAt: Date
  allowedMedications: string[]
  permissions: {
    canMarkDoses: boolean // If false, can only receive notifications
    canViewHistory: boolean
  }
}

export interface TravelDocument {
  id: string
  type: "prescription" | "bottle-label" | "other"
  medicationId?: string
  imageUrl: string
  fileName: string
  uploadedAt: Date
  notes?: string
}

export interface InsightData {
  date: Date
  adherenceRate: number
  dosesTaken: number
  dosesScheduled: number
  averageDelay: number // Minutes late/early
}

export interface InsightSuggestion {
  id: string
  type: "timing" | "consistency" | "streak" | "general"
  medicationId?: string
  message: string
  priority: "low" | "medium" | "high"
  createdAt: Date
}

export interface UserSettings {
  notifications: {
    push: boolean
    sound: boolean
    vibration: boolean
    led: boolean
  }
  travelMode: {
    enabled: boolean
    timezone?: string
    destination?: string
    startDate?: Date
    endDate?: Date
  }
  lockMode: boolean
  theme: "light" | "dark" | "auto"
}
