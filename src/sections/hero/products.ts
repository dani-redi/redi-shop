import { DollarSign, Flame, Package, Sparkles, Store, Zap, type LucideIcon } from 'lucide-react'
import cleanserSmall from '@/assets/images/hero/cleanser-192w.webp?no-inline'
import cleanser from '@/assets/images/hero/cleanser.webp'
import serum from '@/assets/images/hero/serum.webp'
import shoe from '@/assets/images/hero/shoe.webp'
import type { BadgeTone } from '@/components/badge'

type HeroProductVisual = {
  image: string
  /** Versão pequena, quando a foto aparece como miniatura (FeedCard). */
  imageSmall?: string
  icon: LucideIcon
  tone: BadgeTone
  /** Posição do card no palco da hero. */
  cardClassName: string
  /** A foto "vaza" para fora do card de formas diferentes em cada produto. */
  imageClassName: string
}

/** Visual dos 3 produtos, na mesma ordem de `hero.products` nas traduções. */
export const heroProducts: HeroProductVisual[] = [
  {
    // Laterais: menores e flutuando atrás do card central; do tablet em diante, girados ±4°.
    image: serum,
    icon: Flame,
    tone: 'hot',
    cardClassName:
      'absolute bottom-0 left-0 z-10 h-[11rem] w-[37%] animate-float md:bottom-4 md:h-[17.25rem] md:w-[31%] md:-rotate-4 lg:left-[3%] lg:h-[18.5rem] lg:w-[29%]',
    imageClassName: 'z-10 -top-[9%] h-[112%] w-[120%] lg:-top-[10%] lg:h-[114%]',
  },
  {
    // O produto do meio aparece dentro do FeedCard, não como ProductCard. No celular é
    // desenhado no tamanho do tablet e reduzido pela metade (scale); no desktop, protagonista
    // 10–20% maior.
    image: cleanser,
    imageSmall: cleanserSmall,
    icon: Sparkles,
    tone: 'purple',
    cardClassName:
      'absolute bottom-0 left-1/2 z-30 h-[24rem] w-[16rem] origin-bottom -translate-x-1/2 scale-50 md:top-0 md:bottom-auto md:h-[22rem] md:w-[37%] md:origin-top md:scale-110 lg:h-[24rem] lg:w-[34%] lg:scale-120',
    imageClassName: '',
  },
  {
    image: shoe,
    icon: Zap,
    tone: 'purple',
    cardClassName:
      'absolute right-0 bottom-0 z-20 h-[11rem] w-[37%] animate-float [animation-delay:-3s] md:bottom-4 md:h-[17.25rem] md:w-[31%] md:rotate-4 lg:right-[3%] lg:h-[18.5rem] lg:w-[29%]',
    imageClassName: 'z-30 bottom-[-30%] h-[130%] w-[138%] lg:bottom-[-34%] lg:h-[136%] lg:w-[144%]',
  },
]

/** Ícones dos benefícios, na ordem de `hero.benefits`. */
export const heroBenefitIcons: LucideIcon[] = [DollarSign, Package, Store]
