import type {
  Medication,
  DoseLog,
  Streak,
  PillBoxStatus,
  PillBox,
  TravelDocument,
  InsightData,
  InsightSuggestion,
} from "./types"

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

export const mockPillBoxes: PillBox[] = [
  {
    id: "1",
    ownerName: "Myself",
    emoji: "👤",
    medications: mockMedications,
    doseLogs: mockDoseLogs,
    streak: mockStreak,
    hardwareId: "DDPLUS-001",
    isActive: true,
    createdAt: new Date("2025-01-01"),
  },
]

export const mockTravelDocuments: TravelDocument[] = [
  {
    id: "1",
    type: "prescription",
    medicationId: "3",
    imageUrl: "/prescription-document.jpg",
    fileName: "blood-pressure-prescription.jpg",
    uploadedAt: new Date("2025-09-15"),
    notes: "Valid until Dec 2025",
  },
]

export const mockInsightData: InsightData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (29 - i))
  const adherenceRate = 85 + Math.random() * 15 // 85-100%
  const dosesScheduled = 3
  const dosesTaken = Math.round((adherenceRate / 100) * dosesScheduled)

  return {
    date,
    adherenceRate,
    dosesTaken,
    dosesScheduled,
    averageDelay: Math.random() * 60 - 30, // -30 to +30 minutes
  }
})

export const mockInsightSuggestions: InsightSuggestion[] = [
  {
    id: "1",
    type: "timing",
    medicationId: "1",
    message:
      "You're consistently taking Vitamin D 45 minutes late. Consider setting your reminder for 7:15 AM instead of 8:00 AM.",
    priority: "medium",
    createdAt: new Date(),
  },
  {
    id: "2",
    type: "consistency",
    message: "Great work! You've maintained 95%+ adherence for 2 weeks straight. Keep up the momentum!",
    priority: "low",
    createdAt: new Date(),
  },
  {
    id: "3",
    type: "streak",
    message: "You're just 3 days away from your longest streak ever. Stay consistent!",
    priority: "high",
    createdAt: new Date(),
  },
]
