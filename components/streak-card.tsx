"use client"

import { Card } from "@/components/ui/card"
import { Flame, TrendingUp, Award, Target } from "lucide-react"
import type { Streak } from "@/lib/types"
import { useState } from "react"
import { ConfettiCelebration } from "./confetti-celebration"

interface StreakCardProps {
  streak: Streak
}

export function StreakCard({ streak }: StreakCardProps) {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleStreakTap = () => {
    if (streak.currentStreak > 0) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 100)
    }
  }

  const getMotivationalMessage = () => {
    if (streak.currentStreak === 0) return "Start your wellness journey today"
    if (streak.currentStreak === 1) return "Beautiful start! One day at a time"
    if (streak.currentStreak < 7) return "Building your routine beautifully"
    if (streak.currentStreak < 30) return "Your consistency is inspiring"
    return "You're a wellness champion"
  }

  return (
    <>
      {showConfetti && <ConfettiCelebration />}
      <Card
        className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/15 active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-sm"
        onClick={handleStreakTap}
      >
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-2 tracking-wide">Your Streak</h2>
            <div className="flex items-baseline gap-2.5">
              <span className="text-7xl font-bold text-primary leading-none tracking-tight">
                {streak.currentStreak}
              </span>
              <span className="text-2xl text-muted-foreground pb-2 font-light">days</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3 font-light">{getMotivationalMessage()}</p>
          </div>
          <div className={`p-4 bg-primary/10 rounded-full ${streak.currentStreak > 0 ? "glow-ring" : ""}`}>
            <Flame className="w-9 h-9 text-primary" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center p-4 bg-background/60 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center justify-center w-10 h-10 mb-2.5 bg-primary/8 rounded-full">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground mb-1.5 font-light tracking-wide">Best</span>
            <span className="text-2xl font-semibold text-foreground">{streak.longestStreak}</span>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-background/60 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center justify-center w-10 h-10 mb-2.5 bg-primary/8 rounded-full">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground mb-1.5 font-light tracking-wide">Total</span>
            <span className="text-2xl font-semibold text-foreground">{streak.totalDosesTaken}</span>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-background/60 rounded-3xl backdrop-blur-sm">
            <div className="flex items-center justify-center w-10 h-10 mb-2.5 bg-primary/8 rounded-full">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground mb-1.5 font-light tracking-wide">Consistency</span>
            <span className="text-2xl font-semibold text-foreground">{streak.adherenceRate}%</span>
          </div>
        </div>
      </Card>
    </>
  )
}
