
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  CheckCircle2,
  Info,
  AlertTriangle,
  UserCheck,
  HeartHandshake,
  Laptop,
  BookOpenCheck,
  Headphones,
  FileText,
  Languages,
  BookOpen,
  Brain,
  Coins,
} from "lucide-react"

export function AccessibilityAccordion() {
  return (
    <Accordion type="multiple" className="flex flex-col gap-4">
      {/* ===== SECTION 1: COMPANION ===== */}
      <AccordionItem
        value="companion"
        id="companion"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <UserCheck className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">{"מלווה אישי"}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"המלווה נועד לסייע לסטודנט בתפקוד היומיומי במהלך הלימודים, לרבות בפעולות כגון ניידות, אכילה, שימוש בשירותים, ניקיון אישי או כל סיוע אחר הנדרש כדי לאפשר השתתפות מלאה בלימודים."}
            </p>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{"תנאי זכאות"}</h4>
              <div className="flex flex-col gap-2">
                {[
                  "נכים קשים עם לפחות 65% נכות רפואית",
                  "זכאות לקצבת שירותים מיוחדים (שר\"מ) בשיעור של 112% ומעלה",
                  "מבוטח המעסיק עובד זר \u2013 רק אם קיימות נסיבות מיוחדות שבהן העובד הזר אינו יכול לשמש מלווה בשעות הלימודים",
                  "חוות דעת רפואית המעידה על הצורך בליווי אישי במהלך הלימודים",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-base text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border-2 border-destructive/30 bg-destructive/5 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
              <p className="text-sm leading-relaxed text-foreground/80">
                <strong className="text-destructive">{"שים לב"}</strong>
                {" \u2013 אלו תנאים מצטברים, נדרשים כולם יחד."}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{"היקף וגובה הסיוע"}</h4>
              <ul className="flex flex-col gap-2">
                <li className="flex items-start gap-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-base text-foreground">{"היקף שעות הליווי נקבע בהתאם לשעות הלימוד בפועל, ויכול לכלול גם ליווי בזמן הנסיעה למוסד הלימודים וממנו."}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Coins className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-base text-foreground">{"התעריף לחישוב הסיוע נקבע לפי שכר מינימום לשעה."}</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{"אופן התשלום"}</h4>
              <ul className="flex flex-col gap-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-base text-foreground">{"סכום הסיוע מועבר ישירות לחשבונך."}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-base text-foreground">{"נפגע עבודה הזכאי לקצבה מיוחדת \u2013 הסיוע יינתן באמצעות הגדלת הקצבה המיוחדת לתקופת השיקום."}</span>
                </li>
              </ul>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* ===== SECTION 2: MENTORING ===== */}
      <AccordionItem
        value="mentoring"
        id="mentoring"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <HeartHandshake className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">{"חונכות"}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"שירות זה נועד להעניק מעטפת תמיכה אישית המגשרת בין הסטודנט לבין הדרישות האקדמיות והמנהליות של המוסד, תוך חיזוק המיומנויות הנדרשות להצלחה בתהליך השיקום."}
            </p>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{"מה כולל הסיוע?"}</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { title: "תיווך מול המוסד", desc: "תיאום הצרכים הייחודיים של הסטודנט מול גורמים רלוונטיים (מזכירויות, מרכזי תמיכה, מרצים)." },
                  { title: "פתרון בעיות בזמן אמת", desc: "מענה מהיר לקשיים תפקודיים או מנהליים במהלך הלימודים." },
                  { title: "ניהול מטלות אקדמיות", desc: "סיוע בהתארגנות מול דרישות הלימודים ועמידה בלוחות זמנים." },
                  { title: "חיזוק מיומנויות אישיות", desc: "הקניית כלים תפקודיים ללימודים ולהשתלבות עתידית בעולם העבודה." },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col gap-1.5 rounded-lg border border-border bg-secondary/30 p-4">
                    <h5 className="text-sm font-bold text-foreground">{item.title}</h5>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-foreground/80">
                <strong className="text-foreground">{"מי עשוי להיות זכאי?"}</strong>
                {" כלל מקבלי השירות בתכניות הכשרה והשכלה גבוהה."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* ===== SECTION 3: TECH EQUIPMENT ===== */}
      <AccordionItem
        value="tech-equipment"
        id="tech-equipment"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Laptop className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">{"מכשירים ואמצעים טכנולוגיים"}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"סיוע זה נועד לאפשר למקבל השירות השתתפות מיטבית בלימודים, באמצעות רכישת מכשירים ואמצעים טכנולוגיים הנחוצים לצורך הלמידה."}
            </p>

            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{"דוגמאות לציוד שעשוי להיות מאושר"}</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  "ציוד טכנולוגי מותאם ללקויי ראייה או לעיוורון",
                  "מכשירי FM ואמצעי שמיעה מסייעים",
                  "מחשבים וציוד היקפי בתצורה מותאמת אישית",
                  "מסך מגע או מסך מתקפל",
                  "עכבר ומקלדת ארגונומיים",
                  "מכשירי הקלטה וציוד לימודי ייעודי נוסף",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* ===== SECTION 4: LEARNING MATERIAL ACCESSIBILITY ===== */}
      <AccordionItem
        value="learning-materials"
        id="learning-materials"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <BookOpenCheck className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">{"הנגשת חומרי לימוד והרצאות"}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-6 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"שירותים אלה נועדים לאפשר השתתפות מלאה ונגישה בלימודים, באמצעות התאמה של מידע לימודי כתוב או מדובר לצרכים הנובעים מנכות או ממגבלה תפקודית."}
            </p>

            <div className="flex flex-col gap-4">
              <div className="rounded-lg border border-border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Headphones className="h-4 w-4 text-primary" />
                  <h5 className="text-base font-bold text-foreground">{"שירותי קריאה"}</h5>
                </div>
                <p className="mb-2 text-sm leading-relaxed text-muted-foreground">
                  {"הקראת חומרי לימוד כתובים לסטודנטים המתקשים מאוד בקריאה או שאינם יכולים לקרוא כלל."}
                </p>
                <p className="text-xs font-medium text-primary">
                  {"מי עשוי להיות זכאי: סטודנטים עם לקות ראייה או לקות למידה מאובחנת."}
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <h5 className="text-base font-bold text-foreground">{"תמלול ושקלוט"}</h5>
                </div>
                <div className="mb-2 flex flex-col gap-1.5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">{"תמלול:"}</strong>
                    {" תמלול סימולטני של הרצאות."}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">{"שקלוט:"}</strong>
                    {" המרת שיעורים מוקלטים לטקסט מודפס."}
                  </p>
                </div>
                <p className="text-xs font-medium text-primary">
                  {"מי עשוי להיות זכאי: סטודנטים עם לקויות שמיעה או לקות למידה חמורה מאובחנת."}
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Languages className="h-4 w-4 text-primary" />
                  <h5 className="text-base font-bold text-foreground">{"תרגום לשפת הסימנים"}</h5>
                </div>
                <p className="mb-2 text-sm leading-relaxed text-muted-foreground">
                  {"תרגום סימולטני לשפת הסימנים."}
                </p>
                <p className="text-xs font-medium text-primary">
                  {"מי עשוי להיות זכאי: סטודנטים עם לקויות שמיעה."}
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h5 className="text-base font-bold text-foreground">{"הנגשת חומרי לימוד כתובים"}</h5>
                </div>
                <div className="mb-2 flex flex-col gap-1.5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">{"הקלטה:"}</strong>
                    {" המרת חומר כתוב לקובצי שמע."}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">{"ברייל:"}</strong>
                    {" הדפסת חומרי לימוד בכתב ברייל."}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <strong className="text-foreground">{"הגדלה:"}</strong>
                    {" התאמת חומרי לימוד לדפוס מוגדל."}
                  </p>
                </div>
                <p className="text-xs font-medium text-primary">
                  {"מי עשוי להיות זכאי: סטודנטים עם לקויות ראייה."}
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* ===== SECTION 5: LEARNING STRATEGIES ===== */}
      <AccordionItem
        value="learning-strategies"
        id="learning-strategies"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">{"אסטרטגיות למידה"}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-4 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"סיוע פרטני או קבוצתי בהקניית מיומנויות למידה, ארגון זמן וניהול מטלות."}
            </p>

            <div className="flex items-start gap-3 rounded-lg bg-primary/5 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-sm leading-relaxed text-foreground/80">
                <strong className="text-foreground">{"מי עשוי להיות זכאי?"}</strong>
                {" כלל מקבלי השירות בתכניות הכשרה והשכלה גבוהה."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* ===== SECTION 6: HOW TO CLAIM ===== */}
      <AccordionItem
        value="how-to-claim"
        id="how-to-claim"
        className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
      >
        <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20">
              <CheckCircle2 className="h-5 w-5 text-accent" />
            </div>
            <span className="text-right text-lg font-bold text-foreground">{"איך מממשים את הזכאות?"}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-4 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"היקף וסוג ההנגשות נקבעים בהתאם לנהלים קבועים, לצרכים האישיים, לאופי הלימודים ולהחלטת עובד השיקום."}
            </p>
            <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
              <p className="text-base font-medium leading-relaxed text-foreground">
                {"לצורך בדיקת הזכאות ומימוש שירותי התמיכה וההנגשה, יש לפנות לעובד השיקום."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
