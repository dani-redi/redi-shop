import { useLayoutEffect, useRef, useState, type ComponentProps, type CSSProperties } from 'react'
import { cn } from '@/lib/cn'

type RevealProps = ComponentProps<'div'> & {
  /** Posição numa lista: atrasa a entrada em `--reveal-stagger` por item. */
  index?: number
}

/**
 * Fade + deslocamento ao entrar na viewport (uma vez). Só esconde o que começa abaixo
 * da dobra, então nada pisca no carregamento; com movimento reduzido fica sempre visível.
 */
export function Reveal({ index, className, style, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState<boolean | undefined>(undefined)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    if (element.getBoundingClientRect().top < window.innerHeight) return
    setRevealed(false)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setRevealed(true)
        observer.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-revealed={revealed === undefined ? undefined : String(revealed)}
      className={cn('reveal', className)}
      style={index ? ({ ...style, '--reveal-index': index } as CSSProperties) : style}
      {...props}
    />
  )
}
