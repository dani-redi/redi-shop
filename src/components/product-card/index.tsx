import type { LucideIcon } from 'lucide-react'
import { Badge, type BadgeTone } from '@/components/badge'
import { CommissionTag } from '@/components/commission-tag'
import { cn } from '@/lib/cn'

export type ProductCardProps = {
  image: string
  icon: LucideIcon
  label: string
  message: string
  brand: string
  name: string
  commission: string
  tone?: BadgeTone
  /** Posição/tamanho da imagem, que "vaza" para fora do card. */
  imageClassName?: string
  className?: string
}

/**
 * Card de produto flutuante da hero: foto sobre fundo lilás, marca, nome e comissão.
 * Só aparece do tablet em diante; `loading="lazy"` evita baixar a foto no celular.
 */
export function ProductCard({
  image,
  icon: Icon,
  label,
  message,
  brand,
  name,
  commission,
  tone = 'purple',
  imageClassName,
  className,
}: ProductCardProps) {
  const badgeClass = 'px-1.5 py-1 sm:px-2.5 sm:py-1.5'
  return (
    <article
      className={cn(
        'flex flex-col overflow-visible rounded-[0.9rem] border border-hero-ink/8 bg-hero-card text-hero-ink shadow-hero-product sm:rounded-[1.35rem]',
        className,
      )}
    >
      <div className="relative min-h-0 flex-1 rounded-t-[0.85rem] bg-hero-card-muted sm:rounded-t-[1.3rem]">
        <div className="absolute top-2 left-2 z-40 max-w-[calc(100%-0.75rem)] text-[0.4rem] sm:top-3 sm:left-3 sm:text-[0.64rem] lg:text-[0.68rem]">
          <Badge tone={tone} className={cn('max-w-full gap-1 font-extrabold', badgeClass)}>
            <Icon className="size-2.5 sm:size-4" fill="currentColor" aria-hidden="true" />
            {label}
          </Badge>
          <Badge
            tone={tone}
            className={cn('mt-0.5 flex max-w-full leading-tight font-semibold sm:mt-1', badgeClass)}
          >
            {message}
          </Badge>
        </div>
        <img
          src={image}
          alt={name}
          width={640}
          height={640}
          loading="lazy"
          decoding="async"
          className={cn(
            'absolute left-1/2 -translate-x-1/2 object-contain drop-shadow-[0_12px_12px_rgba(22,4,40,0.16)]',
            imageClassName,
          )}
        />
      </div>
      <div className="relative z-20 rounded-b-[0.85rem] bg-hero-card px-2.5 pt-2 pb-2.5 sm:rounded-b-[1.3rem] sm:px-4 sm:pt-3 sm:pb-4">
        <p className="text-[0.4rem] font-bold tracking-[0.2em] text-hero-ink/70 uppercase sm:text-[0.62rem] lg:text-[0.7rem]">
          {brand}
        </p>
        <p className="mt-1 text-[0.64rem] leading-[1.12] font-medium sm:text-[1.05rem] lg:text-[1.1rem]">
          {name}
        </p>
        <CommissionTag>{commission}</CommissionTag>
      </div>
    </article>
  )
}
