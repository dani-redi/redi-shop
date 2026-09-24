/** Origem da visita (UTMs, página e referrer), enviada junto com o cadastro. */
export function collectAttribution() {
  const params = new URLSearchParams(window.location.search)
  const get = (key: string) => params.get(key) ?? undefined
  return {
    source: get('source') ?? get('utm_source'),
    utmSource: get('utm_source'),
    utmMedium: get('utm_medium'),
    utmCampaign: get('utm_campaign'),
    utmContent: get('utm_content'),
    utmTerm: get('utm_term'),
    landingPage: window.location.href.slice(0, 500),
    referrer: document.referrer ? document.referrer.slice(0, 500) : undefined,
  }
}
