import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { AppleIcon, GooglePlayIcon } from '@/components/brand-icons'
import { buttonStyles, type ButtonSize } from '@/components/button/styles'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

const stores = [
  { key: 'appStore', name: 'App Store', href: siteConfig.links.appStore, Icon: AppleIcon },
  {
    key: 'googlePlay',
    name: 'Google Play',
    href: siteConfig.links.googlePlay,
    Icon: GooglePlayIcon,
  },
] as const

type StoreBadgesProps = ComponentProps<'div'> & {
  /** `dark` em fundos claros; `white` nas faixas escuras (Signup CTA). */
  variant?: 'dark' | 'white'
  size?: ButtonSize
}

/**
 * Botões "Baixar na App Store" / "Google Play", lado a lado em 2 colunas iguais. A
 * largura vem de quem usa (ex.: `w-full max-w-sm`).
 */
export function StoreBadges({
  variant = 'dark',
  size = 'xl',
  className,
  ...props
}: StoreBadgesProps) {
  const { t } = useTranslation()
  return (
    <div className={cn('grid grid-cols-2 gap-3', className)} {...props}>
      {stores.map(({ key, name, href, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({ variant, size, className: 'gap-2.5 px-4 text-left' })}
        >
          <Icon className="size-6 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="text-[0.6875rem] font-medium opacity-75">
              {t(`storeBadges.${key}`)}
            </span>
            <span className="mt-0.5 text-body leading-tight font-bold">{name}</span>
          </span>
        </a>
      ))}
    </div>
  )
}
