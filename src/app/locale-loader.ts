import i18n from 'i18next'
import { redirect, type LoaderFunction } from 'react-router-dom'
import { defaultLocale, localePath, stripLocale, type Locale } from '@/config/locales'
import { loadLocale } from '@/i18n'
import { consumeInitialPreference } from '@/i18n/detect'

/**
 * Loader de cada rota de idioma: aplica o idioma antes do render e, no
 * primeiro acesso a uma página em pt-BR, redireciona para o idioma preferido do
 * visitante quando ele for outro.
 */
export function localeLoader(locale: Locale): LoaderFunction {
  return async ({ request }) => {
    // No pré-render não há visitante: cada idioma renderiza a própria rota.
    const preferred = import.meta.env.SSR ? null : consumeInitialPreference()
    if (locale === defaultLocale && preferred) {
      const path = stripLocale(new URL(request.url).pathname)
      return redirect(`${localePath(preferred, path)}${window.location.hash}`)
    }
    await loadLocale(locale)
    if (i18n.language !== locale) await i18n.changeLanguage(locale)
    return null
  }
}
