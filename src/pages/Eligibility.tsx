import { EligibilityContent } from "@/components/eligibility/eligibility-content"
import { MobileNav } from "@/components/mobile-nav"
import { Badge } from "@/components/ui/badge"
import { EligibilityTableOfContents } from "@/components/eligibility/eligibility-toc"

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-4 py-16 md:py-24">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary-foreground/5" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-primary-foreground md:text-5xl">
            {"איך בודקים אם אושרה זכאותך לשיקום מקצועי?"}
          </h1>
          <p className="mx-auto max-w-xl text-balance text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            {"מדריך שלב אחר שלב לבדיקת מצב הזכאות שלך"}
          </p>

          <Badge
            variant="secondary"
            className="gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm text-primary-foreground hover:bg-primary-foreground/20"
          >
            {"גלול למטה למידע המלא"}
          </Badge>
        </div>
      </section>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 md:py-14">
        <div className="flex flex-col gap-10 lg:flex-row-reverse lg:gap-12">
          <aside className="hidden lg:block lg:w-64 lg:shrink-0">
            <div className="lg:sticky lg:top-20">
              <EligibilityTableOfContents />
            </div>
          </aside>

          <div className="flex flex-1 flex-col">
            <EligibilityContent />
          </div>
        </div>
      </main>

      <MobileNav />

    </div>
  )
}
