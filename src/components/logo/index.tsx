import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import logoSmall from '@/assets/images/brand/redishop-logo-cor-320w.webp'
import logo from '@/assets/images/brand/redishop-logo-cor.webp'
import { useLocale } from '@/i18n/use-locale'
import { cn } from '@/lib/cn'

const heights = {
  header: '[--logo-size:var(--logo-h)]',
  footer: '[--logo-size:var(--logo-h-footer)]',
} as const

/**
 * Largura exibida (altura da imagem × 3,15) para o `sizes`: header 89px no celular, 58px no
 * tablet e 91px no desktop; footer 124px.
 */
const imageSizes = {
  header: '(min-width: 64rem) 91px, (min-width: 48rem) 58px, 89px',
  footer: '124px',
} as const

type LogoProps = {
  size?: keyof typeof heights
  className?: string
}

/** Logo "Redi.Shop" (RediShopHorizontalCor), linkando para a home do idioma atual. */
export function Logo({ size = 'header', className }: LogoProps) {
  const { t } = useTranslation()
  const { homePath } = useLocale()
  return (
    <Link
      to={homePath}
      aria-label={t('nav.home')}
      className={cn('inline-flex items-center', heights[size], className)}
    >
      {/* "Redi" ocupa 92% da altura da imagem (o resto é a perna do "p"): ×1,09 mantém a
          altura da marca em --logo-size. */}
      <img
        src={logoSmall}
        srcSet={`${logoSmall} 320w, ${logo} 640w`}
        sizes={imageSizes[size]}
        alt="RediShop"
        width={640}
        height={203}
        className="h-[calc(var(--logo-size)*1.09)] w-auto"
      />
    </Link>
  )
}
