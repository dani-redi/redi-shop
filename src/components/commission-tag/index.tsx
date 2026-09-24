import { DollarSign } from 'lucide-react'

/** "Comissão: 18%" com ícone de cifrão, usada nos cards de produto da hero. */
export function CommissionTag({ children }: { children: string }) {
  return (
    <div className="mt-1.5 flex items-center gap-1 border-t border-hero-ink/8 pt-1.5 sm:mt-2 sm:gap-1.5 sm:pt-2">
      <span className="flex size-4 shrink-0 items-center justify-center rounded-full border border-brand text-brand sm:size-6">
        <DollarSign className="size-2.5 sm:size-3.5" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="text-[0.47rem] font-semibold whitespace-nowrap text-hero-ink/68 sm:text-[0.77rem]">
        {children}
      </span>
    </div>
  )
}
