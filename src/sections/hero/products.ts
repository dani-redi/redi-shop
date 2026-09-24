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
    // Laterais (só do tablet em diante): menores, girados ±4° e flutuando atrás do card central.
    image: serum,
    icon: Flame,
    tone: 'hot',
    cardClassName:
      'absolute hidden bottom-4 left-0 z-10 h-[17.25rem] w-[31%] -rotate-4 animate-float md:flex lg:left-[3%] lg:h-[18.5rem] lg:w-[29%]',
    imageClassName: 'z-10 -top-[9%] h-[112%] w-[120%] lg:-top-[10%] lg:h-[114%]',
  },
  {
    // O produto do meio aparece dentro do FeedCard, não como ProductCard. No celular fica no
    // fluxo, em largura total do palco; no desktop, protagonista 10–20% maior.
    image: cleanser,
    imageSmall: cleanserSmall,
    icon: Sparkles,
    tone: 'purple',
    cardClassName:
      'relative z-30 md:absolute md:top-0 md:left-1/2 md:h-[22rem] md:w-[37%] md:origin-top md:-translate-x-1/2 md:scale-110 lg:h-[24rem] lg:w-[34%] lg:scale-120',
    imageClassName: '',
  },
  {
    image: shoe,
    icon: Zap,
    tone: 'purple',
    cardClassName:
      'absolute hidden right-0 bottom-4 z-20 h-[17.25rem] w-[31%] rotate-4 animate-float [animation-delay:-3s] md:flex lg:right-[3%] lg:h-[18.5rem] lg:w-[29%]',
    imageClassName: 'z-30 bottom-[-30%] h-[130%] w-[138%] lg:bottom-[-34%] lg:h-[136%] lg:w-[144%]',
  },
]

/** Ícones dos benefícios, na ordem de `hero.benefits`. */
export const heroBenefitIcons: LucideIcon[] = [DollarSign, Package, Store]
