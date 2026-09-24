import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { PageMetaKey } from '@/config/pages'
import { seoTags } from '@/config/seo'
import { useLocale } from '@/i18n/use-locale'

function upsert(
  tag: 'meta' | 'link',
  match: Record<string, string>,
  values: Record<string, string>,
) {
  const selector = Object.entries(match)
    .map(([attr, value]) => `[${attr}="${value}"]`)
    .join('')
  let element = document.head.querySelector<HTMLElement>(`${tag}${selector}`)
  if (!element) {
    element = document.createElement(tag)
    for (const [attr, value] of Object.entries(match)) element.setAttribute(attr, value)
    document.head.appendChild(element)
  }
  for (const [attr, value] of Object.entries(values)) element.setAttribute(attr, value)
}

type SeoProps = {
  /** Caminho da página sem prefixo de idioma (ex.: `/marcas`). */
  path: string
  page: PageMetaKey
}

/**
 * Mantém o <head> em sincronia com a página e o idioma ao navegar no cliente.
 * O HTML estático de cada página já sai com essas tags (vite-plugins/localized-html.ts).
 */
export function Seo({ path, page }: SeoProps) {
  const { t } = useTranslation()
  const { locale } = useLocale()

  useEffect(() => {
    const tags = seoTags(locale, path, t(`meta.${page}`))
    document.title = tags.title
    for (const { attr, key, content } of tags.meta) upsert('meta', { [attr]: key }, { content })
    for (const { rel, href, ...rest } of tags.links) {
      const match: Record<string, string> = { rel }
      if ('hrefLang' in rest && rest.hrefLang) match.hreflang = rest.hrefLang
      upsert('link', match, { href })
    }
  }, [locale, path, page, t])

  return null
}
