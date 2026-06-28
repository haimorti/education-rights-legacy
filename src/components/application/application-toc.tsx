
import { useState } from "react"
import {
  ClipboardList,
  Users,
  HelpCircle,
  Footprints,
  Search,
  CalendarClock,
  Mail,
  Shield,
  Clock3,
  List,
  X,
} from "lucide-react"

const sections = [
  { id: "building-plan", label: "בניית תוכנית השיקום", icon: ClipboardList },
  { id: "who-can-apply", label: "מי יכול להגיש?", icon: Users },
  { id: "still-deciding", label: "עדיין מתלבט לגבי לימודים?", icon: HelpCircle },
  { id: "step1-intro", label: "צעד 1: תחילת התהליך", icon: Footprints },
  { id: "step1-docs", label: "צעד 1: הגשת אישור קבלה", icon: Footprints },
  { id: "after-submission", label: "מה בודקים?", icon: Search },
  { id: "eligibility-period", label: "תקופת הזכאות", icon: CalendarClock },
  { id: "approval-result", label: "איך אדע אם אושר?", icon: Mail },
  { id: "step2-schedule", label: "צעד 2: הגשת מערכת שעות", icon: ClipboardList },
  { id: "entitlements-determination", label: "איך נקבעות הזכאויות?", icon: Shield },
  { id: "entitlements-result", label: "הזכאויות שנקבעו", icon: Shield },
  { id: "find-letters", label: "איפה המכתבים?", icon: Clock3 },
]

function TOCList({ onNavigate }: { onNavigate?: () => void }) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    onNavigate?.()
  }

  return (
    <ul className="flex flex-col gap-0.5">
      {sections.map((section) => (
        <li key={section.id}>
          <button
            type="button"
            onClick={() => scrollTo(section.id)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <section.icon className="h-3.5 w-3.5 shrink-0 text-primary" />
            {section.label}
          </button>
        </li>
      ))}
    </ul>
  )
}

export function ApplicationTableOfContents() {
  return (
    <nav aria-label="תוכן עניינים" className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
        {"תוכן עניינים"}
      </h2>
      <TOCList />
    </nav>
  )
}

export function MobileApplicationTableOfContents() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="פתח תוכן עניינים"
        className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <List className="h-5 w-5" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => { if (e.key === "Escape") setOpen(false) }}
            role="button"
            tabIndex={0}
            aria-label="סגור תוכן עניינים"
          />
          <nav
            aria-label="תוכן עניינים"
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-border bg-card px-5 pb-8 pt-4 shadow-2xl animate-in slide-in-from-bottom duration-200"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-muted-foreground">{"תוכן עניינים"}</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="סגור"
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
            <TOCList onNavigate={() => setOpen(false)} />
          </nav>
        </>
      )}
    </>
  )
}
