import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import type { Locale } from '@/config/locales'
import { useScrollToHash } from '@/hooks/use-scroll-to-hash'

export function LocaleLayout({ locale }: { locale: Locale }) {
  useScrollToHash()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return <Outlet />
}
