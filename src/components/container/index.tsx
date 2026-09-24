import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

const sizes = {
  /** Container da página (1200px). */
  page: 'max-w-page px-gutter',
  /** Blocos de leitura (FAQ): 720px. */
  reading: 'max-w-reading px-gutter',
} as const

type ContainerProps = ComponentProps<'div'> & {
  size?: keyof typeof sizes
}

/** Centraliza o conteúdo com o gutter da página. */
export function Container({ size = 'page', className, ...props }: ContainerProps) {
  return <div className={cn('relative mx-auto w-full', sizes[size], className)} {...props} />
}
