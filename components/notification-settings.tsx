"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Bell, BellOff, Clock, Volume2, Vibrate, AlertCircle } from "lucide-react"
import { useState } from "react"

export function NotificationSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [backupReminderHours, setBackupReminderHours] = useState("0")
  const [backupReminderMinutes, setBackupReminderMinutes] = useState("15")

  // Calculate total minutes for validation
  const totalMinutes = Number.parseInt(backupReminderHours || "0") * 60 + Number.parseInt(backupReminderMinutes || "0")
  const showWarning = totalMinutes > 120

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Notification Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your medication reminders</p>
      </div>

      <div className="space-y-6">
        {/* Enable/Disable Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {notificationsEnabled ? (
                <Bell className="w-5 h-5 text-primary" />
              ) : (
                <BellOff className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div>
              <Label htmlFor="notifications">Notifications</Label>
              <p className="text-xs text-muted-foreground">Enable medication reminders</p>
            </div>
          </div>
          <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
        </div>

        {/* Backup Reminder */}
        {notificationsEnabled && (
          <>
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <Label>Backup Reminder</Label>
                  <p className="text-xs text-muted-foreground">Remind me again if I don't mark off my medication</p>
                </div>
              </div>
              <div className="ml-14 space-y-3">
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label htmlFor="hours" className="text-xs text-muted-foreground">
                      Hours
                    </Label>
                    <Input
                      id="hours"
                      type="number"
                      min="0"
                      max="24"
                      value={backupReminderHours}
                      onChange={(e) => setBackupReminderHours(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="minutes" className="text-xs text-muted-foreground">
                      Minutes
                    </Label>
                    <Input
                      id="minutes"
                      type="number"
                      min="0"
                      max="59"
                      value={backupReminderMinutes}
                      onChange={(e) => setBackupReminderMinutes(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                {showWarning && (
                  <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-amber-800 dark:text-amber-400">
                      We recommend keeping this within 1 hour to help consistency
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Notification Sound */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Volume2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <Label htmlFor="sound">Notification Sound</Label>
                  <p className="text-xs text-muted-foreground">Play sound for reminders</p>
                </div>
              </div>
              <Switch id="sound" defaultChecked />
            </div>

            {/* Vibration */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Vibrate className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <Label htmlFor="vibrate">Vibration</Label>
                  <p className="text-xs text-muted-foreground">Vibrate on notifications</p>
                </div>
              </div>
              <Switch id="vibrate" defaultChecked />
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
