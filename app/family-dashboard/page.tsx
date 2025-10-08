"use client"

import { useState } from "react"
import { BrandLogoWithTagline } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Users, Check, Clock } from "lucide-react"
import Link from "next/link"

export default function FamilyDashboardPage() {
  const [doseLogs, setDoseLogs] = useState([
    { id: "1", name: "Vitamin D", time: "8:00 AM", status: "pending", color: "bg-amber-400" },
    { id: "2", name: "Blood Pressure", time: "8:00 AM", status: "pending", color: "bg-blue-400" },
    { id: "3", name: "Calcium", time: "12:00 PM", status: "upcoming", color: "bg-green-400" },
  ])

  const handleMarkTaken = (id: string) => {
    setDoseLogs((prev) => prev.map((log) => (log.id === id ? { ...log, status: "taken" } : log)))
  }

  const familyMemberName = "Mom"

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="border-b border-border/30 bg-background/95 backdrop-blur-xl sticky top-0 z-10 safe-top">
        <div className="px-5 py-5">
          <div className="flex items-center justify-between">
            <BrandLogoWithTagline />
            <div className="flex items-center gap-0.5">
              <Link href="/notifications">
                <Button variant="ghost" size="icon" className="relative rounded-full h-11 w-11">
                  <Bell className="w-5 h-5 text-foreground/70" />
                </Button>
              </Link>
              <Link href="/settings">
                <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
                  <Settings className="w-5 h-5 text-foreground/70" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-8">
        <div className="space-y-8 max-w-lg mx-auto">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-foreground">Helping {familyMemberName}</h2>
                <p className="text-sm text-muted-foreground">You can mark doses and receive reminders</p>
              </div>
            </div>
          </Card>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Today's Routine</h3>
              <Badge variant="secondary" className="text-xs">
                {doseLogs.filter((log) => log.status === "taken").length} of {doseLogs.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {doseLogs.map((log) => (
                <Card key={log.id} className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${log.color} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground">{log.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {log.time}
                      </p>
                    </div>
                    {log.status === "taken" ? (
                      <Badge className="bg-success/10 text-success border-success/20">
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Done
                      </Badge>
                    ) : log.status === "pending" ? (
                      <Button onClick={() => handleMarkTaken(log.id)} size="sm" className="h-9">
                        Mark Taken
                      </Button>
                    ) : (
                      <Badge variant="secondary">Upcoming</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Card className="p-6 bg-secondary/30">
            <p className="text-sm text-muted-foreground leading-relaxed text-center">
              You're helping {familyMemberName} stay consistent. You'll receive notifications when it's time for their
              doses.
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}
