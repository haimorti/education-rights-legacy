
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  MapPin,
  Clock,
  Wallet,
  TrendingUp,
  Building,
  Home,
  Sun,
  FileText,
  ExternalLink,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function HousingAccordion() {
  return (
    <Accordion type="multiple" className="flex flex-col gap-4">
      {/* Eligibility */}
      <AccordionItem
        value="eligibility"
        id="eligibility"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"תנאי זכאות בסיסיים"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"כדי להיות זכאי לסיוע בשכר דירה נדרשת עמידה בשני התנאים הבאים:"}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary/30 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h4 className="text-sm font-bold text-foreground">{"מרחק גאוגרפי"}</h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {"מקום ההכשרה נמצא במרחק של לפחות "}
                  <strong className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{"40 ק\"מ"}</strong>
                  {" מתחום הרשות המקומית שבה אתה מתגורר דרך קבע."}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {"המרחק נקבע על פי "}
                  <a
                    href="https://www.btl.gov.il/Simulators/GeneralCalc/Pages/Merchakim.aspx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-primary underline underline-offset-2"
                  >
                    {"מחשבון מרחק"}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  {" בין יישובים של הביטוח הלאומי."}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-secondary/30 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h4 className="text-sm font-bold text-foreground">{"היקף הלימודים"}</h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {"לימודים פרונטליים בהיקף של לפחות "}
                  <strong className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{"16 שעות שבועיות"}</strong>
                  {" ולפחות "}
                  <strong className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{"3 ימי לימוד"}</strong>
                  {" בשבוע."}
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Aid Amount */}
      <AccordionItem
        value="aid-amount"
        id="aid-amount"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"גובה הסיוע המקסימלי"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  <h4 className="text-sm font-bold text-foreground">{"סיוע רגיל"}</h4>
                </div>
                <p className="mb-2 text-2xl font-bold text-primary">{"1,200 \u20AA"}</p>
                <p className="text-sm text-muted-foreground">{"לחודש (נכון לנובמבר 2025)"}</p>
              </div>

              <div className="rounded-xl border-2 border-accent/30 bg-accent/5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <h4 className="text-sm font-bold text-foreground">{"סיוע מוגדל"}</h4>
                </div>
                <p className="mb-2 text-2xl font-bold text-accent">{"עד 2,000 \u20AA"}</p>
                <p className="text-sm text-muted-foreground">
                  {"לסטודנטים עם נכות בשיעור של 65% ומעלה המתמודדים עם מגבלה תפקודית משמעותית."}
                </p>
                <p className="mt-2 text-xs text-muted-foreground/80">
                  {"לבדיקת זכאות לסיוע מוגדל, יש לפנות אל עובד השיקום."}
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Ministry of Housing */}
      <AccordionItem
        value="housing-ministry"
        id="housing-ministry"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Building className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"סיוע נוסף ממשרד השיכון"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"במקרה של זכאות לקצבת נכות מלאה, ייתכן שקיימת גם זכאות לסיוע בשכר דירה ממשרד השיכון. לצורך חישוב ההשלמה ומימוש הזכאות, יש להציג מסמך ממשרד השיכון הכולל את סכומי הסיוע שאושרו לך."}
            </p>

            <div className="flex items-start gap-3 rounded-lg border-2 border-accent/30 bg-accent/5 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-foreground/80">
                <strong className="text-foreground">{"שים לב: "}</strong>
                {"הסיוע הכולל ממשרד השיכון ומהביטוח הלאומי לא יעלה על סכום שכר הדירה שאתה משלם בפועל."}
              </p>
            </div>

            {/* Example */}
            <div className="rounded-xl border border-border bg-secondary/20 p-5">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">{"דוגמה להמחשה"}</h4>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg bg-card p-4 text-center shadow-sm">
                  <p className="text-xs font-medium text-muted-foreground">{"שכר דירה בפועל"}</p>
                  <p className="mt-1 text-xl font-bold text-foreground">{"1,600 \u20AA"}</p>
                </div>
                <div className="rounded-lg bg-card p-4 text-center shadow-sm">
                  <p className="text-xs font-medium text-muted-foreground">{"סיוע ממשרד השיכון"}</p>
                  <p className="mt-1 text-xl font-bold text-foreground">{"700 \u20AA"}</p>
                </div>
                <div className="rounded-lg bg-primary/5 p-4 text-center shadow-sm">
                  <p className="text-xs font-medium text-muted-foreground">{"סיוע מביטוח לאומי"}</p>
                  <p className="mt-1 text-xl font-bold text-primary">{"900 \u20AA"}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{"במקום 1,200 \u20AA"}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {"במקרה זה, בו שכר הדירה עומד על 1,600 \u20AA ומשרד השיכון מסייע בסכום של 700 \u20AA, הסיוע מהביטוח הלאומי יעמוד על 900 \u20AA בלבד \u2013 משום שסך הסיוע הכולל אינו יכול לעלות על שכר הדירה בפועל."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Property Ownership */}
      <AccordionItem
        value="property-ownership"
        id="property-ownership"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Home className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"בעלות על דירה"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-base leading-relaxed text-foreground">
                {"אם ברשותך דירה בבעלותך, יופחת מסכום הסיוע הסכום שאתה מקבל בגין השכרת דירתך, אף אם אינה מושכרת בפועל."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Summer Break */}
      <AccordionItem
        value="summer"
        id="summer"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Sun className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"שכר דירה בחופשת הקיץ"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-base leading-relaxed text-foreground">
                {"הסיוע ימשיך גם בחופשת הקיץ, לסטודנטים העוברים משנה לשנה, כדי לאפשר רצף מגורים באותה הדירה בין שנות הלימוד."}
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-foreground/80">
                {"המשך מימון שכר הדירה בחופשת הקיץ מותנה בכך שקיימת היתכנות לזכאות לשנת הלימודים הבאה (תלמיד מן המניין, לפחות 3 ימי לימוד בשבוע ו-16 שעות לימוד שבועיות)."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* How to Claim */}
      <AccordionItem
        value="how-to-claim"
        id="how-to-claim"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"איך לממש את הזכאות?"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"כדי לקבל את הסיוע, יש לשלוח חוזה שכירות עדכני וכן אסמכתא על התשלום הראשון."}
            </p>

            <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-foreground/80">
                {"עובד השיקום עשוי לבקש מעת לעת אסמכתאות נוספות, כחלק מבדיקות מדגמיות הנערכות מעת לעת."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
