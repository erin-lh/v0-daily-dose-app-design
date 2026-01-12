"use client"

import { Sprout, Droplets } from "lucide-react"

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

  const getPlantHeight = () => {
    if (adherenceRate >= 90) return "h-24"
    if (adherenceRate >= 70) return "h-20"
    if (adherenceRate >= 50) return "h-16"
    return "h-12"
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
            <div className={`transition-all duration-500 ${getPlantHeight()} flex items-end justify-center mb-2`}>
              {adherenceRate >= 90 ? (
                // Thriving plant - full grown
                <div className="relative">
                  <div className="flex gap-1">
                    <div className="w-8 h-12 bg-success rounded-full border-2 border-success-foreground/20" />
                    <div className="w-8 h-14 bg-success rounded-full border-2 border-success-foreground/20" />
                    <div className="w-8 h-12 bg-success rounded-full border-2 border-success-foreground/20" />
                  </div>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl animate-bounce">✨</div>
                </div>
              ) : adherenceRate >= 70 ? (
                // Growing plant - two leaves
                <div className="flex gap-1">
                  <div className="w-7 h-10 bg-success/90 rounded-full border-2 border-success-foreground/20" />
                  <div className="w-7 h-12 bg-success/90 rounded-full border-2 border-success-foreground/20" />
                </div>
              ) : adherenceRate >= 50 ? (
                // Sprouting - one leaf
                <div className="w-6 h-8 bg-success/70 rounded-full border-2 border-success-foreground/20" />
              ) : (
                // Seedling - just sprouting
                <Sprout className="w-6 h-6 text-success/50" />
              )}
            </div>

            {/* Pot */}
            <div className="relative">
              <div className="w-20 h-16 bg-gradient-to-b from-[#d4997d] to-[#c4896d] rounded-b-2xl border-2 border-[#b4795d]">
                <div className="w-full h-3 bg-[#8b6f47] border-b-2 border-[#6b5f37]" />
                {/* Cute face on pot */}
                <div className="flex items-center justify-center gap-2 mt-3">
                  <div className="w-1.5 h-1.5 bg-[#8b6f47] rounded-full" />
                  <div className="w-1.5 h-1.5 bg-[#8b6f47] rounded-full" />
                </div>
                <div className="flex justify-center mt-1">
                  <div className="w-3 h-1 border-b-2 border-[#8b6f47] rounded-full" />
                </div>
              </div>
            </div>
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
