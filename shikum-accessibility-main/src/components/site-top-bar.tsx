import { useState } from "react"
import { Home, Menu, X } from "lucide-react"

const navLinks = [
  { href: "/application", label: "הגשת בקשה" },
  { href: "/benefits", label: "מימוש זכאויות" },
  { href: "https://b2b.btl.gov.il/BTL.ILG.Payments/DocumentsInfo.aspx", label: "שליחת מסמכים", external: true },
  { href: "https://ps.btl.gov.il/", label: "איזור אישי", external: true },
  { href: "/faq", label: "שאלות נפוצות" },
  { href: "/contact", label: "יצירת קשר" },
]

export function SiteTopBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-[60] border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-4">
        <div className="flex items-center justify-between gap-3">
          <a href="/home" className="flex items-stretch gap-2 text-right" aria-label="מעבר לדף הבית">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center self-center rounded-full bg-sky-400 md:h-10 md:w-10">
              <Home className="h-5 w-5 text-white md:h-6 md:w-6" />
            </span>
            <div>
              <p className="text-lg font-extrabold leading-tight text-foreground md:text-xl">
                שיקום מקצועי לסטודנטים
              </p>
              <p className="text-xs text-muted-foreground md:text-sm">
                שהוכרו כנכים כלליים/נפגעי עבודה
              </p>
            </div>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-secondary md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav aria-label="ניווט ראשי" className="hidden flex-wrap items-center justify-start gap-2 md:flex md:flex-row md:justify-end">
          {navLinks.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="rounded-md border border-transparent px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {menuOpen && (
          <nav aria-label="ניווט ראשי במובייל" className="flex flex-col gap-1 border-t border-border pt-3 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
