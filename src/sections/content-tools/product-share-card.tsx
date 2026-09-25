import { ChevronRight, Link2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import whey from '@/assets/images/tools/whey.webp'
import { Badge } from '@/components/badge'
import { cn } from '@/lib/cn'

type Size = 'default' | 'compact' | 'mini'

const styles: Record<
  Size,
  {
    root: string
    image: string
    body: string
    tag: string
    title: string
    description: string
    buy: string
    buyIcon: string
    chevron?: string
  }
> = {
  // Card principal da seção.
  default: {
    root: 'gap-[2cqw] rounded-[2cqw] p-[2.5cqw] shadow-card',
    image: 'size-[22cqw]',
    body: '',
    tag: 'px-[1.5cqw] py-[0.5cqw] text-[2cqw]',
    title: 'mt-[0.8cqw] text-[3.1cqw]',
    description: 'mt-[0.3cqw] text-[2.5cqw]',
    buy: 'mt-[0.8cqw] gap-[0.8cqw] text-[2.5cqw]',
    buyIcon: 'size-[2.8cqw]',
    chevron: 'size-[3.4cqw]',
  },
  // Anexo dentro do balão do WhatsApp.
  compact: {
    root: 'gap-[2cqw] rounded-[2cqw] p-[1.2cqw] shadow-[0_1cqw_3cqw_-1.5cqw_rgba(24,10,60,0.35)]',
    image: 'size-[8cqw]',
    body: '',
    tag: 'px-[0.9cqw] py-[0.2cqw] text-[1.25cqw]',
    title: 'mt-[0.8cqw] text-[1.9cqw]',
    description: 'mt-[0.3cqw] text-[1.6cqw]',
    buy: 'mt-[0.8cqw] gap-[0.8cqw] text-[1.6cqw]',
    buyIcon: 'size-[1.8cqw]',
  },
  // Etiqueta de produto fixada no vídeo do TikTok.
  mini: {
    root: 'w-[74%] gap-[0.8cqw] self-start rounded-[1.2cqw] p-[0.8cqw] shadow-[0_1cqw_3cqw_-1.5cqw_rgba(0,0,0,0.45)]',
    image: 'size-[4.6cqw] self-center',
    body: 'text-[1cqw] leading-none',
    tag: 'px-[0.7cqw] py-[0.15cqw] text-[1cqw] leading-none',
    title: 'mt-[0.3cqw] text-[1.4cqw]',
    description: 'mt-[0.2cqw] truncate text-[1.15cqw]',
    buy: 'mt-[0.25cqw] gap-[0.4cqw] text-[1.25cqw]',
    buyIcon: 'size-[1.15cqw]',
    chevron: 'size-[1.8cqw] self-center',
  },
}

/** Card do produto compartilhável (Whey Isolado) em três tamanhos. */
export function ProductShareCard({ size = 'default' }: { size?: Size }) {
  const { t } = useTranslation()
  const product = t('contentTools.product')
  const s = styles[size]

  return (
    <div className={cn('flex items-center bg-white', s.root)}>
      <img
        src={whey}
        alt={size === 'default' ? product.title : ''}
        aria-hidden={size === 'default' ? undefined : true}
        loading="lazy"
        decoding="async"
        width={480}
        height={480}
        className={cn('shrink-0 object-contain', s.image)}
      />
      <div className={cn('min-w-0 flex-1', s.body)}>
        <Badge tone="tint" className={cn('inline-block', s.tag)}>
          {product.tag}
        </Badge>
        <p className={cn('leading-tight font-extrabold', s.title)}>{product.title}</p>
        <p className={cn('leading-snug text-muted-foreground', s.description)}>
          {product.description}
        </p>
        <p
          className={cn(
            'flex items-center font-semibold text-brand underline underline-offset-2',
            s.buy,
          )}
        >
          <Link2 className={s.buyIcon} aria-hidden="true" />
          {product.buy}
        </p>
      </div>
      {s.chevron ? (
        <ChevronRight
          className={cn('shrink-0 text-muted-foreground', s.chevron)}
          aria-hidden="true"
        />
      ) : null}
    </div>
  )
}
