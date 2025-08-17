'use client'

import Image from 'next/image'

export function SybotLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/sybot-logo.png"
      alt="Sybot Logo"
      width={40}
      height={40}
      className={className}
      priority
    />
  )
}
