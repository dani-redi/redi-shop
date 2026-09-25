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
           * Celular: quebra natural e balanceada em 34px. Tablet e desktop: sempre 2 linhas,
           * com a fonte encolhendo para a linha mais longa caber (hero-fit-title).
           */}
          <h1 className="mx-auto text-display hero-fit-title text-hero-ink">
            <span className="md:block md:whitespace-nowrap">
              {t('hero.titleA')} {t('hero.titleB')}
            </span>{' '}
            <span className="text-hero-mint md:block md:whitespace-nowrap">
              {t('hero.titleHighlight')}
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-lead text-lead font-medium text-hero-ink/70 md:mt-4 lg:mt-6">
            {t('hero.description')}
          </p>
          <Button
            variant="primary"
            size="xl"
            onClick={open}
            {...stickyCtaHide}
            className="mt-6 md:mt-8"
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
          className="relative mx-auto mt-content h-[12.5rem] w-full max-w-[22rem] md:h-100 md:w-full md:max-w-3xl md:animate-hero-enter md:[animation-delay:120ms] lg:h-116"
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
