import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { iconStroke } from '@/lib/icons'

type FeatureItemProps = {
  icon: LucideIcon
  title: ReactNode
  description: ReactNode
  /** `hero`: ícone em círculo contornado. `card`: card branco com ícone colorido. */
  variant?: 'hero' | 'card'
  /** Só para `card`: cores de fundo e do ícone. */
  iconTone?: string
  className?: string
}

export function FeatureItem({
  icon: Icon,
  title,
  description,
  variant = 'hero',
  iconTone = 'bg-brand-tint text-brand',
  className,
}: FeatureItemProps) {
  if (variant === 'card') {
    return (
      <article
        className={cn(
          // Celular: linha simples (ícone + texto) sobre o fundo do card pai; card próprio no tablet+.
          'flex h-full min-w-0 items-start gap-4 md:rounded-card md:border md:border-border/70 md:bg-card md:p-5 md:transition-[translate,box-shadow,border-color] md:duration-200 md:ease-out md:hover:-translate-y-0.5 md:hover:border-brand/30 md:hover:shadow-level-2',
          className,
        )}
      >
        <span
          className={cn('flex size-10 shrink-0 items-center justify-center rounded-full', iconTone)}
        >
          <Icon className="size-5" strokeWidth={iconStroke} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h4 className="text-body font-semibold">{title}</h4>
          <p className="mt-1 text-small text-muted-foreground">{description}</p>
        </div>
      </article>
    )
  }

  return (
    <div
      className={cn(
        'flex min-w-0 items-center gap-3 text-left md:justify-center md:gap-4 md:px-6 lg:px-8',
        className,
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-hero-ink/40 md:size-11">
        <Icon className="size-4 md:size-6" strokeWidth={iconStroke} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-body font-semibold">{title}</p>
        <p className="mt-0.5 text-small text-hero-ink/70">{description}</p>
      </div>
    </div>
  )
}
