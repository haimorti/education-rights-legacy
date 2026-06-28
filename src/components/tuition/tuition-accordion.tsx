
import {
  Calculator,
  Clock,
  Receipt,
  Award,
  Info,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import { InvoiceChecklist } from "@/components/invoice-checklist"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function TuitionAccordion() {
  return (
    <Accordion type="multiple" className="flex flex-col gap-4">
      {/* Refund Amount & Method */}
      <AccordionItem
        value="refund-amount"
        id="refund-amount"
        className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"תקרת ההחזר"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex flex-col gap-3">
              <p className="text-base leading-relaxed text-foreground">
                {"תקרת ההחזר המקסימלית לשנת לימודים היא "}
                <strong className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                  {"13,079 \u20AA"}
                </strong>
                {" (נכון לשנת 2025)."}
              </p>
              <p className="text-base leading-relaxed text-foreground">
                {"ההחזר אינו מועבר ישירות למוסד הלימודים. הוא משולם כזיכוי לחשבון הבנק שלך, לאחר הצגת קבלה על תשלום שבוצע בפועל."}
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="text-base font-bold text-foreground">
                {"במקרה של שכר לימוד מעל לתקרה"}
              </h4>
              <div className="flex flex-col gap-1">
                <p className="text-base leading-relaxed text-foreground">
                  {"אם שכר הלימוד בפועל גבוה מתקרת ההחזר, יהיה עליך לשאת בתשלום ההפרש באופן עצמאי."}
                </p>
                <p className="text-base leading-relaxed text-foreground">
                  {"במצב כזה, ההחזר עבור כל קבלה יחושב באופן יחסי, עד להגעה לתקרה השנתית."}
                </p>
              </div>
              <h4 className="flex items-center gap-2 text-base font-bold text-foreground">
                <Info className="h-4 w-4 text-primary" />
                {"לדוגמא"}
              </h4>
              <p className="text-base leading-relaxed text-foreground">
                {"אם שכר הלימוד שלך כפול מהתקרה, תקבל החזר בגובה 50% מכל קבלה שתגיש, וזאת עד לניצול מלא של סכום המקסימום ("}
                <strong className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">
                  {"13,079 \u20AA"}
                </strong>
                {")."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Payment Timing */}
      <AccordionItem
        value="payment-timing"
        id="payment-timing"
        className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"מתי אקבל את ההחזר?"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"מאחר שאישור הזכאות לכל סמסטר מתבצע בנפרד ובכפוף לבחינת התקדמותך בלימודים, ההחזר משולם בשני חלקים:"}
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {"1"}
                </div>
                <div className="flex flex-col gap-1 pt-0.5">
                  <span className="text-base font-semibold text-foreground">{"פעימה ראשונה"}</span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {"מחצית מסכום הזכאות תשולם בתחילת סמסטר א'."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {"2"}
                </div>
                <div className="flex flex-col gap-1 pt-0.5">
                  <span className="text-base font-semibold text-foreground">{"פעימה שנייה"}</span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {"המחצית השנייה תשולם לאחר אישור סמסטר ב'."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-foreground/80">
                {"במקרה בו שולמה מקדמה, במקרים מסוימים ניתן יהיה לשלמה לפני מועד תחילת הלימודים."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Scholarships & Discounts */}
      <AccordionItem
        value="scholarships"
        id="scholarships"
        className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"השפעת מלגות, הנחות ופטורים"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-base leading-relaxed text-foreground">
                {"מלגות ייעודיות שניתנו עבור שכר לימוד (למשל מלגת \"ממדים ללימודים\" או מלגה של משרד הביטחון ללימודים בפריפריה) "}
                <strong>{"ינוכו"}</strong>
                {" מסכום ההחזר."}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-base leading-relaxed text-foreground">
                {"מלגות שאינן מועברות ישירות לחשבון שכר הלימוד ויכולות לשמש למטרות אחרות "}
                <strong>{"אינן נלקחות בחשבון"}</strong>
                {"."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Receipt Instructions */}
      <AccordionItem
        value="receipt-instructions"
        id="receipt-instructions"
        className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Receipt className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"הנחיות להגשת הקבלה"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"לאחר התשלום למוסד הלימודים יש להעביר קבלה עבור התשלום לעו\"ס השיקום דרך אתר הביטוח הלאומי."}
            </p>

            <InvoiceChecklist
              title="מה חייב להופיע על הקבלה"
              warningText="קבלה החסרה אחד או יותר מהפרטים הנדרשים תידחה."
              items={[
                "שם מלא",
                "מספר תעודת זהות",
                "שם המוסד האקדמי",
                "תאריך הנפקת הקבלה",
                "מספר קבלה / חשבונית",
                "מהות התשלום \u2013 שכר לימוד",
              ]}
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Processing Time */}
      <AccordionItem
        value="processing-time"
        id="processing-time"
        className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"תוך כמה זמן מתקבל ההחזר?"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-base leading-relaxed text-foreground">
                {"לרוב, ההחזר משולם לחשבונך תוך "}
                <strong>{"כעשרה ימי עבודה"}</strong>
                {" לאחר הגשת הקבלה."}
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-foreground/80">
                {"ייתכנו עיכובים בזמני עומס חריג או בתקופת חגים וחופשות."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
