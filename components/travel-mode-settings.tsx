"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plane, Globe, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TravelModeSettings() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-lg font-semibold text-foreground">Travel Mode</h2>
          <Badge variant="secondary" className="bg-accent/10 text-accent">
            Auto-adjust
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Automatically adjust reminders for time zone changes</p>
      </div>

      <div className="space-y-6">
        {/* Enable Travel Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Plane className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Label htmlFor="travel-mode">Enable Travel Mode</Label>
              <p className="text-xs text-muted-foreground">Auto-detect time zone changes</p>
            </div>
          </div>
          <Switch id="travel-mode" defaultChecked />
        </div>

        {/* Current Time Zone */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Globe className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <Label htmlFor="timezone">Current Time Zone</Label>
              <p className="text-xs text-muted-foreground">Detected automatically</p>
            </div>
          </div>
          <div className="ml-14">
            <Select defaultValue="america-new-york">
              <SelectTrigger id="timezone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="america-new-york">Eastern Time (ET)</SelectItem>
                <SelectItem value="america-chicago">Central Time (CT)</SelectItem>
                <SelectItem value="america-denver">Mountain Time (MT)</SelectItem>
                <SelectItem value="america-los-angeles">Pacific Time (PT)</SelectItem>
                <SelectItem value="europe-london">London (GMT)</SelectItem>
                <SelectItem value="europe-paris">Paris (CET)</SelectItem>
                <SelectItem value="asia-tokyo">Tokyo (JST)</SelectItem>
                <SelectItem value="australia-sydney">Sydney (AEDT)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Adjustment Method */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <Label htmlFor="adjustment">Time Adjustment</Label>
              <p className="text-xs text-muted-foreground">How to handle schedule changes</p>
            </div>
          </div>
          <div className="ml-14">
            <Select defaultValue="auto">
              <SelectTrigger id="adjustment">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Automatic (Recommended)</SelectItem>
                <SelectItem value="keep-local">Keep Local Time</SelectItem>
                <SelectItem value="keep-home">Keep Home Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Location Services */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div>
              <Label htmlFor="location">Location Services</Label>
              <p className="text-xs text-muted-foreground">For accurate time zone detection</p>
            </div>
          </div>
          <Switch id="location" defaultChecked />
        </div>

        {/* Info Box */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-sm text-foreground">
            <strong>How it works:</strong> When you travel, DailyDose+ automatically detects your new time zone and
            adjusts your medication schedule to maintain consistency with your home routine.
          </p>
        </div>
      </div>
    </Card>
  )
}
