"use client"

import { useEffect, useState } from "react"

interface ConfettiParticle {
  id: number
  left: number
  delay: number
  color: string
}

export function ConfettiCelebration() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([])

  useEffect(() => {
    const colors = ["#7FA87F", "#A8C5A8", "#E8D5C4", "#F4A460", "#FFD700"]
    const newParticles: ConfettiParticle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles(newParticles)

    // Clean up after animation
    const timer = setTimeout(() => setParticles([]), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle absolute w-2 h-2 rounded-full"
          style={{
            left: `${particle.left}%`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
