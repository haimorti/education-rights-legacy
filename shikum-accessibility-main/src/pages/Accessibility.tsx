import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AccessibilityHero } from "@/components/accessibility/accessibility-hero"
import { AccessibilitySummary } from "@/components/accessibility/accessibility-summary"
import { AccessibilityAccordion } from "@/components/accessibility/accessibility-accordion"
import { AccessibilityTableOfContents } from "@/components/accessibility/accessibility-toc"
import { MobileNav } from "@/components/mobile-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { ImportantNote } from "@/components/important-note"
import { BenefitActionButtons } from "@/components/benefit-action-buttons"

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <AccessibilityHero />

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row-reverse lg:gap-12">
          {/* Sidebar - Table of Contents (desktop only) */}
          <aside className="hidden lg:block lg:w-64 lg:shrink-0">
            <div className="lg:sticky lg:top-20">
              <AccessibilityTableOfContents />
            </div>
          </aside>

          {/* Mobile floating nav */}
          <MobileNav />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col gap-8">
            <Breadcrumb current="הנגשות" />

            {/* Summary */}
            <AccessibilitySummary />

            {/* Accordion Sections */}
            <AccessibilityAccordion />

            {/* Semester end note */}
            <ImportantNote />

            <BenefitActionButtons showSendDocuments />
          </div>
        </div>
      </main>

    </div>
  )
}
