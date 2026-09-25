import {
  ChartColumn,
  ClipboardList,
  LayoutGrid,
  Package,
  Share2,
  Smartphone,
  Tag,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/container'
import { Eyebrow } from '@/components/eyebrow'
import { FeatureItem } from '@/components/feature-item'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { StepItem } from '@/components/step-item'
import { siteConfig } from '@/config/site'
import { iconStroke } from '@/lib/icons'

const stepIcons: LucideIcon[] = [Smartphone, LayoutGrid, Share2, Wallet]

const networkItemVisuals: { icon: LucideIcon; tone: string }[] = [
  { icon: Package, tone: 'bg-brand-tint text-brand' },
  { icon: Tag, tone: 'bg-brand-pink/10 text-brand-pink' },
  { icon: ClipboardList, tone: 'bg-sky/20 text-store-blue' },
  { icon: ChartColumn, tone: 'bg-mint/20 text-store-green' },
]

/** "Sua RediShop fica pronta para vender." — 4 passos + card "Ao entrar na RediShop". */
export function HowItWorks() {
  const { t } = useTranslation()
  const steps = t('howItWorks.steps', { max: siteConfig.maxCommission })
  const network = t('howItWorks.network')

  return (
    <section id="como-funciona" className="bg-background py-section">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={t('howItWorks.eyebrow')}
            title={t('howItWorks.title')}
            highlight={t('howItWorks.titleHighlight')}
            breakBeforeHighlight
            subtitle={t('howItWorks.subtitle')}
          />
        </Reveal>

        <div className="relative mt-content">
          {/* Linha conectora: vertical no mobile, horizontal entre os ícones no desktop. */}
          <span
            aria-hidden="true"
            className="absolute top-6 bottom-6 left-6 border-l border-dashed border-brand/30 md:hidden"
          />
          <span
            aria-hidden="true"
            className="absolute top-7 right-[calc(25%-3.25rem)] left-7 hidden border-t border-dashed border-brand/30 lg:block"
          />
          <ol className="relative grid gap-5 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Reveal index={index}>
                  <StepItem
                    number={index + 1}
                    icon={stepIcons[index] ?? Smartphone}
                    title={step.title}
                    description={
                      <>
                        {step.before}
                        {step.highlight ? (
                          <span className="text-brand">{step.highlight}</span>
                        ) : null}
                        {step.after}
                      </>
                    }
                  />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Desktop: título e fechamento à esquerda, itens 2x2 à direita. Mobile: na ordem do DOM. */}
        <Reveal className="mt-content grid gap-4 rounded-panel bg-brand-tint p-5 md:gap-6 md:p-8 lg:grid-cols-[2fr_3fr] lg:gap-x-10 lg:p-10">
          <div className="lg:col-start-1 lg:row-start-1">
            <Eyebrow variant="plain">{network.eyebrow}</Eyebrow>
            <h3 className="mt-2 text-h3 font-bold md:mt-3 md:font-semibold">
              {network.titleA}
              <span className="text-brand">{network.titleHighlight}</span>
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            {network.items.map((item, index) => {
              const visual = networkItemVisuals[index] ?? networkItemVisuals[0]
              return (
                <FeatureItem
                  key={item.title}
                  variant="card"
                  icon={visual.icon}
                  iconTone={visual.tone}
                  title={item.title}
                  description={item.description}
                />
              )
            })}
          </div>
          <div className="flex items-center gap-4 border-t border-brand/15 pt-5 md:items-start md:pt-6 lg:col-start-1 lg:row-start-2 lg:self-end">
            <Users
              className="size-8 shrink-0 text-brand md:size-10"
              strokeWidth={iconStroke}
              aria-hidden="true"
            />
            {/* Divisória entre ícone e texto, só no celular. */}
            <span className="h-10 w-px shrink-0 bg-brand/20 md:hidden" aria-hidden="true" />
            <p className="text-caption text-muted-foreground md:text-small">
              <strong className="block text-small font-bold text-brand md:text-body md:font-semibold">
                {network.closingA}
              </strong>
              {network.closingB}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
