import { Navigate, type RouteObject } from 'react-router-dom'
import { locales, localePath } from '@/config/locales'
import { HomePage } from '@/pages/home'
import { LocaleLayout } from './locale-layout'
import { localeLoader } from './locale-loader'

// Cada idioma tem as mesmas páginas: `/`, `/marcas`, `/en`, `/en/marcas`, `/es`, `/es/marcas`.
const localeRoutes: RouteObject[] = locales.map((locale) => ({
  path: localePath(locale),
  loader: localeLoader(locale),
  element: <LocaleLayout locale={locale} />,
  children: [
    { index: true, element: <HomePage /> },
    // /marcas fica num chunk separado: a home não baixa o código dela.
    {
      path: 'marcas',
      lazy: async () => ({ Component: (await import('@/pages/brands')).BrandsPage }),
    },
  ],
}))

/** Rotas do site, compartilhadas pelo router do navegador e pelo pré-render (entry-server). */
export const routes: RouteObject[] = [
  ...localeRoutes,
  { path: '*', element: <Navigate to="/" replace /> },
]
