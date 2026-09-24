import { useTranslation } from 'react-i18next'
import { defaultLocale, isLocale, localePath, type Locale } from '@/config/locales'

/** Idioma atual (definido pela rota) e helpers de caminho localizado. */
export function useLocale() {
  const { i18n } = useTranslation()
  const locale: Locale = isLocale(i18n.language) ? i18n.language : defaultLocale
  return {
    locale,
    homePath: localePath(locale),
    pathFor: (path: string) => localePath(locale, path),
  }
}
