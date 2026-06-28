
import {
  CheckCircle2,
  AlertTriangle,
  Users,
  ClipboardList,
  Building,
  CreditCard,
  ExternalLink,
} from "lucide-react"
import { InvoiceChecklist } from "@/components/invoice-checklist"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function TutoringAccordion() {
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
              <Users className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"זכאות לשיעורי עזר"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-base leading-relaxed text-foreground">
                {"שיעורי עזר נועדו לסייע בהשלמת פערים לימודיים ובחיזוק השליטה בחומר הנלמד."}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-base leading-relaxed text-foreground">
                {"היקף הזכאות לסיוע עומד על עד "}
                <strong className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{"25% משעות הלימוד החודשיות"}</strong>
                {", כפי שמופיעות במערכת השעות."}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">{"לדוגמה: "}</strong>
                {"אם אתה לומד 100 שעות בחודש \u2013 תהיה זכאי ל\u201325 שעות שיעורי עזר."}
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-lg border-2 border-destructive/30 bg-destructive/5 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-destructive">{"שים לב"}</span>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {"כדי לממש את הזכאות עליך לפנות לעובד השיקום ולעדכן שיש לך צורך בשיעורי עזר. בניגוד לזכאויות אחרות, שיעורי עזר "}
                  <strong>{"לא יופיעו מראש"}</strong>
                  {" במכתב \"אישור לימודים לסמסטר\", ויאושרו רק לאחר פנייה לעובד השיקום."}
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Two tracks */}
      <AccordionItem
        value="tracks"
        id="tracks"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <ClipboardList className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"שני מסלולים למימוש הזכאות"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-4 pt-2">
            <p className="text-base leading-relaxed text-foreground">
              {"לאחר אישור מכסת השעות על ידי עובד השיקום, ניתן לממש את הזכאות באחד משני מסלולים:"}
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <h4 className="mb-2 text-base font-bold text-foreground">{"דרך זכיין חיצוני"}</h4>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {"במסלול זה, זכיין של הביטוח הלאומי יאתר עבורך מורים בהתאם לקורסים שבהם נדרשות התמיכות, התשלום לזכיין יועבר ישירות מהביטוח הלאומי."}
                </p>
              </div>

              <div className="rounded-lg border border-border bg-muted/40 p-4">
                <h4 className="mb-2 text-base font-bold text-foreground">{"דרך מרכז התמיכה במוסד הלימודים"}</h4>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {"במסלול זה, מרכז התמיכה במוסד הלימודים יאתר עבורך מורים בהתאם לקורסים שבהם נדרשות התמיכות. התשלום מבוצע על-ידך, ולאחר הצגת קבלות תקבל החזר מהביטוח הלאומי."}
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* How to use - Franchisee */}
      <AccordionItem
        value="franchisee"
        id="franchisee"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <ClipboardList className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"מסלול שירות דרך זכיין"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{"התהליך"}</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"1"}
                  </div>
                  <p className="pt-1 text-base leading-relaxed text-foreground">
                    {"פנה לעובד השיקום ועדכן על הצורך שלך בשיעורי עזר."}
                  </p>
                </div>
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"2"}
                  </div>
                  <p className="pt-1 text-base leading-relaxed text-foreground">
                    {"עובד השיקום מעביר לזכיין התחייבות לתשלום."}
                  </p>
                </div>
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"3"}
                  </div>
                  <p className="pt-1 text-base leading-relaxed text-foreground">
                    {"הזכיין יוצר איתך קשר ומתאם את המורים והשיעורים."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-4">
              <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-foreground">{"שיטת תשלום"}</span>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {"הביטוח הלאומי משלם ישירות לזכיין \u2013 אין צורך בתשלום מצדך."}
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* How to use - Learning Center */}
      <AccordionItem
        value="learning-center"
        id="learning-center"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Building className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">
              {"מסלול שירות דרך מרכז התמיכה במוסד הלימודים"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{"התהליך"}</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"1"}
                  </div>
                  <p className="pt-1 text-base leading-relaxed text-foreground">
                    {"עובד השיקום מאשר את היקף השעות."}
                  </p>
                </div>
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"2"}
                  </div>
                  <p className="pt-1 text-base leading-relaxed text-foreground">
                    {"אתה יוצר קשר עם מרכז הלמידה במוסד, מקבל מהם את השירות ומשלם להם ישירות."}
                  </p>
                </div>
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"3"}
                  </div>
                  <p className="pt-1 text-base leading-relaxed text-foreground">
                    {"אחת לחודש אתה מגיש קבלה וכן "}
                    <a
                      href="https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/forms/Rehabilitation_forms_ar/Pages/divuhajMatanShiuureEzer.aspx"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-primary underline underline-offset-2"
                    >
                      {"טופס דיווח שיעורי עזר"}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    {", הכולל חתימת מרכז התמיכה וחתימתך."}
                  </p>
                </div>
                <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {"4"}
                  </div>
                  <p className="pt-1 text-base leading-relaxed text-foreground">
                    {"ההחזר משולם לחשבונך."}
                  </p>
                </div>
              </div>
            </div>

            <InvoiceChecklist
              items={[
                "שם מלא של הסטודנט",
                "מספר תעודת זהות",
                "תאריך הנפקה",
                "מספר קבלה / חשבונית",
                "פירוט השירות \u2013 שיעורי עזר",
              ]}
              title="מה חייב להופיע על הקבלה עבור שיעורי העזר"
            />

            <div className="flex items-start gap-3 rounded-lg border-2 border-destructive/30 bg-destructive/5 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-destructive">{"שים לב"}</span>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {"גובה ההחזר לשעה נקבע לפי ההשכלה האקדמית של המורה. לכן, כאשר שיעורי העזר ניתנים דרך מרכז הלמידה, יש להעביר לעו\"ס השיקום את "}
                  <strong>{"אישור ההשכלה של המורה"}</strong>
                  {" לצורך קביעת תעריף ההחזר."}
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
