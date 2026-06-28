
import {
  Bus,
  GraduationCap,
  BookOpen,
  Package,
  Wallet,
  Home,
  Accessibility,
  ArrowLeft,
  Clock,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const benefits = [
  {
    title: "דמי שיקום",
    description: "קצבה חודשית המשולמת במהלך הלימודים לצורך מחייה",
    icon: Wallet,
    href: "/rehaballowance",
    status: "active" as const,
    color: "bg-amber-500/10 text-amber-600",
    iconBg: "bg-amber-500/10",
  },
  {
    title: "שכר לימוד",
    description: "החזר מלא או חלקי של שכר הלימוד השנתי למוסד האקדמי.",
    icon: GraduationCap,
    href: "/tuition",
    status: "active" as const,
    color: "bg-primary/10 text-primary",
    iconBg: "bg-primary/10",
  },
  {
    title: "שכר דירה",
    description: "סיוע בשכר דירה לסטודנטים שלומדים רחוק ממקום מגוריהם.",
    icon: Home,
    href: "/housing",
    status: "active" as const,
    color: "bg-emerald-500/10 text-emerald-600",
    iconBg: "bg-emerald-500/10",
  },
  {
    title: "הוצאות נסיעה",
    description: "החזר עלויות הנסיעה בתחבורה ציבורית או הסעה מיוחדת.",
    icon: Bus,
    href: "/transport",
    status: "active" as const,
    color: "bg-sky-500/10 text-sky-600",
    iconBg: "bg-sky-500/10",
  },
  {
    title: "ציוד לימודי",
    description: "מענק שנתי לציוד לימודי וסיוע ברכישת מחשב וציוד נוסף.",
    icon: Package,
    href: "/equipment",
    status: "active" as const,
    color: "bg-violet-500/10 text-violet-600",
    iconBg: "bg-violet-500/10",
  },
  {
    title: "שיעורי עזר",
    description: "מימון שיעורים פרטיים להשלמת פערים וחיזוק השליטה בחומר הנלמד",
    icon: BookOpen,
    href: "/tutoring",
    status: "active" as const,
    color: "bg-rose-500/10 text-rose-600",
    iconBg: "bg-rose-500/10",
  },
  {
    title: "הנגשות",
    description: "התאמות והנגשת תנאי הלימוד עבור סטודנטים עם מוגבלות.",
    icon: Accessibility,
    href: "/accessibility",
    status: "active" as const,
    color: "bg-teal-500/10 text-teal-600",
    iconBg: "bg-teal-500/10",
  },
]

function BenefitCard({
  benefit,
}: {
  benefit: (typeof benefits)[number]
}) {
  const Icon = benefit.icon
  const isActive = benefit.status === "active"

  const cardContent = (
    <Card
      className={`group relative overflow-hidden border transition-all duration-300 ${
        isActive
          ? "cursor-pointer border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          : "cursor-default border-border/60 opacity-75"
      }`}
    >
      <CardContent className="flex flex-col gap-4 p-6">
        {/* Top row: icon + status badge */}
        <div className="flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${benefit.iconBg}`}
          >
            <Icon className={`h-6 w-6 ${benefit.color.split(" ")[1]}`} />
          </div>
          {isActive ? (
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full bg-primary/10 text-xs font-medium text-primary"
            >
              {"למידע המלא"}
              <ArrowLeft className="h-3 w-3" />
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="gap-1.5 rounded-full bg-muted text-xs font-medium text-muted-foreground"
            >
              <Clock className="h-3 w-3" />
              {"בקרוב"}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3
          className={`text-lg font-bold ${isActive ? "text-foreground" : "text-muted-foreground"}`}
        >
          {benefit.title}
        </h3>

        {/* Description */}
        <p
          className={`text-sm leading-relaxed ${isActive ? "text-muted-foreground" : "text-muted-foreground/70"}`}
        >
          {benefit.description}
        </p>

        {/* Hover indicator for active cards */}
        {isActive && (
          <div className="absolute bottom-0 left-0 h-1 w-full origin-right scale-x-0 bg-primary transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
        )}
      </CardContent>
    </Card>
  )

  if (isActive && benefit.href) {
    return <a href={benefit.href}>{cardContent}</a>
  }

  return cardContent
}

export function BenefitsGrid() {
  return (
    <section className="flex flex-col gap-8">
      {/* Section intro */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-foreground">
          {"סל התמיכות והזכאויות"}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {"בדף זה מוצגים כלל סוגי הסיוע האפשריים במסגרת תוכנית השיקום, לחץ על כל כרטיסיה לפרטים נוספים על תנאי הזכאות ואופן המימוש. הזכאויות האישיות שאושרו לך על־ידי עובד השיקום מפורטות במכתב "}
          <a
            href="/application#entitlements-result"
            className="inline-flex items-center gap-1 rounded bg-primary/10 px-1.5 py-0.5 font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
          >
            {"אישור לימודים לסמסטר"}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          {", המופיע באזור האישי שלך."}
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.title} benefit={benefit} />
        ))}
      </div>

      {/* Bottom note */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {"לא כל הזכאויות רלוונטיות לכל סטודנט. הזכאויות תלויות בסוג המוגבלות, סוג הלימודים, ותנאים נוספים."}
          </p>
          <p className="text-sm font-medium text-foreground">
            {"לבירור מלא של הזכאויות שלך, פנה/י לפקיד/ת השיקום."}
          </p>
        </div>
      </div>
    </section>
  )
}
