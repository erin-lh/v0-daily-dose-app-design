"use client"

import Image from "next/image"

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-10-08%20at%2010.39.59%E2%80%AFam-p1QrIEt9E9GJDPtqvRlKa7NCzpW52N.png"
        alt="DailyDose+ Tech Enabled Wellness"
        width={180}
        height={60}
        className="h-auto w-auto max-w-[140px]"
        priority
      />
    </div>
  )
}

export function BrandLogoWithTagline({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <BrandLogo />
    </div>
  )
}
