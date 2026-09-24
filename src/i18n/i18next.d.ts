import 'i18next'
import type ptBR from './locales/pt-BR/common.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: { common: typeof ptBR }
    returnObjects: true
  }
}
