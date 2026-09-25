import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type HandwrittenNoteProps = {
  children: ReactNode
  className?: string
}

/** Texto manuscrito (Caveat) na cor da marca, 20–22px. Posição via className. */
export function HandwrittenNote({ children, className }: HandwrittenNoteProps) {
  return <p className={cn('font-hand text-note text-brand', className)}>{children}</p>
}

const arrowPaths = {
  /** Curva descendo para a direita. */
  curve: 'M4 6c14 2 30 10 38 30',
  /** Curva longa e aberta, para setas entre textos e imagens. */
  swoop: 'M4 34C14 14 30 6 48 8',
  /** Desce e vira para a direita. */
  hook: 'M8 4c-1 18 12 31 36 32',
} as const

type HandArrowProps = {
  shape?: keyof typeof arrowPaths
  className?: string
}

/**
 * Seta desenhada à mão, com traço uniforme (2.5px) na cor atual. Aponta para a direita;
 * espelhe com `-scale-x-100` / `-scale-y-100`. Puramente decorativa.
 */
export function HandArrow({ shape = 'curve', className }: HandArrowProps) {
  const heads = {
    curve: 'M35 30.5l7 5.5 1.3-9',
    swoop: 'M41.5 3.5L48 8l-7.5 3.5',
    hook: 'M37.5 30.5L44 36l-7 4',
  }
  return (
    <svg
      viewBox="0 0 52 42"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('pointer-events-none text-brand', className)}
    >
      <path d={arrowPaths[shape]} />
      <path d={heads[shape]} />
    </svg>
  )
}
