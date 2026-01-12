"use client"

import Image from "next/image"

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/daily-dose-logo.png"
        alt="Daily+ dose - tech enabled wellness"
        width={300}
        height={120}
        className="h-auto w-auto max-w-[200px]"
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
