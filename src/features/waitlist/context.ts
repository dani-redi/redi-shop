import { createContext, useContext } from 'react'

type WaitlistContextValue = {
  open: () => void
}

export const WaitlistContext = createContext<WaitlistContextValue>({ open: () => {} })

/** Abre o modal da lista de espera de qualquer ponto da página. */
export function useWaitlist() {
  return useContext(WaitlistContext)
}
