import { ChartLine, Megaphone, Plug, Settings2, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ShopifyIcon, VtexIcon } from '@/components/brand-icons'
import { Container } from '@/components/container'
import { Reveal } from '@/components/reveal'
import { iconStroke } from '@/lib/icons'
import { DetailItem, StepCard } from './step-card'

const activationIcons = [Users, Megaphone, ChartLine]

/** "Sua operação continua a mesma. Sua distribuição cresce." — 3 etapas para a marca. */
export function BrandsSteps() {
  const { t } = useTranslation()
  const steps = t('brands.steps')

  return (
    <section aria-labelledby="brands-steps-title" className="bg-background py-section">
      <Container>
        <Reveal>
          <h2 id="brands-steps-title" className="mx-auto max-w-reading text-center text-h2">
            {steps.title}
          </h2>
        </Reveal>
        <ol className="mx-auto mt-content grid max-w-reading gap-6 lg:max-w-none lg:grid-cols-3">
          <li>
            <Reveal className="h-full">
              <StepCard
                number={1}
                icon={Plug}
                title={steps.connect.title}
                description={steps.connect.description}
              >
                <p className="text-small font-semibold text-brand">{steps.connect.highlight}</p>
                <ul className="mt-3 space-y-3">
                  <DetailItem
                    title="Shopify"
                    description={steps.connect.shopify}
                    icon={
                      <ShopifyIcon className="size-6 shrink-0" role="img" aria-label="Shopify" />
                    }
                  />
                  <DetailItem
                    title="VTEX"
                    description={steps.connect.vtex}
                    icon={<VtexIcon className="size-6 shrink-0" role="img" aria-label="VTEX" />}
                  />
                </ul>
              </StepCard>
            </Reveal>
          </li>

          <li>
            <Reveal index={1} className="h-full">
              <StepCard
                number={2}
                icon={Settings2}
                title={steps.conditions.title}
                description={steps.conditions.description}
              >
                <ul className="space-y-3">
                  {steps.conditions.items.map((item) => (
                    <DetailItem
                      key={item.title}
                      title={item.title}
                      description={item.description}
                    />
                  ))}
                </ul>
              </StepCard>
            </Reveal>
          </li>

          <li>
            <Reveal index={2} className="h-full">
              <StepCard
                number={3}
                icon={Users}
                title={steps.activate.title}
                description={steps.activate.description}
              >
                {/* Ilustração: vendedores ativados em rede, ligados por uma linha.  */}
                <div
                  className="relative flex min-h-32 items-center justify-center gap-6 rounded-card bg-brand-tint/60 px-4 py-6"
                  aria-hidden="true"
                >
                  <span className="absolute inset-x-12 top-1/2 border-t border-dashed border-brand/30" />
                  {activationIcons.map((Icon, index) => (
                    <span
                      key={index}
                      className="relative flex size-12 items-center justify-center rounded-card bg-background text-brand shadow-level-2"
                    >
                      <Icon className="size-5" strokeWidth={iconStroke} />
                    </span>
                  ))}
                </div>
              </StepCard>
            </Reveal>
          </li>
        </ol>
      </Container>
    </section>
  )
}
