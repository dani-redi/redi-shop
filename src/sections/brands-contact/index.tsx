import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/container'
import { Reveal } from '@/components/reveal'
import { siteConfig } from '@/config/site'
import { BrandContactForm } from '@/features/brand-contact/brand-contact-form'
import { iconStroke } from '@/lib/icons'

/** "Quer entender se a Redi faz sentido para sua marca?" + formulário de contato num painel. */
export function BrandsContact() {
  const { t } = useTranslation()
  const contact = t('brands.contact')

  return (
    <section
      id={siteConfig.links.brandsContact.hash}
      aria-labelledby="brands-contact-title"
      className="scroll-mt-header hero-surface py-section"
    >
      <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <h2 id="brands-contact-title" className="text-h2">
            {contact.title}
          </h2>
          <p className="mt-4 max-w-lead text-lead text-muted-foreground">{contact.description}</p>
          <ul className="mt-8 space-y-3">
            {contact.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-body">
                <Check
                  className="mt-0.5 size-5 shrink-0 text-brand"
                  strokeWidth={iconStroke}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal index={1} className="rounded-panel bg-background p-6 shadow-level-3 sm:p-8 lg:p-10">
          <BrandContactForm />
        </Reveal>
      </Container>
    </section>
  )
}
