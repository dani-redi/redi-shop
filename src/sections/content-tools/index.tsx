import { MessageCircle } from 'lucide-react'
import { useRef, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import story from '@/assets/images/tools/story.webp'
import tiktok from '@/assets/images/tools/tiktok.webp'
import whey from '@/assets/images/tools/whey.webp'
import { InstagramIcon, TikTokIcon } from '@/components/brand-icons'
import { Container } from '@/components/container'
import { HandArrow, HandwrittenNote } from '@/components/handwritten-note'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { StoryPost, TikTokPost, WhatsAppPost } from '@/components/social-post-mockup'
import { cn } from '@/lib/cn'
import { iconStroke } from '@/lib/icons'
import { ProductShareCard } from './product-share-card'

const tiktokStats = { likes: '12,4K', comments: '342', shares: '628' }

/** Leve rotação/sobreposição dos mockups no desktop, na ordem WhatsApp, TikTok, Story. */
const mockupTilt = [
  'lg:-rotate-3 lg:translate-x-[3cqw] lg:translate-y-[2cqw]',
  'lg:z-10',
  'lg:rotate-3 lg:-translate-x-[3cqw] lg:translate-y-[2cqw]',
]

function ChannelChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="flex items-center gap-2 rounded-full bg-background px-3 py-1.5 text-small font-semibold shadow-level-1">
      {icon}
      {label}
    </span>
  )
}

/** "Do produto ao post. Pronto para vender." — mesmo produto em WhatsApp, TikTok e Story. */
export function ContentTools() {
  const { t } = useTranslation()
  const tools = t('contentTools')
  const scroller = useRef<HTMLDivElement>(null)
  const [page, setPage] = useState(0)

  const channels = [
    {
      label: tools.channels.whatsapp,
      icon: (
        <MessageCircle
          className="size-4 text-[#25D366]"
          strokeWidth={iconStroke}
          aria-hidden="true"
        />
      ),
      post: (
        <WhatsAppPost
          messageBefore={tools.whatsapp.message1}
          messageAfter={tools.whatsapp.message2}
          time={tools.whatsapp.time}
          inputPlaceholder={tools.whatsapp.input}
          attachment={<ProductShareCard size="compact" />}
        />
      ),
    },
    {
      label: tools.channels.tiktok,
      icon: (
        <span
          className="flex size-4 items-center justify-center rounded-xs bg-black"
          aria-hidden="true"
        >
          <TikTokIcon className="size-3" />
        </span>
      ),
      post: (
        <TikTokPost
          image={tiktok}
          caption={tools.tiktok.caption}
          tags={tools.tiktok.tags}
          stats={tiktokStats}
          productTag={<ProductShareCard size="mini" />}
        />
      ),
    },
    {
      label: tools.channels.story,
      icon: <InstagramIcon className="size-4 text-[#E0489C]" />,
      post: (
        <StoryPost
          image={story}
          productImage={whey}
          handle={tools.story.handle}
          time={tools.story.time}
          title={tools.story.title}
          tag={tools.product.tag}
          cta={tools.story.cta}
        />
      ),
    },
  ]

  // Indicador de paginação do carrossel (só no celular).
  const updatePage = () => {
    const element = scroller.current
    if (!element) return
    const max = element.scrollWidth - element.clientWidth
    setPage(max > 0 ? Math.round((element.scrollLeft / max) * (channels.length - 1)) : 0)
  }
  const goTo = (index: number) => {
    const element = scroller.current
    if (!element) return
    const max = element.scrollWidth - element.clientWidth
    element.scrollTo({ left: (max * index) / (channels.length - 1), behavior: 'smooth' })
  }

  return (
    <section
      aria-labelledby="content-tools-title"
      className="overflow-hidden lilac-mid-surface py-section"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="content-tools-title"
            eyebrow={tools.eyebrow}
            title={tools.titleA}
            highlight={tools.titleHighlight}
            subtitle={tools.subtitle}
          />
        </Reveal>

        {/* Card do produto: medidas em cqw de um palco com largura = card ÷ 0,74. */}
        <Reveal className="mt-content">
          <div className="container-inline relative left-1/2 w-[calc(var(--share-card-w)/0.74)] -translate-x-1/2">
            <div className="mx-auto w-[74cqw]">
              <ProductShareCard />
            </div>
            <div className="absolute top-[-4cqw] left-[calc(50%+39cqw)] hidden w-[22cqw] flex-col items-start lg:flex">
              <HandwrittenNote>{tools.noteTag}</HandwrittenNote>
              <HandArrow className="mt-2 ml-2 w-[6cqw] -scale-x-100" />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-content">
          <div
            ref={scroller}
            onScroll={updatePage}
            className="-mx-gutter snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto px-gutter md:mx-0 md:overflow-visible md:px-0"
          >
            <div className="container-inline mx-auto w-(--tools-stage-w)">
              <div className="grid grid-cols-3 gap-[3cqw] pt-2 pb-4 md:pb-[3cqw]">
                {channels.map((channel, index) => (
                  <div
                    key={channel.label}
                    className="flex snap-center flex-col items-center gap-2 md:gap-4"
                  >
                    <ChannelChip icon={channel.icon} label={channel.label} />
                    <div className={cn('w-full', mockupTilt[index])}>{channel.post}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center md:hidden">
            {channels.map((channel, index) => (
              <button
                key={channel.label}
                type="button"
                aria-label={channel.label}
                aria-current={page === index}
                onClick={() => goTo(index)}
                className="flex size-11 cursor-pointer items-center justify-center"
              >
                <span
                  className={cn(
                    'h-2 rounded-full transition-[width,background-color] duration-200',
                    page === index ? 'w-6 bg-brand' : 'w-2 bg-brand/25',
                  )}
                />
              </button>
            ))}
          </div>
        </Reveal>

        {/* Anotação manuscrita: só do tablet em diante. */}
        <div className="mt-8 hidden items-center justify-center gap-4 md:flex">
          <HandArrow shape="swoop" className="w-12 shrink-0 -scale-x-100" />
          <HandwrittenNote className="max-w-xs text-center">{tools.noteShare}</HandwrittenNote>
          <HandArrow shape="swoop" className="w-12 shrink-0" />
        </div>
      </Container>
    </section>
  )
}
