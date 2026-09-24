import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { WaitlistProvider } from '@/features/waitlist/provider'
import i18n from '@/i18n'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <WaitlistProvider>{children}</WaitlistProvider>
    </I18nextProvider>
  )
}
