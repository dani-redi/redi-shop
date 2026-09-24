import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

type EyebrowProps = ComponentProps<'p'> & {
  /** `pill`: etiqueta lilás arredondada. `plain`: só o texto. */
  variant?: 'pill' | 'plain'
}

export function Eyebrow({ variant = 'pill', className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        'text-eyebrow text-brand uppercase',
        variant === 'pill' && 'mx-auto inline-flex rounded-full bg-brand-tint px-3 py-2',
        className,
      )}
      {...props}
    />
  )
}
