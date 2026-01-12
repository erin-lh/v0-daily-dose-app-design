"use client"

import { useState, useRef, useCallback } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface HoldToCompleteButtonProps {
  onComplete: () => void
  disabled?: boolean
  duration?: number
}

export function HoldToCompleteButton({ onComplete, disabled = false, duration = 1500 }: HoldToCompleteButtonProps) {
  const [progress, setProgress] = useState(0)
  const [isHolding, setIsHolding] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  const startHolding = useCallback(() => {
    if (disabled) return

    setIsHolding(true)
    startTimeRef.current = Date.now()

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current
      const newProgress = Math.min((elapsed / duration) * 100, 100)

      setProgress(newProgress)

      if (newProgress >= 100) {
        stopHolding()
        onComplete()
      }
    }, 16) // ~60fps
  }, [disabled, duration, onComplete])

  const stopHolding = useCallback(() => {
    setIsHolding(false)

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    // Reset progress with animation
    setTimeout(() => setProgress(0), 200)
  }, [])

  return (
    <button
      onMouseDown={startHolding}
      onMouseUp={stopHolding}
      onMouseLeave={stopHolding}
      onTouchStart={startHolding}
      onTouchEnd={stopHolding}
      disabled={disabled}
      className={cn(
        "relative w-14 h-14 rounded-full flex items-center justify-center transition-all",
        "bg-primary/10 hover:bg-primary/20 active:scale-95",
        isHolding && "scale-95",
        disabled && "opacity-50 cursor-not-allowed",
      )}
    >
      {/* Progress Circle */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
        {/* Background circle */}
        <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="3" className="text-primary/20" />
        {/* Progress circle */}
        <circle
          cx="28"
          cy="28"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray={`${2 * Math.PI * 24}`}
          strokeDashoffset={`${2 * Math.PI * 24 * (1 - progress / 100)}`}
          strokeLinecap="round"
          className={cn("text-primary transition-all duration-75", progress === 100 && "text-primary")}
        />
      </svg>

      {/* Check icon */}
      <Check
        className={cn("w-6 h-6 text-primary transition-all duration-200", progress === 100 && "scale-125 text-primary")}
      />

      {/* Completion pulse animation */}
      {progress === 100 && <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />}
    </button>
  )
}
