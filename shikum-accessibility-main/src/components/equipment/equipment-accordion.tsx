
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  Coins,
  CalendarDays,
  Laptop,
  FileText,
  Clock,
  ExternalLink,
} from "lucide-react"
import { InvoiceChecklist } from "@/components/invoice-checklist"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function EquipmentAccordion() {
  return (
    <Accordion type="multiple" className="flex flex-col gap-4">
      {/* Annual Grant */}
      <AccordionItem
        value="annual-grant"
        id="annual-grant"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Coins className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"מענק שנתי לציוד לימודי"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-base leading-relaxed text-foreground">
                {"משתקם הלומד בתוכנית הכשרה זכאי למענק שנתי עבור מימון רכישת ציוד לימודי מתכלה."}
              </p>
            </div>

            {/* Amount */}
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="mb-2 text-sm font-bold text-muted-foreground">{"גובה המענק"}</h4>
              <p className="text-base leading-relaxed text-foreground">
                {"עד "}
                <strong className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{"1,068 \u20AA"}</strong>
                {" לשנת לימודים (נכון לנובמבר 2025)."}
              </p>
            </div>

            {/* Payment schedule */}
            <div className="flex flex-col gap-3">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {"מועדי התשלום"}
              </h4>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
                  <span className="block text-sm font-medium text-muted-foreground">{"סמסטר א'"}</span>
                  <span className="mt-1 block text-lg font-bold text-foreground">{"534 \u20AA"}</span>
                </div>
                <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
                  <span className="block text-sm font-medium text-muted-foreground">{"סמסטר ב'"}</span>
                  <span className="mt-1 block text-lg font-bold text-foreground">{"534 \u20AA"}</span>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
                  <span className="block text-sm font-medium text-muted-foreground">{"סמסטר קיץ"}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{"אין זכאות נוספת"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-foreground/80">
                {"המענק משולם "}
                <strong>{"אוטומטית"}</strong>
                {" לחשבון הבנק בתחילת כל סמסטר, ללא צורך בהגשת קבלות."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Additional Equipment */}
      <AccordionItem
        value="additional-equipment"
        id="additional-equipment"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Laptop className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"סיוע בציוד לימודי נוסף"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"במקרים בהם יש צורך מובהק בציוד לימודי נוסף שעלותו גבוהה מסכום המענק השנתי, ניתן לקבל סיוע נוסף."}
            </p>

            {/* Laptop / Tablet */}
            <div className="flex flex-col gap-3 rounded-lg border border-border p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {"1"}
                </div>
                <h4 className="text-base font-bold text-foreground">{"מחשב נייד / טאבלט"}</h4>
              </div>
              <p className="text-base leading-relaxed text-foreground/80 pr-11">
                {"בתוכניות להשכלה גבוהה, מחשב או טאבלט נחשבים ציוד לימודי נדרש. ניתן לקבל סכום נוסף כהחזר חד-פעמי עבור רכישתם."}
              </p>
              <div className="flex items-start gap-3 rounded-lg border-2 border-destructive/30 bg-destructive/5 p-3 pr-11">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <p className="text-sm leading-relaxed text-foreground/80">
                  {"זהו סיוע "}
                  <strong>{"חד-פעמי"}</strong>
                  {" לכל תקופת הלימודים."}
                </p>
              </div>
            </div>

            {/* Other equipment */}
            <div className="flex flex-col gap-3 rounded-lg border border-border p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {"2"}
                </div>
                <h4 className="text-base font-bold text-foreground">{"מכשירים / חומרים מרובים"}</h4>
              </div>
              <p className="text-base leading-relaxed text-foreground/80 pr-11">
                {"ניתן להשתמש בסיוע לרכישת ציוד אחר, בתנאי שמתקיימים שלושת התנאים הבאים:"}
              </p>
              <ul className="flex flex-col gap-2 pr-11">
                {[
                  "הציוד נדרש כחלק מדרישות הלימוד בתוכנית (לדוגמה: חומרים לבניית מודלים באדריכלות).",
                  "הציוד אינו מסופק ע\"י מוסד הלימודים במסגרת השירותים הרגילים לסטודנט.",
                  "לא קיימת אפשרות השאלה של הציוד ממסגרת הלימודים.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-3 pr-11">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-foreground/80">
                  {"מומלץ להתייעץ עם עובד השיקום לפני רכישת ציוד שאינו מחשב/טאבלט כדי לוודא זכאות."}
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Grant Amount */}
      <AccordionItem
        value="grant-amount"
        id="grant-amount"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Coins className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"גובה הסיוע לציוד נוסף"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-base leading-relaxed text-foreground">
                {"גובה הסיוע בציוד לימודי נוסף הוא עד פי 3 מהמענק השנתי, כלומר עד "}
                <strong className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{"3,204 \u20AA"}</strong>
                {" (נכון לנובמבר 2025)."}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {"בשנה שבה נרכש ציוד נוסף, סכום ההחזר המרבי כולל המענק השנתי הקבוע יכול להגיע עד "}
                <strong className="text-foreground">{"4,272 \u20AA"}</strong>
                {" (1,068 \u20AA + 3,204 \u20AA)."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Request & Receipt */}
      <AccordionItem
        value="request-receipt"
        id="request-receipt"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"הגשת בקשה וקבלה להחזר"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-foreground/80">
                {"בניגוד למענק השנתי, הסיוע לציוד לימודי נוסף יועבר רק לאחר הגשת בקשה על גבי "}
                <strong>{"טופס בקשה לסיוע במענק למכשירים (טופס ב.ל. 267)"}</strong>
                {"."}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{"התהליך"}</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"1"}
                  </div>
                  <p className="pt-1 text-base leading-relaxed text-foreground">
                    {"הגש "}
                    <a
                      href="https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/forms/Rehabilitation_forms_ar/Pages/267%20%D7%91%D7%A7%D7%A9%D7%94%20%D7%9C%D7%A1%D7%99%D7%95%D7%A2%20%D7%91%D7%9E%D7%A2%D7%A0%D7%A7%20%D7%9C%D7%9E%D7%9B%D7%A9%D7%99%D7%A8%D7%99%D7%9D%20%D7%91%D7%AA%D7%9B%D7%A0%D7%99%D7%AA%20%D7%94%D7%A9%D7%99%D7%A7%D7%95%D7%9D.aspx"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary underline underline-offset-2"
                    >
                      {"טופס בקשה לסיוע במכשירים"}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    {" (ב.ל. 267)."}
                  </p>
                </div>
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"2"}
                  </div>
                  <p className="pt-1 text-base leading-relaxed text-foreground">
                    {"לאחר אישור הבקשה, רכוש את הציוד."}
                  </p>
                </div>
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"3"}
                  </div>
                  <p className="pt-1 text-base leading-relaxed text-foreground">
                    {"הגש קבלה להחזר כספי."}
                  </p>
                </div>
              </div>
            </div>

            {/* Receipt requirements - prominent checklist */}
            <InvoiceChecklist
              items={[
                "שם מלא של הסטודנט",
                "מספר תעודת זהות",
                "תאריך הנפקה",
                "מספר קבלה / חשבונית",
                "פירוט מלא וברור של המוצר שנרכש",
              ]}
              title="מה חייב להופיע על הקבלה"
            />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Reimbursement Timeline */}
      <AccordionItem
        value="reimbursement"
        id="reimbursement"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
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
          <div className="flex flex-col gap-4 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-base leading-relaxed text-foreground">
                {"לרוב, ההחזר משולם לחשבונך תוך כ"}
                <strong className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{"עשרה ימי עבודה"}</strong>
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
