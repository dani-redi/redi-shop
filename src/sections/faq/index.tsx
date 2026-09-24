import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/accordion'
import { buttonStyles } from '@/components/button/styles'
import { Container } from '@/components/container'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/cn'
import { iconStroke } from '@/lib/icons'

/** Perguntas visíveis no celular antes de "Ver todas"; as demais continuam no DOM (SEO). */
const mobileVisible = 6

export function Faq() {
  const { t } = useTranslation()
  const items = t('faq.items')
  const [showAll, setShowAll] = useState(false)
  const collapsed = !showAll && items.length > mobileVisible

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-background py-section">
      <Container size="reading">
        <Reveal>
          <h2 id="faq-title" className="text-center text-h2">
            {t('faq.title')}
          </h2>
        </Reveal>
        <Reveal className="mt-content">
          <Accordion type="single" collapsible className="grid gap-1">
            {items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-${index}`}
                className={cn(collapsed && index >= mobileVisible && 'hidden md:block')}
              >
                <AccordionTrigger className="text-question">{item.question}</AccordionTrigger>
                <AccordionContent className="text-body leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {collapsed ? (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className={buttonStyles({
                variant: 'secondary',
                size: 'lg',
                className: 'mt-4 w-full md:hidden',
              })}
            >
              {t('faq.showAll')}
              <ChevronDown className="size-5" strokeWidth={iconStroke} aria-hidden="true" />
            </button>
          ) : null}
        </Reveal>
      </Container>
    </section>
  )
}
