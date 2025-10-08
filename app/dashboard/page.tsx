"use client"

import { useState, useEffect } from "react"
import { StreakCard } from "@/components/streak-card"
import { TodaySchedule } from "@/components/today-schedule"
import { QuickStats } from "@/components/quick-stats"
import { AddMedicationDialog } from "@/components/add-medication-dialog"
import { Button } from "@/components/ui/button"
import { Settings, Bell, Pill, Box } from "lucide-react"
import { mockMedications, mockStreak, mockDoseLogs, mockPillBoxStatus } from "@/lib/mock-data"
import type { DoseLog, Medication } from "@/lib/types"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { BrandLogoWithTagline } from "@/components/brand-logo"

export default function DashboardPage() {
  const [medications, setMedications] = useState<Medication[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dailydose-medications")
      return saved ? JSON.parse(saved) : mockMedications
    }
    return mockMedications
  })

  const [doseLogs, setDoseLogs] = useState<DoseLog[]>(mockDoseLogs)
  const unreadNotifications = 2

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dailydose-medications", JSON.stringify(medications))
    }
  }, [medications])

  const handleMarkTaken = (medicationId: string) => {
    setDoseLogs((prev) =>
      prev.map((log) =>
        log.medicationId === medicationId && log.status === "pending"
          ? { ...log, status: "taken", takenTime: new Date(), pillBoxOpened: true }
          : log,
      ),
    )
  }

  const handleAddMedication = (newMed: Omit<Medication, "id" | "createdAt">) => {
    const medication: Medication = {
      ...newMed,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    const updatedMedications = [...medications, medication]
    setMedications(updatedMedications)
  }

  const todayTaken = doseLogs.filter((log) => log.status === "taken").length
  const todayTotal = medications.filter((m) => m.isActive).length

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="border-b border-border/30 bg-background/95 backdrop-blur-xl sticky top-0 z-10 safe-top">
        <div className="px-5 py-5">
          <div className="flex items-center justify-between">
            <BrandLogoWithTagline />
            <div className="flex items-center gap-0.5">
              <Link href="/notifications">
                <Button variant="ghost" size="icon" className="relative rounded-full h-11 w-11">
                  <Bell className="w-5 h-5 text-foreground/70" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-0.5 -right-0.5 h-5 min-w-5 flex items-center justify-center p-0 px-1.5 bg-primary text-primary-foreground text-xs rounded-full">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link href="/medications">
                <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
                  <Pill className="w-5 h-5 text-foreground/70" />
                </Button>
              </Link>
              <Link href="/device">
                <Button variant="ghost" size="icon" className="relative rounded-full h-11 w-11">
                  <Box className="w-5 h-5 text-foreground/70" />
                  {mockPillBoxStatus.isConnected && (
                    <Badge className="absolute top-1.5 right-1.5 w-2.5 h-2.5 p-0 bg-success border-2 border-background rounded-full" />
                  )}
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
                  <Settings className="w-5 h-5 text-foreground/70" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-8">
        <div className="space-y-8 max-w-lg mx-auto">
          <section className="slide-up-enter">
            <StreakCard streak={mockStreak} />
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.1s" }}>
            <QuickStats todayTaken={todayTaken} todayTotal={todayTotal} weeklyAdherence={92} nextDoseIn="2h 15m" />
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.2s" }}>
            <TodaySchedule medications={medications} doseLogs={doseLogs} onMarkTaken={handleMarkTaken} />
          </section>

          <section className="flex justify-center pt-6 pb-12">
            <AddMedicationDialog onAdd={handleAddMedication} />
          </section>
        </div>
      </main>
    </div>
  )
}
