"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, AlertCircle, Circle } from "lucide-react"
import type { Medication, DoseLog } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { SkipMedicationDialog } from "./skip-medication-dialog"
import { HoldToCompleteButton } from "./hold-to-complete-button"

interface TodayScheduleProps {
  medications: Medication[]
  doseLogs: DoseLog[]
  onMarkTaken: (medicationId: string) => void
  onSkip?: (medicationId: string, reason: string) => void
}

export function TodaySchedule({ medications, doseLogs, onMarkTaken, onSkip }: TodayScheduleProps) {
  const [localMedications, setLocalMedications] = useState(medications)
  const [skipDialogOpen, setSkipDialogOpen] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null)

  useEffect(() => {
    setLocalMedications(medications)
  }, [medications])

  const getStatusForMedication = (medId: string) => {
    const log = doseLogs.find((l) => l.medicationId === medId)
    return log?.status || "pending"
  }

  const getNextDoseTime = (med: Medication) => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()

    for (const time of med.times) {
      const [hour, minute] = time.split(":").map(Number)
      if (hour > currentHour || (hour === currentHour && minute > currentMinute)) {
        return time
      }
    }
    return med.times[0]
  }

  const activeMeds = localMedications.filter((m) => m.isActive && !m.archived)

  const handleSkipClick = (med: Medication) => {
    setSelectedMedication(med)
    setSkipDialogOpen(true)
  }

  const handleSkipConfirm = (reason: string) => {
    if (selectedMedication && onSkip) {
      onSkip(selectedMedication.id, reason)
    }
  }

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Today's Routine</h2>
          <Badge variant="secondary" className="text-xs">
            {activeMeds.length} active
          </Badge>
        </div>

        <div className="space-y-3">
          {activeMeds.map((med) => {
            const status = getStatusForMedication(med.id)
            const nextTime = getNextDoseTime(med)

            return (
              <div
                key={med.id}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border transition-colors",
                  status === "taken" && "bg-primary/5 border-primary/20",
                  status === "missed" && "bg-destructive/5 border-destructive/20",
                  status === "pending" && "bg-card border-border",
                )}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      status === "taken" && "bg-primary/20",
                      status === "missed" && "bg-destructive/20",
                      status === "pending" && "bg-muted",
                    )}
                  >
                    {status === "taken" && <Check className="w-5 h-5 text-primary" />}
                    {status === "missed" && <AlertCircle className="w-5 h-5 text-destructive" />}
                    {status === "pending" && <Circle className="w-5 h-5 text-muted-foreground" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground">{med.name}</h3>
                      {med.color && (
                        <Badge variant="outline" className="text-xs">
                          {med.color}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{nextTime}</span>
                      <span>•</span>
                      <span>{med.dosage}</span>
                    </div>
                  </div>
                </div>

                {status === "pending" && (
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <HoldToCompleteButton onComplete={() => onMarkTaken(med.id)} />
                      <span className="text-[10px] text-muted-foreground">Hold</span>
                    </div>
                    {onSkip && (
                      <button
                        onClick={() => handleSkipClick(med)}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                      >
                        Skip
                      </button>
                    )}
                  </div>
                )}

                {status === "taken" && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Complete
                  </Badge>
                )}

                {status === "missed" && (
                  <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                    Skipped
                  </Badge>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {selectedMedication && (
        <SkipMedicationDialog
          open={skipDialogOpen}
          onOpenChange={setSkipDialogOpen}
          medicationName={selectedMedication.name}
          onConfirm={handleSkipConfirm}
        />
      )}
    </>
  )
}
