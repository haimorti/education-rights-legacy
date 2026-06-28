import { GraduationCap, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function TuitionHero() {
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-16 md:py-24">
      {/* Decorative circles */}
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
      <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary-foreground/5" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/15">
          <GraduationCap className="h-8 w-8 text-primary-foreground" />
        </div>

        <h1 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl">
          {"שכר לימוד"}
        </h1>
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
          {"סיוע בתשלום שכר הלימוד"}
        </p>

        <Badge
          variant="secondary"
          className="mt-2 gap-2 rounded-full bg-primary-foreground/15 px-4 py-2 text-sm text-primary-foreground hover:bg-primary-foreground/20"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {"גלול למטה למידע המלא"}
        </Badge>
      </div>
    </section>
  )
}
