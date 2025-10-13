"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface SkipMedicationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  medicationName: string
  onConfirm: (reason: string) => void
}

export function SkipMedicationDialog({ open, onOpenChange, medicationName, onConfirm }: SkipMedicationDialogProps) {
  const [reason, setReason] = useState("")

  const handleConfirm = () => {
    if (reason.trim()) {
      onConfirm(reason.trim())
      setReason("")
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    setReason("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Skip {medicationName}?</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="skip-reason" className="text-sm font-medium">
              Why are you skipping this dose?
            </Label>
            <Textarea
              id="skip-reason"
              placeholder="e.g., Feeling unwell, forgot to refill, side effects..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>
          <p className="text-xs text-muted-foreground">This will be logged in your medication timeline.</p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!reason.trim()} className="bg-primary hover:bg-primary/90">
            Confirm Skip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
