import { useTranslation } from 'react-i18next'
import { Container } from '@/components/container'
import { siteConfig } from '@/config/site'

/** Faixa "Grandes marcas. Comissões de até X%." que fecha a hero, com o percentual em destaque. */
export function BrandsStrip() {
  const { t } = useTranslation()
  return (
    <div className="bg-hero-deep">
      <div className="rounded-t-panel bg-hero-brand-panel py-10 text-hero-ink md:py-12 lg:rounded-t-device lg:py-16">
        {/*
         * Um só fluxo de texto centralizado, com o percentual em destaque; na mesma linha de
         * base, porque os textos têm alturas de linha muito diferentes.
         */}
        <Container className="flex flex-wrap items-baseline justify-center gap-x-2 text-center md:gap-6">
          <p className="text-h3">{t('hero.brandsTitle')}</p>
          <span
            className="hidden h-8 w-px translate-y-2 bg-hero-ink/15 md:block"
            aria-hidden="true"
          />
          <p className="flex flex-wrap items-baseline justify-center gap-x-2 text-h3 font-medium">
            {t('hero.commissionsA')}
            <strong className="text-h2 text-brand md:text-display">
              {t('hero.commissionsHighlight', { max: siteConfig.maxCommission })}
            </strong>
          </p>
        </Container>
      </div>
    </div>
  )
}
