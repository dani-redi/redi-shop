import { Seo } from '@/components/seo'
import { siteConfig } from '@/config/site'
import { BrandsContact } from '@/sections/brands-contact'
import { BrandsHero } from '@/sections/brands-hero'
import { BrandsSteps } from '@/sections/brands-steps'
import { Footer } from '@/sections/footer'
import { Header } from '@/sections/header'

export function BrandsPage() {
  return (
    <div className="min-h-svh bg-background">
      <Seo path={siteConfig.links.brands.path} page="brands" />
      <Header variant="solid" />
      <main>
        <BrandsHero />
        <BrandsSteps />
        <BrandsContact />
      </main>
      <Footer />
    </div>
  )
}
