import { useEffect, useState } from 'react'
import { StoreBadges } from '@/components/store-badges'
import { cn } from '@/lib/cn'

/**
 * Botões das lojas fixos no rodapé do celular: aparecem quando os da hero saem da tela e
 * somem enquanto um Signup CTA, o footer ou o menu estiverem visíveis. 64px + safe area.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const inView = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) inView.add(entry.target)
        else inView.delete(entry.target)
      }
      setVisible(inView.size === 0)
    })
    for (const element of document.querySelectorAll('[data-sticky-cta-hide]')) {
      observer.observe(element)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div
      inert={!visible}
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background px-gutter pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] transition-[translate] duration-200 ease-out in-data-menu-open:hidden md:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <StoreBadges size="lg" />
    </div>
  )
}
