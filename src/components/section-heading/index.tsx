import type { ReactNode } from 'react'
import { Eyebrow } from '@/components/eyebrow'
import { cn } from '@/lib/cn'

type SectionHeadingProps = {
  id?: string
  eyebrow?: ReactNode
  title: ReactNode
  highlight?: ReactNode
  /** Quebra a linha antes do destaque. */
  breakBeforeHighlight?: boolean
  subtitle?: ReactNode
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

/**
 * Eyebrow → título (h2) → subtítulo (lead), centralizados. Ritmo no celular: 8px entre
 * eyebrow e título, 12px entre título e subtítulo (12/16px do tablet em diante); o conteúdo
 * abaixo usa `mt-content` (32px no celular).
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  highlight,
  breakBeforeHighlight = false,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn('text-center', className)}>
      {eyebrow ? (
        <div className="flex justify-center">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2
        id={id}
        className={cn(
          'mx-auto max-w-reading text-h2 text-foreground',
          eyebrow && 'mt-2 md:mt-3',
          titleClassName,
        )}
      >
        {title}
        {highlight ? (
          <>
            {breakBeforeHighlight ? <br /> : null}
            <span className="text-brand">{highlight}</span>
          </>
        ) : null}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            'mx-auto mt-3 max-w-lead text-lead text-muted-foreground md:mt-4',
            subtitleClassName,
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
