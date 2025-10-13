"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, X, Clock } from "lucide-react"
import type { Medication } from "@/lib/types"

interface AddMedicationDialogProps {
  onAdd: (medication: Omit<Medication, "id" | "createdAt">) => void
  trigger?: React.ReactNode
}

export function AddMedicationDialog({ onAdd, trigger }: AddMedicationDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [dosage, setDosage] = useState("")
  const [color, setColor] = useState("")
  const [format, setFormat] = useState<"pill" | "cream" | "injection" | "liquid" | "inhaler" | "patch" | "other" | "">(
    "",
  )
  const [notInDosey, setNotInDosey] = useState(false)
  const [frequency, setFrequency] = useState<"daily" | "multiple" | "as-needed" | "temporary">("daily")
  const [times, setTimes] = useState<string[]>(["08:00"])
  const [isTemporary, setIsTemporary] = useState(false)
  const [endDate, setEndDate] = useState("")
  const [reminderEnabled, setReminderEnabled] = useState(true)

  const handleAddTime = () => {
    setTimes([...times, "12:00"])
  }

  const handleRemoveTime = (index: number) => {
    setTimes(times.filter((_, i) => i !== index))
  }

  const handleTimeChange = (index: number, value: string) => {
    const newTimes = [...times]
    newTimes[index] = value
    setTimes(newTimes)
  }

  const handleSubmit = () => {
    if (!name || !dosage) return

    onAdd({
      name,
      description: description || undefined,
      dosage,
      color: color || undefined,
      format: format || undefined,
      notInDosey: notInDosey || undefined,
      frequency,
      times,
      startDate: new Date(),
      endDate: isTemporary && endDate ? new Date(endDate) : undefined,
      isActive: true,
      reminderEnabled,
    })

    // Reset form
    setName("")
    setDescription("")
    setDosage("")
    setColor("")
    setFormat("")
    setNotInDosey(false)
    setFrequency("daily")
    setTimes(["08:00"])
    setIsTemporary(false)
    setEndDate("")
    setReminderEnabled(true)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="w-5 h-5" />
            Add Medication
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Medication</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Info */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Vitamin D, Aspirin"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="e.g., Daily supplement, Blood pressure"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage *</Label>
                <Input
                  id="dosage"
                  placeholder="e.g., 1000 IU, 10mg"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="color">Color/Identifier</Label>
                <Input
                  id="color"
                  placeholder="e.g., red pill, yellow"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
            </div>

            {/* Medication Format Selector */}
            <div className="space-y-2">
              <Label htmlFor="format">Format (Optional)</Label>
              <Select value={format} onValueChange={(value: any) => setFormat(value)}>
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pill">Pill/Tablet</SelectItem>
                  <SelectItem value="cream">Cream/Ointment</SelectItem>
                  <SelectItem value="injection">Injection</SelectItem>
                  <SelectItem value="liquid">Liquid/Syrup</SelectItem>
                  <SelectItem value="inhaler">Inhaler</SelectItem>
                  <SelectItem value="patch">Patch</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <Label htmlFor="frequency">Frequency</Label>
            <Select value={frequency} onValueChange={(value: any) => setFrequency(value)}>
              <SelectTrigger id="frequency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Once Daily</SelectItem>
                <SelectItem value="multiple">Multiple Times Daily</SelectItem>
                <SelectItem value="as-needed">As Needed</SelectItem>
                <SelectItem value="temporary">Temporary Course</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Times */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Scheduled Times</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddTime}
                className="gap-1 bg-transparent"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Time
              </Button>
            </div>

            <div className="space-y-2">
              {times.map((time, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <Input type="time" value={time} onChange={(e) => handleTimeChange(index, e.target.value)} />
                  {times.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveTime(index)}
                      className="shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Not Stored in Dosey Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Not stored in pillbox</Label>
              <p className="text-xs text-muted-foreground">For medications in fridge, etc.</p>
            </div>
            <Switch checked={notInDosey} onCheckedChange={setNotInDosey} />
          </div>

          {/* Temporary Medication */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Temporary Medication</Label>
                <p className="text-xs text-muted-foreground">For short-term courses like antibiotics</p>
              </div>
              <Switch checked={isTemporary} onCheckedChange={setIsTemporary} />
            </div>

            {isTemporary && (
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            )}
          </div>

          {/* Reminders */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Reminders</Label>
              <p className="text-xs text-muted-foreground">Pill box glow + app notifications</p>
            </div>
            <Switch checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name || !dosage} className="flex-1 bg-primary hover:bg-primary/90">
            Add Medication
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
