import { siteConfig } from '@/config/site'

export const navLinks = [
  { key: 'sellers', ...siteConfig.links.sellers },
  { key: 'brands', ...siteConfig.links.brands },
] as const

export type NavLink = (typeof navLinks)[number]
