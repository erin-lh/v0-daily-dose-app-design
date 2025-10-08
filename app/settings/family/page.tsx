"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Copy, Check, Trash2, ChevronLeft, Mail } from "lucide-react"
import Link from "next/link"

interface FamilyMember {
  id: string
  name: string
  email: string
  joinedAt: Date
  allowedMedications: string[]
}

export default function FamilyManagementPage() {
  const [familyCode] = useState("ABC123")
  const [copied, setCopied] = useState(false)
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      joinedAt: new Date("2024-01-15"),
      allowedMedications: ["1", "2"],
    },
  ])

  const handleCopyCode = () => {
    navigator.clipboard.writeText(familyCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRemoveMember = (memberId: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== memberId))
  }

  return (
    <div className="min-h-screen bg-background pb-safe">
      <header className="border-b border-border/30 bg-background/95 backdrop-blur-xl sticky top-0 z-10 safe-top">
        <div className="px-5 py-5">
          <div className="flex items-center justify-between">
            <Link href="/settings">
              <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Family Access</h1>
            <div className="w-11" />
          </div>
        </div>
      </header>

      <main className="px-5 py-8">
        <div className="space-y-8 max-w-lg mx-auto">
          {/* Family Code Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Your Family Code</h2>
                  <p className="text-sm text-muted-foreground">Share this code with family members</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Family Code</Label>
                <div className="flex gap-2">
                  <Input
                    value={familyCode}
                    readOnly
                    className="h-14 text-center text-2xl font-semibold tracking-widest"
                  />
                  <Button onClick={handleCopyCode} size="lg" className="h-14 px-6">
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              <Card className="p-4 bg-secondary/30 border-primary/20">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Family members can use this code to join and help you stay consistent. They'll receive notifications
                  and can mark doses for you.
                </p>
              </Card>
            </div>
          </Card>

          {/* Family Members List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Family Members</h2>
              <Badge variant="secondary">{familyMembers.length}</Badge>
            </div>

            {familyMembers.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No family members yet</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Share your family code to invite someone to help with your routine
                </p>
              </Card>
            ) : (
              <div className="space-y-3">
                {familyMembers.map((member) => (
                  <Card key={member.id} className="p-5">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-semibold text-lg">
                              {member.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{member.name}</h3>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                              <Mail className="w-3.5 h-3.5" />
                              <span>{member.email}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Joined {member.joinedAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveMember(member.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="pt-4 border-t border-border/50">
                        <Link href={`/settings/family/${member.id}/medications`}>
                          <Button variant="outline" className="w-full bg-transparent">
                            Manage Medication Access
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
