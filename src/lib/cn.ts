import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/*
 * No Tailwind v4 as utilidades `leading-*` são geradas depois de `text-*` e sempre
 * vencem no CSS. O tailwind-merge, por padrão, descarta um `leading-*` quando vem
 * um `text-*` depois — o que mudaria a altura de linha pretendida.
 */
const twMerge = extendTailwindMerge({
  override: { conflictingClassGroups: { 'font-size': [] } },
  // Tokens próprios (tokens.css): sem isso, `text-lead` viraria cor e `px-gutter` não conflitaria com `px-5`.
  extend: {
    theme: {
      text: [
        'display',
        'h2',
        'h3',
        'lead',
        'nav',
        'question',
        'body',
        'small',
        'caption',
        'eyebrow',
        'note',
      ],
      spacing: ['gutter', 'section', 'content', 'header'],
      radius: ['control', 'card', 'panel', 'device'],
      shadow: ['level-1', 'level-2', 'level-3', 'level-4'],
      container: ['page', 'reading', 'lead'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
