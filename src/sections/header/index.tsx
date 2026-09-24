import { Menu, X } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { buttonStyles } from '@/components/button/styles'
import { Container } from '@/components/container'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Logo } from '@/components/logo'
import { siteConfig } from '@/config/site'
import { useScrolled } from '@/hooks/use-scrolled'
import { useLocale } from '@/i18n/use-locale'
import { cn } from '@/lib/cn'
import { iconStroke } from '@/lib/icons'
import { DesktopNav } from './desktop-nav'
import { MobileMenu } from './mobile-menu'
import { headerTheme, type HeaderVariant } from './theme'

// Id fixo (e não useId): o HTML pré-renderizado e o do cliente precisam bater.
const menuId = 'mobile-menu'

export function Header({ variant = 'solid' }: { variant?: HeaderVariant }) {
  const { t } = useTranslation()
  const { pathFor } = useLocale()
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled()
  const theme = headerTheme[variant]
  const close = useCallback(() => setOpen(false), [])

  return (
    <header
      className={cn(
        'border-b transition-[background-color,border-color,backdrop-filter] duration-200',
        theme.header,
        scrolled || open ? theme.scrolled : theme.top,
      )}
    >
      <Container className="flex h-header items-center justify-between gap-4">
        {/* min-h-12: área de toque de 48px para a logo. */}
        <Logo
          tagline={variant === 'hero' ? t('hero.eyebrow') : undefined}
          className="min-h-12 justify-center"
        />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden lg:inline-flex" />
          <Link
            to={pathFor(siteConfig.links.brands.path)}
            className={buttonStyles({ variant: 'primary', className: 'hidden lg:inline-flex' })}
          >
            {t('nav.sell')}
          </Link>
          <button
            type="button"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
            className={cn(
              'inline-flex size-12 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 hover:bg-brand-tint lg:hidden',
              theme.menuButton,
            )}
          >
            {open ? (
              <X className="size-5" strokeWidth={iconStroke} aria-hidden="true" />
            ) : (
              <Menu className="size-5" strokeWidth={iconStroke} aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>
      {open ? <MobileMenu id={menuId} className={theme.mobilePanel} onNavigate={close} /> : null}
    </header>
  )
}
