"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { InsightData, Medication } from "@/lib/types"

interface AdherenceChartProps {
  data: InsightData[]
  medications: Medication[]
}

export function AdherenceChart({ data, medications }: AdherenceChartProps) {
  const [selectedMedication, setSelectedMedication] = useState<string>("all")

  const maxRate = 100
  const last7Days = data.slice(-7)

  // Filter data by selected medication
  const filteredData = last7Days.map((day) => {
    if (selectedMedication === "all") {
      return day
    }

    // Calculate adherence rate for specific medication
    // This is a simplified calculation - in production you'd track per-medication adherence
    const med = medications.find((m) => m.id === selectedMedication)
    if (!med) return day

    // For now, return the day's data (in production, filter by medication-specific logs)
    return day
  })

  // Get active medications only
  const activeMedications = medications.filter((m) => !m.archived)

  return (
    <Card className="p-5">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold">Weekly Consistency</h3>
            <p className="text-sm text-muted-foreground">Last 7 days adherence rate</p>
          </div>

          <Select value={selectedMedication} onValueChange={setSelectedMedication}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="All Medications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Medications</SelectItem>
              {activeMedications.map((med) => (
                <SelectItem key={med.id} value={med.id}>
                  {med.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end justify-between gap-2 h-40">
          {filteredData.map((day, index) => {
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
