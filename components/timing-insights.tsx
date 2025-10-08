"use client"

import { Card } from "@/components/ui/card"
import { Clock } from "lucide-react"
import type { InsightData } from "@/lib/types"

interface TimingInsightsProps {
  data: InsightData[]
}

export function TimingInsights({ data }: TimingInsightsProps) {
  const avgDelay = data.reduce((sum, d) => sum + d.averageDelay, 0) / data.length
  const isLate = avgDelay > 0
  const absDelay = Math.abs(Math.round(avgDelay))

  const timeDistribution = [
    { time: "Morning", count: 12, percentage: 40 },
    { time: "Afternoon", count: 8, percentage: 27 },
    { time: "Evening", count: 10, percentage: 33 },
  ]

  return (
    <Card className="p-5 space-y-4">
      <div>
        <h3 className="text-base font-semibold">Timing Patterns</h3>
        <p className="text-sm text-muted-foreground">When you take your medications</p>
      </div>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">{isLate ? "Average Delay" : "Average Early"}</p>
            <p className="text-lg font-semibold text-primary">
              {absDelay} minutes {isLate ? "late" : "early"}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {timeDistribution.map((item) => (
          <div key={item.time} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.time}</span>
              <span className="text-muted-foreground">{item.count} doses</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
