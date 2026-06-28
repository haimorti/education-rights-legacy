import { Phone, Mail, Users, Info, HelpCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { MobileNav } from "@/components/mobile-nav"

const rehabWorkers = [
  { name: "אייל", phone: "03-9114894", email: "\u2014" },
  { name: "אירנה", phone: "03-9114886", email: "\u2014" },
  { name: "הגר", phone: "\u2014", email: "\u2014" },
  { name: "הדס", phone: "03-9114943", email: "\u2014" },
  { name: "חיים", phone: "03-9114929", email: "\u2014" },
  { name: "ליאורה", phone: "03-9114885", email: "\u2014" },
  { name: "מזל", phone: "03-9114855", email: "\u2014" },
  { name: "נירית", phone: "03-9114888", email: "\u2014" },
  { name: "נעמה", phone: "\u2014", email: "\u2014" },
  { name: "ענת", phone: "\u2014", email: "\u2014" },
  { name: "צביקה", phone: "03-9114893", email: "\u2014" },
  { name: "רחלי", phone: "03-9114889", email: "\u2014" },
  { name: "שרי", phone: "03-9114895", email: "\u2014" },
  { name: "תמר", phone: "03-9114725", email: "\u2014" },
]

const mediators = [
  { name: "ורוניקה", phone: "03-9114896", email: "\u2014" },
  { name: "מלי", phone: "03-9114904", email: "\u2014" },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-primary px-4 py-16 md:py-24">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary-foreground/5" />
        <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-primary-foreground/5" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/15">
            <Phone className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl">
            {"פרטי קשר"}
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
            {"כיצד ליצור קשר עם עובדי השיקום והמגשרות"}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 md:py-16">
        <div className="flex flex-col gap-10">
          <section className="flex flex-col gap-6">
            <h2 className="text-xl font-bold text-foreground">{"איך ליצור קשר?"}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-bold text-foreground">{"טלפון"}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {"ניתן לפנות לעו\"ס השיקום ולמגשרות בטלפון"}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-bold text-foreground">{"דואר אלקטרוני"}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {"ניתן לשלוח פניות ומסמכים במייל לעובד השיקום ולמגשרות"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">{"רשימת עובדי שיקום"}</h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-right">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">שם העובד/ת</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">טלפון</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">דוא\"ל</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {rehabWorkers.map((worker) => (
                    <tr key={worker.name}>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{worker.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground" dir="ltr">{worker.phone}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{worker.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-foreground">{"מגשרות המחלקה"}</h2>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-right">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">שם המגשרת</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">טלפון</th>
                    <th className="px-4 py-3 text-sm font-bold text-foreground">דוא"ל</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-card">
                  {mediators.map((mediator) => (
                    <tr key={mediator.name}>
                      <td className="px-4 py-3 text-sm font-medium text-foreground">{mediator.name}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground" dir="ltr">{mediator.phone}</td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{mediator.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold text-foreground">{"מה תפקיד המגשרת?"}</h2>
            </div>
            <Card className="border border-border">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                  <Info className="h-5 w-5 text-accent" />
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {"תפקיד המגשרת במחלקה הוא לסייע לעו\"ס השיקום במיצוי זכויותיכם, בטיפול במסמכים ובתשלומים בהתאם לזכאויות שנקבעו לכם."}
                </p>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
