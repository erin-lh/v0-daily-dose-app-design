"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AddMedicationDialog } from "@/components/add-medication-dialog"
import { MedicationList } from "@/components/medication-list"
import { ArrowLeft, Plus } from "lucide-react"
import { mockMedications } from "@/lib/mock-data"
import type { Medication } from "@/lib/types"
import Link from "next/link"

export default function MedicationsPage() {
  const [medications, setMedications] = useState<Medication[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dailydose-medications")
      return saved ? JSON.parse(saved) : mockMedications
    }
    return mockMedications
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dailydose-medications", JSON.stringify(medications))
    }
  }, [medications])

  const handleAddMedication = (newMed: Omit<Medication, "id" | "createdAt">) => {
    const medication: Medication = {
      ...newMed,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    const updatedMedications = [...medications, medication]
    setMedications(updatedMedications)
  }

  const handleDeleteMedication = (id: string) => {
    const updatedMedications = medications.filter((m) => m.id !== id)
    setMedications(updatedMedications)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">My Medications</h1>
                <p className="text-sm text-muted-foreground">{medications.length} active medications</p>
              </div>
            </div>
            <AddMedicationDialog
              onAdd={handleAddMedication}
              trigger={
                <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4" />
                  Add New
                </Button>
              }
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MedicationList medications={medications} onDelete={handleDeleteMedication} />
      </main>
    </div>
  )
}
