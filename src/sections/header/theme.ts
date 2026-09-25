/**
 * `hero`: fixo sobre a hero da home, transparente no topo e branco translúcido ao rolar.
 * `solid`: fixo no topo com fundo claro (demais páginas).
 */
export type HeaderVariant = 'hero' | 'solid'

// Sólido no celular (blur em tela cheia pesa em Android intermediário); translúcido do tablet em diante.
const surface = 'border-border/60 bg-background md:bg-background/80 md:backdrop-blur-xl'

export const headerTheme = {
  hero: {
    header: 'fixed inset-x-0 top-0 z-50 text-hero-ink',
    top: 'border-transparent',
    scrolled: surface,
    menuButton: 'border-hero-ink/25 text-hero-ink',
    mobilePanel: 'bg-background text-hero-ink',
  },
  solid: {
    header: 'sticky top-0 z-50 text-foreground',
    top: surface,
    scrolled: surface,
    menuButton: 'border-brand/25 text-brand',
    mobilePanel: 'bg-background text-foreground',
  },
} satisfies Record<HeaderVariant, Record<string, string>>
