import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { defaultLocale, localeStorageKey, locales, type Locale } from '@/config/locales'
import ptBR from './locales/pt-BR/common.json'

// pt-BR vai no bundle principal; en/es são baixados só quando a rota pede (ver loadLocale).
const lazyLocales: Partial<Record<Locale, () => Promise<{ default: object }>>> = {
  en: () => import('./locales/en/common.json'),
  es: () => import('./locales/es/common.json'),
}

/** Garante que as traduções do idioma estejam carregadas antes de trocar para ele. */
export async function loadLocale(locale: Locale) {
  const load = lazyLocales[locale]
  if (!load || i18n.hasResourceBundle(locale, 'common')) return
  const { default: bundle } = await load()
  i18n.addResourceBundle(locale, 'common', bundle)
}

/*
 * O idioma renderizado vem sempre da rota (ver LocaleLayout).
 * O detector só descobre a preferência do visitante (rota > escolha salva > navegador)
 * para o redirecionamento inicial feito em `/`.
 */
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { [defaultLocale]: { common: ptBR } },
    supportedLngs: locales,
    fallbackLng: { default: [defaultLocale] },
    defaultNS: 'common',
    ns: ['common'],
    interpolation: { escapeValue: false },
    returnObjects: true,
    initAsync: false,
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      lookupLocalStorage: localeStorageKey,
      caches: [],
    },
  })

export default i18n
