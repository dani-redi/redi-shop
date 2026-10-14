import { Check } from 'lucide-react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/container'
import { Reveal } from '@/components/reveal'
import { StoreBadges } from '@/components/store-badges'
import { stickyCtaHide } from '@/sections/sticky-cta/hide'
import { iconStroke } from '@/lib/icons'

/** "Crie sua RediShop grátis" com os botões das lojas. Aparece duas vezes na home. */
export function SignupCta({ id }: { id?: string }) {
  const { t } = useTranslation()
  // "Grátis · Sem mensalidade · …" vira uma lista com check em cada item.
  const perks = t('signupCta.note')
    .split('·')
    .map((perk) => perk.trim())
    .filter(Boolean)

  return (
    <section id={id} {...stickyCtaHide} className="cta-surface py-section text-background">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="text-h2">{t('signupCta.title')}</h2>
          <p className="mt-3 max-w-lead text-lead opacity-75 md:mt-4">{t('signupCta.subtitle')}</p>
          <StoreBadges variant="white" className="mt-6 w-full max-w-sm md:mt-8" />
          <ul className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-eyebrow uppercase opacity-80 md:mt-8">
            {perks.map((perk, index) => (
              <Fragment key={perk}>
                {/* Celular: quebra em 2 linhas de 2 itens, centralizadas. */}
                {index === 2 ? (
                  <li aria-hidden="true" className="h-0 basis-full md:hidden" />
                ) : null}
                <li className="flex items-center gap-1.5">
                  <Check
                    className="size-4 text-brand-soft"
                    strokeWidth={iconStroke}
                    aria-hidden="true"
                  />
                  {perk}
                </li>
              </Fragment>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
