import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

const tones = {
  hot: 'bg-hero-hot text-hero-hot-foreground',
  purple: 'bg-hero-purple-tag text-brand',
  tint: 'bg-brand-tint text-brand',
} as const

export type BadgeTone = keyof typeof tones

type BadgeProps = ComponentProps<'span'> & { tone?: BadgeTone }

/** Etiqueta arredondada ("Em alta", "20% OFF", "Comissão dobrada"). Tamanho via className. */
export function Badge({ tone = 'tint', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex w-max items-center rounded-full font-bold',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
