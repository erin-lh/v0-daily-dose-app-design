"use client"

import { Clock } from "lucide-react"

interface TodaysAdherenceRingProps {
  adherenceRate: number
  todayTaken: number
  todayTotal: number
  nextDoseIn: string
}

export function TodaysAdherenceRing({ adherenceRate, todayTaken, todayTotal, nextDoseIn }: TodaysAdherenceRingProps) {
  const circumference = 2 * Math.PI * 90
  const strokeDashoffset = circumference - (adherenceRate / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-muted/20"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-primary transition-all duration-1000 ease-out"
            style={{ strokeDashoffset }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold text-foreground">{adherenceRate}%</div>
          <div className="text-sm text-muted-foreground mt-1">
            {todayTaken} of {todayTotal} doses
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span className="text-sm">Next dose in {nextDoseIn}</span>
      </div>
    </div>
  )
}
