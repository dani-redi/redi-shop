import i18n from 'i18next'
import { defaultLocale, type Locale } from '@/config/locales'

const botPattern = /bot|crawl|spider|slurp|lighthouse|headless|preview/i

function toLocale(code: string): Locale | null {
  const language = code.toLowerCase().split('-')[0]
  if (language === 'pt') return 'pt-BR'
  if (language === 'en' || language === 'es') return language
  return null
}

/**
 * Idioma preferido do visitante (escolha salva > navegador), ou `null` quando ele
 * deve permanecer em pt-BR. Robôs de busca nunca são redirecionados.
 */
function detectInitialPreference(): Locale | null {
  if (typeof navigator !== 'undefined' && botPattern.test(navigator.userAgent)) return null
  const detected = i18n.services.languageDetector?.detect()
  const codes = (Array.isArray(detected) ? detected : [detected]).filter(
    (code): code is string => typeof code === 'string',
  )
  // Mesmo comportamento do site anterior: idiomas não suportados caem em inglês.
  const preferred = codes.map(toLocale).find(Boolean) ?? 'en'
  return preferred === defaultLocale ? null : preferred
}

let pending: Locale | null | undefined

/** Retorna a preferência apenas uma vez, para não brigar com trocas manuais de idioma. */
export function consumeInitialPreference() {
  if (pending === undefined) pending = detectInitialPreference()
  const value = pending
  pending = null
  return value
}
