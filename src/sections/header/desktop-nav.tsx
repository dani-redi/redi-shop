import { cn } from '@/lib/cn'
import { NavLink } from './nav-link'
import { navLinks } from './nav-links'

/** Sublinhado que cresce da esquerda no hover/foco. */
const underline =
  'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100'

export function DesktopNav({ className }: { className?: string }) {
  return (
    <nav className={cn('hidden items-center gap-8 text-nav lg:flex', className)}>
      {navLinks.map((item) => (
        <NavLink
          key={item.key}
          item={item}
          className={cn(
            'relative py-1 transition-colors duration-200 hover:text-brand focus-visible:text-brand focus-visible:outline-none',
            underline,
          )}
        />
      ))}
    </nav>
  )
}
