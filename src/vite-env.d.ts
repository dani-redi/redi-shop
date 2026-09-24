/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL que recebe o POST da lista de espera. Sem ela, o envio é simulado em dev. */
  readonly VITE_WAITLIST_ENDPOINT?: string
  /** URL que recebe o POST do formulário de contato de /marcas. Sem ela, o envio é simulado em dev. */
  readonly VITE_BRAND_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
