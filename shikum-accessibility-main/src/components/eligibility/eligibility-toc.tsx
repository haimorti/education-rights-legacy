import { HelpCircle, UserCheck, ListChecks, FileX, FileSearch, Mail } from "lucide-react"

const sections = [
  { id: "what-is", label: "מהי זכאות לשיקום מקצועי?", icon: HelpCircle },
  { id: "who-is-eligible", label: "מי יכול להיות זכאי?", icon: UserCheck },
  { id: "process", label: "איך מתחילים את התהליך?", icon: ListChecks },
  { id: "not-submitted", label: "עדיין לא הגשת תביעה?", icon: FileX },
  { id: "already-submitted", label: "כבר הגשת תביעה?", icon: FileSearch },
  { id: "approval-letter", label: "דוגמה למכתב זכאות", icon: Mail },
]

export function EligibilityTableOfContents() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav aria-label="תוכן עניינים" className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
        {"תוכן עניינים"}
      </h2>
      <ul className="flex flex-col gap-1">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              type="button"
              onClick={() => scrollTo(section.id)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <section.icon className="h-4 w-4 shrink-0 text-primary" />
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
