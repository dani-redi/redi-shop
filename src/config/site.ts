export const siteConfig = {
  name: 'RediShop',
  url: 'https://redi.shop',
  ogImage: '/og/redishop-og.jpg',
  /** Comissão máxima divulgada no site (hero e passo 2 de "Como funciona"). */
  maxCommission: 30,
  /** Caminhos sem prefixo de idioma; use `localePath`/`pathFor` para localizar. */
  links: {
    sellers: { path: '/', hash: 'para-voce' },
    brands: { path: '/marcas' },
    brandsContact: { path: '/marcas', hash: 'falar' },
    demoApp: 'https://app.redi.shop',
  },
} as const
