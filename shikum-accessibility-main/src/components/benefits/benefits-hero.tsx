import { Sparkles, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function BenefitsHero() {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-10 md:py-24">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
      <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary-foreground/5" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 text-center md:gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-foreground/15 md:h-16 md:w-16">
          <Sparkles className="h-6 w-6 text-primary-foreground md:h-8 md:w-8" />
        </div>

        <h1 className="text-balance text-2xl font-bold tracking-tight text-primary-foreground md:text-5xl">
          {"מימוש זכאויות"}
        </h1>
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
          {"עובד השיקום כבר קבע את הזכאויות האישיות שלך? כאן תמצא את כל הפרטים על הזכאויות וכיצד לממש כל אחת מהן"}
        </p>

        <Badge
          variant="secondary"
          className="mt-2 gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm text-primary-foreground hover:bg-primary-foreground/20"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {"בחר/י זכאות כדי להתחיל"}
        </Badge>
      </div>
    </section>
  )
}
