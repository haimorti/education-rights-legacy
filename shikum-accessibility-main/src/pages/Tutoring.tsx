import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TutoringHero } from "@/components/tutoring/tutoring-hero"
import { TutoringSummary } from "@/components/tutoring/tutoring-summary"
import { TutoringAccordion } from "@/components/tutoring/tutoring-accordion"
import { TutoringTableOfContents } from "@/components/tutoring/tutoring-toc"
import { ImportantNote } from "@/components/important-note"
import { MobileNav } from "@/components/mobile-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { BenefitActionButtons } from "@/components/benefit-action-buttons"

export default function TutoringPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <TutoringHero />

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row-reverse lg:gap-12">
          {/* Sidebar - Table of Contents (desktop only) */}
          <aside className="hidden lg:block lg:w-64 lg:shrink-0">
            <div className="lg:sticky lg:top-20">
              <TutoringTableOfContents />
            </div>
          </aside>

          {/* Mobile floating nav */}
          <MobileNav />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col gap-8">
            <Breadcrumb current="שיעורי עזר" />

            {/* Summary */}
            <TutoringSummary />

            {/* Accordion Sections */}
            <TutoringAccordion />

            <ImportantNote />

            <BenefitActionButtons showSendDocuments />
          </div>
        </div>
      </main>

    </div>
  )
}
