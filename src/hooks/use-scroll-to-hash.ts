import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Rola até a âncora da URL (ex.: `/#faq`, `/marcas#falar`) depois que a página
 * renderiza. Trocas de idioma não mexem no scroll: o visitante continua onde estava.
 */
export function useScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
  }, [pathname, hash])
}
