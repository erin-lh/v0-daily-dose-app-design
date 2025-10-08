"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Battery, BatteryCharging, BatteryLow, Bluetooth, BluetoothOff, RefreshCw, Box } from "lucide-react"
import type { PillBoxStatusType } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PillBoxStatusProps {
  status: PillBoxStatusType
  onReconnect?: () => void
}

export function PillBoxStatus({ status, onReconnect }: PillBoxStatusProps) {
  const getBatteryIcon = () => {
    if (status.batteryLevel > 50) return <Battery className="w-5 h-5 text-primary" />
    if (status.batteryLevel > 20) return <BatteryCharging className="w-5 h-5 text-accent" />
    return <BatteryLow className="w-5 h-5 text-destructive" />
  }

  const getBatteryColor = () => {
    if (status.batteryLevel > 50) return "text-primary"
    if (status.batteryLevel > 20) return "text-accent"
    return "text-destructive"
  }

  const formatLastActivity = (date?: Date) => {
    if (!date) return "Never"
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString()
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn("p-3 rounded-full", status.isConnected ? "bg-primary/10" : "bg-muted")}>
            <Box className={cn("w-6 h-6", status.isConnected ? "text-primary" : "text-muted-foreground")} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">DailyDose+ Pill Box</h2>
            <div className="flex items-center gap-2 mt-1">
              {status.isConnected ? (
                <>
                  <Bluetooth className="w-4 h-4 text-primary" />
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Connected
                  </Badge>
                </>
              ) : (
                <>
                  <BluetoothOff className="w-4 h-4 text-muted-foreground" />
                  <Badge variant="secondary" className="bg-muted text-muted-foreground">
                    Disconnected
                  </Badge>
                </>
              )}
            </div>
          </div>
        </div>

        {!status.isConnected && (
          <Button variant="outline" size="sm" onClick={onReconnect} className="gap-2 bg-transparent">
            <RefreshCw className="w-4 h-4" />
            Reconnect
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Battery Status */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getBatteryIcon()}
            <span>Battery Level</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={cn("text-3xl font-bold", getBatteryColor())}>{status.batteryLevel}%</span>
          </div>
          {status.batteryLevel < 20 && <p className="text-xs text-destructive">Low battery - please charge soon</p>}
        </div>

        {/* Last Activity */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Box className="w-5 h-5" />
            <span>Last Opened</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">{formatLastActivity(status.lastOpened)}</span>
          </div>
          {status.firmwareVersion && (
            <p className="text-xs text-muted-foreground">Firmware v{status.firmwareVersion}</p>
          )}
        </div>
      </div>

      {/* Activity Timeline */}
      {status.lastOpened && status.lastClosed && (
        <div className="mt-6 pt-6 border-t border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">Recent Activity</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Opened</span>
              <span className="text-foreground font-medium">{formatLastActivity(status.lastOpened)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Closed</span>
              <span className="text-foreground font-medium">{formatLastActivity(status.lastClosed)}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
