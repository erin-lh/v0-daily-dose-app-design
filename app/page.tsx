"use client"

import { useState } from "react"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { User, Users, ArrowRight, Smartphone, Mail } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [mode, setMode] = useState<"select" | "myself" | "family">("select")
  const [phone, setPhone] = useState("")
  const [code, setCode] = useState("")
  const [codeSent, setCodeSent] = useState(false)
  const [email, setEmail] = useState("")
  const [familyCode, setFamilyCode] = useState("")
  const router = useRouter()

  const handleSendCode = () => {
    // In production, this would send an SMS code
    setCodeSent(true)
  }

  const handleVerifyCode = () => {
    // In production, this would verify the SMS code
    router.push("/dashboard")
  }

  const handleSocialLogin = (provider: "apple" | "google") => {
    // In production, this would handle OAuth flow
    router.push("/dashboard")
  }

  const handleFamilyJoin = () => {
    // In production, this would join the family with the code
    router.push("/family-dashboard")
  }

  if (mode === "select") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-12">
        <div className="w-full max-w-md space-y-12 slide-up-enter">
          <div className="text-center space-y-4">
            <BrandLogo className="mx-auto" />
            <p className="text-muted-foreground text-base leading-relaxed px-4">
              Stay consistent with your wellness routine
            </p>
          </div>

          <div className="space-y-4">
            <Card
              className="p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border-2 hover:border-primary/30"
              onClick={() => setMode("myself")}
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">For Myself</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Track your medications, build streaks, and stay on top of your wellness routine
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </Card>

            <Card
              className="p-8 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] border-2 hover:border-primary/30"
              onClick={() => setMode("family")}
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Join Family</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Help a loved one stay consistent by receiving notifications and marking doses
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </Card>
          </div>

          <p className="text-center text-xs text-muted-foreground px-8 leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    )
  }

  if (mode === "myself") {
    return (
      <div className="min-h-screen bg-background flex flex-col px-5 py-12">
        <div className="w-full max-w-md mx-auto space-y-12 slide-up-enter">
          <div className="space-y-6">
            <button onClick={() => setMode("select")} className="text-muted-foreground text-sm hover:text-foreground">
              ← Back
            </button>
            <div className="space-y-3">
              <BrandLogo />
              <h1 className="text-3xl font-semibold text-foreground">Welcome back</h1>
              <p className="text-muted-foreground text-base">Sign in to continue your wellness journey</p>
            </div>
          </div>

          <div className="space-y-6">
            <Button
              onClick={() => handleSocialLogin("apple")}
              className="w-full h-14 text-base font-medium bg-black hover:bg-black/90 text-white"
              size="lg"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Sign in with Apple
            </Button>

            <Button
              onClick={() => handleSocialLogin("google")}
              variant="outline"
              className="w-full h-14 text-base font-medium bg-white hover:bg-gray-50 text-gray-900 border-2"
              size="lg"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-muted-foreground">Or continue with phone</span>
              </div>
            </div>

            {!codeSent ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+61 4XX XXX XXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-12 h-14 text-base"
                    />
                  </div>
                </div>

                <Button onClick={handleSendCode} className="w-full h-14 text-base font-medium" size="lg">
                  Send Code
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-sm font-medium">
                    Verification Code
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="h-14 text-base text-center tracking-widest font-semibold"
                    maxLength={6}
                  />
                  <p className="text-sm text-muted-foreground text-center">
                    Sent to {phone}{" "}
                    <button onClick={() => setCodeSent(false)} className="text-primary hover:underline">
                      Change
                    </button>
                  </p>
                </div>

                <Button onClick={handleVerifyCode} className="w-full h-14 text-base font-medium" size="lg">
                  Verify & Continue
                </Button>

                <button className="text-sm text-primary hover:underline w-full text-center">Resend code</button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (mode === "family") {
    return (
      <div className="min-h-screen bg-background flex flex-col px-5 py-12">
        <div className="w-full max-w-md mx-auto space-y-12 slide-up-enter">
          <div className="space-y-6">
            <button onClick={() => setMode("select")} className="text-muted-foreground text-sm hover:text-foreground">
              ← Back
            </button>
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-semibold text-foreground">Join a Family</h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                Enter the family code to help your loved one stay consistent with their routine
              </p>
            </div>
          </div>

          <Card className="p-8 bg-secondary/30 border-primary/20">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-semibold">1</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ask your family member to share their family code from Settings
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-semibold">2</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You'll receive notifications when it's time for their doses
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary text-xs font-semibold">3</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mark doses as taken to help them stay on track
                </p>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email-family" className="text-sm font-medium">
                Your Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email-family"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="family-code" className="text-sm font-medium">
                Family Code
              </Label>
              <Input
                id="family-code"
                type="text"
                placeholder="Enter 6-digit code"
                value={familyCode}
                onChange={(e) => setFamilyCode(e.target.value.toUpperCase())}
                className="h-14 text-base text-center tracking-widest font-semibold"
                maxLength={6}
              />
            </div>

            <Button onClick={handleFamilyJoin} className="w-full h-14 text-base font-medium" size="lg">
              Join Family
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
