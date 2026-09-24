import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { iconStroke } from '@/lib/icons'

type StepCardProps = {
  number: number
  icon: LucideIcon
  /** Título da tradução; o prefixo "1. " vira o badge sobre o ícone. */
  title: string
  description: string
  children: ReactNode
}

const numberPrefix = /^\d+\.\s*/

/** Card de etapa: ícone com número em badge (como os passos da home), título, descrição e um bloco ilustrativo. */
export function StepCard({ number, icon: Icon, title, description, children }: StepCardProps) {
  return (
    <article className="flex h-full flex-col rounded-panel bg-card p-6 shadow-level-2 transition-[translate,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-level-3 lg:p-8">
      <span className="relative flex size-14 shrink-0 items-center justify-center self-start rounded-card bg-brand-tint text-brand">
        <Icon className="size-6" strokeWidth={iconStroke} aria-hidden="true" />
        <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-brand text-caption font-bold text-primary-foreground ring-2 ring-card">
          {number}
        </span>
      </span>
      <h3 className="mt-6 text-h3">{title.replace(numberPrefix, '')}</h3>
      <p className="mt-2 text-small text-muted-foreground">{description}</p>
      <div className="mt-6 flex flex-1 flex-col">{children}</div>
    </article>
  )
}

type DetailItemProps = {
  title: string
  description: string
  icon?: ReactNode
}

/** Item lilás dentro do card (Shopify, VTEX, comissões, descontos). */
export function DetailItem({ title, description, icon }: DetailItemProps) {
  return (
    <li className="flex items-center gap-3 rounded-card bg-brand-tint/60 px-4 py-3">
      {icon}
      <div>
        <p className="text-small font-semibold">{title}</p>
        <p className="mt-0.5 text-caption text-muted-foreground">{description}</p>
      </div>
    </li>
  )
}
