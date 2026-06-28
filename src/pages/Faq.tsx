import { Button } from "@/components/ui/button"
import { FaqContent } from "@/components/faq/faq-content"
import { MobileNav } from "@/components/mobile-nav"
import { Badge } from "@/components/ui/badge"

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-4 py-16 md:py-24">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary-foreground/5" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="text-balance text-3xl font-extrabold leading-tight text-primary-foreground md:text-5xl">
            {"שאלות נפוצות"}
          </h1>
          <p className="mx-auto max-w-xl text-balance text-base leading-relaxed text-primary-foreground/85 md:text-lg">
            {"תשובות לשאלות שנשאלות לעתים קרובות"}
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
      <main className="mx-auto max-w-3xl px-4 py-8 md:py-14">
        <FaqContent />
      </main>

      <MobileNav />

      {/* Contact CTA */}
      <section className="border-t border-border bg-primary/5 py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center">
          <p className="text-base font-semibold text-foreground">
            {"לא מצאת תשובה לשאלה שלך?"}
          </p>
          <p className="text-sm text-muted-foreground">
            {"פנה לעובד השיקום המטפל"}
          </p>
          <Button asChild>
            <a href="/contact">{"יצירת קשר"}</a>
          </Button>
        </div>
      </section>

    </div>
  )
}
