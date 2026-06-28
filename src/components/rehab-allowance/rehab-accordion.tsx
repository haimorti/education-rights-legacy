import {
  CheckCircle2,
  Info,
  AlertTriangle,
  ShieldCheck,
  Clock,
  Calculator,
  Wallet,
  GraduationCap,
  Banknote,
  CalendarCheck,
  ExternalLink,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RehabAccordion() {
  return (
    <Accordion type="multiple" className="flex flex-col gap-4">
      <AccordionItem
        value="eligibility"
        id="eligibility"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">{"תנאי הזכאות לדמי שיקום"}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-6 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"קבלת דמי השיקום מותנית בעמידה בשלושה תנאים עיקריים שנקבעו באגף השיקום."}
            </p>

            <div className="rounded-xl border border-border bg-secondary/20 p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {"1"}
                </span>
                <h4 className="text-base font-bold text-foreground">{"שיעור הקצבה לה הנך זכאי"}</h4>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                {"דמי השיקום משלימים ל-100% את הקצבה המשולמת לך."}
              </p>
              <div className="mt-3 flex items-start gap-3 rounded-lg border-2 border-accent/30 bg-accent/5 p-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-base text-foreground/80">
                  {"אתה זכאי לקצבת נכות מלאה ולכן לא ישולמו לך דמי שיקום."}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-secondary/20 p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {"2"}
                </span>
                <h4 className="text-base font-bold text-foreground">{"עומס לימודי"}</h4>
              </div>
              <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                {"דמי השיקום נועדו לתמוך כלכלית במי שלומד בהיקף שעות שפוגע ביכולתו להשתכר. לכן תנאי סף לקבלת הזכאות הוא לימודים בהיקף של לפחות "}
                <strong className="rounded bg-primary/10 px-1.5 py-0.5 text-primary">{"16 שעות שבועיות"}</strong>
                {"."}
              </p>
              <p className="mb-3 text-base font-medium text-foreground">{"ההיקף הזה יכול להיקבע באחת משתי הדרכים:"}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-4">
                  <h5 className="mb-2 text-base font-bold text-foreground">{"שעות לימוד בפועל"}</h5>
                  <p className="text-base text-muted-foreground">
                    {"מערכת שעות הכוללת לפחות 16 שעות לימוד בפועל בשבוע."}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <h5 className="mb-2 text-base font-bold text-foreground">{"שילוב שעות מעטפת"}</h5>
                  <p className="text-base text-muted-foreground">
                    {"מערכת לימודים הכוללת לפחות 12 שעות שבועיות, ובנוסף שעות מעטפת (כגון שיעורי עזר) המשלימות יחד ל-16 שעות שבועיות."}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-start gap-3 rounded-lg border-2 border-accent/30 bg-accent/5 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <p className="text-base leading-relaxed text-foreground/80">
                  <strong className="text-foreground">{"שים לב: "}</strong>
                  {"במקרה שבו הגעה ל-16 שעות מתבססת על שעות מעטפת, יהיה עליך להגיש הצהרה מפורטת וחתומה על שעות אלה."}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-secondary/20 p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {"3"}
                </span>
                <h4 className="text-base font-bold text-foreground">{"הכנסות"}</h4>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">
                {"בבדיקת הזכאות לתשלום דמי שיקום נלקחות בחשבון קצבאות מחליפות שכר (אבטלה, מילואים, דמי לידה) והכנסות שלא מעבודה."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="hours-calculation"
        id="hours-calculation"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">{"איך מחושב היקף שעות הלימוד שלך?"}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"במסלולי לימודים אקדמיים, היקף שעות הלימוד שלך מחושב לפי "}
              <strong className="text-foreground">{"הערך הגבוה"}</strong>
              {" מבין השניים:"}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-secondary/30 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  <h4 className="text-base font-bold text-foreground">{"סך השעות השבועיות"}</h4>
                </div>
                <p className="text-base text-muted-foreground">{"סך השעות השבועיות המופיעות במערכת השעות שלך."}</p>
              </div>
              <div className="rounded-xl border border-border bg-secondary/30 p-5">
                <div className="mb-2 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h4 className="text-base font-bold text-foreground">{"סך נקודות הזכות"}</h4>
                </div>
                <p className="text-base text-muted-foreground">{"סך נקודות הזכות של הקורסים הרשומים במערכת."}</p>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                <h4 className="text-base font-bold text-foreground">{"אוניברסיטה פתוחה"}</h4>
              </div>
              <p className="mb-3 text-base leading-relaxed text-muted-foreground">
                {"אם אתה לומד באוניברסיטה הפתוחה, החישוב נעשה לפי סך נקודות הזכות הרשומות לסמסטר. לכן עליך להציג מסמך רשמי מהאוניברסיטה הכולל:"}
              </p>
              <ul className="flex flex-col gap-2 pr-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-base text-foreground">{"רשימת הקורסים שאליהם נרשמת באותו סמסטר"}</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-base text-foreground">{"סך נקודות הזכות של הקורסים"}</span>
                </li>
              </ul>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="amount-calculation"
        id="amount-calculation"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">{"חישוב גובה דמי השיקום"}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"בחר את סוג הנכות הרלוונטי לך כדי לראות את פרטי חישוב דמי השיקום:"}
            </p>

            <Tabs defaultValue="general" className="w-full text-right" dir="rtl">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">{"נכה כללי"}</TabsTrigger>
                <TabsTrigger value="work-injury">{"נפגע עבודה"}</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="mt-5 text-right">
                <div className="flex flex-col gap-5">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {"גובה דמי השיקום נקבע לפי 3 פרמטרים מרכזיים:"}
                  </p>

                  <div className="rounded-xl border border-border bg-secondary/20 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {"1"}
                      </span>
                      <h4 className="text-base font-bold text-foreground">{"דרגת אובדן הכושר שנקבעה לך"}</h4>
                    </div>
                    <p className="mb-3 text-base leading-relaxed text-muted-foreground">
                      {"דמי השיקום נועדו להשלים את הכנסתך כך שתגיע לגובה קצבת נכות מלאה."}
                    </p>
                    <div className="flex flex-col gap-2">
                      {[
                        {
                          label: "איבדת 100% מכושרך",
                          desc: "אתה זכאי לקצבת נכות מלאה ולכן לא ישולמו לך דמי שיקום.",
                          color: "border-muted-foreground/30 bg-muted/20",
                        },
                        {
                          label: "לא איבדת כלל מכושרך להשתכר",
                          desc: "אתה לא זכאי לקצבת נכות- לכן ישולמו לך דמי שיקום בגבוה קצבת נכות מלאה בכפוף למבחן הכנסות",
                          color: "border-primary/30 bg-primary/5",
                        },
                        {
                          label: "איבדת את כושרך להשתכר באופן חלקי",
                          desc: "אתה זכאי לקצבת נכות חלקית - דמי השיקום ישלימו את ההפרש עד לגובה קצבת נכות מלאה בכפוף למבחן הכנסות",
                          color: "border-accent/30 bg-accent/5",
                        },
                      ].map((item) => (
                        <div key={item.label} className={`rounded-lg border p-3 ${item.color}`}>
                          <p className="text-base font-semibold text-foreground">{item.label}</p>
                          <p className="mt-1 text-base text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-secondary/20 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {"2"}
                      </span>
                      <h4 className="text-base font-bold text-foreground">{"הכנסותיך"}</h4>
                    </div>
                    <p className="mb-4 text-base leading-relaxed text-muted-foreground">
                      {"השפעת ההכנסות על גובה דמי השיקום משתנה בהתאם לסטטוס הזכאות."}
                    </p>

                    <div className="mb-4 rounded-lg border border-border bg-card p-4">
                      <h5 className="mb-3 text-base font-bold text-foreground">{"א. אם אינך זכאי לקצבת נכות כללית"}</h5>
                      <p className="mb-3 text-base text-muted-foreground">{"הסכומים נכונים ל-12.25:"}</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-3">
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                          <p className="text-base text-foreground">
                            {"והכנסתך נמוכה מ-"}
                            <strong className="text-primary">{"6,689 ₪"}</strong>
                            {" – תהיה זכאי לדמי שיקום בגובה קצבת נכות מלאה"}
                          </p>
                        </div>
                        <div className="flex items-start gap-3 rounded-lg bg-accent/5 p-3">
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                          <p className="text-base text-foreground">
                            {"והכנסתך בין "}
                            <strong className="text-accent">{"6,689 ₪"}</strong>
                            {" ל-"}
                            <strong className="text-accent">{"7,790 ₪"}</strong>
                            {" – דמי השיקום יופחתו בהדרגה בהתאם לגובה ההכנסה."}
                          </p>
                        </div>
                        <div className="flex items-start gap-3 rounded-lg bg-destructive/5 p-3">
                          <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                          <p className="text-base text-foreground">
                            {"והכנסתך גבוהה מ-"}
                            <strong className="text-destructive">{"7,790 ₪"}</strong>
                            {" – לא תהיה זכאי לדמי שיקום."}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border bg-card p-4">
                      <h5 className="mb-3 text-base font-bold text-foreground">{"ב. אם אתה זכאי לקצבת נכות חלקית"}</h5>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {"ההפחתה מדמי השיקום עקב הכנסותיך תיעשה לפי טבלה ייעודית."}
                      </p>
                      <a
                        href="https://www.btl.gov.il/benefits/Disability/Pages/100per.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-base font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        {"צפה בטבלת ההפחתות"}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-secondary/20 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {"3"}
                      </span>
                      <h4 className="text-base font-bold text-foreground">{"מצבך המשפחתי"}</h4>
                    </div>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {"גובה קצבת נכות מלאה משתנה לפי מצבך המשפחתי."}
                    </p>
                    <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
                      <p className="text-base text-foreground">
                        {"עבור רווק ללא ילדים, גובה הקצבה המלאה (נכון לינואר 2026) הוא "}
                        <strong className="text-lg text-primary">{"4,711 ₪"}</strong>
                      </p>
                      <a
                        href="https://www.btl.gov.il/benefits/Disability/Pages/%D7%A9%D7%99%D7%A2%D7%95%D7%A8%D7%99%20%D7%94%D7%A7%D7%A6%D7%91%D7%94.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1.5 text-base font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        {"בדוק את הסכום המתאים למצבך המשפחתי"}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="work-injury" className="mt-5 text-right">
                <div className="flex flex-col gap-5">
                  <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-primary" />
                      <h4 className="text-base font-bold text-foreground">{"הכלל המנחה: השלמה ל-100% נכות"}</h4>
                    </div>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {"דמי השיקום הם ההפרש בין הקצבה שאתה מקבל כיום לבין הקצבה שהיית מקבל אילו נקבעו לך 100% נכות. כיוון שקצבת נכות מעבודה מחושבת לפי השכר האישי שלך לפני הפגיעה, גובה דמי השיקום משתנה מאדם לאדם."}
                    </p>
                  </div>

                  <div className="rounded-xl border border-border bg-secondary/20 p-5">
                    <h4 className="mb-3 text-base font-bold text-foreground">{"הכנסה מעבודה והשפעתה על דמי השיקום"}</h4>
                    <p className="mb-3 text-base leading-relaxed text-muted-foreground">
                      {"מדמי השיקום שאתה מקבל כנפגע עבודה מנכים את כל ההכנסות שלך מעבודה ומקצבאות מחליפות שכר (כגון אבטלה, מילואים או לידה)."}
                    </p>
                    <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p className="text-base text-foreground/80">
                        <strong>{"העיקרון: "}</strong>
                        {"דמי השיקום נועדו להשלים את הכנסתך עד לרמת קצבה של 100% ולא מעבר לכך. לכן, אם כבר הגעת לסכום הזה באמצעות עבודה או קצבאות אחרות – דמי השיקום יופחתו בהתאם."}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="payment-schedule"
        id="payment-schedule"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">{"מתי משולמים דמי השיקום?"}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-4 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"אם אתה עומד בתנאי הזכאות לדמי שיקום, עובד השיקום יוודא שהתשלום יועבר אליך באופן אוטומטי."}
            </p>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/20 p-5">
              <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold text-foreground">{"אחת לחודש"}</p>
                <p className="text-base leading-relaxed text-muted-foreground">{"על פי רוב עד לעשירי לחודש, עבור החודש הקודם."}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-base leading-relaxed text-foreground/80">
                {"לעיתים תשלום דמי השיקום מתעכב בשל עדכון גובה הכנסותיך מעבודה."}
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border-2 border-destructive/30 bg-destructive/5 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <div className="flex flex-col gap-1">
                <span className="text-base font-semibold text-destructive">{"שים לב"}</span>
                <p className="text-base leading-relaxed text-foreground/80">
                  {"הזכאות לדמי שיקום ניתנת רק בתקופות לימודים פעילות. לכן אין זכאות לתשלום דמי שיקום בחופשת הקיץ."}
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
