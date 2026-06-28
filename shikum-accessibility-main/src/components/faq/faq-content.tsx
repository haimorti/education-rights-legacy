import { useMemo, useState } from "react"
import {
  FileCheck,
  GraduationCap,
  Wallet,
  Home,
  Bus,
  Laptop,
  BookOpen,
  Accessibility,
  HelpCircle,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

type FaqQuestion = {
  q: string
  a: string
}

type FaqCategory = {
  id: string
  title: string
  icon: typeof FileCheck
  questions: FaqQuestion[]
}

const faqCategories: FaqCategory[] = [
  {
    id: "application",
    title: "הגשת בקשה",
    icon: FileCheck,
    questions: [
      {
        q: "הזמניות מסתיימת באמצע שנת הלימודים. ימשיכו לממן לי אותם גם אם האחוזים ירדו?",
        a: "ככלל, אם אושר לך סמסטר לימודים והזמניות מסתיימת במהלכו, נמשיך במימון הסיוע עד לסיום אותו סמסטר שאושר. אם במועד תחילת הסמסטר הבא לא יהיו לך אחוזי נכות מזכים, לא ניתן יהיה לאשר סמסטר.",
      },
      {
        q: "אני זכאי לשנת לימודים אחת. מתי אקבל אותה?",
        a: "כאשר אתה זכאי לשנת לימודים אחת בלבד במסגרת השיקום המקצועי, הזכאות ניתנת ל־12 החודשים הרצופים האחרונים של הלימודים, כלומר לשנה האחרונה של המסלול – בסמוך למועד סיום הלימודים.\n\nלאחר קבלת אישור קבלה ללימודים כסטודנט מן המניין, ניתן לפנות למחלקת השיקום בבקשה להכיר בתוכנית הלימודים כתוכנית השיקום המקצועי שלך. עם זאת, מימוש הזכאות לשנת הלימודים יתבצע בשנת הלימודים האחרונה בלבד.\n\nלצורך מימוש הזכאות, עליך לפנות לפקיד השיקום כ־3 חודשים לפני תחילת שנת הלימודים האחרונה ולהגיש מסמכים עדכניים, ובהם אישור לימודים עדכני, גיליון ציונים ומערכת שעות.",
      },
      {
        q: "במידה ואני זכאי לשנת לימודים אחת, יש אפשרות שאקבל אותה שלא בשנת הלימודים האחרונה?",
        a: "ככלל, כאשר אתה זכאי לשנת לימודים אחת בלבד במסגרת השיקום המקצועי, הזכאות מאושרת עבור שנת הלימודים או ההכשרה האחרונה.\n\nעם זאת, במקרים חריגים, כאשר שנת הלימודים האחרונה היא שנה חלקית (לדוגמה: היקף לימודים נמוך, פחות ימי לימוד או פחות שעות שבועיות), באופן שעשוי לפגוע במימוש זכאויות כגון דמי שיקום, סיוע בשכר דירה או שירותי הנגשה, ניתן לשקול אישור של שנת הלימודים שלפני האחרונה.",
      },
    ],
  },
  {
    id: "rehab-allowance",
    title: "דמי שיקום",
    icon: Wallet,
    questions: [],
  },
  {
    id: "tuition",
    title: "שכר לימוד",
    icon: GraduationCap,
    questions: [
      {
        q: "האם אפשר לקבל מקדמות לפני תחילת שנת הלימודים?",
        a: "תשלום שכר הלימוד מתבצע כהחזר לחשבונך האישי (ולא ישירות למוסד הלימודים), לאחר הצגת קבלה, והוא משולם בדרך כלל בשתי פעימות לפחות במהלך שנת הלימודים, או בהתאם למועדי התשלומים ששילמת בפועל, כך שייתכנו יותר משתי פעימות, אך לא פחות.\n\nבמקרה שבו אושרו הלימודים כתוכנית השיקום שלך ושילמת מקדמה למוסד הלימודים, ניתן לקבל החזר עבור המקדמה בלבד עוד לפני תחילת שנת הלימודים, בכפוף להצגת קבלה בו מצוין כי מדובר בתשלום מקדמה.",
      },
    ],
  },
  {
    id: "housing",
    title: "שכר דירה",
    icon: Home,
    questions: [],
  },
  {
    id: "transport",
    title: "החזר הוצאות נסיעה",
    icon: Bus,
    questions: [],
  },
  {
    id: "equipment",
    title: "ציוד לימודי",
    icon: Laptop,
    questions: [
      {
        q: "אני זכאי להחזר עבור ציוד לימודי ייחודי למקצוע שלי?",
        a: "כדי להיות זכאי להחזר עבור ציוד לימודי ייחודי למקצוע, על הציוד המבוקש לעמוד בשני תנאים מצטברים:\n\nהציוד נדרש כחלק בלתי נפרד מדרישות תוכנית הלימודים כולה, ונדרש לכלל מסלול הלימודים ולא לצורך קורס נקודתי או קורס ספציפי בלבד;\n\nהציוד אינו מסופק על ידי מוסד הלימודים במסגרת השירותים הרגילים הניתנים לסטודנט.\n\nאם הציוד נדרש בשל המגבלה הרפואית שלך לצורך הנגשה (כגון ציוד טכנולוגי ללקויי ראייה, מכשירי FM לשמיעה), יש לפנות לפקיד השיקום, אשר יבחן את הצורך הספציפי ואת אפשרויות הסיוע בהתאם לנהלים.",
      },
      {
        q: "לימודי התואר שלי הוכרו כתוכנית השיקום שלי – אני יכול לרכוש מחשב נייד/טאבלט?",
        a: "כן. מאחר שלימודי התואר שלך הוכרו כתוכנית השיקום המקצועי, ניתן לממש את זכאותך לציוד לימודי באמצעות רכישת מחשב נייד או טאבלט ולקבל בגינם החזר כספי. במסגרת תוכניות להשכלה גבוהה, מכשירים אלו נחשבים לציוד לימודי נדרש.\n\nההחזר ניתן בכפוף לתקרת ההחזר המרבית ולהנחיות לקבלה תקינה, ובהן: רכישה שבוצעה במהלך תקופת הזכאות המאושרת, והצגת חשבונית מס/קבלה מפורטת על שם הזכאי, הכוללת את שמו המלא ומספר תעודת הזהות.",
      },
    ],
  },
  {
    id: "tutoring",
    title: "שיעורי עזר",
    icon: BookOpen,
    questions: [],
  },
  {
    id: "accessibility",
    title: "הנגשות",
    icon: Accessibility,
    questions: [],
  },
  {
    id: "general",
    title: "כללי",
    icon: HelpCircle,
    questions: [
      {
        q: "אפשר לעבוד במקביל ללימודים?",
        a: "כן. ניתן לעבוד במקביל ללימודים במסגרת השיקום המקצועי, אולם יש לקחת בחשבון כי הכנסה מעבודה עשויה להשפיע על הזכאות לקבלת דמי שיקום, ככל שאתה זכאי להם.",
      },
    ],
  },
]

export function FaqContent() {
  const [activeCategoryId, setActiveCategoryId] = useState(faqCategories[0].id)

  const activeCategory = useMemo(
    () => faqCategories.find((category) => category.id === activeCategoryId) ?? faqCategories[0],
    [activeCategoryId]
  )

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
        {"השאלות מסודרות לפי נושאים. בחר את התחום שמעניין אותך כדי לצפות במידע הרלוונטי בלבד."}
      </p>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {faqCategories.map((category) => {
          const isActive = activeCategory.id === category.id

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategoryId(category.id)}
              className={`flex min-h-12 items-center justify-center rounded-lg border px-3 py-2 text-center text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-secondary"
              }`}
            >
              {category.title}
            </button>
          )
        })}
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <activeCategory.icon className="h-4.5 w-4.5 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground">{activeCategory.title}</h2>
        </div>

        {activeCategory.questions.length > 0 ? (
          <Accordion type="multiple" className="flex flex-col gap-3">
            {activeCategory.questions.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`${activeCategory.id}-${idx}`}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
              >
                <AccordionTrigger className="px-5 py-4 text-right transition-colors hover:bg-secondary/50 hover:no-underline [&>svg]:shrink-0">
                  <span className="text-sm font-semibold leading-relaxed text-foreground">{faq.q}</span>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5">
                  <div className="whitespace-pre-line pt-1 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-secondary/20 px-5 py-6 text-center">
            <p className="text-sm text-muted-foreground">{"שאלות בנושא זה יתווספו בהמשך"}</p>
          </div>
        )}
      </section>
    </div>
  )
}
