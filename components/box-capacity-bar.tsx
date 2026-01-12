"use client"

import { Card } from "@/components/ui/card"
import { PackageCheck, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface BoxCapacityBarProps {
  totalDoses: number
  remainingDoses: number
  daysUntilRefill: number
  variant?: "compact" | "full"
}

export function BoxCapacityBar({ totalDoses, remainingDoses, daysUntilRefill, variant = "full" }: BoxCapacityBarProps) {
  const capacityPercentage = totalDoses > 0 ? (remainingDoses / totalDoses) * 100 : 0
  const isLow = capacityPercentage < 30

  if (variant === "compact") {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Box Capacity</span>
          <span className={cn("font-medium", isLow ? "text-warning" : "text-foreground")}>
            {remainingDoses}/{totalDoses} doses
          </span>
        </div>
        <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all duration-500 rounded-full", isLow ? "bg-warning" : "bg-primary")}
            style={{ width: `${capacityPercentage}%` }}
          />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>Refill in {daysUntilRefill} days</span>
        </div>
      </div>
    )
  }

  return (
    <Card className="p-5 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <PackageCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Pill Box Status</h3>
            <p className="text-sm text-muted-foreground">Current capacity</p>
          </div>
        </div>
        <div className="text-right">
          <div className={cn("text-2xl font-bold", isLow ? "text-warning" : "text-primary")}>
            {Math.round(capacityPercentage)}%
          </div>
          <div className="text-xs text-muted-foreground">
            {remainingDoses}/{totalDoses} doses
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-3 bg-secondary/30 rounded-full overflow-hidden mb-3">
        <div
          className={cn("h-full transition-all duration-500 rounded-full", isLow ? "bg-warning" : "bg-primary")}
          style={{ width: `${capacityPercentage}%` }}
        />
      </div>

      {/* Refill Countdown */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Next refill</span>
        </div>
        <span className="font-medium text-foreground">
          {daysUntilRefill === 0 ? "Today" : daysUntilRefill === 1 ? "Tomorrow" : `${daysUntilRefill} days`}
        </span>
      </div>

      {isLow && (
        <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-sm text-warning font-medium">Running low - consider refilling soon</p>
        </div>
      )}
    </Card>
  )
}
