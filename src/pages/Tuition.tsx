import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TuitionHero } from "@/components/tuition/tuition-hero"
import { TuitionSummary } from "@/components/tuition/tuition-summary"
import { TuitionAccordion } from "@/components/tuition/tuition-accordion"
import { TuitionTableOfContents } from "@/components/tuition/tuition-toc"
import { ImportantNote } from "@/components/important-note"
import { MobileNav } from "@/components/mobile-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { BenefitActionButtons } from "@/components/benefit-action-buttons"

export default function TuitionPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <TuitionHero />

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row-reverse lg:gap-12">
          {/* Sidebar - Table of Contents (desktop only) */}
          <aside className="hidden lg:block lg:w-64 lg:shrink-0">
            <div className="lg:sticky lg:top-20">
              <TuitionTableOfContents />
            </div>
          </aside>

          {/* Mobile floating nav */}
          <MobileNav />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col gap-8">
            <Breadcrumb current="שכר לימוד" />

            {/* Summary */}
            <TuitionSummary />

            {/* Accordion Sections */}
            <section id="refund-details" className="scroll-mt-20">
              <TuitionAccordion />
            </section>

            <ImportantNote />

            <BenefitActionButtons showSendDocuments />
          </div>
        </div>
      </main>

    </div>
  )
}
