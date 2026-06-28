import React from "react"

import { useState } from "react"
import {
  CheckCircle2,
  ClipboardList,
  FileSearch,
  ExternalLink,
  ArrowLeft,
  Info,
  X,
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

function ImageZoom({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative w-full overflow-hidden rounded-xl border border-border transition-all hover:border-primary/40 hover:shadow-lg"
      >
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full rounded-xl transition-transform group-hover:scale-[1.02]"
          crossOrigin="anonymous"
        />
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground/70 px-3 py-1 text-xs text-background backdrop-blur-sm">
          {"לחץ על התמונה להגדלה"}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-md"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false)
          }}
          role="button"
          tabIndex={0}
          aria-label="סגור תמונה"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition-colors hover:bg-background"
            aria-label="סגור"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={src || "/placeholder.svg"}
            alt={alt}
            className="max-h-[90vh] max-w-[95vw] rounded-xl shadow-2xl"
            crossOrigin="anonymous"
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-background/80 px-4 py-1.5 text-xs text-foreground backdrop-blur-sm">
            {"לחץ בכל מקום לסגירה"}
          </p>
        </div>
      )}
    </>
  )
}

export function EligibilityContent() {
  return (
    <div className="flex flex-col gap-8">
      <Accordion type="multiple" className="flex flex-col gap-4">
        <AccordionItem
          value="what-is"
          id="what-is"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <span className="text-right text-lg font-bold text-foreground">{"מהי זכאות לשיקום מקצועי?"}</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-4 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {"זכאות לשיקום מקצועי מאפשרת קבלת שירותי שיקום ממחלקת השיקום של הביטוח הלאומי. מטרת השיקום היא לשילוב בשוק העבודה באופן שתואם את הכישורים, היכולות והמגבלות של האדם."}
              </p>
              <p className="text-base leading-relaxed text-muted-foreground">
                {"המטרה מושגת באמצעות קביעת תוכנית שיקום מותאמת אישית, ועשויה לכלול בין היתר:"}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "אבחון תעסוקתי",
                  "ייעוץ וליווי בבחירת מקצוע",
                  "תוכניות טרום-הכשרה (סדנאות, מכינות)",
                  "סיוע במימון לימודים והכשרה מקצועית",
                  "סיוע במציאה ובהשתלבות במקום העבודה",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-lg border border-border bg-secondary/20 p-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="who-is-eligible"
          id="who-is-eligible"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <span className="text-right text-lg font-bold text-foreground">{"מי זכאי לשיקום מקצועי?"}</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-4 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {"נפגעי עבודה עם דרגת נכות יציבה של 10% לפחות, ונכים כלליים עם 20% נכות רפואית לפחות טרם גיל פרישה, אשר מתקיימים לגביהם גם התנאים הבאים:"}
              </p>
              <div className="flex flex-col gap-2">
                {[
                  "אינם מסוגלים, עקב מוגבלותם, לעסוק בעבודתם הקודמת או בעבודה מתאימה אחרת",
                  "זקוקים להכשרה מקצועית כדי לחזור לעבודה או להשתלב בעבודה התואמת את כישוריהם",
                  "נמצאו מתאימים לשיקום מקצועי ולהשתלבות בשוק העבודה הפתוח (ולא בתעסוקה מוגנת או נתמכת)",
                ].map((condition) => (
                  <div key={condition} className="flex items-start gap-3 rounded-lg bg-primary/5 p-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <p className="text-sm text-foreground">{condition}</p>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="process"
          id="process"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <span className="text-right text-lg font-bold text-foreground">{"תהליך קבלת הזכאות לשיקום מקצועי"}</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-4 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {"הזכאות לשיקום מקצועי מתקבלת רק לאחר תהליך מסודר הכולל כמה שלבים ברורים:"}
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { step: "1", text: "הגשת תביעה לשיקום מקצועי לביטוח הלאומי." },
                  { step: "2", text: "פגישה עם פקיד שיקום, שבה נבחנים מצבך התפקודי, הרפואי והתעסוקתי." },
                  { step: "3", text: "החלטה רשמית של אגף השיקום, הנשלחת במכתב לאזור האישי." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {item.step}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="not-submitted"
          id="not-submitted"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                <ClipboardList className="h-5 w-5 text-accent" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">{"טרם הגשת תביעה?"}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-4 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {"אם טרם הגשת תביעה או שעדיין לא נפגשת עם פקיד שיקום, סביר להניח שעדיין אין לך זכאות מאושרת, ולכן לא ניתן בשלב זה להגיש בקשה לאישור לימודיך כתוכנית השיקום שלך."}
              </p>
              <p className="text-base text-muted-foreground">
                {"אם לא הגשת תביעה לשיקום מקצועי – תוכל לעשות זאת דרך אתר הביטוח הלאומי:"}
              </p>
              <a
                href="https://govforms.gov.il/mw/forms/t270@btl.gov.il?gbxid=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/20"
              >
                {"הגשת תביעה לשיקום מקצועי"}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="already-submitted"
          id="already-submitted"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <FileSearch className="h-5 w-5 text-primary" />
              </div>
              <span className="text-right text-lg font-bold text-foreground">{"כבר הגשת תביעה ונפגשת עם פקיד שיקום?"}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-5 pt-2">
              <p className="text-base leading-relaxed text-muted-foreground">
                {"אם כבר הגשת תביעה לשיקום מקצועי ונפגשת עם עו״ס השיקום, וברצונך לבדוק האם זכאותך לשיקום מקצועי אושרה, ייתכן שההחלטה כבר מופיעה באתר „שירות אישי”."}
              </p>

              <div className="flex flex-col gap-3">
                <h4 className="text-base font-bold text-foreground">{"איך בודקים?"}</h4>
                <div className="flex flex-col gap-2">
                  {[
                    { step: "1", text: "היכנס לאתר שירות אישי באתר הביטוח הלאומי." },
                    { step: "2", text: "עבור ללשונית \"מכתבים\"." },
                    { step: "3", text: "חפש מכתב שעניינו: \"אישור תביעתך למתן שיקום מקצועי\"." },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3 rounded-lg bg-card p-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {item.step}
                      </span>
                      <p className="pt-0.5 text-sm text-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="https://ps.btl.gov.il/#/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  {"כניסה לאתר שירות אישי"}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 p-5">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="flex flex-col gap-2">
                  <h4 className="text-base font-bold text-foreground">{"לא נמצאה החלטה באזור האישי?"}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {"אם כבר הגשת תביעה לשיקום מקצועי ונפגשת עם עובד השיקום, אך לא מצאת החלטה באזור האישי, ניתן לפנות לעובד השיקום ולברר האם זכאותך לשיקום מקצועי אושרה."}
                  </p>
                  <Button variant="outline" size="sm" asChild className="mt-1 w-fit bg-transparent">
                    <a href="/contact" className="gap-2">
                      {"יצירת קשר"}
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="approval-letter"
          id="approval-letter"
          className="scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        >
          <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-secondary/50 hover:no-underline">
            <span className="text-right text-lg font-bold text-foreground">{"ראה כאן דוגמה למכתב זכאות"}</span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-5">
            <div className="flex flex-col gap-3 pt-2">
              <ImageZoom
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/691f93e1678e622298937728/9a13ad4e3_.png"
                alt="דוגמה למכתב אישור זכאות לשיקום מקצועי"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-5">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-bold text-foreground">{"אם קיבלת מכתב כזה"}</h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {"המשמעות היא שקיימת זכאות מאושרת, וניתן להתקדם להגשת בקשה להכרה בלימודי השכלה גבוהה כתוכנית השיקום האישית שלך."}
        </p>
        <div className="mt-4">
          <Button asChild>
            <a href="/application" className="gap-2">
              {"להגשת בקשה"}
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="outline" asChild>
          <a href="/" className="gap-2">
            {"חזרה לדף הבית"}
          </a>
        </Button>
      </div>
    </div>
  )
}
