import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

const shapes = {
  circle: 'rounded-full',
  square: 'rounded-xl sm:rounded-2xl',
} as const

type IconBadgeProps = {
  icon: LucideIcon
  shape?: keyof typeof shapes
  /** Cores de fundo e do ícone. Padrão: lilás da marca. */
  tone?: string
  className?: string
  iconClassName?: string
  strokeWidth?: number
}

/** Ícone dentro de um círculo ou quadrado arredondado. */
export function IconBadge({
  icon: Icon,
  shape = 'circle',
  tone = 'bg-brand-tint text-brand',
  className,
  iconClassName,
  strokeWidth = 1.8,
}: IconBadgeProps) {
  return (
    <span
      className={cn('flex shrink-0 items-center justify-center', shapes[shape], tone, className)}
    >
      <Icon className={iconClassName} strokeWidth={strokeWidth} aria-hidden="true" />
    </span>
  )
}
