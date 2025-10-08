"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, LogOut } from "lucide-react"

export function AccountSettings() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Account</h2>
        <p className="text-sm text-muted-foreground">Manage your profile information</p>
      </div>

      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <Button variant="outline" size="sm" className="bg-transparent">
              Change Photo
            </Button>
            <p className="text-xs text-muted-foreground mt-1">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <Input id="name" placeholder="John Doe" defaultValue="Alex Johnson" />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <Input id="email" type="email" placeholder="you@example.com" defaultValue="alex@example.com" />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-muted-foreground" />
            <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <Button className="flex-1 bg-primary hover:bg-primary/90">Save Changes</Button>
          <Button variant="outline" className="gap-2 bg-transparent text-destructive hover:bg-destructive/10">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </Card>
  )
}
