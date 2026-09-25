import { Users } from 'lucide-react'
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
 * Anotações, duas de cada lado (ordem de `salesAssistant.notes`). No celular ficam
 * desencontradas e quebram nos `
` das traduções; do tablet em diante, simétricas, na mesma
 * altura e com quebra natural. `mobileArrow: false` esconde a seta só no celular.
 */
const notePlacements = [
  { side: 'left', className: 'top-[22cqw] md:top-[24cqw]', mobileArrow: true },
  { side: 'left', className: 'top-[46cqw] md:top-[58cqw]', mobileArrow: true },
  { side: 'right', className: 'top-[29cqw] md:top-[24cqw]', mobileArrow: true },
  { side: 'right', className: 'top-[64cqw] md:top-[58cqw]', mobileArrow: false },
] as const

/** Tracinhos de "brilho" saindo do canto do celular, só no mobile. O canto fica em (24, 24). */
function Sparks({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      aria-hidden="true"
      className={cn('pointer-events-none text-brand md:hidden', className)}
    >
      <path d="M2 15l9 3M5 4l8 8M15 1l2 9" />
    </svg>
  )
}

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
              className="absolute top-[10cqw] left-1/2 aspect-square w-[80cqw] -translate-x-1/2 device-glow"
              aria-hidden="true"
            />
            <Sparks className="absolute -top-[5cqw] right-[calc(50%+19cqw)] w-[8cqw]" />
            <Sparks className="absolute -bottom-[5cqw] left-[calc(50%+19cqw)] w-[8cqw] rotate-180" />
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
                    'absolute flex w-max flex-col text-center md:w-[22cqw]',
                    placement.className,
                    left
                      ? 'right-[calc(50%+25cqw)] items-end md:right-[calc(50%+27cqw)] md:text-right'
                      : 'left-[calc(50%+25cqw)] items-start md:left-[calc(50%+27cqw)] md:text-left',
                  )}
                >
                  <HandwrittenNote className="self-stretch text-[3.3cqw]/[1.2] whitespace-pre-line md:text-note md:whitespace-normal">
                    {note}
                  </HandwrittenNote>
                  {/* Celular: seta sai do meio do texto, desce e vira para o celular. */}
                  <HandArrow
                    shape="hook"
                    className={cn(
                      'mt-[1cqw] w-[9.5cqw] self-center md:hidden',
                      left ? 'translate-x-1/2' : '-translate-x-1/2 -scale-x-100',
                      !placement.mobileArrow && 'hidden',
                    )}
                  />
                  <HandArrow
                    className={cn('mt-2 hidden w-[7cqw] md:block', !left && '-scale-x-100')}
                  />
                </div>
              )
            })}
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-content flex max-w-reading items-start gap-4 rounded-panel bg-brand-lilac p-5 md:p-8">
          <Users
            className="size-6 shrink-0 text-brand"
            strokeWidth={iconStroke}
            aria-hidden="true"
          />
          <p className="text-body font-semibold text-foreground md:text-lead md:font-normal">
            {t('salesAssistant.closing')}
            <span className="font-semibold text-brand">{t('salesAssistant.closingHighlight')}</span>
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
