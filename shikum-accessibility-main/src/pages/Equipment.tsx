import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EquipmentHero } from "@/components/equipment/equipment-hero"
import { EquipmentSummary } from "@/components/equipment/equipment-summary"
import { EquipmentAccordion } from "@/components/equipment/equipment-accordion"
import { EquipmentTableOfContents } from "@/components/equipment/equipment-toc"
import { ImportantNote } from "@/components/important-note"
import { MobileNav } from "@/components/mobile-nav"
import { Breadcrumb } from "@/components/breadcrumb"
import { BenefitActionButtons } from "@/components/benefit-action-buttons"

export default function EquipmentPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <EquipmentHero />

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row-reverse lg:gap-12">
          {/* Sidebar - Table of Contents (desktop only) */}
          <aside className="hidden lg:block lg:w-64 lg:shrink-0">
            <div className="lg:sticky lg:top-20">
              <EquipmentTableOfContents />
            </div>
          </aside>

          {/* Mobile floating nav */}
          <MobileNav />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col gap-8">
            <Breadcrumb current="ציוד לימודי" />

            {/* Summary */}
            <EquipmentSummary />

            {/* Accordion Sections */}
            <EquipmentAccordion />

            <ImportantNote />

            <BenefitActionButtons showSendDocuments />
          </div>
        </div>
      </main>

    </div>
  )
}
