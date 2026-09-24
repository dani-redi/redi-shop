import { ArrowRight, Check, LoaderCircle } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { iconStroke } from '@/lib/icons'
import { submitBrandContact } from './api'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** E-mail corporativo + "Falar com um especialista". */
export function BrandContactForm() {
  const { t, i18n } = useTranslation()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!emailPattern.test(email.trim())) {
      setError(t('brands.contact.errorEmail'))
      return
    }
    setError(null)
    setStatus('sending')
    try {
      await submitBrandContact(email.trim(), i18n.language)
      setStatus('sent')
    } catch (cause) {
      console.error(cause)
      setStatus('error')
      setError(t('brands.contact.errorGeneric'))
    }
  }

  if (status === 'sent') {
    return (
      <p role="status" className="flex items-center gap-3 text-body font-semibold text-foreground">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
          <Check className="size-5" strokeWidth={iconStroke} aria-hidden="true" />
        </span>
        {t('brands.contact.success')}
      </p>
    )
  }

  const sending = status === 'sending'
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
      <label htmlFor="brand-contact-email" className="text-small font-semibold">
        {t('brands.contact.email')}
      </label>
      <input
        id="brand-contact-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={Boolean(error)}
        autoComplete="email"
        inputMode="email"
        maxLength={255}
        className="-mt-2 h-13 w-full rounded-control border border-border bg-background px-4 text-body transition-[border-color,box-shadow] duration-200 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 aria-invalid:border-destructive"
      />
      {error ? (
        <p role="alert" className="-mt-2 text-small font-semibold text-destructive">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={sending} size="xl" className="w-full">
        {sending ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : null}
        {sending ? t('brands.contact.sending') : t('brands.contact.submit')}
        {sending ? null : (
          <ArrowRight
            className="size-5 shrink-0 transition-[translate] duration-200 ease-out group-hover:translate-x-1"
            strokeWidth={iconStroke}
            aria-hidden="true"
          />
        )}
      </Button>
    </form>
  )
}
