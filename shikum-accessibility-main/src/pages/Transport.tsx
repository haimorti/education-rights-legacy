import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { SummaryCard } from "@/components/summary-card"
import { TransportAccordion } from "@/components/transport-accordion"
import { ImportantNote } from "@/components/important-note"
import { TableOfContents } from "@/components/table-of-contents"
import { MobileNav } from "@/components/mobile-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { BenefitActionButtons } from "@/components/benefit-action-buttons"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <HeroSection />

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row-reverse lg:gap-12">
          {/* Sidebar - Table of Contents (desktop only) */}
          <aside className="hidden lg:block lg:w-64 lg:shrink-0">
            <div className="lg:sticky lg:top-20">
              <TableOfContents />
            </div>
          </aside>

          {/* Mobile floating nav */}
          <MobileNav />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col gap-8">
            <Breadcrumb current="נסיעות" />

            {/* Summary */}
            <SummaryCard />

            {/* Transport Accordion Sections */}
            <section id="public-transport" className="scroll-mt-20">
              <TransportAccordion />
            </section>

            {/* Important Note */}
            <section id="important-note" className="scroll-mt-20">
              <ImportantNote />
            </section>

            <BenefitActionButtons />
          </div>
        </div>
      </main>

    </div>
  )
}
