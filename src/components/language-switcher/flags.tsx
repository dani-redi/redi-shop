import type { Locale } from '@/config/locales'

type FlagProps = { locale: Locale; className?: string }

export function Flag({ locale, className }: FlagProps) {
  const svgProps = {
    viewBox: '0 0 24 16',
    className,
    'aria-hidden': true,
    preserveAspectRatio: 'none',
  } as const

  if (locale === 'pt-BR') {
    return (
      <svg {...svgProps}>
        <rect width="24" height="16" fill="#009C3B" />
        <polygon points="12,1.4 22.4,8 12,14.6 1.6,8" fill="#FEDF00" />
        <circle cx="12" cy="8" r="3.6" fill="#002776" />
        <path d="M8.9 6.7c2-1.5 4.6-1.5 6.2-.2-1.6-.5-4 .1-6.2.2z" fill="#FFFFFF" />
      </svg>
    )
  }

  if (locale === 'es') {
    return (
      <svg {...svgProps}>
        <rect width="24" height="16" fill="#AA151B" />
        <rect y="4" width="24" height="8" fill="#F1BF00" />
        <rect x="4.5" y="6.6" width="2.4" height="2.8" rx="0.5" fill="#AA151B" />
      </svg>
    )
  }

  return (
    <svg {...svgProps}>
      <rect width="24" height="16" fill="#FFFFFF" />
      {[0, 2.46, 4.92, 7.38, 9.84, 12.3, 14.76].map((y) => (
        <rect key={y} y={y} width="24" height="1.24" fill="#B22234" />
      ))}
      <rect width="10.5" height="8.6" fill="#3C3B6E" />
      {[1.5, 4, 6.5].map((cx) =>
        [1.6, 4, 6.4].map((cy) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="0.55" fill="#FFFFFF" />
        )),
      )}
    </svg>
  )
}
