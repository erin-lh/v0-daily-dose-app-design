import type { Medication, DoseLog, Streak, PillBoxStatus } from "./types"

export const mockMedications: Medication[] = [
  {
    id: "1",
    name: "Vitamin D",
    description: "Daily supplement",
    dosage: "1000 IU",
    color: "yellow",
    frequency: "daily",
    times: ["08:00"],
    startDate: new Date("2025-01-01"),
    isActive: true,
    reminderEnabled: true,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "2",
    name: "Omega-3",
    description: "Fish oil supplement",
    dosage: "1200mg",
    color: "orange",
    frequency: "daily",
    times: ["08:00"],
    startDate: new Date("2025-01-01"),
    isActive: true,
    reminderEnabled: true,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "3",
    name: "Blood Pressure Med",
    dosage: "10mg",
    color: "white",
    frequency: "multiple",
    times: ["08:00", "20:00"],
    startDate: new Date("2025-01-01"),
    isActive: true,
    reminderEnabled: true,
    createdAt: new Date("2025-01-01"),
  },
]

export const mockStreak: Streak = {
  currentStreak: 12,
  longestStreak: 28,
  totalDosesTaken: 156,
  adherenceRate: 94.5,
  lastUpdated: new Date(),
}

export const mockPillBoxStatus: PillBoxStatus = {
  isConnected: true,
  batteryLevel: 78,
  lastOpened: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  lastClosed: new Date(Date.now() - 1000 * 60 * 29),
  firmwareVersion: "1.2.4",
}

export const mockDoseLogs: DoseLog[] = [
  {
    id: "1",
    medicationId: "1",
    scheduledTime: new Date(new Date().setHours(8, 0, 0, 0)),
    takenTime: new Date(new Date().setHours(8, 5, 0, 0)),
    status: "taken",
    pillBoxOpened: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    medicationId: "2",
    scheduledTime: new Date(new Date().setHours(8, 0, 0, 0)),
    takenTime: new Date(new Date().setHours(8, 5, 0, 0)),
    status: "taken",
    pillBoxOpened: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    medicationId: "3",
    scheduledTime: new Date(new Date().setHours(8, 0, 0, 0)),
    status: "pending",
    createdAt: new Date(),
  },
]
