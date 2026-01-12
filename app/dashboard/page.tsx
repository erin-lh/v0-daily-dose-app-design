"use client"

import { cn } from "@/lib/utils"

import { useState, useEffect, useRef } from "react"
import { TodaySchedule } from "@/components/today-schedule"
import { QuickStats } from "@/components/quick-stats"
import { AddMedicationDialog } from "@/components/add-medication-dialog"
import { Button } from "@/components/ui/button"
import { Bell, Box } from "lucide-react"
import { mockPillBoxes, mockPillBoxStatus } from "@/lib/mock-data"
import type { Medication, PillBox } from "@/lib/types"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { BrandLogoWithTagline } from "@/components/brand-logo"
import { BottomNav } from "@/components/bottom-nav"
import { PlantGrowth } from "@/components/plant-growth"
import { QuickMenuFAB } from "@/components/quick-menu-fab"
import { BoxCapacityBar } from "@/components/box-capacity-bar"

export default function DashboardPage() {
  const [pillBoxes, setPillBoxes] = useState<PillBox[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dailydose-pillboxes")
      return saved ? JSON.parse(saved) : mockPillBoxes
    }
    return mockPillBoxes
  })

  const [activePillBoxId, setActivePillBoxId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dailydose-active-pillbox")
      return saved || pillBoxes[0]?.id
    }
    return pillBoxes[0]?.id
  })

  const activePillBox = pillBoxes.find((pb) => pb.id === activePillBoxId) || pillBoxes[0]
  const unreadNotifications = 2

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dailydose-pillboxes", JSON.stringify(pillBoxes))
      localStorage.setItem("dailydose-active-pillbox", activePillBoxId)
    }
  }, [pillBoxes, activePillBoxId])

  const handleMarkTaken = (medicationId: string) => {
    setPillBoxes((prev) =>
      prev.map((pb) =>
        pb.id === activePillBoxId
          ? {
              ...pb,
              doseLogs: pb.doseLogs.map((log) =>
                log.medicationId === medicationId && log.status === "pending"
                  ? { ...log, status: "taken", takenTime: new Date(), pillBoxOpened: true }
                  : log,
              ),
            }
          : pb,
      ),
    )
  }

  const handleSkip = (medicationId: string, reason: string) => {
    setPillBoxes((prev) =>
      prev.map((pb) =>
        pb.id === activePillBoxId
          ? {
              ...pb,
              doseLogs: pb.doseLogs.map((log) =>
                log.medicationId === medicationId && log.status === "pending"
                  ? { ...log, status: "skipped", skipReason: reason }
                  : log,
              ),
            }
          : pb,
      ),
    )
  }

  const handleAddMedication = (newMed: Omit<Medication, "id" | "createdAt">) => {
    const medication: Medication = {
      ...newMed,
      id: Date.now().toString(),
      createdAt: new Date(),
    }

    setPillBoxes((prev) =>
      prev.map((pb) => (pb.id === activePillBoxId ? { ...pb, medications: [...pb.medications, medication] } : pb)),
    )
  }

  const todayScheduleRef = useRef<HTMLDivElement>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  const totalWeeklyDoses = activePillBox.medications
    .filter((m) => !m.archived)
    .reduce((total, med) => total + med.times.length * 7, 0)
  const daysUntilRefill = 3 // This would be calculated based on refill day settings

  const handleQuickMarkComplete = () => {
    todayScheduleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const handleQuickAddMeds = () => {
    setShowAddDialog(true)
  }

  const handleRefillComplete = () => {
    // Store refill completion in localStorage
    localStorage.setItem(`dailydose-last-refill-${activePillBoxId}`, new Date().toISOString())
  }

  const activeMedications = activePillBox.medications.filter((m) => !m.archived)
  const todayTotalDoses = activeMedications.reduce((total, med) => total + med.times.length, 0)
  const todayTaken = activePillBox.doseLogs.filter((log) => log.status === "taken").length
  const adherenceRate = todayTotalDoses > 0 ? Math.round((todayTaken / todayTotalDoses) * 100) : 0

  return (
    <div className="min-h-screen bg-background pb-24">
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
              <Link href="/device">
                <Button variant="ghost" size="icon" className="relative rounded-full h-11 w-11">
                  <Box className="w-5 h-5 text-foreground/70" />
                  {mockPillBoxStatus.isConnected && (
                    <Badge className="absolute top-1.5 right-1.5 w-2.5 h-2.5 p-0 bg-success border-2 border-background rounded-full" />
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-8">
        <div className="space-y-8 max-w-lg mx-auto">
          {pillBoxes.length > 1 && (
            <section className="slide-up-enter">
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {pillBoxes.map((pb) => (
                  <button
                    key={pb.id}
                    onClick={() => setActivePillBoxId(pb.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 transition-all whitespace-nowrap",
                      pb.id === activePillBoxId
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border/30 bg-background text-muted-foreground hover:border-primary/30",
                    )}
                  >
                    <span className="text-xl">{pb.emoji}</span>
                    <span className="text-sm font-medium">{pb.ownerName}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="slide-up-enter" style={{ animationDelay: "0.05s" }}>
            <PlantGrowth adherenceRate={adherenceRate} daysActive={52} />
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.075s" }}>
            <BoxCapacityBar
              totalDoses={totalWeeklyDoses}
              remainingDoses={totalWeeklyDoses - todayTaken}
              daysUntilRefill={daysUntilRefill}
              variant="full"
            />
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.1s" }}>
            <QuickStats todayTaken={todayTaken} todayTotal={todayTotalDoses} weeklyAdherence={92} nextDoseIn="2h 15m" />
          </section>

          <section ref={todayScheduleRef} className="slide-up-enter" style={{ animationDelay: "0.15s" }}>
            <TodaySchedule
              medications={activePillBox.medications}
              doseLogs={activePillBox.doseLogs}
              onMarkTaken={handleMarkTaken}
              onSkip={handleSkip}
            />
          </section>

          <section className="flex justify-center pt-6 pb-12">
            <AddMedicationDialog onAdd={handleAddMedication} open={showAddDialog} onOpenChange={setShowAddDialog} />
          </section>
        </div>
      </main>

      <QuickMenuFAB
        onMarkComplete={handleQuickMarkComplete}
        onAddMeds={handleQuickAddMeds}
        onRefillComplete={handleRefillComplete}
      />

      <BottomNav />
    </div>
  )
}
