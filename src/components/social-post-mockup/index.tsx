import { Ellipsis, Heart, Link2, MessageCircle, Send, Share2, Smile, Store, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/*
 * Mockups de post em redes sociais. Todas as medidas são em `cqw` e os cards
 * mantêm a proporção 9:16 — use dentro de um elemento com `container-inline`.
 */

const frame = 'aspect-[9/16] overflow-hidden rounded-[2.5cqw] shadow-level-3'

type WhatsAppPostProps = {
  messageBefore: string
  messageAfter: string
  time: string
  inputPlaceholder: string
  /** Card do produto compartilhado dentro do balão. */
  attachment: ReactNode
  className?: string
}

export function WhatsAppPost({
  messageBefore,
  messageAfter,
  time,
  inputPlaceholder,
  attachment,
  className,
}: WhatsAppPostProps) {
  return (
    <div className={cn(frame, 'flex flex-col justify-between bg-[#ECE5DD] p-[1.8cqw]', className)}>
      <div className="rounded-[2cqw] rounded-tl-[0.6cqw] bg-white p-[1.5cqw] shadow-[0_1cqw_2.5cqw_-1.5cqw_rgba(24,10,60,0.28)]">
        <p className="text-[length:max(var(--mockup-text-min),1.85cqw)] leading-snug font-medium">
          {messageBefore}
        </p>
        <div className="mt-[1.2cqw] rounded-[1.4cqw] border border-black/5 bg-[#F7F6F4] p-[0.9cqw]">
          {attachment}
        </div>
        <p className="mt-[1.2cqw] text-[length:max(var(--mockup-text-min),1.85cqw)] leading-snug font-medium">
          {messageAfter}
        </p>
        <p className="mt-[0.6cqw] text-right text-[length:max(var(--mockup-text-min),1.4cqw)] text-muted-foreground">
          {time}
        </p>
      </div>
      <div className="mt-[1.8cqw] flex items-center gap-[1.2cqw] rounded-full bg-white px-[1.6cqw] py-[1.2cqw]">
        <Smile className="size-[2.2cqw] text-muted-foreground" aria-hidden="true" />
        <span className="flex-1 truncate text-[length:max(var(--mockup-text-min),1.7cqw)] text-muted-foreground">
          {inputPlaceholder}
        </span>
        <span className="flex size-[3.6cqw] items-center justify-center rounded-full bg-[#25D366]">
          <Send className="size-[1.9cqw] text-white" aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}

type TikTokPostProps = {
  image: string
  caption: string
  tags: string
  stats: { likes: string; comments: string; shares: string }
  /** Card do produto fixado no topo do vídeo. */
  productTag: ReactNode
  className?: string
}

export function TikTokPost({
  image,
  caption,
  tags,
  stats,
  productTag,
  className,
}: TikTokPostProps) {
  const statItems = [
    { icon: Heart, value: stats.likes, filled: true },
    { icon: MessageCircle, value: stats.comments, filled: true },
    { icon: Share2, value: stats.shares, filled: false },
  ]
  return (
    <div className={cn(frame, 'relative bg-foreground', className)}>
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={608}
        height={1088}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      <div className="relative flex h-full flex-col justify-between p-[1.2cqw]">
        {productTag}
        <div className="flex items-end justify-between gap-[1.5cqw]">
          <div className="min-w-0 text-white">
            <p className="text-[length:max(var(--mockup-text-min),1.8cqw)] leading-snug font-medium">
              {caption}
            </p>
            <p className="mt-[0.6cqw] text-[length:max(var(--mockup-text-min),1.7cqw)] leading-snug font-semibold">
              {tags}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-[1.4cqw] text-white">
            {statItems.map(({ icon: Icon, value, filled }) => (
              <span key={value} className="flex flex-col items-center">
                <Icon className={cn('size-[2.6cqw]', filled && 'fill-white')} aria-hidden="true" />
                <span className="text-[length:max(var(--mockup-text-min),1.4cqw)] font-semibold">
                  {value}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

type StoryPostProps = {
  image: string
  productImage: string
  handle: string
  time: string
  title: string
  tag: string
  cta: string
  className?: string
}

export function StoryPost({
  image,
  productImage,
  handle,
  time,
  title,
  tag,
  cta,
  className,
}: StoryPostProps) {
  return (
    <div className={cn(frame, 'relative bg-foreground', className)}>
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={608}
        height={1088}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/45" />
      <div className="relative flex h-full flex-col p-[1.6cqw]">
        <div className="flex items-center gap-[1.2cqw] text-white">
          <span className="flex size-[3.2cqw] shrink-0 items-center justify-center rounded-full bg-white/25">
            <Store className="size-[1.8cqw]" aria-hidden="true" />
          </span>
          <span className="truncate text-[length:max(var(--mockup-text-min),1.8cqw)] font-semibold">
            {handle}
          </span>
          <span className="text-[length:max(var(--mockup-text-min),1.6cqw)] opacity-80">
            {time}
          </span>
          <span className="ml-auto flex items-center gap-[1.2cqw]">
            <Ellipsis className="size-[2.2cqw]" aria-hidden="true" />
            <X className="size-[2.4cqw]" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-[3cqw] text-[length:max(var(--mockup-text-min),3.4cqw)] leading-[1.12] font-extrabold text-white drop-shadow-[0_0.5cqw_1.5cqw_rgba(0,0,0,0.4)]">
          {title}
        </p>
        <div className="relative mt-auto flex justify-center">
          <img
            src={productImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={480}
            height={480}
            className="w-[24cqw] object-contain drop-shadow-[0_2cqw_3cqw_rgba(0,0,0,0.5)]"
          />
          <span className="absolute top-[1.5cqw] right-[0.5cqw] rounded-full bg-brand-tint px-[1.4cqw] py-[0.5cqw] text-[length:max(var(--mockup-text-min),1.5cqw)] font-bold text-brand shadow-soft">
            {tag}
          </span>
        </div>
        <span className="mt-[2cqw] flex items-center justify-center gap-[1.2cqw] rounded-full bg-white px-[1.6cqw] py-[1.5cqw] text-[length:max(var(--mockup-text-min),1.9cqw)] font-extrabold tracking-[0.06em] text-foreground uppercase shadow-soft">
          <Link2 className="size-[2cqw] text-brand" aria-hidden="true" />
          {cta}
        </span>
      </div>
    </div>
  )
}
