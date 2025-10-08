"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, CheckCircle2, XCircle, Clock, Circle } from "lucide-react"
import type { DoseLog, Medication } from "@/lib/types"
import { useState, useMemo } from "react"

interface MedicationTimelineProps {
  doseLogs: DoseLog[]
  medications: Medication[]
  days?: number
}

export function MedicationTimeline({ doseLogs, medications, days = 7 }: MedicationTimelineProps) {
  const [selectedMedId, setSelectedMedId] = useState<string>("all")

  const filteredLogs = useMemo(() => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    return doseLogs
      .filter((log) => {
        const logDate = new Date(log.scheduledTime)
        const matchesMedication = selectedMedId === "all" || log.medicationId === selectedMedId
        return logDate >= cutoffDate && matchesMedication
      })
      .sort((a, b) => new Date(b.scheduledTime).getTime() - new Date(a.scheduledTime).getTime())
  }, [doseLogs, days, selectedMedId])

  const groupedLogs = useMemo(() => {
    const groups: Record<string, typeof filteredLogs> = {}
    filteredLogs.forEach((log) => {
      const dateKey = new Date(log.scheduledTime).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
      if (!groups[dateKey]) groups[dateKey] = []
      groups[dateKey].push(log)
    })
    return groups
  }, [filteredLogs])

  const getStatusIcon = (status: DoseLog["status"]) => {
    switch (status) {
      case "taken":
        return <CheckCircle2 className="w-5 h-5 text-primary" />
      case "missed":
        return <XCircle className="w-5 h-5 text-destructive" />
      case "pending":
        return <Clock className="w-5 h-5 text-muted-foreground" />
      case "skipped":
        return <Circle className="w-5 h-5 text-muted-foreground" />
    }
  }

  const getDelayText = (log: DoseLog) => {
    if (!log.takenTime || log.status !== "taken") return null
    const scheduled = new Date(log.scheduledTime)
    const taken = new Date(log.takenTime)
    const diffMinutes = Math.round((taken.getTime() - scheduled.getTime()) / (1000 * 60))

    if (diffMinutes === 0) return "On time"
    if (diffMinutes > 0) return `${diffMinutes}m late`
    return `${Math.abs(diffMinutes)}m early`
  }

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold">Medication Timeline</h3>
        <Button onClick={() => {}} variant="outline" size="sm" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export PDF
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-4">Past {days} days of medication events</p>

      <div className="mb-5">
        <label htmlFor="med-filter" className="text-sm font-medium mb-2 block">
          Filter by Medication
        </label>
        <select
          id="med-filter"
          value={selectedMedId}
          onChange={(e) => setSelectedMedId(e.target.value)}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">All Medications</option>
          {medications.map((med) => (
            <option key={med.id} value={med.id}>
              {med.name}
              {med.color ? ` (${med.color})` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {Object.keys(groupedLogs).length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No medication events in the selected timeframe</p>
          </div>
        ) : (
          Object.entries(groupedLogs).map(([date, logs]) => (
            <div key={date}>
              <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">{date}</div>
              <div className="space-y-2">
                {logs.map((log) => {
                  const medication = medications.find((m) => m.id === log.medicationId)
                  if (!medication) return null

                  return (
                    <div
                      key={log.id}
                      className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg border border-border/30"
                    >
                      <div className="mt-0.5">{getStatusIcon(log.status)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <p className="font-medium text-sm">{medication.name}</p>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {new Date(log.scheduledTime).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="capitalize">{log.status}</span>
                          {getDelayText(log) && (
                            <>
                              <span>•</span>
                              <span>{getDelayText(log)}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
