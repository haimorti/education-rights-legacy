
import { useState } from "react"
import { Train, Car, List, X } from "lucide-react"

export const sections = [
  { id: "public-transport", label: "תחבורה ציבורית", icon: Train },
  { id: "special-transport", label: "הסעה מיוחדת", icon: Car },
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
  )
}

export function TableOfContents() {
  return (
    <nav aria-label="תוכן עניינים" className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
        {"תוכן עניינים"}
      </h2>
      <TOCList />
    </nav>
  )
}

export function MobileTableOfContents() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="פתח תוכן עניינים"
        className="fixed bottom-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-primary shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <List className="h-5 w-5" />
      </button>

      {/* Overlay */}
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
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border-t border-border bg-card px-5 pb-8 pt-4 shadow-2xl animate-in slide-in-from-bottom duration-200"
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
