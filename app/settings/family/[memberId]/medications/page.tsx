"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ChevronLeft, Pill } from "lucide-react"
import Link from "next/link"
import { mockMedications } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

export default function MemberMedicationsPage() {
  const [allowedMeds, setAllowedMeds] = useState<Set<string>>(new Set(["1", "2"]))
  const memberName = "Sarah Johnson"

  const toggleMedication = (medId: string) => {
    setAllowedMeds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(medId)) {
        newSet.delete(medId)
      } else {
        newSet.add(medId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="border-b border-border/30 bg-background/95 backdrop-blur-xl sticky top-0 z-10 safe-top">
        <div className="px-5 py-5">
          <div className="flex items-center justify-between">
            <Link href="/settings/family">
              <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Medication Access</h1>
            <div className="w-11" />
          </div>
        </div>
      </header>

      <main className="px-5 py-8">
        <div className="space-y-8 max-w-lg mx-auto">
          <Card className="p-6 bg-secondary/30 border-primary/20">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Choose which medications <span className="font-semibold text-foreground">{memberName}</span> can see and
              mark as taken. They won't see your streaks or other personal data.
            </p>
          </Card>

          <div className="space-y-3">
            {mockMedications.map((med) => (
              <Card key={med.id} className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Pill className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{med.name}</h3>
                        {med.color && (
                          <Badge variant="outline" className="text-xs">
                            {med.color}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{med.dosage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{med.times.join(", ")}</p>
                    </div>
                  </div>
                  <Switch checked={allowedMeds.has(med.id)} onCheckedChange={() => toggleMedication(med.id)} />
                </div>
              </Card>
            ))}
          </div>

          <Button className="w-full h-14 text-base font-medium" size="lg">
            Save Changes
          </Button>
        </div>
      </main>
    </div>
  )
}
