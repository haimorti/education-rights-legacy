import { Home, FileCheck, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BenefitsHero } from "@/components/benefits/benefits-hero"
import { BenefitsGrid } from "@/components/benefits/benefits-grid"
import { MobileNav } from "@/components/mobile-nav"

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <BenefitsHero />

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <BenefitsGrid />
      </main>

      <MobileNav />

    </div>
  )
}
