
import { ChevronLeft } from "lucide-react"

interface BreadcrumbProps {
  current: string
}

export function Breadcrumb({ current }: BreadcrumbProps) {
  return (
    <nav aria-label="ניווט" className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
      <a href="/" className="transition-colors hover:text-foreground">
        {"דף הבית"}
      </a>
      <ChevronLeft className="h-3.5 w-3.5" />
      <a href="/benefits" className="transition-colors hover:text-foreground">
        {"זכאויות"}
      </a>
      <ChevronLeft className="h-3.5 w-3.5" />
      <span className="font-medium text-foreground">{current}</span>
    </nav>
  )
}
