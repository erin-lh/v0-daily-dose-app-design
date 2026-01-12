"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

interface AdherencePieChartProps {
  adherenceRate: number
  daysSinceJoined: number
}

export function AdherencePieChart({ adherenceRate, daysSinceJoined }: AdherencePieChartProps) {
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (adherenceRate / 100) * circumference

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-base font-semibold mb-1">Today's Adherence</h3>
          <p className="text-sm text-muted-foreground mb-4">Current performance</p>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-2xl font-bold">{Math.round(adherenceRate)}%</span>
            </div>
            <p className="text-xs text-muted-foreground">{daysSinceJoined} days since joined</p>
          </div>
        </div>

        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="text-primary transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{Math.round(adherenceRate)}%</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
