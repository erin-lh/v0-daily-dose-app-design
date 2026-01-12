"use client"

import { Droplets } from "lucide-react"

interface PlantGrowthProps {
  adherenceRate: number // 0-100
  daysActive: number
}

export function PlantGrowth({ adherenceRate, daysActive }: PlantGrowthProps) {
  // Calculate plant growth stage based on adherence
  const getGrowthStage = () => {
    if (adherenceRate >= 90) return "thriving"
    if (adherenceRate >= 70) return "growing"
    if (adherenceRate >= 50) return "sprouting"
    return "seedling"
  }

  const growthStage = getGrowthStage()

  const getGrowthMessage = () => {
    if (adherenceRate >= 90) return "Your wellness is thriving"
    if (adherenceRate >= 70) return "Your routine is growing strong"
    if (adherenceRate >= 50) return "Keep nurturing your habits"
    return "Time to water your wellness"
  }

  return (
    <div className="relative bg-gradient-to-b from-background to-muted/20 rounded-3xl p-6 border border-border/30 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-success/5 rounded-full blur-2xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Your Wellness Garden</h2>
            </div>
            <p className="text-sm text-muted-foreground">{getGrowthMessage()}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{adherenceRate}%</div>
            <div className="text-xs text-muted-foreground mt-0.5">adherence</div>
          </div>
        </div>

        {/* Plant visualization */}
        <div className="flex items-end justify-center gap-8 mt-8">
          {/* Plant pot with growth stages */}
          <div className="flex flex-col items-center">
            <img
              src="/images/screenshot-202026-01-12-20at-205.png"
              alt="Wellness plant"
              className="w-32 h-32 object-contain"
            />
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-3">
            <div className="bg-background/80 backdrop-blur rounded-2xl px-4 py-3 border border-border/30">
              <div className="text-xs text-muted-foreground mb-1">Days Active</div>
              <div className="text-2xl font-bold text-foreground">{daysActive}</div>
            </div>
            <div className="bg-background/80 backdrop-blur rounded-2xl px-4 py-3 border border-border/30">
              <div className="text-xs text-muted-foreground mb-1">Growth Stage</div>
              <div className="text-sm font-semibold text-primary capitalize">{growthStage}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
