import { lazy, Suspense } from 'react'
import { Seo } from '@/components/seo'
import { BrandsStrip } from '@/sections/brands-strip'
import { Footer } from '@/sections/footer'
import { Header } from '@/sections/header'
import { Hero } from '@/sections/hero'
import { SignupCta } from '@/sections/signup-cta'
import { StickyCta } from '@/sections/sticky-cta'

/*
 * Seções abaixo da dobra em chunks próprios: saem do JS inicial. O HTML delas vem do
 * pré-render, e cada uma hidrata quando o chunk chega (um Suspense por seção).
 */
const SalesAssistant = lazy(() =>
  import('@/sections/sales-assistant').then((m) => ({ default: m.SalesAssistant })),
)
const HowItWorks = lazy(() =>
  import('@/sections/how-it-works').then((m) => ({ default: m.HowItWorks })),
)
const ContentTools = lazy(() =>
  import('@/sections/content-tools').then((m) => ({ default: m.ContentTools })),
)
const Faq = lazy(() => import('@/sections/faq').then((m) => ({ default: m.Faq })))

export function HomePage() {
  return (
    // Padding inferior no celular: o CTA fixo (64px + safe area) não cobre o fim da página.
    <div className="min-h-svh overflow-x-hidden bg-background pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <Seo path="/" page="home" />
      <Header variant="hero" />
      <main>
        <Hero />
        <BrandsStrip />
        <SignupCta />
        <Suspense fallback={null}>
          <SalesAssistant />
        </Suspense>
        <Suspense fallback={null}>
          <HowItWorks />
        </Suspense>
        <Suspense fallback={null}>
          <ContentTools />
        </Suspense>
        <Suspense fallback={null}>
          <Faq />
        </Suspense>
        <SignupCta id="criar" />
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}
