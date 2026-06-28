import { ExternalLink } from "lucide-react"

const entitlementLinks = [
  { href: "/tuition", label: "שכר לימוד" },
  { href: "/rehaballowance", label: "דמי שיקום" },
  { href: "/housing", label: "שכר דירה" },
  { href: "/transport", label: "נסיעות" },
  { href: "/equipment", label: "ציוד לימודי" },
  { href: "/tutoring", label: "שיעורי עזר" },
  { href: "/accessibility", label: "הנגשות" },
]

const formLinks = [
  {
    href: "https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/forms/Rehabilitation_forms_ar/Pages/267%20%D7%91%D7%A7%D7%A9%D7%94%20%D7%9C%D7%A1%D7%99%D7%95%D7%A2%20%D7%91%D7%9E%D7%A2%D7%A0%D7%A7%20%D7%9C%D7%9E%D7%9B%D7%A9%D7%99%D7%A8%D7%99%D7%9D%20%D7%91%D7%AA%D7%9B%D7%A0%D7%99%D7%AA%20%D7%94%D7%A9%D7%99%D7%A7%D7%95%D7%9D.aspx",
    label: "טופס בקשה לסיוע במכשירים",
  },
  {
    href: "https://www.btl.gov.il/%D7%98%D7%A4%D7%A1%D7%99%D7%9D%20%D7%95%D7%90%D7%99%D7%A9%D7%95%D7%A8%D7%99%D7%9D/forms/Rehabilitation_forms_ar/Pages/divuhajMatanShiuureEzer.aspx",
    label: "טופס דיווח שיעורי עזר",
  },
]

const usefulLinks = [
  {
    href: "https://www.btl.gov.il/Simulators/GeneralCalc/Pages/Merchakim.aspx",
    label: "מחשבון מרחקים",
  },
  {
    href: "https://ps.btl.gov.il/",
    label: "איזור אישי",
  },
  {
    href: "https://b2b.btl.gov.il/BTL.ILG.Payments/DocumentsInfo.aspx",
    label: "שליחת מסמכים",
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-x-4 md:gap-y-6">
          <section className="p-3 md:p-2">
            <h3 className="mb-4 text-base font-bold text-foreground">זכאויות</h3>
            <ul className="space-y-2">
              {entitlementLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="p-3 md:p-2">
            <h3 className="mb-4 text-base font-bold text-foreground">טפסים</h3>
            <ul className="space-y-3">
              {formLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="p-3 md:p-2">
            <h3 className="mb-4 text-base font-bold text-foreground">קישורים</h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="space-y-2 border-t border-border pt-6 text-center text-xs text-muted-foreground md:text-sm">
          <p>המידע באתר הוא מידע מסייע בלבד ואינו מחליף הנחיות רשמיות של הביטוח הלאומי או ייעוץ פרטני.</p>
          <p>לאימות זכאות, תנאים וסכומים מעודכנים יש לפנות לעובד השיקום המטפל.</p>
          <p className="pt-1 text-[11px] md:text-xs">© 2026 שיקום מקצועי לסטודנטים</p>
        </div>
      </div>
    </footer>
  )
}
