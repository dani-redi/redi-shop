import { StrictMode } from 'react'
import { prerender } from 'react-dom/static'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom'
import { Providers } from '@/app/providers'
import { routes } from '@/app/routes'

/**
 * Pré-render (scripts/prerender.mjs): HTML de uma rota com o mesmo tree do cliente
 * (Providers > router), para o navegador pintar o conteúdo antes do JS e o React hidratar.
 */
export async function render(path: string) {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(new URL(path, 'https://redi.shop')))
  if (context instanceof Response) throw new Error(`Rota ${path} redirecionou no pré-render`)
  const router = createStaticRouter(handler.dataRoutes, context)
  // prerender (e não renderToString) espera as seções lazy da home carregarem.
  const { prelude } = await prerender(
    <StrictMode>
      <Providers>
        <StaticRouterProvider router={router} context={context} hydrate={false} />
      </Providers>
    </StrictMode>,
    // HTML estático: tudo inline e na ordem. Sem isso, seções grandes (> ~12 kB) saem
    // "terceirizadas" em <div hidden> e dependem de script para entrar no lugar.
    { progressiveChunkSize: Number.POSITIVE_INFINITY },
  )
  return new Response(prelude).text()
}
