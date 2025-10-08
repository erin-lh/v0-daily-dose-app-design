"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, BellOff, Clock, AlertCircle, CheckCircle2, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "reminder" | "missed" | "success" | "device"
  title: string
  message: string
  time: Date
  read: boolean
  actionable?: boolean
}

interface NotificationsPanelProps {
  notifications: Notification[]
  onDismiss: (id: string) => void
  onMarkAllRead: () => void
}

export function NotificationsPanel({ notifications, onDismiss, onMarkAllRead }: NotificationsPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "reminder":
        return <Clock className="w-5 h-5 text-primary" />
      case "missed":
        return <AlertCircle className="w-5 h-5 text-destructive" />
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-primary" />
      case "device":
        return <Bell className="w-5 h-5 text-accent" />
    }
  }

  const formatTime = (date: Date) => {
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {unreadCount} new
            </Badge>
          )}
        </div>
        {notifications.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onMarkAllRead} className="text-xs">
            Mark all read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 bg-muted rounded-full mb-4">
            <BellOff className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No notifications yet</p>
          <p className="text-xs text-muted-foreground mt-1">You're all caught up!</p>
        </div>
      ) : (
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-4 rounded-lg border transition-colors",
                  !notification.read && "bg-primary/5 border-primary/20",
                  notification.read && "bg-card border-border",
                )}
              >
                <div className="shrink-0 mt-0.5">{getIcon(notification.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-medium text-foreground text-sm">{notification.title}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 h-6 w-6"
                      onClick={() => onDismiss(notification.id)}
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                  <span className="text-xs text-muted-foreground">{formatTime(notification.time)}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </Card>
  )
}
