import { useEffect, useState } from "react"

/* ===== TEMP INTERNAL DRAFT MODAL - REMOVE WHEN APPROVED ===== */
const STORAGE_KEY = "internal_draft_ack_v1"

export function TempInternalDraftModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const isApproved = window.localStorage.getItem(STORAGE_KEY) === "true"
    setOpen(!isApproved)
  }, [])

  const handleApprove = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true")
    }
    setOpen(false)
  }

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4" dir="rtl">
      <div className="w-full max-w-[420px] rounded-lg bg-background p-6 text-right shadow-xl">
        <h2 className="text-xl font-semibold">טיוטה פנימית — לא מאושר רשמית</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          האתר מיועד לבדיקת צוות בלבד. אין להסתמך על המידע לצורך החלטות או מימוש זכאויות.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">באישור אני מבין/ה שמדובר בטיוטה פנימית.</p>
        <button
          type="button"
          onClick={handleApprove}
          className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          אישור והמשך
        </button>
      </div>
    </div>
  )
}
