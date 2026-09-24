import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/container'
import { Logo } from '@/components/logo'
import { cn } from '@/lib/cn'
import { iconStroke } from '@/lib/icons'
import { stickyCtaHide } from '@/sections/sticky-cta/hide'

type FooterColumnProps = { title: string; items: string[] }

/**
 * Grupo do footer. Celular: accordion (título de 44px que abre a lista); tablet em diante:
 * bloco sempre aberto. Os itens ficam sempre no DOM.
 */
function FooterColumn({ title, items }: FooterColumnProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border/60 md:border-0">
      <h3 className="text-small font-semibold text-foreground">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-11 w-full items-center justify-between text-left md:pointer-events-none md:min-h-0 md:cursor-auto"
        >
          {title}
          <ChevronDown
            className={cn(
              'size-4 transition-transform duration-200 md:hidden',
              open && 'rotate-180',
            )}
            strokeWidth={iconStroke}
            aria-hidden="true"
          />
        </button>
      </h3>
      {/* Itens sem link por enquanto, como no site anterior. */}
      <ul
        className={cn(
          'space-y-2 pb-4 text-small text-muted-foreground md:mt-4 md:block md:space-y-3 md:pb-0',
          !open && 'hidden',
        )}
      >
        {items.map((item) => (
          <li key={item} className="transition-colors duration-200 hover:text-brand">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const { t } = useTranslation()
  const columns = t('footer.columns')

  return (
    <footer
      {...stickyCtaHide}
      className="border-t border-border/60 bg-background pt-10 pb-8 md:pt-16 lg:pt-20"
    >
      <Container className="grid md:grid-cols-2 md:gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
        <div className="pb-4 md:pb-0">
          <Logo size="footer" className="min-h-11 justify-center" />
          <p className="mt-3 max-w-70 text-small text-muted-foreground md:mt-4">
            {t('footer.tagline')}
          </p>
        </div>
        {columns.map((column) => (
          <FooterColumn key={column.title} title={column.title} items={column.items} />
        ))}
      </Container>
      <Container className="mt-6 md:mt-12">
        <p className="text-caption text-muted-foreground md:border-t md:border-border/60 md:pt-8">
          {t('footer.rights')}
        </p>
      </Container>
    </footer>
  )
}
