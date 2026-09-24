import { LayoutGrid, Sparkles, TrendingUp, Users, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/container'
import { HandArrow, HandwrittenNote } from '@/components/handwritten-note'
import { PhoneMockup } from '@/components/phone-mockup'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/cn'
import { iconStroke } from '@/lib/icons'
import { PhoneScreen } from './phone-screen'

/*
 * Palco do celular: um container-inline com largura = moldura ÷ 0,445, então 1cqw acompanha
 * o celular (--phone-w) e a tela interna mantém a proporção em qualquer largura.
 * Anotações simétricas, duas de cada lado, na mesma altura (ordem de `salesAssistant.notes`).
 */
const notePlacements = [
  { side: 'left', top: 'top-[24cqw]' },
  { side: 'left', top: 'top-[58cqw]' },
  { side: 'right', top: 'top-[24cqw]' },
  { side: 'right', top: 'top-[58cqw]' },
] as const

/** Ícones dos chips que substituem as anotações no celular (mesma ordem de `notes`). */
const noteIcons: LucideIcon[] = [Sparkles, Users, LayoutGrid, TrendingUp]

/** "Venda por conta própria. Não sozinho." — celular com o guia do dia e anotações. */
export function SalesAssistant() {
  const { t } = useTranslation()
  const notes = t('salesAssistant.notes')

  return (
    <section
      aria-labelledby="sales-assistant-title"
      className="overflow-hidden lilac-soft-surface py-section"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="sales-assistant-title"
            eyebrow={t('salesAssistant.eyebrow')}
            title={t('salesAssistant.title')}
            highlight={t('salesAssistant.titleHighlight')}
            breakBeforeHighlight
            subtitle={t('salesAssistant.description')}
          />
        </Reveal>

        <Reveal className="mt-content">
          <div className="container-inline relative left-1/2 w-[calc(var(--phone-w)/0.445)] -translate-x-1/2">
            <div
              className="absolute top-[10cqw] left-1/2 hidden aspect-square w-[80cqw] -translate-x-1/2 device-glow md:block"
              aria-hidden="true"
            />
            <PhoneMockup>
              <PhoneScreen />
            </PhoneMockup>
            {notes.map((note, index) => {
              const placement = notePlacements[index] ?? notePlacements[0]
              const left = placement.side === 'left'
              return (
                <div
                  key={note}
                  className={cn(
                    'absolute hidden w-[22cqw] flex-col md:flex',
                    placement.top,
                    left
                      ? 'right-[calc(50%+27cqw)] items-end text-right'
                      : 'left-[calc(50%+27cqw)] items-start text-left',
                  )}
                >
                  <HandwrittenNote>{note}</HandwrittenNote>
                  <HandArrow className={cn('mt-2 w-[7cqw]', !left && '-scale-x-100')} />
                </div>
              )
            })}
          </div>
        </Reveal>

        {/* Celular: as anotações manuscritas e setas saem; viram uma lista curta com ícones (2x2). */}
        <ul className="mt-4 grid grid-cols-2 gap-2 md:hidden">
          {notes.map((note, index) => {
            const Icon = noteIcons[index] ?? Sparkles
            return (
              <li
                key={note}
                className="flex items-start gap-2 rounded-card bg-background px-3 py-2.5 text-small leading-tight font-semibold text-foreground shadow-level-1"
              >
                <Icon
                  className="size-4 shrink-0 text-brand"
                  strokeWidth={iconStroke}
                  aria-hidden="true"
                />
                {note}
              </li>
            )
          })}
        </ul>

        <Reveal className="mx-auto mt-content flex max-w-reading items-start gap-4 rounded-panel bg-brand-lilac p-5 md:p-8">
          <Users
            className="size-6 shrink-0 text-brand"
            strokeWidth={iconStroke}
            aria-hidden="true"
          />
          <p className="text-lead text-foreground">
            {t('salesAssistant.closing')}
            <span className="font-semibold text-brand">{t('salesAssistant.closingHighlight')}</span>
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
