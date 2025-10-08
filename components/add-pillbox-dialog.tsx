"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import type { PillBox } from "@/lib/types"

interface AddPillBoxDialogProps {
  onAdd: (pillBox: Omit<PillBox, "id" | "createdAt">) => void
}

const emojiOptions = [
  "👤",
  "👨",
  "👩",
  "👴",
  "👵",
  "👶",
  "🧒",
  "👦",
  "👧",
  "🧑",
  "👨‍🦳",
  "👩‍🦳",
  "👨‍🦰",
  "👩‍🦰",
  "🐶",
  "🐱",
  "🐻",
  "🦊",
]

export function AddPillBoxDialog({ onAdd }: AddPillBoxDialogProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("👤")

  const handleAdd = () => {
    if (!name.trim()) return

    onAdd({
      ownerName: name,
      emoji: selectedEmoji,
      medications: [],
      doseLogs: [],
      streak: {
        currentStreak: 0,
        longestStreak: 0,
        totalDosesTaken: 0,
        adherenceRate: 0,
        lastUpdated: new Date(),
      },
      isActive: true,
    })

    setName("")
    setSelectedEmoji("👤")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full h-14 px-6 shadow-lg shadow-primary/20">
          <Plus className="w-5 h-5 mr-2" />
          Add Pill Box
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Pill Box</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Person's Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., Mom, Dad, Sarah"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Choose Avatar</Label>
            <div className="grid grid-cols-9 gap-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`text-2xl p-2 rounded-xl transition-all ${
                    selectedEmoji === emoji ? "bg-primary/10 ring-2 ring-primary scale-110" : "hover:bg-muted"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleAdd} disabled={!name.trim()} className="w-full rounded-xl h-12">
            Add Pill Box
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
