import { ArrowRight, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { buttonStyles } from '@/components/button/styles'
import { Container } from '@/components/container'
import { Eyebrow } from '@/components/eyebrow'
import { siteConfig } from '@/config/site'
import { useLocale } from '@/i18n/use-locale'
import { iconStroke } from '@/lib/icons'

/** Hero de /marcas, centralizado como o da home: "Alcance mais de 1.5 milhões de potenciais compradores." */
export function BrandsHero() {
  const { t } = useTranslation()
  const { pathFor } = useLocale()
  const hero = t('brands.hero')
  const contact = siteConfig.links.brandsContact

  return (
    <section className="hero-surface pt-16 pb-12 lg:pt-24 lg:pb-16">
      <Container className="flex animate-hero-enter flex-col items-center text-center">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="mt-3 max-w-4xl text-display">
          {hero.titleA}
          <span className="text-brand">{hero.titleHighlight}</span>
        </h1>
        <p className="mt-4 max-w-lead text-lead text-muted-foreground lg:mt-6">
          {hero.description}
        </p>
        <Link
          to={`${pathFor(contact.path)}#${contact.hash}`}
          className={buttonStyles({ size: 'xl', className: 'mt-8' })}
        >
          {hero.cta}
          <ArrowRight
            className="size-5 shrink-0 transition-[translate] duration-200 ease-out group-hover:translate-x-1"
            strokeWidth={iconStroke}
            aria-hidden="true"
          />
        </Link>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {hero.checks.map((check) => (
            <li
              key={check}
              className="flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 text-small font-medium"
            >
              <Check
                className="size-4 shrink-0 text-brand"
                strokeWidth={iconStroke}
                aria-hidden="true"
              />
              {check}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
