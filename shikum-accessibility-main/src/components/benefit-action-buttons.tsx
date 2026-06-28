import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BenefitActionButtonsProps {
  showSendDocuments?: boolean
}

export function BenefitActionButtons({
  showSendDocuments = false,
}: BenefitActionButtonsProps) {
  if (!showSendDocuments) {
    return null
  }

  return (
    <div className="flex justify-center py-4">
      <Button
        className="flex w-full max-w-3xl items-center justify-center gap-3 rounded-2xl px-6 py-7 text-lg font-bold shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
        asChild
      >
        <a
          href="https://b2b.btl.gov.il/BTL.ILG.Payments/DocumentsInfo.aspx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Send className="h-5 w-5" />
          {"שליחת מסמכים לעו\"ס השיקום"}
        </a>
      </Button>
    </div>
  )
}
