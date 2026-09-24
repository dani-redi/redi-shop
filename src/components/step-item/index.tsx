import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { iconStroke } from '@/lib/icons'

type StepItemProps = {
  number: number
  icon: LucideIcon
  title: ReactNode
  description: ReactNode
}

/**
 * Passo numerado: ícone com o número num badge, título (h3) e descrição. Timeline em linha
 * no mobile (ícone de 48px), em coluna no desktop. O anel da cor do fundo "corta" a linha conectora.
 */
export function StepItem({ number, icon: Icon, title, description }: StepItemProps) {
  return (
    <article className="flex gap-4 lg:flex-col lg:gap-6">
      <span className="relative flex size-12 shrink-0 items-center justify-center rounded-card bg-brand-tint text-brand ring-8 ring-background md:size-14">
        <Icon className="size-6" strokeWidth={iconStroke} aria-hidden="true" />
        <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-brand text-caption font-bold text-primary-foreground ring-2 ring-background">
          {number}
        </span>
      </span>
      <div className="min-w-0 md:pt-1 lg:pt-0">
        <h3 className="text-h3">{title}</h3>
        <p className="mt-1 text-small text-muted-foreground md:mt-2">{description}</p>
      </div>
    </article>
  )
}
