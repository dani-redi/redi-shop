import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useLocale } from '@/i18n/use-locale'
import type { NavLink as NavLinkItem } from './nav-links'

type NavLinkProps = Omit<ComponentProps<typeof Link>, 'to'> & { item: NavLinkItem }

/** Link do menu, localizado para o idioma atual. */
export function NavLink({ item, ...props }: NavLinkProps) {
  const { t } = useTranslation()
  const { pathFor } = useLocale()
  const hash = 'hash' in item ? `#${item.hash}` : ''
  return (
    <Link to={`${pathFor(item.path)}${hash}`} {...props}>
      {t(`nav.${item.key}`)}
    </Link>
  )
}
