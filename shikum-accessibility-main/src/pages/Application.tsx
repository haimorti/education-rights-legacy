import { Sparkles, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ApplicationHero } from "@/components/application/application-hero"

import { ApplicationAccordion } from "@/components/application/application-accordion"
import { ApplicationTableOfContents } from "@/components/application/application-toc"
import { MobileNav } from "@/components/mobile-nav"
import { Breadcrumb } from "@/components/breadcrumb"

export default function ApplicationPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <ApplicationHero />

      {/* Main content */}
      <main className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row-reverse lg:gap-12">
          {/* Sidebar - Table of Contents (desktop only) */}
          <aside className="hidden lg:block lg:w-64 lg:shrink-0">
            <div className="lg:sticky lg:top-20">
              <ApplicationTableOfContents />
            </div>
          </aside>

          {/* Mobile floating nav */}
          <MobileNav />

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col gap-8">
            <Breadcrumb current="הגשת בקשה לאישור לימודים" />

            {/* Full content */}
            <ApplicationAccordion />
          </div>
        </div>
      </main>

      {/* CTA to benefits */}
      <section className="border-t border-border bg-primary/5 px-4 py-12 md:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-balance text-2xl font-bold text-foreground md:text-3xl">
            {"קיבלת אישור מכתב 'אישור לימודים לסמסטר' הגיע הזמן לממש את זכאויות שלך."}
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            {"אחרי שקיבלת מכתב 'אישור לימודים לסמסטר', עשויות להיות לך מגוון זכאויות: שכר לימוד, הוצאות נסיעה, ציוד לימודי, שיעורי עזר ועוד. גלה מה מגיע לך ואיך לממש."}
          </p>
          <Button size="lg" className="mt-2 gap-2 rounded-full px-8" asChild>
            <a href="/benefits">
              {"לעמוד מימוש זכאויות"}
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

    </div>
  )
}
