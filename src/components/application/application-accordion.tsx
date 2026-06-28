
import { useEffect, useState } from "react"
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  ClipboardList,
  Shield,
  Users,
  HelpCircle,
  Footprints,
  FileText,
  Search,
  Clock3,
  CalendarClock,
  Mail,
  ArrowLeft,
  Send,
  Link2,
  ChevronLeft,
  ChevronDown,
  XCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

/* ============================================================
   SHARED SUB-COMPONENTS
   ============================================================ */

// Visual phase separator with connected step indicator
function PhaseDivider({
  stepNumber,
  title,
  subtitle,
  variant = "default",
}: {
  stepNumber: number
  title: string
  subtitle: string
  variant?: "default" | "decision" | "final" | "fulfillment"
}) {
  const colors = {
    default: "bg-primary text-primary-foreground border-primary",
    decision: "bg-accent text-accent-foreground border-accent",
    final: "bg-primary text-primary-foreground border-primary",
    fulfillment: "bg-emerald-600 text-white border-emerald-600",
  }

  return (
    <div className="relative flex flex-col items-center gap-3 py-6">
      <div className="flex w-full items-center gap-6">
        <div className="h-px flex-1 bg-border" />
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full border-4 ${colors[variant]} shadow-md`}
        >
          {variant === "decision" ? (
            <ChevronLeft className="h-6 w-6" />
          ) : variant === "fulfillment" ? (
            <ChevronDown className="h-6 w-6" />
          ) : (
            <span className="text-lg font-bold">{stepNumber}</span>
          )}
        </div>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-base font-bold text-foreground">{title}</span>
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      </div>
    </div>
  )
}

// Document requirement card
function DocumentCard({
  title,
  items,
  footerText,
}: {
  title: string
  items: string[]
  footerText: string
}) {
  return (
    <div className="flex flex-col gap-0 overflow-hidden rounded-xl border-2 border-primary/30 shadow-sm">
      <div className="flex items-center gap-3 bg-primary px-5 py-3.5">
        <FileText className="h-5 w-5 shrink-0 text-primary-foreground" />
        <h4 className="text-base font-bold text-primary-foreground">{title}</h4>
      </div>
      <div className="flex flex-col gap-0 bg-card">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 border-b border-border px-5 py-3 last:border-b-0"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
            <span className="text-base leading-relaxed text-foreground">{item}</span>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-3 bg-destructive/10 px-5 py-3.5">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <p className="text-sm font-medium leading-relaxed text-destructive">
          {footerText}
        </p>
      </div>
    </div>
  )
}

// Disability type tabs
function DisabilityTabs() {
  const [activeTab, setActiveTab] = useState<"general" | "work">("general")

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-bold transition-colors ${
            activeTab === "general"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-secondary"
          }`}
        >
          {"נכה כללי"}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("work")}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-bold transition-colors ${
            activeTab === "work"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-muted text-muted-foreground hover:bg-secondary"
          }`}
        >
          {"נפגע עבודה"}
        </button>
      </div>

      {activeTab === "general" ? (
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              <h5 className="text-base font-bold text-foreground">{"תוכנית שיקום מלאה"}</h5>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{"מתאימה למי שנקבעו לו:"}</p>
            <ul className="mb-3 flex flex-col gap-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{"נכות רפואית של 60% ומעלה"}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{"נכות רפואית של 40% ומעלה, כאשר יש לפחות ליקוי בודד אחד בשיעור 25% ומעלה"}</span>
              </li>
            </ul>
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-sm text-foreground/80">
                {"תוכנית מלאה מאפשרת קבלת סיוע "}
                <strong className="text-foreground">{"לכל תקופת הלימודים"}</strong>
                {" המקובלת במסלול הלימודים הנבחר."}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-accent" />
              <h5 className="text-base font-bold text-foreground">{"תוכנית שיקום חלקית \u2013 שנת לימודים אחת"}</h5>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{"מתאימה למי שנקבעו לו:"}</p>
            <ul className="mb-3 flex flex-col gap-2">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-foreground">{"נכות רפואית נמוכה מ\u200E40%"}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="text-sm text-foreground">{"נכות רפואית בין 40% ל\u200E59%, אך ללא ליקוי בודד בשיעור 25% לפחות"}</span>
              </li>
            </ul>
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-sm text-foreground/80">
                {"בתוכנית חלקית הסיוע מוגבל ל"}
                <strong className="text-foreground">{"שנת לימודים אחת בלבד"}</strong>
                {". שנה זו תהיה שנת הלימודים האחרונה."}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              <h5 className="text-base font-bold text-foreground">{"תוכנית שיקום מלאה"}</h5>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{"מתאימה למי שנקבעו לו מעל 20% נכות."}</p>
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-sm text-foreground/80">
                {"תוכנית מלאה מאפשרת קבלת סיוע "}
                <strong className="text-foreground">{"לכל תקופת הלימודים"}</strong>
                {" המקובלת במסלול הלימודים הנבחר."}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-5">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-accent" />
              <h5 className="text-base font-bold text-foreground">{"תוכנית שיקום חלקית \u2013 שנת לימודים אחת"}</h5>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{"מתאימה למי שנקבעו לו בין 10% ל\u200E19% נכות."}</p>
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-sm text-foreground/80">
                {"בתוכנית חלקית הסיוע מוגבל ל"}
                <strong className="text-foreground">{"שנת לימודים אחת בלבד"}</strong>
                {". שנה זו תהיה שנת הלימודים האחרונה."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   MAIN ACCORDION COMPONENT
   ============================================================ */

export function ApplicationAccordion() {
  const [openFulfillmentItems, setOpenFulfillmentItems] = useState<string[]>(() => {
    if (typeof window === "undefined") return []
    return window.location.hash === "#entitlements-result" ? ["entitlements-result"] : []
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const scrollToEntitlementsResult = () => {
      if (window.location.hash !== "#entitlements-result") return

      setOpenFulfillmentItems((current) =>
        current.includes("entitlements-result") ? current : [...current, "entitlements-result"]
      )

      window.requestAnimationFrame(() => {
        const targetElement = document.getElementById("entitlements-result")
        targetElement?.scrollIntoView({ block: "start" })
      })
    }

    scrollToEntitlementsResult()
    window.addEventListener("hashchange", scrollToEntitlementsResult)

    return () => {
      window.removeEventListener("hashchange", scrollToEntitlementsResult)
    }
  }, [])

  return (
    <div className="flex flex-col gap-0">
      <Accordion type="multiple" className="mt-8 flex flex-col gap-4">
        <AccordionItem
          value="building-plan"
          id="building-plan"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">
                {"בניית תוכנית השיקום האישית שלך"}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-5 pt-2">
              <div className="flex flex-col gap-4">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {"לאחר שנמצאת זכאי לשיקום מקצועי, הגיע הזמן לגבש את תוכנית השיקום האישית שלך. תוכנית השיקום יכולה לכלול מגוון מסלולים – סיוע בהשמה, אבחון והכוונה תעסוקתית, סדנאות, הכשרות מקצועיות ועוד."}
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {"אם הופנת לאתר זה על ידי העו\"ס המלווה אותך, ייתכן שאתה מעוניין בלימודי השכלה גבוהה ומבקש שאלה יוכרו כתוכנית השיקום שלך."}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-base font-bold text-foreground">
                  {"למה חשוב שהלימודים יאושרו כתוכנית השיקום?"}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {"האישור עשוי להקנות זכאות לתמיכות שונות במהלך תקופת הלימודים, בהתאם לקריטריונים שנקבעו לכל תמיכה."}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { title: "דמי שיקום", color: "text-amber-600", bg: "bg-amber-500/10" },
                    { title: "שכר לימוד", color: "text-primary", bg: "bg-primary/10" },
                    { title: "שכר דירה", color: "text-emerald-600", bg: "bg-emerald-500/10" },
                    { title: "הוצאות נסיעה", color: "text-sky-600", bg: "bg-sky-500/10" },
                    { title: "ציוד לימודי", color: "text-violet-600", bg: "bg-violet-500/10" },
                    { title: "שיעורי עזר", color: "text-rose-600", bg: "bg-rose-500/10" },
                    { title: "הנגשות", color: "text-teal-600", bg: "bg-teal-500/10" },
                  ].map((item) => (
                    <div key={item.title}>
                      <Card className="relative h-full overflow-hidden border border-border">
                        <CardContent className="flex items-center justify-between gap-3 p-4">
                          <div className="flex items-center gap-3">
                            <span className={`flex h-9 w-9 items-center justify-center rounded-2xl ${item.bg}`}>
                              <CheckCircle2 className={`h-5 w-5 ${item.color}`} />
                            </span>
                            <span className="text-sm font-bold text-foreground">{item.title}</span>
                          </div>
                        </CardContent>
                        <div className="absolute bottom-0 left-0 h-1 w-full bg-primary" />
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="who-can-apply"
          id="who-can-apply"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">
                {"מי יכול להגיש בקשה לאישור לימודיו?"}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-5 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {"תוכל להגיש בקשה אם מתקיימים שני התנאים הבאים:"}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-3 rounded-xl border border-border p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {"1"}
                  </div>
                  <h4 className="text-base font-bold text-foreground">{"אושרה לך זכאות לשיקום מקצועי"}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {"הגשת תביעה לשיקום מקצועי וזכאותך אושרה ע\"י עו\"ס שיקום. לא בטוח אם אושרה זכאותך? "}
                    <a href="/eligibility" className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80">
                      {"בדוק כאן"}
                    </a>
                    {"."}
                  </p>
                </div>
                <div className="flex flex-col gap-3 rounded-xl border border-border p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                    {"2"}
                  </div>
                  <h4 className="text-base font-bold text-foreground">{"התקבלת ללימודים אקדמיים"}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {"התקבלת ללימודי השכלה גבוהה, או שאתה כבר לומד בפועל, ואתה מבקש שהלימודים יוכרו כחלק מתוכנית השיקום."}
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="still-deciding"
          id="still-deciding"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <HelpCircle className="h-5 w-5 text-primary" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">
                {"אני מתעניין בלימודים אקדמיים אך טרם החלטתי מה ללמוד"}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-5 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {"אם טרם החלטת מה ללמוד, יש כמה צעדים שיכולים לעזור לך לבחור מסלול מתאים."}
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"1"}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-foreground">{"התייעצות עם עו\"ס השיקום"}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {"אם אתה שוקל לימודים אקדמאיים אך עדיין מתלבט לגבי תחום הלימודים, מומל. לפנות לעו\"ס השיקום להתייעצות. תוכלו לבחון יחד את האפשרויות ולקבל הכוונה ראשונית."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"2"}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-foreground">{"אבחון והכוונה מקצועית"}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {"במידת הצורך, עו\"ס השיקום יפנה אותך לאבחון ולהכוונה מקצועית במכון אבחון. תהליך זה יסייע לך לבחור מסלול לימודים מדויק התואם את כישוריך, שאיפותיך ומצבך הרפואי."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"3"}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-foreground">{"לימודי קדם-אקדמיה"}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {"במקרים מסויימים אתה עשוי להיות זכאי לסיוע בלימודים הנדרשים לצורך עמידה בתנאי הקבלה להשכלה גבוהה. סיוע זה עשוי לכלול, בין היתר, מכינה קדם-אקדמית, השלמת בגרויות והכנה למבחן פסיכומטרי."}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://b2b.btl.gov.il/BTL.ILG.Payments/DocumentsInfo.aspx"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
              >
                <Send className="h-5 w-5" />
                {"שלח אישור קבלה ללימודים לעו\"ס השיקום"}
              </a>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <PhaseDivider
        stepNumber={1}
        title="צעד ראשון"
        subtitle="הגשת אישור קבלה ללימודים"
        variant="default"
      />

      <Accordion type="multiple" className="mt-6 flex flex-col gap-4">
        <AccordionItem
          value="step1-intro"
          id="step1-intro"
          className="scroll-mt-20 overflow-hidden rounded-xl border-2 border-primary/20 bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Footprints className="h-5 w-5 text-primary" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">
                {"הגשת אישור קבלה ללימודים"}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-4 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {"אם הנך עומד בשני התנאים, זכאותך אושרה והתקבלת ללימודים אקדמיים – זהו השלב להגיש לעו״ס השיקום את אישור הקבלה ללימודים."}
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                {"את האישור ניתן להעביר גם אם שנת הלימודים טרם החלה, וגם אם טרם ברשותך מערכת שעות, שתידרש בהמשך."}
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                {"מטרת ההגשה המוקדמת היא לאפשר אישור התוכנית בסמוך למועד הקבלה ללימודים, ולהעניק לך ודאות ושקט נפשי לקראת תחילת הלימודים."}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="step1-docs"
          id="step1-docs"
          className="scroll-mt-20 overflow-hidden rounded-xl border-2 border-primary/20 bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">
                {"מה חייב להופיע על אישור הקבלה ללימודים"}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-5 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {"כדי לאפשר טיפול רציף וללא עיכוב, חשוב להקפיד שהאישור יהיה קריא ויכלול את כל הפרטים הנדרשים לפני שליחתו."}
              </p>

              <DocumentCard
                title="יש לוודא כי באישור הקבלה ללימודים מופיעים כל הפרטים הבאים:"
                items={[
                  "שמך המלא ומספר תעודת הזהות שלך",
                  "שם המוסד הלימודי",
                  "שם מסלול הלימודים",
                  "תאריך תחילת שנת הלימודים",
                ]}
                footerText="כדי לאפשר טיפול רציף וללא עיכוב, חשוב להקפיד שהאישור יהיה קריא ויכלול את כל הפרטים הנדרשים לפני שליחתו."
              />

              <a
                href="https://b2b.btl.gov.il/BTL.ILG.Payments/DocumentsInfo.aspx"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
              >
                <Send className="h-5 w-5" />
                {"שלח אישור קבלה ללימודים לעו\"ס השיקום"}
              </a>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <PhaseDivider
        stepNumber={0}
        title="החלטת עו&quot;ס השיקום"
        subtitle="בחינת הבקשה וקבלת החלטה"
        variant="decision"
      />

      <Accordion type="multiple" className="flex flex-col gap-4">
        <AccordionItem
          value="after-submission"
          id="after-submission"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-accent/30 bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Search className="h-5 w-5 text-accent" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">
                {"מה בודקים? כך מתקבלת ההחלטה"}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-5 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {"לאחר קליטת אישור הלימודים במערכת, עו\"ס השיקום יבחן את הבקשה לפי שלושה שיקולים מרכזיים:"}
              </p>

              <div className="flex flex-col gap-3">
                {[
                  {
                    title: "בחינת החלטת הוועדה הרפואית",
                    desc: "לרבות אחוזי הנכות שנקבעו לך, מאחר שאלה משפיעים על היקף הסיוע שניתן לאשר.",
                  },
                  {
                    title: "התאמה למצבך התפקודי והבריאותי",
                    desc: "נבדקת מידת ההתאמה של תחום הלימודים ליכולותיך הפיזיות, הקוגניטיביות או הנפשיות.",
                  },
                  {
                    title: "היתכנות תעסוקתית",
                    desc: "האם המקצוע המבוקש עשוי לאפשר לך תעסוקה יציבה בתום הלימודים.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-foreground/80">
                  {"במקרים מסוימים ייתכן שעו\"ס השיקום יבקש ממך מסמכים נוספים או יזמן אותך לשיחה לצורך בחינה של התוכנית המבוקשת."}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="eligibility-period"
          id="eligibility-period"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-accent/30 bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <CalendarClock className="h-5 w-5 text-accent" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">
                {"תקופת הזכאות: כך נקבע משך הסיוע"}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-5 pt-2">
              <div className="flex flex-col gap-3">
                <p className="text-base leading-relaxed text-muted-foreground">
                  {"היקף הסיוע שתקבל במהלך הלימודים נקבע על-פי שיעור הנכות הרפואית שנקבע לך."}
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {"בעת בחינת בקשתך לאישור הלימודים, עו\"ס השיקום בודק את קביעת הוועדה הרפואית האחרונה בעניינך, האם אתה נכה כללי או נפגע עבודה, כמה אחוזי נכות נקבעו לך, והאם הנכות היא זמנית או צמיתה שכן אלה משפיעים על משך התוכנית שניתן לאשר."}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-base font-bold text-foreground">{"השפעת גובה אחוזי הנכות על משך תוכנית השיקום"}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {"על מנת שנוכל להציג את השפעת גובה אחוזי הנכות על משך תוכנית השיקום הרלוונטית לך, אנא בחר אם אתה מוכר כנכה כללי או כנפגע עבודה:"}
                </p>
              </div>

              <DisabilityTabs />

              <div className="flex items-start gap-3 rounded-lg border-2 border-destructive/30 bg-destructive/5 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-destructive">{"נכות זמנית"}</span>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {"כאשר הנכות שנקבעה היא זמנית, התוכנית תאושר עד לתום תקופת הזמניות בלבד. בתום התקופה, המשך הסיוע מותנה בהחלטת ועדה רפואית שתבחן מחדש את אחוזי הנכות. אם הוועדה לא תאריך את הנכות לא ניתן יהיה להמשיך ולהעניק סיוע במסגרת השיקום."}
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="approval-result"
          id="approval-result"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-accent/30 bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <Mail className="h-5 w-5 text-accent" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">
                {"איך אדע אם הבקשה אושרה?"}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-5 pt-2">
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h4 className="text-base font-bold text-foreground">{"הבקשה אושרה"}</h4>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {"יישלח אליך לאזור האישי באתר הביטוח הלאומי מכתב החלטה תחת הכותרת: "}
                  <strong className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{"אישור לימודים להשכלה גבוהה"}</strong>
                  {". מכתב זה מהווה אישור רשמי לכך שהמסלול האקדמי שבחרת אושר כתוכנית השיקום."}
                </p>
                <div className="relative flex items-start gap-4 rounded-lg border border-primary/20 bg-card p-4">
                  <ArrowLeft className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-foreground">{"אושר? זה הצעד הבא שלך"}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {"כדי שנוכל לאשר את הזכאויות, עליך להגיש את מערכת השעות מיד עם קבלתה מהמוסד הלימודי."}
                    </p>
                  </div>
                  <a
                    href="#step2-schedule"
                    aria-label="מעבר לצעד שני: הגשת מערכת שעות"
                    className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary transition hover:bg-primary/20"
                  >
                    <span className="h-0 w-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-primary" />
                  </a>
                </div>
              </div>

              <div className="rounded-xl border-2 border-destructive/20 bg-destructive/5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <h4 className="text-base font-bold text-foreground">{"כאשר התוכנית אינה עומדת בקריטריונים"}</h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {"במקרה שבו עולים שיקולים שעשויים להוביל לדחיית התוכנית, עו\"ס השיקום ישוחח איתך על נימוקי הדחייה ותיבדקנה יחד אפשרויות נוספות שיכולות להתאים לך."}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* =====================================================
          PHASE 2: STEP 2 - SUBMIT SCHEDULE
          ===================================================== */}
      <PhaseDivider
        stepNumber={2}
        title="צעד שני"
        subtitle="הגשת מערכת שעות"
        variant="default"
      />

      <Accordion type="multiple" className="mt-6 flex flex-col gap-4">
        <AccordionItem
          value="step2-schedule"
          id="step2-schedule"
          className="scroll-mt-20 overflow-hidden rounded-xl border-2 border-primary/20 bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">
                {"הגשת מערכת שעות"}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-5 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {
                  "אישור הלימודים אינו מקנה זכאויות בפועל, אלא מהווה הכרה בכך שתוכנית הלימודים אושרה כתוכנית השיקום המקצועית שלך. רק לאחר הגשת מערכת השעות ייקבעו הזכאויות שיאושרו לך עבור הסמסטר הקרוב."
                }
              </p>

              <p className="text-base leading-relaxed text-muted-foreground">
                {
                  "שלב זה מתבצע לקראת תחילת כל סמסטר, כאשר יש בידך מערכת שעות רשמית. לאחר שליחת מערכת השעות עו\"ס השיקום יאשר את הזכאויות הספציפיות להן תהיה זכאי במהלך הסמסטר הקרוב."
                }
              </p>

              <DocumentCard
                title="יש לוודא כי במערכת השעות מופיעים כל הפרטים הבאים:"
                items={[
                  "שמך המלא ומספר תעודת הזהות שלך",
                  "שנת הלימודים והסמסטר",
                  "שמות הקורסים",
                  "ימי הלימוד ושעותיהם עבור כל קורס",
                  "סך שעות הלימוד הסמסטריאליות ונקודות הזכות",
                ]}
                footerText="כדי לאפשר טיפול רציף וללא עיכוב, חשוב להקפיד שהאישור יהיה קריא ויכלול את כל הפרטים הנדרשים לפני שליחתו."
              />

              <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-foreground/80">
                  {"אם כבר יש בידך גם אישור קבלה וגם מערכת שעות, ניתן כמובן להגיש את שני המסמכים יחד."}
                </p>
              </div>

              <a
                href="https://b2b.btl.gov.il/BTL.ILG.Payments/DocumentsInfo.aspx"
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
              >
                <Send className="h-5 w-5" />
                {"שלח מערכת שעות לעו\"ס השיקום"}
              </a>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <PhaseDivider
        stepNumber={0}
        title="מימוש הזכאויות"
        subtitle="מתקדמים לקבלת התמיכות"
        variant="fulfillment"
      />

      <Accordion
        type="multiple"
        value={openFulfillmentItems}
        onValueChange={(values) => setOpenFulfillmentItems(values as string[])}
        className="flex flex-col gap-4"
      >
        <AccordionItem
          value="entitlements-determination"
          id="entitlements-determination"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">
                {"איך נקבעות הזכאויות ?"}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <p className="pt-2 text-base leading-relaxed text-muted-foreground">
              {"הזכאויות אינן נקבעות באופן אוטומטי ואינן אחידות לכל הסטודנטים. לאחר הגשת מערכת השעות, עו\"ס השיקום בוחן את נתוניך האישיים וקובע אילו זכאויות ניתן לאשר עבורך לסמסטר הקרוב. הבדיקה מתבצעת לפי קריטריונים שנקבעו לכל סוג סיוע, תוכל ללמוד על קריטריוני הזכאות של כל זכאות בדף הזכאויות."}
              {" "}
              <a
                href="/benefits"
                className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
              >
                {"דף הזכאויות"}
                <Link2 className="h-3.5 w-3.5" />
              </a>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="entitlements-result"
          id="entitlements-result"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">
                {"איך אדע מהן הזכאויות שנקבעו לי?"}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-5 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {"לאחר בדיקת מערכת השעות, יישלח אליך לאזור האישי מכתב: "}
                <strong className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{"אישור לימודים לסמסטר"}</strong>
                {" בו יפורטו הזכאויות שאושרו עבורך."}
              </p>

              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{"מה מופיע במכתב?"}</h4>
                {[
                  { title: "פרטי הסמסטר", desc: "שם הסמסטר, תאריך התחלה ותאריך סיום." },
                  { title: "היקף הלימודים", desc: "פירוט ימי הלימוד ומכסת השעות השבועית שלך." },
                  {
                    title: "פירוט הזכאויות",
                    desc: "התמיכות שאושרו לך מתוך סל הזכאויות האפשרי. כגון: שכר לימוד, דמי שיקום, נסיעות, וכו.",
                    note: "לא כל סטודנט זכאי לכל סוגי הסיוע הקיימים – הזכאות נקבעת באופן אישי, בהתאם לנהלים וקריטריונים שנקבעו לכל זכאות.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                      {item.note ? (
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {"לתשומת לבך - לא כל סטודנט זכאי לכל סוגי הסיוע הקיימים,  הזכאות נקבעת באופן אישי, בהתאם לנהלים וקריטריונים שנקבעו לכל זכאות."}
                        </p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 rounded-lg border-2 border-destructive/30 bg-destructive/5 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold text-destructive">{"שים לב"}</span>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {
                      "החל מסמסטר ב׳, לקראת תחילתו של כל סמסטר, עליך להגיש בנוסף למערכת השעות גם גיליון ציונים. המשך מתן התמיכות מותנה בעמידה בדרישות הלימודים."
                    }
                  </p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="find-letters"
          id="find-letters"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Clock3 className="h-5 w-5 text-primary" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">
                {"איפה מוצאים את המכתבים שנשלחו אלי?"}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-4 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {"מכתבים ישלחו ל"}
                <strong className="text-foreground">{"אזור האישי שלך באתר הביטוח הלאומי"}</strong>
                {"."}
              </p>
              <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-4">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-foreground/80">
                  {"היכנס לאזור האישי באתר הביטוח הלאומי ובדוק את תיבת המכתבים שלך באופן שוטף."}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>



    </div>
  )
}
