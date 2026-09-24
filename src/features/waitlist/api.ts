export const sellerProfiles = ['reseller', 'affiliate', 'creator', 'not_yet'] as const

export type SellerProfile = (typeof sellerProfiles)[number]

export type WaitlistPayload = {
  name: string
  email: string
  /** DDI + número, ex.: "+55 (11) 99999-9999". */
  whatsapp: string
  sellerProfiles: SellerProfile[]
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  landingPage?: string
  referrer?: string
  locale: string
}

export type WaitlistResult = {
  /** O e-mail já estava na lista. */
  duplicate: boolean
}

const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT

/**
 * Envia o cadastro para `VITE_WAITLIST_ENDPOINT` (POST JSON).
 * Contrato esperado da resposta: `{ "duplicate": boolean }` com status 2xx.
 */
export async function submitWaitlist(payload: WaitlistPayload): Promise<WaitlistResult> {
  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.info('[waitlist] VITE_WAITLIST_ENDPOINT não configurado — envio simulado.', payload)
      await new Promise((resolve) => setTimeout(resolve, 600))
      return { duplicate: false }
    }
    throw new Error('VITE_WAITLIST_ENDPOINT não configurado.')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`Falha no envio da lista de espera (${response.status}).`)

  const data: unknown = await response.json().catch(() => ({}))
  const duplicate =
    typeof data === 'object' && data !== null && 'duplicate' in data && data.duplicate === true
  return { duplicate }
}
