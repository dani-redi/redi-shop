/** Páginas do site. `metaKey` aponta para `meta.<chave>` nas traduções. */
export const pages = [
  { path: '/', metaKey: 'home' },
  { path: '/marcas', metaKey: 'brands' },
] as const

export type PageMetaKey = (typeof pages)[number]['metaKey']
