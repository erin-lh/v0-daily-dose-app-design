"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TravelModeSettings } from "@/components/travel-mode-settings"
import { GeneralSettings } from "@/components/general-settings"
import { AccountSettings } from "@/components/account-settings"
import { ArrowLeft, Users, ChevronRight, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="border-b border-border/30 bg-background/95 backdrop-blur-xl sticky top-0 z-10 safe-top">
        <div className="px-5 py-5">
          <div className="flex items-center justify-between">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Settings</h1>
            <div className="w-11" />
          </div>
        </div>
      </header>

      <main className="px-5 py-8">
        <div className="space-y-8 max-w-lg mx-auto">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Family & Sharing</h2>
            <Link href="/settings/family">
              <div className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Family Access</h3>
                    <p className="text-sm text-muted-foreground">Manage who can help with your routine</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </Link>
          </Card>

          <TravelModeSettings />
          <GeneralSettings />
          <AccountSettings />

          <Card className="p-6">
            <Button
              variant="outline"
              className="w-full h-14 text-base font-medium text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </Button>
          </Card>
        </div>
      </main>
    </div>
  )
}
