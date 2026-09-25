import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type PhoneMockupProps = {
  children: ReactNode
  className?: string
}

/**
 * Moldura de celular com notch. As medidas internas são em `cqw`, então precisa estar
 * dentro de um elemento com `container-inline` (a moldura ocupa 44.5% dele).
 */
export function PhoneMockup({ children, className }: PhoneMockupProps) {
  return (
    <div className={cn('relative mx-auto w-[44.5cqw]', className)}>
      <div className="rounded-device bg-[#2A2331] p-[0.9cqw] shadow-level-4">
        <div className="relative overflow-hidden rounded-[calc(var(--radius-device)-0.9cqw)] bg-white">
          <span
            className="absolute top-[1.5cqw] left-1/2 z-10 h-[3cqw] w-[12cqw] -translate-x-1/2 rounded-full bg-black"
            aria-hidden="true"
          />
          {children}
        </div>
      </div>
    </div>
  )
}
