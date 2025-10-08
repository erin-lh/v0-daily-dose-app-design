"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { NotificationsPanel } from "@/components/notifications-panel"
import { ReminderSettings } from "@/components/reminder-settings"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { BottomNav } from "@/components/bottom-nav"

interface Notification {
  id: string
  type: "reminder" | "missed" | "success" | "device"
  title: string
  message: string
  time: Date
  read: boolean
  actionable?: boolean
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "reminder",
      title: "Time for your medication",
      message: "Vitamin D (1000 IU) - Scheduled for 8:00 AM",
      time: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
      actionable: true,
    },
    {
      id: "2",
      type: "success",
      title: "Great job!",
      message: "You've maintained your streak for 12 days",
      time: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
    },
    {
      id: "3",
      type: "device",
      title: "Battery running low",
      message: "Your pill box battery is at 20%. Please charge soon.",
      time: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: true,
    },
    {
      id: "4",
      type: "missed",
      title: "Missed dose",
      message: "Blood Pressure Med (10mg) - Scheduled for 8:00 PM yesterday",
      time: new Date(Date.now() - 1000 * 60 * 60 * 12),
      read: true,
    },
  ])

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
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
            <div>
              <h1 className="text-xl font-semibold">Notifications</h1>
              <p className="text-sm text-muted-foreground">Manage alerts & reminders</p>
            </div>
          </div>
        </div>
      </header>

      <main className="px-5 py-6">
        <div className="space-y-6 max-w-lg mx-auto">
          <NotificationsPanel
            notifications={notifications}
            onDismiss={handleDismiss}
            onMarkAllRead={handleMarkAllRead}
          />
          <ReminderSettings />
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
