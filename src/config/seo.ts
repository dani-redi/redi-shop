import { localePath, locales, type Locale } from './locales.ts'
import { siteConfig } from './site.ts'

export type SeoTexts = {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
}

export const ogLocale: Record<Locale, string> = {
  'pt-BR': 'pt_BR',
  en: 'en_US',
  es: 'es_ES',
}

export const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString()

/** Tags do <head> de cada idioma. Usado no build (HTML estático) e no cliente (troca de idioma). */
export type MetaTag = { attr: 'name' | 'property'; key: string; content: string }

export function seoTags(locale: Locale, path: string, texts: SeoTexts) {
  const url = absoluteUrl(localePath(locale, path))
  const image = absoluteUrl(siteConfig.ogImage)
  const meta: MetaTag[] = [
    { attr: 'name', key: 'description', content: texts.description },
    { attr: 'property', key: 'og:type', content: 'website' },
    { attr: 'property', key: 'og:site_name', content: siteConfig.name },
    { attr: 'property', key: 'og:url', content: url },
    { attr: 'property', key: 'og:locale', content: ogLocale[locale] },
    { attr: 'property', key: 'og:title', content: texts.ogTitle },
    { attr: 'property', key: 'og:description', content: texts.ogDescription },
    { attr: 'property', key: 'og:image', content: image },
    { attr: 'property', key: 'og:image:width', content: '1200' },
    { attr: 'property', key: 'og:image:height', content: '630' },
    { attr: 'name', key: 'twitter:card', content: 'summary_large_image' },
    { attr: 'name', key: 'twitter:title', content: texts.ogTitle },
    { attr: 'name', key: 'twitter:description', content: texts.ogDescription },
    { attr: 'name', key: 'twitter:image', content: image },
  ]
  return {
    title: texts.title,
    meta,
    links: [
      { rel: 'canonical', href: url },
      ...locales.map((alternate) => ({
        rel: 'alternate',
        hrefLang: alternate,
        href: absoluteUrl(localePath(alternate, path)),
      })),
      { rel: 'alternate', hrefLang: 'x-default', href: absoluteUrl(path) },
    ],
  }
}
