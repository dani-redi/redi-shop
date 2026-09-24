import { startTransition, StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@/i18n'
import '@/styles/index.css'
import { App } from '@/app/App'
import { router, routerReady } from '@/app/router'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Páginas pré-renderizadas (home nos 3 idiomas) chegam com o HTML pronto e `data-path`.
// Hidrata depois dos loaders (idioma carregado), para o primeiro render bater com o HTML;
// se o loader redirecionou para outro idioma, renderiza do zero.
const prerenderedPath = container.dataset.path
if (prerenderedPath) {
  void routerReady().then(() => {
    // `/es` e `/es/` são a mesma página (depende do host).
    const current = router.state.location.pathname.replace(/(.)\/$/, '$1')
    if (current !== prerenderedPath) return createRoot(container).render(app)
    // Em transição, a hidratação é fatiada e cede a thread ao navegador (sem tarefa longa:
    // melhor TBT/INP em Android intermediário). O HTML já está visível enquanto isso.
    startTransition(() => {
      hydrateRoot(container, app)
    })
  })
} else {
  createRoot(container).render(app)
}
