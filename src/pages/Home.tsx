import { ArrowLeft, FileCheck, Sparkles, HelpCircle } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/[0.02] to-transparent px-4 pb-5 pt-6 md:pb-10 md:pt-14">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 text-center md:gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2 md:gap-3">
            <h1 className="text-balance text-2xl font-extrabold leading-tight text-foreground md:text-4xl lg:text-5xl">
              {"שיקום מקצועי לסטודנטים"}
              <br />
              {"בהשכלה גבוהה"}
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              מדריך מקיף לסטודנטים עם נכות כללית או נפגעי עבודה שזכאותם לשיקום מקצועי
              אושרה, מהצעד הראשון ועד מיצוי מלוא הזכאויות והתמיכות לאורך תקופת הלימודים.
            </p>
          </div>

          {/* Eligibility question - subtle link */}
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground">
            <span>{"לא בטוח אם אושרה זכאותך לשיקום? "}</span>
            <a href="/eligibility" className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80">
              {"בדוק כאן"}
            </a>
            <HelpCircle className="h-4 w-4 shrink-0 text-primary" />
          </div>
        </div>
      </section>

      {/* Path selection */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-6 pt-4 md:pb-16 md:pt-10">
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Section title */}
          <div className="flex flex-col items-center gap-2 text-center">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              {"בוא נתחיל, איפה אתה בתהליך?"}
            </h2>
          </div>

          {/* Two path cards */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Path 1: Beginning */}
            <a href="/application" className="group">
              <Card className="relative h-full overflow-hidden border-2 border-border transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                <CardContent className="flex flex-col gap-4 p-6 md:p-7">
                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center gap-2 text-center">
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10">
                        <FileCheck className="h-5 w-5 text-primary" />
                      </span>
                      <h3 className="text-xl font-bold text-foreground">
                        {"בתחילת הדרך"}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {"התחל בהגשת בקשה לאישור הלימודים כתוכנית השיקום המקצועי שלך."}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                    {"התחל כאן"}
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </div>

                  <span className="absolute bottom-4 left-4 text-xs font-bold text-muted-foreground">
                    {"1"}
                  </span>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 h-1 w-full origin-right scale-x-0 bg-primary transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </CardContent>
              </Card>
            </a>

            {/* Path 2: Already approved */}
            <a href="/benefits" className="group">
              <Card className="relative h-full overflow-hidden border-2 border-border transition-all duration-300 hover:border-emerald-400/60 hover:shadow-xl hover:shadow-emerald-500/10">
                <CardContent className="flex flex-col gap-4 p-6 md:p-7">
                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center gap-2 text-center">
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/10">
                        <Sparkles className="h-5 w-5 text-emerald-600" />
                      </span>
                      <h3 className="text-xl font-bold text-foreground">
                        {"הלימודים שלי אושרו"}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {"אתה עשוי להיות זכאי לשכר לימוד, נסיעות, ציוד לימודי ועוד. גלה כיצד לממש."}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto flex items-center gap-2 pt-2 text-sm font-semibold text-emerald-600 transition-all group-hover:gap-3">
                    {"לעמוד מימוש הזכאויות"}
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </div>

                  <span className="absolute bottom-4 left-4 text-xs font-bold text-muted-foreground">
                    {"2"}
                  </span>

                  {/* Bottom accent bar */}
                  <div className="absolute bottom-0 left-0 h-1 w-full origin-right scale-x-0 bg-emerald-500 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </main>

      <MobileNav />

    </div>
  )
}
