"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Clock, Calendar, Edit, Trash2, Archive } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Medication } from "@/lib/types"

interface MedicationListProps {
  medications: Medication[]
  onEdit?: (medication: Medication) => void
  onDelete?: (medicationId: string) => void
  onArchive?: (medicationId: string) => void
  isCaregiver?: boolean // If true, hide edit/delete/archive options
}

export function MedicationList({ medications, onEdit, onDelete, onArchive, isCaregiver = false }: MedicationListProps) {
  const formatTimes = (times: string[]) => {
    return times.join(", ")
  }

  const getFrequencyLabel = (frequency: string) => {
    const labels = {
      daily: "Daily",
      multiple: "Multiple Daily",
      "as-needed": "As Needed",
      temporary: "Temporary",
    }
    return labels[frequency as keyof typeof labels] || frequency
  }

  return (
    <div className="space-y-3">
      {medications.map((med) => (
        <Card key={med.id} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-foreground">{med.name}</h3>
                {med.color && (
                  <Badge variant="outline" className="text-xs">
                    {med.color}
                  </Badge>
                )}
                <Badge variant="secondary" className="text-xs">
                  {getFrequencyLabel(med.frequency)}
                </Badge>
              </div>

              {med.description && <p className="text-sm text-muted-foreground mb-3">{med.description}</p>}

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{formatTimes(med.times)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="font-medium">Dosage:</span>
                  <span>{med.dosage}</span>
                </div>
                {med.endDate && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Until {new Date(med.endDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {!isCaregiver && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="shrink-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit?.(med)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onArchive?.(med.id)}>
                    <Archive className="w-4 h-4 mr-2" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete?.(med.id)} className="text-destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
