export const locales = ['pt-BR', 'en', 'es'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'pt-BR'

/** Chave usada pelo site Lovable — mantida para preservar a escolha de quem já visitou. */
export const localeStorageKey = 'redishop-locale'

/** Prefixo de rota de cada idioma: pt-BR fica na raiz. */
export const localePrefix: Record<Locale, string> = {
  'pt-BR': '',
  en: '/en',
  es: '/es',
}

export function localePath(locale: Locale, path = '/') {
  const prefix = localePrefix[locale]
  if (path === '/') return prefix || '/'
  return `${prefix}${path}`
}

/** Remove o prefixo de idioma: `/en/marcas` → `/marcas`, `/es` → `/`. */
export function stripLocale(pathname: string) {
  for (const locale of locales) {
    const prefix = localePrefix[locale]
    if (!prefix) continue
    if (pathname === prefix || pathname === `${prefix}/`) return '/'
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length)
  }
  return pathname || '/'
}

export function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale)
}
