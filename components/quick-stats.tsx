"use client"

import { Card } from "@/components/ui/card"
import { Pill, Calendar, Clock, CheckCircle2 } from "lucide-react"

interface QuickStatsProps {
  todayTaken: number
  todayTotal: number
  weeklyAdherence: number
  nextDoseIn: string
}

export function QuickStats({ todayTaken, todayTotal, weeklyAdherence, nextDoseIn }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Today</p>
            <p className="text-lg font-semibold text-foreground">
              {todayTaken}/{todayTotal}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">This Week</p>
            <p className="text-lg font-semibold text-foreground">{weeklyAdherence}%</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Next Dose</p>
            <p className="text-lg font-semibold text-foreground">{nextDoseIn}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Pill className="w-5 h-5 text-accent" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Active Meds</p>
            <p className="text-lg font-semibold text-foreground">{todayTotal}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
