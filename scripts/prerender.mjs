// Pré-render da home em cada idioma: injeta o HTML do React em dist/**/index.html.
// Roda depois de `vite build` e `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const ssrDir = resolve(root, 'dist-ssr')
const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)

// Render de aquecimento: carrega os chunks das seções lazy. Sem ele, o React emite essas
// seções fora de ordem (em <div hidden> + scripts $RC); com os módulos já resolvidos, sai
// tudo inline, na ordem, sem script.
await render('/')

// Mesmos caminhos de localePath(locale, '/'): pt-BR na raiz.
const pages = [
  { path: '/', file: 'index.html' },
  { path: '/en', file: 'en/index.html' },
  { path: '/es', file: 'es/index.html' },
]

for (const { path, file } of pages) {
  const target = resolve(root, 'dist', file)
  const html = readFileSync(target, 'utf8')
  if (!html.includes('<div id="root"></div>'))
    throw new Error(`${file}: <div id="root"> não encontrado`)
  const markup = await render(path)
  if (markup.includes('<template id="B:'))
    throw new Error(`${path}: seção lazy ainda saiu fora de ordem`)
  writeFileSync(
    target,
    html.replace('<div id="root"></div>', `<div id="root" data-path="${path}">${markup}</div>`),
  )
  console.log(`pré-render ${path} → dist/${file} (${(markup.length / 1024).toFixed(1)} kB)`)
}

rmSync(ssrDir, { recursive: true, force: true })
