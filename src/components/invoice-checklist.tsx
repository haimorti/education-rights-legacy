import { CheckCircle2, AlertTriangle, Receipt } from "lucide-react"

interface InvoiceChecklistProps {
  items: string[]
  title?: string
  warningText?: string
}

export function InvoiceChecklist({
  items,
  title = "מה חייב להופיע על הקבלה",
  warningText = "קבלה החסרה אחד או יותר מהפרטים הנדרשים תידחה.",
}: InvoiceChecklistProps) {
  return (
    <div className="flex flex-col gap-0 overflow-hidden rounded-xl border-2 border-primary/30 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 bg-primary px-5 py-3.5">
        <Receipt className="h-5 w-5 shrink-0 text-primary-foreground" />
        <h4 className="text-base font-bold text-primary-foreground">{title}</h4>
      </div>

      {/* List Items */}
      <div className="flex flex-col gap-0 bg-card">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 border-b border-border px-5 py-3 last:border-b-0"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
            <span className="text-base leading-relaxed text-foreground">{item}</span>
          </div>
        ))}
      </div>

      {/* Warning Footer */}
      <div className="flex items-start gap-3 bg-destructive/10 px-5 py-3.5">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <p className="text-sm font-medium leading-relaxed text-destructive">
          {warningText}
        </p>
      </div>
    </div>
  )
}
