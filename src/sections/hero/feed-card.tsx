import { ChevronRight, Ellipsis, Sparkles, Target } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import sellerAvatarSmall from '@/assets/images/hero/seller-128w.webp?no-inline'
import sellerAvatar from '@/assets/images/hero/seller.webp'
import { Button } from '@/components/button'
import { WhatsAppIcon } from '@/components/brand-icons'
import { cn } from '@/lib/cn'

type FeedCardProps = {
  productImage: string
  /** Versão pequena da foto (a miniatura tem 56px), para o `srcSet`. */
  productImageSmall?: string
  productName: string
  className?: string
}

/**
 * Card central da hero: "Seu Feed de Vendas" com oportunidades e cliente recorrente.
 * Medidas únicas para todas as telas: no celular o card é reduzido com `scale` (ver products.ts).
 */
export function FeedCard({
  productImage,
  productImageSmall,
  productName,
  className,
}: FeedCardProps) {
  const { t } = useTranslation()
  const client = t('hero.feed.client')

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-[1.35rem] border border-hero-ink/8 bg-hero-card text-hero-ink shadow-hero-product',
        className,
      )}
    >
      <div className="flex h-full flex-col bg-hero-card px-3.5 pt-4 pb-3.5">
        <div className="flex items-center justify-between border-b border-hero-ink/8 pb-3">
          <div className="flex min-w-0 items-center gap-1.5">
            <Sparkles
              className="size-4 shrink-0 text-brand"
              fill="currentColor"
              aria-hidden="true"
            />
            <p className="truncate text-[0.85rem] leading-none font-extrabold text-hero-ink">
              {t('hero.feed.titleA')}
              <span className="text-brand">{t('hero.feed.titleHighlight')}</span>
            </p>
          </div>
          <span className="text-[0.58rem] font-medium text-hero-ink/65">
            {t('hero.feed.today')}
          </span>
        </div>

        <div className="my-2 flex items-center gap-2.5 rounded-[1rem] bg-hero-card-muted p-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/10">
            <Target className="size-5 text-brand" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[0.77rem] leading-[1.08] font-extrabold tracking-tight whitespace-nowrap text-hero-ink">
              {t('hero.feed.opportunities.title')}
            </p>
            <p className="mt-0.5 text-[0.56rem] leading-[1.1] font-medium text-hero-ink/62">
              {t('hero.feed.opportunities.detail')}
            </p>
          </div>
          <ChevronRight
            className="size-4 shrink-0 text-brand"
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col border-t border-hero-ink/8 pt-2.5">
          <div className="flex items-start justify-between">
            <div className="flex min-w-0 items-center gap-2">
              <img
                src={sellerAvatarSmall}
                srcSet={`${sellerAvatarSmall} 128w, ${sellerAvatar} 160w`}
                sizes="40px"
                alt={client.name}
                width={64}
                height={64}
                decoding="async"
                className="size-10 shrink-0 rounded-full object-cover ring-2 ring-hero-ink/5"
              />
              <div className="min-w-0">
                <p className="truncate text-[0.85rem] leading-tight font-bold text-hero-ink">
                  {client.name}
                </p>
                <p className="truncate text-[0.55rem] leading-tight text-hero-ink/70">
                  {client.tag}
                </p>
              </div>
            </div>
            <Ellipsis className="size-4 shrink-0 text-hero-ink/40" aria-hidden="true" />
          </div>

          <p className="mt-2 text-[0.75rem] leading-[1.25] font-medium text-hero-ink">
            {client.textA}
            <span className="font-bold text-brand">{client.textHighlight}</span>
          </p>

          <div className="mt-auto rounded-[1rem] bg-hero-card-muted p-2.5">
            <div className="flex items-center gap-2.5">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-white p-1">
                <img
                  src={productImageSmall ?? productImage}
                  srcSet={
                    productImageSmall
                      ? `${productImageSmall} 192w, ${productImage} 640w`
                      : undefined
                  }
                  sizes="64px"
                  alt={productName}
                  width={96}
                  height={96}
                  decoding="async"
                  className="size-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[0.72rem] leading-tight font-extrabold text-hero-ink">
                  {productName}
                </p>
                <p className="mt-0.5 text-[0.55rem] leading-tight text-hero-ink/70">
                  {client.message}
                </p>
              </div>
            </div>
          </div>

          {/* Ilustrativo: parte do mockup, por isso é um <span> e não um botão. */}
          <Button
            asChild
            variant="whatsapp"
            size="sm"
            className="mt-2 h-8 w-full cursor-default gap-2 px-2 text-[0.62rem] font-bold shadow-none hover:translate-y-0"
          >
            <span>
              <WhatsAppIcon className="size-4 shrink-0" />
              {client.cta}
            </span>
          </Button>
        </div>
      </div>
    </article>
  )
}
