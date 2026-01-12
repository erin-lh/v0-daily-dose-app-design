"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PackageCheck } from "lucide-react"

const DAYS_OF_WEEK = [
  { value: "sunday", label: "Sunday" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
]

const TIMES = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
]

export function BoxRefillSettings() {
  const [refillDay, setRefillDay] = useState("sunday")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [notificationTime, setNotificationTime] = useState("09:00")

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
          <PackageCheck className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Box Refill Reminder</h2>
      </div>

      <div className="space-y-6">
        {/* Refill Day Selection */}
        <div className="space-y-3">
          <Label htmlFor="refill-day" className="text-sm font-medium text-foreground">
            Refill Day
          </Label>
          <Select value={refillDay} onValueChange={setRefillDay}>
            <SelectTrigger id="refill-day" className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {DAYS_OF_WEEK.map((day) => (
                <SelectItem key={day.value} value={day.value}>
                  {day.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Choose the day you typically refill your pill box</p>
        </div>

        {/* Enable Notifications */}
        <div className="flex items-center justify-between py-3">
          <div className="space-y-0.5">
            <Label htmlFor="refill-notifications" className="text-sm font-medium text-foreground">
              Refill Notifications
            </Label>
            <p className="text-sm text-muted-foreground">Get reminded on refill day</p>
          </div>
          <Switch id="refill-notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
        </div>

        {/* Notification Time */}
        {notificationsEnabled && (
          <div className="space-y-3 pl-0 animate-in slide-in-from-top-2">
            <Label htmlFor="refill-time" className="text-sm font-medium text-foreground">
              Notification Time
            </Label>
            <Select value={notificationTime} onValueChange={setNotificationTime}>
              <SelectTrigger id="refill-time" className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TIMES.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </Card>
  )
}
