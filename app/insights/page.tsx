"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ArrowLeft, TrendingUp, Award, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { AdherenceChart } from "@/components/adherence-chart"
import { TimingInsights } from "@/components/timing-insights"
import { AISuggestions } from "@/components/ai-suggestions"
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

  const activePillBox = pillBoxes.find((pb) => pb.id === activePillBoxId) || pillBoxes[0]

  const stats = [
    {
      label: "Current Streak",
      value: `${activePillBox.streak.currentStreak} days`,
      icon: Award,
      color: "text-primary",
    },
    {
      label: "Adherence Rate",
      value: `${Math.round(activePillBox.streak.adherenceRate)}%`,
      icon: TrendingUp,
      color: "text-primary",
    },
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
              <TrendingUp className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-semibold">Habit Insights</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-6">
        <div className="space-y-6 max-w-lg mx-auto">
          <section className="grid grid-cols-3 gap-3 slide-up-enter">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="p-4 text-center">
                  <Icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </Card>
              )
            })}
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.05s" }}>
            <AdherenceChart data={mockInsightData} />
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.1s" }}>
            <TimingInsights data={mockInsightData} />
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.15s" }}>
            <AISuggestions suggestions={mockInsightSuggestions} />
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.2s" }}>
            <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h3 className="text-base font-semibold mb-2">Keep Going!</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You're building a strong routine. Consistency is key to better health outcomes. Your current streak of{" "}
                {activePillBox.streak.currentStreak} days shows real commitment.
              </p>
            </Card>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
