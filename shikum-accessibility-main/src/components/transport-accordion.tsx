
import { Train, Car, CheckCircle2, Info, UserCheck } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function TransportAccordion() {
  return (
    <Accordion type="multiple" className="flex flex-col gap-4">
      {/* Public Transport */}
      <AccordionItem
        value="public-transport"
        id="public-transport"
        className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
      >
        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-secondary/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Train className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-foreground text-right">
              {"החזר הוצאות נסיעה בתחבורה ציבורית"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-base leading-relaxed text-foreground">
                  {"במהלך תקופת הלימודים, תשולם השתתפות בהוצאות נסיעה ממקום המגורים הקבוע למקום הלימודים על פי תעריף תחבורה ציבורית."}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-base leading-relaxed text-foreground">
                  {"ההחזר ישולם לפי האפשרות הזולה יותר: עלות חופשי-חודשי או על פי עלות ההוצאה בפועל, בהתאם למספר ימי הלימוד בחודש ולמערכת השעות שלך."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-accent/10 p-4">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-sm leading-relaxed text-foreground/80">
                {"ההחזר ישולם אוטומטית לחשבונך ללא צורך להציג אישור על הוצאות הנסיעה."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* Special Transport */}
      <AccordionItem
        value="special-transport"
        id="special-transport"
        className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
      >
        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-secondary/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Car className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-foreground text-right">
              {"סיוע לסטודנטים שאינם יכולים להשתמש בתחבורה ציבורית"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5">
          <div className="flex flex-col gap-5 pt-2">
            <p className="text-base leading-relaxed text-muted-foreground">
              {"אם אחד מהתנאים הבאים מתקיים לגביך, אתה עשוי להיות זכאי לסיוע בהחזר הוצאות נסיעה ברכב פרטי או במימון הסעה מיוחדת:"}
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {"1"}
                </div>
                <p className="pt-1 text-base leading-relaxed text-foreground">
                  {"ועדה של משרד הבריאות קבעה לך אחוזי מוגבלות בניידות, המקנים זכאות לסיוע ברכישת רכב."}
                </p>
              </div>

              <div className="flex items-start gap-4 rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {"2"}
                </div>
                <p className="pt-1 text-base leading-relaxed text-foreground">
                  {"לא נקבעו לך אחוזי מוגבלות בניידות, אך בשל מגבלה רפואית ייתכן שאינך יכול לעשות שימוש בתחבורה ציבורית, בכפוף לבדיקה ולקביעת רופא המוסד לביטוח לאומי."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-secondary p-4">
              <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <p className="text-base leading-relaxed text-secondary-foreground">
                {"לצורך בירור הזכאות ומימושה, יש לפנות "}
                <strong>{"לעובד השיקום"}</strong>
                {"."}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
