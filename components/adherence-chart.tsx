"use client"

import { Card } from "@/components/ui/card"
import type { InsightData } from "@/lib/types"

interface AdherenceChartProps {
  data: InsightData[]
}

export function AdherenceChart({ data }: AdherenceChartProps) {
  const maxRate = 100
  const last7Days = data.slice(-7)

  return (
    <Card className="p-5">
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold">Weekly Consistency</h3>
          <p className="text-sm text-muted-foreground">Last 7 days adherence rate</p>
        </div>

        <div className="flex items-end justify-between gap-2 h-40">
          {last7Days.map((day, index) => {
            const height = (day.adherenceRate / maxRate) * 100
            const date = new Date(day.date)
            const dayLabel = date.toLocaleDateString("en-US", { weekday: "short" })

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end h-32">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/60 transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-muted-foreground">{dayLabel}</p>
                  <p className="text-xs text-primary font-semibold">{Math.round(day.adherenceRate)}%</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
