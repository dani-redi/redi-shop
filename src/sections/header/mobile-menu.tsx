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
 * Menu do celular em tela cheia, abaixo do header: links de 56px, idioma em segmented
 * control e o CTA de cadastro em largura total no rodapé. Trava a rolagem da página e
 * marca `data-menu-open` no <html> (o CTA fixo inferior some enquanto o menu está aberto).
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
    <div
      id={id}
      className={cn(
        'fixed inset-x-0 top-header bottom-0 flex flex-col overflow-y-auto px-gutter pt-2 pb-[calc(1.5rem+env(safe-area-inset-bottom))] lg:hidden',
        className,
      )}
    >
      <nav className="flex flex-col text-lead font-semibold">
        {navLinks.map((item) => (
          <NavLink
            key={item.key}
            item={item}
            onClick={onNavigate}
            className="flex min-h-14 items-center border-b border-current/15"
          />
        ))}
      </nav>
      <div className="mt-6">
        <LanguageSwitcher size="lg" onSelect={onNavigate} />
      </div>
      <Button
        variant="primary"
        size="xl"
        className="mt-auto w-full"
        onClick={() => {
          onNavigate()
          open()
        }}
      >
        <ArrowLabel>{t('signupCta.button')}</ArrowLabel>
      </Button>
    </div>
  )
}
