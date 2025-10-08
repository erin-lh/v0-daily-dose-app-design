export interface Medication {
  id: string
  name: string
  description?: string
  dosage: string
  color?: string // For visual identification (e.g., "red pill")
  frequency: "daily" | "multiple" | "as-needed" | "temporary"
  times: string[] // Array of time strings like ["08:00", "20:00"]
  startDate: Date
  endDate?: Date // For temporary medications
  isActive: boolean
  reminderEnabled: boolean
  createdAt: Date
}

export interface DoseLog {
  id: string
  medicationId: string
  scheduledTime: Date
  takenTime?: Date
  status: "taken" | "missed" | "pending" | "skipped"
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
  }
  lockMode: boolean
  theme: "light" | "dark" | "auto"
}
