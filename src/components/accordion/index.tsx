import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'
import { iconStroke } from '@/lib/icons'

export const Accordion = AccordionPrimitive.Root

/** Item com separador; aberto, ganha fundo lilás claro e cantos arredondados. */
export function AccordionItem({
  className,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        'border-b border-border/70 px-4 transition-colors duration-200 data-[state=open]:rounded-card data-[state=open]:border-transparent data-[state=open]:bg-brand-tint md:px-5',
        className,
      )}
      {...props}
    />
  )
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          'group flex min-h-14 flex-1 cursor-pointer items-center justify-between gap-4 py-2.5 text-left transition-colors duration-200 hover:text-brand focus-visible:text-brand focus-visible:outline-none md:min-h-16 md:py-4',
          className,
        )}
        {...props}
      >
        {/* Pergunta não é título: quebra natural (pretty), não balanceada. */}
        <span className="flex-1 text-pretty">{children}</span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors duration-200 group-hover:border-brand/40 group-hover:text-brand group-focus-visible:ring-2 group-focus-visible:ring-brand">
          <ChevronDown
            className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
            strokeWidth={iconStroke}
            aria-hidden="true"
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pb-4 md:pb-5', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
