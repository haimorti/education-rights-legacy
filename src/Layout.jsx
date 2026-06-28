import { SiteFooter } from "@/components/site-footer"
import { SiteTopBar } from "@/components/site-top-bar"
import { BackToTopButton } from "@/components/back-to-top-button"
import { Toaster } from "@/components/ui/toaster"
/* ===== TEMP INTERNAL DRAFT MODAL - REMOVE WHEN APPROVED ===== */
import { TempInternalDraftModal } from "@/components/temp-internal-draft-modal"

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      {/* ===== TEMP INTERNAL DRAFT MODAL - REMOVE WHEN APPROVED ===== */}
      <TempInternalDraftModal />
      <SiteTopBar />
      {children}
      <SiteFooter />
      <BackToTopButton />
      <Toaster />
    </div>
  )
}
