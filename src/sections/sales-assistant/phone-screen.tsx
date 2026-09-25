import {
  Bell,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Flame,
  House,
  Repeat2,
  Store,
  Tag,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import cosmetic from '@/assets/images/products/cosmetic.webp'
import supplement from '@/assets/images/products/supplement.webp'
import { IconBadge } from '@/components/icon-badge'
import { cn } from '@/lib/cn'

type OpportunityVisual = {
  icon: LucideIcon
  tone: string
  chip: string
  thumb?: string
  avatars?: string[]
}

/** Visual de cada oportunidade, na ordem de `salesAssistant.phone.opportunities`. */
const opportunityVisuals: OpportunityVisual[] = [
  { icon: Flame, tone: 'text-[#F0483E]', chip: 'bg-[#FDECEA]', thumb: supplement },
  { icon: Repeat2, tone: 'text-[#2B8DE3]', chip: 'bg-[#E7F2FD]', avatars: ['C', 'M', 'A'] },
  { icon: Tag, tone: 'text-brand', chip: 'bg-brand-lilac', thumb: cosmetic },
  { icon: CalendarDays, tone: 'text-[#E0489C]', chip: 'bg-[#FDE9F3]' },
]

const avatarColors = ['bg-[#2B8DE3]', 'bg-[#E0489C]', 'bg-[#1FAF7A]']

const navIcons: LucideIcon[] = [House, ClipboardList, CreditCard, Store, Users]

function BalanceRow({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-[1cqw] rounded-[1.6cqw] bg-white/12 px-[1.8cqw]',
        large ? 'mt-[2.2cqw] py-[1.4cqw]' : 'mt-[1.2cqw] py-[1.2cqw]',
      )}
    >
      <div className="min-w-0">
        <p className="text-[1.4cqw] leading-tight text-white/70">
          {label}
        </p>
        <p
          className={cn(
            'mt-[0.3cqw] leading-tight font-extrabold text-white',
            large
              ? 'text-[2.7cqw]'
              : 'text-[2.2cqw]',
          )}
        >
          {value}
        </p>
      </div>
      <ChevronRight className="size-[2.2cqw] shrink-0 text-white/70" aria-hidden="true" />
    </div>
  )
}

/** Tela inicial do app RediShop exibida dentro do PhoneMockup. */
export function PhoneScreen() {
  const { t } = useTranslation()
  const phone = t('salesAssistant.phone')

  return (
    <>
      <div className="relative bg-[linear-gradient(160deg,#6D28D9_0%,#5B1FC4_60%,#4C169F_100%)] px-[2.4cqw] pt-[4.6cqw] pb-[2.6cqw]">
        <div className="flex items-start justify-between gap-[1cqw]">
          <div className="min-w-0">
            <p className="text-[2.7cqw] leading-tight font-extrabold text-white">
              {phone.greeting}
            </p>
            <p className="mt-[0.4cqw] text-[1.55cqw] leading-tight text-white/70">
              {phone.greetingSub}
            </p>
          </div>
          <IconBadge
            icon={Bell}
            tone="bg-white/15 text-white"
            strokeWidth={2}
            className="size-[4.4cqw]"
            iconClassName="size-[2.2cqw]"
          />
        </div>
        <BalanceRow label={phone.balance} value={phone.balanceValue} large />
        <BalanceRow label={phone.pending} value={phone.pendingValue} />
      </div>

      <div className="px-[2.2cqw] pt-[2cqw] pb-[1cqw]">
        <div className="flex items-center justify-between">
          <p className="text-[2cqw] leading-none font-bold text-foreground">
            {phone.guide}
          </p>
          <p className="text-[1.5cqw] leading-none font-semibold text-brand">
            {phone.seeAll}
          </p>
        </div>
        <div className="mt-[1.4cqw] space-y-[1.2cqw]">
          {phone.opportunities.map((opportunity, index) => {
            const visual = opportunityVisuals[index] ?? opportunityVisuals[0]
            return (
              <div
                key={opportunity.tag}
                className="flex items-center gap-[1.2cqw] rounded-[1.8cqw] border border-black/5 bg-[#FCFBFF] px-[1.4cqw] py-[1.3cqw]"
              >
                <IconBadge
                  icon={visual.icon}
                  tone={cn(visual.chip, visual.tone)}
                  strokeWidth={2}
                  className="size-[4.4cqw]"
                  iconClassName="size-[2.2cqw]"
                />
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      'text-[1.15cqw] leading-none font-bold tracking-[0.08em] uppercase',
                      visual.tone,
                    )}
                  >
                    {opportunity.tag}
                  </p>
                  <p className="mt-[0.5cqw] text-[1.75cqw] leading-tight font-semibold text-foreground">
                    {opportunity.title}
                  </p>
                  {opportunity.description ? (
                    <p className="mt-[0.3cqw] text-[1.35cqw] leading-tight text-muted-foreground">
                      {opportunity.description}
                    </p>
                  ) : null}
                </div>
                {visual.thumb ? (
                  <img
                    src={visual.thumb}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="size-[4.6cqw] shrink-0 rounded-[1.2cqw] object-cover"
                  />
                ) : null}
                {visual.avatars ? (
                  <span className="flex shrink-0 -space-x-[0.9cqw]" aria-hidden="true">
                    {visual.avatars.map((initial, i) => (
                      <span
                        key={initial}
                        className={cn(
                          'flex size-[2.9cqw] items-center justify-center rounded-full border border-white text-[1.3cqw] font-bold text-white',
                          avatarColors[i],
                        )}
                      >
                        {initial}
                      </span>
                    ))}
                  </span>
                ) : null}
                <ChevronRight
                  className="size-[2cqw] shrink-0 text-muted-foreground/60"
                  aria-hidden="true"
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Barra de navegação do app: decorativa, só com a moldura do celular (tablet em diante). */}
      <div className="mt-[1cqw] flex items-start justify-between border-t border-black/5 px-[2cqw] pt-[1.4cqw] pb-[3cqw]">
        {phone.nav.map((label, index) => {
          const Icon = navIcons[index] ?? House
          const active = index === 0
          return (
            <span key={label} className="flex w-[7cqw] flex-col items-center gap-[0.5cqw]">
              <Icon
                className={cn('size-[2.4cqw]', active ? 'text-brand' : 'text-muted-foreground/70')}
                strokeWidth={active ? 2.4 : 1.8}
                fill={active ? 'currentColor' : 'none'}
                aria-hidden="true"
              />
              <span
                className={cn(
                  'text-[1.25cqw] leading-none',
                  active ? 'font-bold text-brand' : 'text-muted-foreground/80',
                )}
              >
                {label}
              </span>
            </span>
          )
        })}
      </div>
    </>
  )
}
