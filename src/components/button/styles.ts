import { cn } from '@/lib/cn'

const variants = {
  primary:
    'bg-brand text-primary-foreground shadow-level-2 hover:bg-brand-deep hover:shadow-level-3',
  secondary: 'border border-brand/40 text-brand hover:border-brand hover:bg-brand-tint',
  ghost: 'text-foreground hover:bg-brand-tint',
  white: 'bg-background text-foreground shadow-level-3 hover:shadow-level-4',
  whatsapp: 'bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90',
} as const

const sizes = {
  sm: 'h-8 px-3 text-caption',
  md: 'h-11 px-5 text-small',
  lg: 'h-12 px-6 text-body',
  xl: 'h-13 px-8 text-body',
} as const

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

export type StyleProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export function buttonStyles({ variant = 'primary', size = 'md', className }: StyleProps = {}) {
  return cn(
    'group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap',
    'transition-[color,background-color,border-color,box-shadow,translate] duration-200 ease-out hover:-translate-y-px active:translate-y-0',
    'focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-70',
    variants[variant],
    sizes[size],
    className,
  )
}
