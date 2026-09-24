import { ArrowRight } from 'lucide-react'
import { iconStroke } from '@/lib/icons'

const trailingArrow = /\s*→\s*$/

/**
 * Texto de botão terminado em "→": troca a seta do texto por um ícone que desliza no
 * hover do botão (que tem a classe `group`). Sem seta, devolve o texto como está.
 */
export function ArrowLabel({ children }: { children: string }) {
  if (!trailingArrow.test(children)) return children
  return (
    <>
      {children.replace(trailingArrow, '')}
      <ArrowRight
        className="size-5 shrink-0 transition-[translate] duration-200 ease-out group-hover:translate-x-1"
        strokeWidth={iconStroke}
        aria-hidden="true"
      />
    </>
  )
}
