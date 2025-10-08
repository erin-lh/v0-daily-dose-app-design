"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Plane, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"
import { TravelDocumentUpload } from "@/components/travel-document-upload"
import { mockTravelDocuments } from "@/lib/mock-data"
import type { TravelDocument } from "@/lib/types"

export default function TravelPage() {
  const [documents, setDocuments] = useState<TravelDocument[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dailydose-travel-documents")
      return saved ? JSON.parse(saved) : mockTravelDocuments
    }
    return mockTravelDocuments
  })

  const [travelMode, setTravelMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dailydose-travel-mode")
      return saved ? JSON.parse(saved) : { enabled: false, destination: "", timezone: "" }
    }
    return { enabled: false, destination: "", timezone: "" }
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dailydose-travel-documents", JSON.stringify(documents))
      localStorage.setItem("dailydose-travel-mode", JSON.stringify(travelMode))
    }
  }, [documents, travelMode])

  const handleUpload = (newDoc: Omit<TravelDocument, "id" | "uploadedAt">) => {
    const document: TravelDocument = {
      ...newDoc,
      id: Date.now().toString(),
      uploadedAt: new Date(),
    }
    setDocuments((prev) => [...prev, document])
  }

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id))
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="border-b border-border/30 bg-background/95 backdrop-blur-xl sticky top-0 z-10 safe-top">
        <div className="px-5 py-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-primary" />
              <h1 className="text-xl font-semibold">Travel</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-6">
        <div className="space-y-6 max-w-lg mx-auto">
          <section className="slide-up-enter">
            <Card className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold">Travel Mode</h2>
                  <p className="text-sm text-muted-foreground">Auto-adjust reminders for your timezone</p>
                </div>
                <Switch
                  checked={travelMode.enabled}
                  onCheckedChange={(enabled) => setTravelMode((prev) => ({ ...prev, enabled }))}
                />
              </div>

              {travelMode.enabled && (
                <div className="space-y-4 pt-2 border-t border-border/30">
                  <div className="space-y-2">
                    <Label htmlFor="destination" className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Destination
                    </Label>
                    <Input
                      id="destination"
                      placeholder="e.g., Tokyo, Japan"
                      value={travelMode.destination}
                      onChange={(e) => setTravelMode((prev) => ({ ...prev, destination: e.target.value }))}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-sm font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Timezone
                    </Label>
                    <select
                      id="timezone"
                      value={travelMode.timezone}
                      onChange={(e) => setTravelMode((prev) => ({ ...prev, timezone: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm"
                    >
                      <option value="">Select timezone</option>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                      <option value="Asia/Tokyo">Tokyo (JST)</option>
                      <option value="Asia/Dubai">Dubai (GST)</option>
                      <option value="Australia/Sydney">Sydney (AEDT)</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-muted-foreground">
                      Your medication reminders will automatically adjust to your selected timezone. You'll receive
                      notifications at the same local time as your home schedule.
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.1s" }}>
            <Card className="p-5 space-y-4">
              <div>
                <h2 className="text-base font-semibold">Travel Documents</h2>
                <p className="text-sm text-muted-foreground">Store prescription scripts and bottle labels</p>
              </div>

              <TravelDocumentUpload documents={documents} onUpload={handleUpload} onDelete={handleDelete} />

              <div className="pt-2 border-t border-border/30">
                <p className="text-xs text-muted-foreground">
                  Keep digital copies of your prescriptions and medication labels for easy access during travel. These
                  documents are stored locally on your device.
                </p>
              </div>
            </Card>
          </section>

          <section className="slide-up-enter" style={{ animationDelay: "0.2s" }}>
            <Card className="p-5 space-y-3 bg-primary/5 border-primary/20">
              <h3 className="text-sm font-semibold text-primary">Travel Tips</h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Keep medications in original containers with labels visible</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Carry prescriptions in your carry-on luggage</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Check medication regulations for your destination country</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Set reminders 1 day before departure to refill prescriptions</span>
                </li>
              </ul>
            </Card>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
