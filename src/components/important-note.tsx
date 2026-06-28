import { AlertTriangle } from "lucide-react"

export function ImportantNote() {
  return (
    <div className="rounded-xl border-2 border-accent/30 bg-accent/5 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15">
          <AlertTriangle className="h-5 w-5 text-accent" />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-foreground">
            {"חשוב לזכור"}
          </h3>
          <p className="text-base leading-relaxed text-foreground/80">
            {"בסיום כל סמסטר עליך להגיש "}
            <strong className="text-foreground">{"גיליון ציונים"}</strong>
            {" ו"}
            <strong className="text-foreground">{"מערכת שעות מעודכנת"}</strong>
            {" לסמסטר הבא. המשך קבלת התמיכות מותנה בעמידה בדרישות הלימודים ובהצלחה במבחני הסמסטר הקודם."}
          </p>
        </div>
      </div>
    </div>
  )
}
