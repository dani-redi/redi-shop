import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import logoVioletSmall from '@/assets/images/brand/redi-logo-violet-256w.webp'
import logoViolet from '@/assets/images/brand/redi-logo-violet.webp'
import { useLocale } from '@/i18n/use-locale'
import { cn } from '@/lib/cn'

const heights = {
  header: '[--logo-size:var(--logo-h)]',
  footer: '[--logo-size:var(--logo-h-footer)]',
} as const

/** Largura exibida (altura × 2,21) para o `sizes`: header 26px no celular, 17px no tablet+. */
const imageSizes = {
  header: '(min-width: 48rem) 40px, 58px',
  footer: '80px',
} as const

type LogoProps = {
  size?: keyof typeof heights
  /** Linha em caixa alta abaixo da marca ("SUA REDE DE VENDAS"). */
  tagline?: string
  className?: string
}

/** Marca "Redi" + ".shop", linkando para a home do idioma atual. */
export function Logo({ size = 'header', tagline, className }: LogoProps) {
  const { t } = useTranslation()
  const { homePath } = useLocale()
  return (
    <Link
      to={homePath}
      aria-label={t('nav.home')}
      className={cn('inline-flex flex-col', heights[size], className)}
    >
      <span className="inline-flex items-baseline">
        <img
          src={logoVioletSmall}
          srcSet={`${logoVioletSmall} 256w, ${logoViolet} 480w`}
          sizes={imageSizes[size]}
          alt="Redi"
          width={480}
          height={217}
          className="h-(--logo-size) w-auto"
        />
        {/* ".shop" acompanha a altura da marca (82% dela). */}
        <span className="pl-0.5 text-[length:calc(var(--logo-size)*0.82)] leading-none font-normal text-brand-soft">
          .shop
        </span>
      </span>
      {tagline ? (
        <span className="mt-1 text-eyebrow tracking-[0.24em] text-hero-ink/75 uppercase">
          {tagline}
        </span>
      ) : null}
    </Link>
  )
}
