import { lazy, Suspense, useCallback, useMemo, useState, type ReactNode } from 'react'
import { WaitlistContext } from './context'

// O modal (Radix Dialog + formulário) só é baixado no primeiro clique no CTA.
const WaitlistDialog = lazy(() =>
  import('./waitlist-dialog').then((module) => ({ default: module.WaitlistDialog })),
)

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [requested, setRequested] = useState(false)
  const open = useCallback(() => {
    setRequested(true)
    setIsOpen(true)
  }, [])
  const value = useMemo(() => ({ open }), [open])

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      {requested ? (
        <Suspense fallback={null}>
          <WaitlistDialog open={isOpen} onOpenChange={setIsOpen} />
        </Suspense>
      ) : null}
    </WaitlistContext.Provider>
  )
}
