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
          // Celular: card compacto com ícone em cima (grade 2x2); tablet+: ícone ao lado do texto.
          'flex h-full min-w-0 flex-col items-start gap-2.5 rounded-card border border-border/70 bg-card p-3.5 md:flex-row md:gap-4 md:p-5 md:transition-[translate,box-shadow,border-color] md:duration-200 md:ease-out md:hover:-translate-y-0.5 md:hover:border-brand/30 md:hover:shadow-level-2',
          className,
        )}
      >
        <span
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-full md:size-10',
            iconTone,
          )}
        >
          <Icon className="size-4 md:size-5" strokeWidth={iconStroke} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h4 className="text-small font-bold md:text-body md:font-semibold">{title}</h4>
          <p className="mt-0.5 text-[0.75rem] leading-snug text-muted-foreground md:mt-1 md:text-small">
            {description}
          </p>
        </div>
      </article>
    )
  }

  // Celular: ícone em cima e texto centralizado, em colunas; do tablet em diante, lado a lado.
  return (
    <div
      className={cn(
        'flex min-w-0 flex-col items-center gap-2 px-2 text-center md:flex-row md:justify-center md:gap-4 md:px-6 md:text-left lg:px-8',
        className,
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-hero-ink/40 md:size-11">
        <Icon className="size-5 md:size-6" strokeWidth={iconStroke} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-small font-bold md:text-body md:font-semibold">{title}</p>
        <p className="mt-0.5 text-[0.6875rem] leading-snug text-hero-ink/70 md:text-small">
          {description}
        </p>
      </div>
    </div>
  )
}
