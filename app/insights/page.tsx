"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { AdherenceChart } from "@/components/adherence-chart"
import { AdherencePieChart } from "@/components/adherence-pie-chart"
import { TimingInsights } from "@/components/timing-insights"
import { AISuggestions } from "@/components/ai-suggestions"
import { MedicationTimeline } from "@/components/medication-timeline"
import { mockInsightData, mockInsightSuggestions, mockPillBoxes } from "@/lib/mock-data"
import type { PillBox } from "@/lib/types"

export default function InsightsPage() {
  const [pillBoxes] = useState<PillBox[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dailydose-pillboxes")
      return saved ? JSON.parse(saved) : mockPillBoxes
    }
    return mockPillBoxes
  })

  const [activePillBoxId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dailydose-active-pillbox")
      return saved || pillBoxes[0]?.id
    }
    return pillBoxes[0]?.id
  })

  const [todayAdherence, setTodayAdherence] = useState(0)

  useEffect(() => {
    const activePillBox = pillBoxes.find((pb) => pb.id === activePillBoxId) || pillBoxes[0]
    if (!activePillBox) return

    // Get active medications only
    const activeMedications = activePillBox.medications.filter((med) => !med.archived)

    // Count total doses for today
    const totalDosesToday = activeMedications.reduce((total, med) => {
      return total + med.times.length
    }, 0)

    // Count completed doses from localStorage
    const completedKey = `dailydose-completed-${activePillBoxId}-${new Date().toDateString()}`
    const completed = localStorage.getItem(completedKey)
    const completedDoses = completed ? JSON.parse(completed) : []

    const adherenceRate = totalDosesToday > 0 ? (completedDoses.length / totalDosesToday) * 100 : 0
    setTodayAdherence(adherenceRate)
  }, [pillBoxes, activePillBoxId])

  const activePillBox = pillBoxes.find((pb) => pb.id === activePillBoxId) || pillBoxes[0]

  const stats = [
    {
      label: "Total Doses",
      value: activePillBox.streak.totalDosesTaken,
      icon: Target,
      color: "text-primary",
    },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="border-b border-border/30 bg-background/95 backdrop-blur-xl sticky top-0 z-10 safe-top">
        <div className="px-5 py-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-semibold">Habit Insights</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-6">
        <div className="space-y-6 max-w-lg mx-auto">
          <section className="slide-up-enter">
            <AdherencePieChart adherenceRate={todayAdherence} daysSinceJoined={52} />
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.1s" }}>
            <AdherenceChart data={mockInsightData} medications={activePillBox.medications} />
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.15s" }}>
            <AISuggestions suggestions={mockInsightSuggestions} />
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.2s" }}>
            <TimingInsights data={mockInsightData} />
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.25s" }}>
            <MedicationTimeline doseLogs={activePillBox.doseLogs} medications={activePillBox.medications} days={7} />
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.3s" }}>
            <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h3 className="text-base font-semibold mb-2">Keep Going!</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You're building a strong routine. Consistency is key to better health outcomes. Your adherence rate of{" "}
                {Math.round(todayAdherence)}% shows real commitment.
              </p>
            </Card>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
