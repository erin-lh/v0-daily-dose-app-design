"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Clock, Sparkles } from "lucide-react"
import type { InsightSuggestion } from "@/lib/types"

interface AISuggestionsProps {
  suggestions: InsightSuggestion[]
}

const iconMap = {
  timing: Clock,
  consistency: TrendingUp,
  streak: Sparkles,
  general: Lightbulb,
}

const priorityColors = {
  high: "bg-primary text-primary-foreground",
  medium: "bg-primary/20 text-primary",
  low: "bg-muted text-muted-foreground",
}

export function AISuggestions({ suggestions }: AISuggestionsProps) {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Smart Insights</h3>
          <p className="text-sm text-muted-foreground">Personalized suggestions for you</p>
        </div>
        <Lightbulb className="w-5 h-5 text-primary" />
      </div>

      <div className="space-y-3">
        {suggestions.map((suggestion) => {
          const Icon = iconMap[suggestion.type]
          return (
            <div
              key={suggestion.id}
              className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm leading-relaxed">{suggestion.message}</p>
                  <Badge variant="secondary" className={priorityColors[suggestion.priority]}>
                    {suggestion.priority} priority
                  </Badge>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
