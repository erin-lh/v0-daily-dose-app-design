"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AddMedicationDialog } from "@/components/add-medication-dialog"
import { MedicationList } from "@/components/medication-list"
import { ArrowLeft, Plus } from "lucide-react"
import { mockPillBoxes } from "@/lib/mock-data"
import type { Medication, PillBox } from "@/lib/types"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { cn } from "@/lib/utils"

export default function MedicationsPage() {
  const [pillBoxes, setPillBoxes] = useState<PillBox[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dailydose-pillboxes")
      return saved ? JSON.parse(saved) : mockPillBoxes
    }
    return mockPillBoxes
  })

  const [activePillBoxId, setActivePillBoxId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dailydose-active-pillbox")
      return saved || pillBoxes[0]?.id
    }
    return pillBoxes[0]?.id
  })

  const [medicationFilter, setMedicationFilter] = useState<"active" | "archived">("active")

  const activePillBox = pillBoxes.find((pb) => pb.id === activePillBoxId) || pillBoxes[0]

  const filteredMedications = activePillBox.medications.filter((med) => {
    if (medicationFilter === "archived") {
      return med.archived === true
    }
    return !med.archived // Show active (non-archived) medications
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dailydose-pillboxes", JSON.stringify(pillBoxes))
      localStorage.setItem("dailydose-active-pillbox", activePillBoxId)
    }
  }, [pillBoxes, activePillBoxId])

  const handleAddMedication = (newMed: Omit<Medication, "id" | "createdAt">) => {
    const medication: Medication = {
      ...newMed,
      id: Date.now().toString(),
      createdAt: new Date(),
      archived: false, // New medications are not archived
    }

    setPillBoxes((prev) =>
      prev.map((pb) => (pb.id === activePillBoxId ? { ...pb, medications: [...pb.medications, medication] } : pb)),
    )
  }

  const handleArchiveMedication = (id: string) => {
    setPillBoxes((prev) =>
      prev.map((pb) =>
        pb.id === activePillBoxId
          ? { ...pb, medications: pb.medications.map((m) => (m.id === id ? { ...m, archived: true } : m)) }
          : pb,
      ),
    )
  }

  const handleDeleteMedication = (id: string) => {
    setPillBoxes((prev) =>
      prev.map((pb) =>
        pb.id === activePillBoxId ? { ...pb, medications: pb.medications.filter((m) => m.id !== id) } : pb,
      ),
    )
  }

  const activeMedicationsCount = activePillBox.medications.filter((m) => !m.archived).length
  const archivedMedicationsCount = activePillBox.medications.filter((m) => m.archived).length

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="border-b border-border/30 bg-background/95 backdrop-blur-xl sticky top-0 z-10 safe-top">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Medications</h1>
                <p className="text-sm text-muted-foreground">{activeMedicationsCount} active</p>
              </div>
            </div>
            <AddMedicationDialog
              onAdd={handleAddMedication}
              trigger={
                <Button size="sm" className="gap-2 rounded-full h-10 px-4">
                  <Plus className="w-4 h-4" />
                  Add
                </Button>
              }
            />
          </div>
        </div>
      </header>

      <main className="px-5 py-6">
        <div className="max-w-lg mx-auto space-y-6">
          {pillBoxes.length > 1 && (
            <section className="slide-up-enter">
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {pillBoxes.map((pb) => (
                  <button
                    key={pb.id}
                    onClick={() => setActivePillBoxId(pb.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 transition-all whitespace-nowrap",
                      pb.id === activePillBoxId
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border/30 bg-background text-muted-foreground hover:border-primary/30",
                    )}
                  >
                    <span className="text-xl">{pb.emoji}</span>
                    <span className="text-sm font-medium">{pb.ownerName}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="slide-up-enter">
            <div className="flex gap-2">
              <button
                onClick={() => setMedicationFilter("active")}
                className={cn(
                  "flex-1 px-4 py-2.5 rounded-2xl border-2 transition-all text-sm font-medium",
                  medicationFilter === "active"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/30 bg-background text-muted-foreground hover:border-primary/30",
                )}
              >
                Active ({activeMedicationsCount})
              </button>
              <button
                onClick={() => setMedicationFilter("archived")}
                className={cn(
                  "flex-1 px-4 py-2.5 rounded-2xl border-2 transition-all text-sm font-medium",
                  medicationFilter === "archived"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border/30 bg-background text-muted-foreground hover:border-primary/30",
                )}
              >
                Archived ({archivedMedicationsCount})
              </button>
            </div>
          </section>

          <MedicationList
            medications={filteredMedications}
            onDelete={handleDeleteMedication}
            onArchive={handleArchiveMedication}
          />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
