"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Clock, Moon, Smartphone } from "lucide-react"

export function ReminderSettings() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Reminder Settings</h2>
        <p className="text-sm text-muted-foreground">Customize when and how you receive reminders</p>
      </div>

      <div className="space-y-6">
        {/* Smart Reminders */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Label htmlFor="smart-reminders">Smart Reminders</Label>
              <p className="text-xs text-muted-foreground">Adaptive timing based on your routine</p>
            </div>
          </div>
          <Switch id="smart-reminders" defaultChecked />
        </div>

        {/* Advance Notice */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <Label htmlFor="advance-notice">Advance Notice</Label>
              <p className="text-xs text-muted-foreground">Remind me before scheduled time</p>
            </div>
          </div>
          <div className="ml-14">
            <Select defaultValue="15">
              <SelectTrigger id="advance-notice">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">At scheduled time</SelectItem>
                <SelectItem value="5">5 minutes before</SelectItem>
                <SelectItem value="15">15 minutes before</SelectItem>
                <SelectItem value="30">30 minutes before</SelectItem>
                <SelectItem value="60">1 hour before</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Missed Dose Alerts */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Bell className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <Label htmlFor="missed-alerts">Missed Dose Alerts</Label>
                <p className="text-xs text-muted-foreground">Alert if dose is not taken</p>
              </div>
            </div>
            <Switch id="missed-alerts" defaultChecked />
          </div>
          <div className="ml-14">
            <Select defaultValue="30">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">After 15 minutes</SelectItem>
                <SelectItem value="30">After 30 minutes</SelectItem>
                <SelectItem value="60">After 1 hour</SelectItem>
                <SelectItem value="120">After 2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Moon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <Label htmlFor="quiet-hours">Quiet Hours</Label>
                <p className="text-xs text-muted-foreground">Silence notifications during sleep</p>
              </div>
            </div>
            <Switch id="quiet-hours" />
          </div>
        </div>

        {/* Smartwatch Sync */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Smartphone className="w-5 h-5 text-accent" />
            </div>
            <div>
              <Label htmlFor="smartwatch">Smartwatch Notifications</Label>
              <p className="text-xs text-muted-foreground">Sync reminders to Apple Watch / Wear OS</p>
            </div>
          </div>
          <Switch id="smartwatch" defaultChecked />
        </div>
      </div>
    </Card>
  )
}
