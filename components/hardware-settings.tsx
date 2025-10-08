"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Bell, Volume2, Lightbulb, Vibrate, TestTube } from "lucide-react"
import { useState } from "react"

interface HardwareSettingsProps {
  onTestAlert?: () => void
}

export function HardwareSettings({ onTestAlert }: HardwareSettingsProps) {
  const [ledEnabled, setLedEnabled] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const [ledBrightness, setLedBrightness] = useState([70])
  const [soundVolume, setSoundVolume] = useState([60])

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Hardware Alerts</h2>
          <p className="text-sm text-muted-foreground">Customize pill box notifications</p>
        </div>
        <Button variant="outline" size="sm" onClick={onTestAlert} className="gap-2 bg-transparent">
          <TestTube className="w-4 h-4" />
          Test Alert
        </Button>
      </div>

      <div className="space-y-6">
        {/* LED Light */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div>
                <Label htmlFor="led">LED Light</Label>
                <p className="text-xs text-muted-foreground">Pill box glows at reminder time</p>
              </div>
            </div>
            <Switch id="led" checked={ledEnabled} onCheckedChange={setLedEnabled} />
          </div>

          {ledEnabled && (
            <div className="ml-14 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Brightness</span>
                <span className="text-foreground font-medium">{ledBrightness[0]}%</span>
              </div>
              <Slider value={ledBrightness} onValueChange={setLedBrightness} max={100} step={10} />
            </div>
          )}
        </div>

        {/* Sound */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Volume2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <Label htmlFor="sound">Sound Alert</Label>
                <p className="text-xs text-muted-foreground">Gentle chime notification</p>
              </div>
            </div>
            <Switch id="sound" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </div>

          {soundEnabled && (
            <div className="ml-14 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Volume</span>
                <span className="text-foreground font-medium">{soundVolume[0]}%</span>
              </div>
              <Slider value={soundVolume} onValueChange={setSoundVolume} max={100} step={10} />
            </div>
          )}
        </div>

        {/* Vibration */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Vibrate className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Label htmlFor="vibration">Vibration</Label>
              <p className="text-xs text-muted-foreground">Subtle haptic feedback</p>
            </div>
          </div>
          <Switch id="vibration" checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
        </div>

        {/* App Notifications */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Bell className="w-5 h-5 text-accent" />
              </div>
              <div>
                <Label htmlFor="app-notifications">App Notifications</Label>
                <p className="text-xs text-muted-foreground">Push notifications to phone & watch</p>
              </div>
            </div>
            <Switch id="app-notifications" defaultChecked />
          </div>
        </div>
      </div>
    </Card>
  )
}
