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
import { BottomNav } from "@/components/bottom-nav"

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
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/95 backdrop-blur-xl sticky top-0 z-10 safe-top">
        <div className="px-5 py-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Device</h1>
              <p className="text-sm text-muted-foreground">Manage pill box connection</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 py-6">
        <div className="space-y-6 max-w-lg mx-auto">
          <PillBoxStatus status={pillBoxStatus} onReconnect={handleReconnect} />
          <HardwareSettings onTestAlert={handleTestAlert} />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
