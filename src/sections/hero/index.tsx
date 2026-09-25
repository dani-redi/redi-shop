import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { ArrowLabel } from '@/components/button/arrow-label'
import { Container } from '@/components/container'
import { FeatureItem } from '@/components/feature-item'
import { ProductCard } from '@/components/product-card'
import { useWaitlist } from '@/features/waitlist/context'
import { stickyCtaHide } from '@/sections/sticky-cta/hide'
import { FeedCard } from './feed-card'
import { heroBenefitIcons, heroProducts } from './products'

const storeDomain = /[\w-]+\.redi\.shop/

/** Destaca o endereço "seunome.redi.shop" dentro do texto do benefício. */
function withStoreHighlight(text: string) {
  const match = text.match(storeDomain)
  if (!match) return text
  return (
    <>
      {text.replace(storeDomain, '')}
      <span className="block font-bold text-brand md:inline">{match[0]}</span>
    </>
  )
}

export function Hero() {
  const { t } = useTranslation()
  const { open } = useWaitlist()
  const products = t('hero.products')
  const benefits = t('hero.benefits')

  return (
    <section id="para-voce" className="overflow-hidden hero-home-surface pt-header text-hero-ink">
      <Container className="pt-6 pb-10 md:pt-8 md:pb-12 lg:pt-16 lg:pb-16">
        {/* Sem animação de entrada no celular: o texto é o LCP e aparece no primeiro paint. */}
        <div className="text-center md:animate-hero-enter">
          {/*
           * Sempre 2 linhas, com a fonte encolhendo para a linha mais longa caber
           * (hero-fit-title). Celular: "…e ganhe / comissão com IA…"; do tablet em diante:
           * "…e ganhe comissão / com IA…".
           */}
          <h1 className="mx-auto text-display hero-fit-title whitespace-nowrap text-hero-ink">
            <span className="block md:inline">{t('hero.titleM1')}</span> {t('hero.titleM2')}{' '}
            <span className="text-hero-mint md:block">{t('hero.titleHighlight')}</span>
          </h1>
          {/* Celular: 3 linhas fixas (hero-fit-lead). Do tablet em diante: quebra natural. */}
          <p className="mx-auto mt-2 max-w-lead text-lead hero-fit-lead font-medium whitespace-nowrap text-hero-ink/70 md:mt-4 md:whitespace-normal lg:mt-6">
            <span className="block md:inline">{t('hero.descM1')}</span>{' '}
            <span className="block md:inline">{t('hero.descM2')}</span>{' '}
            <span className="block md:inline">{t('hero.descM3')}</span>
          </p>
          <Button
            variant="primary"
            size="xl"
            onClick={open}
            {...stickyCtaHide}
            className="mt-5 md:mt-8"
          >
            <ArrowLabel>{t('signupCta.button')}</ArrowLabel>
          </Button>
        </div>

        {/*
         * Ilustração: o conteúdo dos cards repete o que o texto já diz. Palco com os 3 cards:
         * compacto e sem rotação no celular; do tablet em diante, maior e com os laterais girados.
         */}
        <div
          aria-hidden="true"
          className="relative mx-auto mt-5 h-[15.75rem] w-full max-w-3xl md:mt-content md:h-100 md:animate-hero-enter md:[animation-delay:120ms] lg:h-116"
        >
          {products.map((product, index) => {
            const visual = heroProducts[index] ?? heroProducts[0]
            if (index === 1) {
              return (
                <FeedCard
                  key={product.name}
                  productImage={visual.image}
                  productImageSmall={visual.imageSmall}
                  productName={product.name}
                  className={visual.cardClassName}
                />
              )
            }
            return (
              <ProductCard
                key={product.name}
                {...product}
                image={visual.image}
                icon={visual.icon}
                tone={visual.tone}
                imageClassName={visual.imageClassName}
                className={visual.cardClassName}
              />
            )
          })}
        </div>

        <ul className="mx-auto mt-8 grid max-w-4xl grid-cols-3 divide-x divide-hero-ink/15 md:mt-12 md:animate-hero-enter md:[animation-delay:240ms] lg:mt-16">
          {benefits.map(({ title, detail }, index) => (
            <li key={title}>
              <FeatureItem
                icon={heroBenefitIcons[index] ?? heroBenefitIcons[0]}
                title={title}
                description={withStoreHighlight(detail)}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
