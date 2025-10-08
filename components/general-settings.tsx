"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Moon, Lock, Shield, Database } from "lucide-react"

export function GeneralSettings() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">General Settings</h2>
        <p className="text-sm text-muted-foreground">Customize your app experience</p>
      </div>

      <div className="space-y-6">
        {/* Theme */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Moon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <Label htmlFor="theme">Appearance</Label>
              <p className="text-xs text-muted-foreground">Choose your preferred theme</p>
            </div>
          </div>
          <div className="ml-14">
            <Select defaultValue="auto">
              <SelectTrigger id="theme">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="auto">Auto (System)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Lock Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Lock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <Label htmlFor="lock-mode">Lock Mode</Label>
              <p className="text-xs text-muted-foreground">Require PIN to open pill box</p>
            </div>
          </div>
          <Switch id="lock-mode" />
        </div>

        {/* Privacy */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Label htmlFor="privacy">Privacy Mode</Label>
              <p className="text-xs text-muted-foreground">Hide medication names on lock screen</p>
            </div>
          </div>
          <Switch id="privacy" />
        </div>

        {/* Data Sync */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Database className="w-5 h-5 text-accent" />
            </div>
            <div>
              <Label htmlFor="sync">Cloud Sync</Label>
              <p className="text-xs text-muted-foreground">Backup data across devices</p>
            </div>
          </div>
          <Switch id="sync" defaultChecked />
        </div>
      </div>
    </Card>
  )
}
