import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { ArrowLabel } from '@/components/button/arrow-label'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useWaitlist } from '@/features/waitlist/context'
import { cn } from '@/lib/cn'
import { NavLink } from './nav-link'
import { navLinks } from './nav-links'

type MobileMenuProps = {
  id: string
  className?: string
  onNavigate: () => void
}

/**
 * Menu do celular em card flutuante abaixo do header, sobre um fundo escurecido (tocar
 * fora fecha): links de 56px, idioma em segmented control e o CTA de cadastro em largura
 * total. Trava a rolagem da página e marca `data-menu-open` no <html> (o CTA fixo
 * inferior some enquanto o menu está aberto).
 */
export function MobileMenu({ id, className, onNavigate }: MobileMenuProps) {
  const { t } = useTranslation()
  const { open } = useWaitlist()

  useEffect(() => {
    const root = document.documentElement
    root.dataset.menuOpen = ''
    root.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onNavigate()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      delete root.dataset.menuOpen
      root.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onNavigate])

  return (
    <div className="fixed inset-x-0 top-header bottom-0 lg:hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-hero-ink/25" onClick={onNavigate} />
      <div
        id={id}
        className={cn(
          'relative mx-gutter mt-3 flex max-h-[calc(100%-1.5rem-env(safe-area-inset-bottom))] flex-col gap-3 overflow-y-auto rounded-panel p-3 shadow-level-3',
          className,
        )}
      >
        <nav className="flex flex-col text-lead font-semibold">
          {navLinks.map((item) => (
            <NavLink
              key={item.key}
              item={item}
              onClick={onNavigate}
              className="flex min-h-12 items-center rounded-card px-3 transition-colors duration-200 hover:bg-hero-ink/5"
            />
          ))}
        </nav>
        <div className="pt-1">
          <LanguageSwitcher size="lg" onSelect={onNavigate} />
        </div>
        <Button
          variant="primary"
          size="xl"
          className="w-full"
          onClick={() => {
            onNavigate()
            open()
          }}
        >
          <ArrowLabel>{t('signupCta.button')}</ArrowLabel>
        </Button>
      </div>
    </div>
  )
}
