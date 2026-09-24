import { collectAttribution } from '@/lib/attribution'

const endpoint = import.meta.env.VITE_BRAND_CONTACT_ENDPOINT

export type BrandContactPayload = ReturnType<typeof collectAttribution> & {
  email: string
  locale: string
}

/**
 * Envia o e-mail corporativo do formulário "Falar com um especialista"
 * para `VITE_BRAND_CONTACT_ENDPOINT` (POST JSON, qualquer resposta 2xx é sucesso).
 */
export async function submitBrandContact(email: string, locale: string): Promise<void> {
  const payload: BrandContactPayload = { email, locale, ...collectAttribution() }

  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.info(
        '[brand-contact] VITE_BRAND_CONTACT_ENDPOINT não configurado — envio simulado.',
        payload,
      )
      await new Promise((resolve) => setTimeout(resolve, 600))
      return
    }
    throw new Error('VITE_BRAND_CONTACT_ENDPOINT não configurado.')
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`Falha no envio do contato (${response.status}).`)
}
