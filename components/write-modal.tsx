"use client"

import { useState, useEffect, useRef } from "react"
import { PostForm } from "./post-form"
import { X, PenLine } from "lucide-react"

export function WriteModal() {
  const [open, setOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  // lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [open])

  // close on overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) setOpen(false)
  }

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <>
      {/* Fixed FAB */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Написать на стену"
        className="glass-fab fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-white text-[15px] font-medium transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer select-none"
      >
        <PenLine className="w-4 h-4" strokeWidth={2} />
        Написать на стену
      </button>

      {/* Backdrop */}
      {open && (
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{
            background: "oklch(0.13 0.01 250 / 0.25)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {/* Modal */}
          <div
            className="glass-modal w-full max-w-lg rounded-3xl p-7 relative animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Написать на стену"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground tracking-tight">
                Написать на стену
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Закрыть"
                className="w-8 h-8 rounded-full bg-muted/70 hover:bg-muted flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <PostForm onSuccess={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
