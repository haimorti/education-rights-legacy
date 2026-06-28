import { Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function TutoringSummary() {
  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardContent className="flex items-start gap-4 p-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Zap className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-foreground">{"בקצרה"}</h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {"שיעורי עזר ניתנים למי שזקוק לתמיכה בלימודים ולהשלמת פערים, בהיקף של עד "}
            <strong className="text-foreground">{"25% משעות הלימוד החודשיות"}</strong>
            {", וניתנים דרך זכיין או מרכז התמיכה במוסד הלימודים."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
