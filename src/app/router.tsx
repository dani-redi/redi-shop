import { createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'

export const router = createBrowserRouter(routes)

/** Resolve quando os loaders da rota inicial terminaram (idioma aplicado, redirects feitos). */
export function routerReady() {
  if (router.state.initialized) return Promise.resolve()
  return new Promise<void>((resolve) => {
    const unsubscribe = router.subscribe((state) => {
      if (!state.initialized) return
      unsubscribe()
      resolve()
    })
  })
}
