import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { localePath, localeStorageKey, locales, stripLocale, type Locale } from '@/config/locales'
import { useLocale } from '@/i18n/use-locale'
import { cn } from '@/lib/cn'
import { Flag } from './flags'

const sizes = {
  /** Header desktop: só as bandeiras. */
  md: 'h-9 w-11',
  /** Menu mobile: segmented control em largura total, bandeira + nome, 48px de altura. */
  lg: 'h-12 flex-1 gap-2 px-2 text-small font-semibold',
} as const

type LanguageSwitcherProps = {
  size?: keyof typeof sizes
  className?: string
  onSelect?: (locale: Locale) => void
}

function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(localeStorageKey, locale)
  } catch {
    // Armazenamento indisponível (modo privado etc.): a troca continua funcionando pela rota.
  }
}

export function LanguageSwitcher({ size = 'md', className, onSelect }: LanguageSwitcherProps) {
  const { t } = useTranslation()
  const { locale: current } = useLocale()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const select = (locale: Locale) => {
    rememberLocale(locale)
    onSelect?.(locale)
    if (locale !== current) navigate(localePath(locale, stripLocale(pathname)))
  }

  return (
    <div
      role="group"
      aria-label={t('nav.language')}
      className={cn(
        'items-center gap-1 rounded-full border border-hero-ink/10 bg-hero-ink/5 p-1',
        size === 'lg' && 'flex w-full',
        className,
      )}
    >
      {locales.map((locale) => {
        const label = t(`languages.${locale}`)
        const active = locale === current
        return (
          <button
            key={locale}
            type="button"
            onClick={() => select(locale)}
            aria-label={size === 'lg' ? undefined : label}
            aria-pressed={active}
            title={size === 'lg' ? undefined : label}
            className={cn(
              'flex cursor-pointer items-center justify-center rounded-full transition-[background-color,box-shadow,opacity] duration-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none',
              sizes[size],
              active
                ? 'bg-background shadow-level-1'
                : size === 'lg'
                  ? 'text-hero-ink/70'
                  : 'opacity-55 hover:bg-background/60 hover:opacity-100',
            )}
          >
            <Flag locale={locale} className="h-4 w-6 shrink-0 rounded-xs" />
            {size === 'lg' ? label : null}
          </button>
        )
      })}
    </div>
  )
}
