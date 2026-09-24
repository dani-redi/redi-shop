import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import type { Plugin } from 'vite'
import { defaultLocale, localePath, locales, type Locale } from '../src/config/locales.ts'
import { pages, type PageMetaKey } from '../src/config/pages.ts'
import { seoTags, type SeoTexts } from '../src/config/seo.ts'

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function readTexts(root: string, locale: Locale, page: PageMetaKey): SeoTexts {
  const file = resolve(root, `src/i18n/locales/${locale}/common.json`)
  return JSON.parse(readFileSync(file, 'utf8')).meta[page]
}

function renderHead(root: string, locale: Locale, path: string, page: PageMetaKey) {
  const tags = seoTags(locale, path, readTexts(root, locale, page))
  const meta = tags.meta.map(
    ({ attr, key, content }) => `<meta ${attr}="${key}" content="${escape(content)}" />`,
  )
  const links = tags.links.map(({ rel, href, ...rest }) => {
    const hreflang = 'hrefLang' in rest ? ` hreflang="${rest.hrefLang}"` : ''
    return `<link rel="${rel}"${hreflang} href="${href}" />`
  })
  return [`<title>${escape(tags.title)}</title>`, ...meta, ...links].join('\n    ')
}

const setLang = (html: string, locale: Locale) =>
  html.replace(/<html lang="[^"]*"/, `<html lang="${locale}"`)

/**
 * Gera o <head> (title, description, Open Graph, hreflang) de cada página em cada
 * idioma no HTML estático — robôs de redes sociais não executam JS.
 * Saída: `index.html`, `marcas/index.html`, `en/index.html`, `en/marcas/index.html`…
 */
export function localizedHtml(): Plugin {
  let root = process.cwd()
  let outDir = 'dist'
  let ssr = false
  const defaultHead = () => renderHead(root, defaultLocale, '/', 'home')

  return {
    name: 'redishop:localized-html',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
      ssr = Boolean(config.build.ssr)
    },
    transformIndexHtml(html) {
      return html.replace('<!--app-head-->', defaultHead())
    },
    closeBundle() {
      // O build SSR (pré-render) não gera HTML.
      if (ssr) return
      const base = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      for (const locale of locales) {
        for (const { path, metaKey } of pages) {
          if (locale === defaultLocale && path === '/') continue
          const head = renderHead(root, locale, path, metaKey)
          const html = setLang(base.replace(defaultHead(), head), locale)
          const file = resolve(outDir, `.${localePath(locale, path)}/index.html`)
          mkdirSync(dirname(file), { recursive: true })
          writeFileSync(file, html)
        }
      }
    },
  }
}
