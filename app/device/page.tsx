"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PillBoxStatus } from "@/components/pill-box-status"
import { HardwareSettings } from "@/components/hardware-settings"
import { ArrowLeft } from "lucide-react"
import { mockPillBoxStatus } from "@/lib/mock-data"
import type { PillBoxStatus as PillBoxStatusType } from "@/lib/types"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function DevicePage() {
  const [pillBoxStatus, setPillBoxStatus] = useState<PillBoxStatusType>(mockPillBoxStatus)
  const { toast } = useToast()

  const handleReconnect = () => {
    toast({
      title: "Reconnecting...",
      description: "Searching for your DailyDose+ pill box",
    })

    // Simulate reconnection
    setTimeout(() => {
      setPillBoxStatus({ ...pillBoxStatus, isConnected: true })
      toast({
        title: "Connected!",
        description: "Your pill box is now connected",
      })
    }, 2000)
  }

  const handleTestAlert = () => {
    toast({
      title: "Test Alert Sent",
      description: "Your pill box should glow and chime now",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Device Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your pill box connection</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <PillBoxStatus status={pillBoxStatus} onReconnect={handleReconnect} />
          <HardwareSettings onTestAlert={handleTestAlert} />
        </div>
      </main>
    </div>
  )
}
