import { useTranslation } from 'react-i18next'
import { AppleIcon, GooglePlayIcon } from '@/components/brand-icons'
import { cn } from '@/lib/cn'

const iconClass = 'size-6 opacity-70 transition-opacity duration-200 hover:opacity-100'

/**
 * Ícones App Store / Google Play. Por enquanto só decorativos, como no site
 * anterior — os apps ainda não têm link público.
 */
export function StoreBadges({ className }: { className?: string }) {
  const { t } = useTranslation()
  return (
    <div className={cn('flex items-center justify-center gap-6', className)}>
      <AppleIcon className={iconClass} aria-label={t('signupCta.appStore')} role="img" />
      <GooglePlayIcon className={iconClass} aria-label={t('signupCta.googlePlay')} role="img" />
    </div>
  )
}
