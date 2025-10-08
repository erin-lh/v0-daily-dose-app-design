"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Trash2, Edit } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { AddPillBoxDialog } from "@/components/add-pillbox-dialog"
import { mockPillBoxes } from "@/lib/mock-data"
import type { PillBox } from "@/lib/types"

export default function PillBoxesPage() {
  const [pillBoxes, setPillBoxes] = useState<PillBox[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dailydose-pillboxes")
      return saved ? JSON.parse(saved) : mockPillBoxes
    }
    return mockPillBoxes
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dailydose-pillboxes", JSON.stringify(pillBoxes))
    }
  }, [pillBoxes])

  const handleAddPillBox = (newPillBox: Omit<PillBox, "id" | "createdAt">) => {
    const pillBox: PillBox = {
      ...newPillBox,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setPillBoxes((prev) => [...prev, pillBox])
  }

  const handleDelete = (id: string) => {
    if (pillBoxes.length === 1) {
      alert("You must have at least one pill box")
      return
    }
    if (confirm("Are you sure you want to delete this pill box?")) {
      setPillBoxes((prev) => prev.filter((pb) => pb.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="border-b border-border/30 bg-background/95 backdrop-blur-xl sticky top-0 z-10 safe-top">
        <div className="px-5 py-4">
          <div className="flex items-center gap-3">
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Manage Pill Boxes</h1>
          </div>
        </div>
      </header>

      <main className="px-5 py-6">
        <div className="space-y-6 max-w-lg mx-auto">
          <section className="slide-up-enter">
            <p className="text-sm text-muted-foreground mb-4">
              Add pill boxes for household members to track their medications from one app. Each person gets their own
              medications, reminders, and streak tracking.
            </p>
          </section>

          <section className="space-y-3">
            {pillBoxes.map((pillBox, index) => (
              <Card key={pillBox.id} className="p-4 slide-up-enter" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{pillBox.emoji}</div>
                    <div>
                      <h3 className="font-semibold">{pillBox.ownerName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {pillBox.medications.length} medication{pillBox.medications.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Link href={`/settings/pillboxes/${pillBox.id}/medications`}>
                      <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-9 w-9 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(pillBox.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </section>

          <section className="flex justify-center pt-6">
            <AddPillBoxDialog onAdd={handleAddPillBox} />
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
