import { ArrowRight, Check, ChevronDown, LoaderCircle } from 'lucide-react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/dialog'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'
import { collectAttribution } from '@/lib/attribution'
import { sellerProfiles, submitWaitlist, type SellerProfile } from './api'
import { countryCodes } from './country-codes'

type WaitlistDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type FieldErrors = Partial<Record<'name' | 'email' | 'phone' | 'profile', string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const inputClass =
  'h-12 w-full rounded-xl border border-border bg-background px-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus:ring-2 focus:ring-brand/20'

const primaryAction = 'h-13 w-full py-3.5 text-base font-bold'

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const { t, i18n } = useTranslation()
  const [done, setDone] = useState(false)
  const [duplicate, setDuplicate] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [countryCode, setCountryCode] = useState<string>(countryCodes[0].code)
  const [phone, setPhone] = useState('')
  // Sem opção pré-selecionada: '' mostra o texto inicial do dropdown.
  const [profile, setProfile] = useState<SellerProfile | ''>('')

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next)
    if (!next) {
      // Espera a animação de saída antes de limpar o estado.
      setTimeout(() => {
        setDone(false)
        setDuplicate(false)
        setSubmitError(null)
        setErrors({})
        setProfile('')
      }, 250)
    }
  }

  const validate = (): FieldErrors => {
    const next: FieldErrors = {}
    if (name.trim().length < 2) next.name = t('waitlist.errors.required')
    if (!emailPattern.test(email.trim())) next.email = t('waitlist.errors.email')
    if (phone.replace(/\D/g, '').length < 8) next.phone = t('waitlist.errors.phone')
    if (!profile) next.profile = t('waitlist.errors.profile')
    return next
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSending(true)
    setSubmitError(null)
    try {
      const result = await submitWaitlist({
        name: name.trim(),
        email: email.trim(),
        whatsapp: `${countryCode} ${phone.trim()}`,
        // O contrato da API continua com uma lista; o formulário agora escolhe um perfil.
        sellerProfiles: profile ? [profile] : [],
        locale: i18n.language,
        ...collectAttribution(),
      })
      setDuplicate(result.duplicate)
      setDone(true)
    } catch (error) {
      console.error(error)
      setSubmitError(t('waitlist.errors.generic'))
    } finally {
      setSending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        closeLabel={t('waitlist.close')}
        className="max-h-[92dvh] max-w-lg overflow-y-auto overscroll-contain rounded-3xl border-border/70 bg-background p-0"
      >
        {done ? (
          <div className="flex flex-col items-center px-6 pt-12 pb-[calc(2.5rem+env(safe-area-inset-bottom))] text-center sm:px-8">
            <div className="flex size-14 items-center justify-center rounded-full bg-brand-tint text-brand">
              <Check className="size-7" strokeWidth={2.5} aria-hidden="true" />
            </div>
            <DialogTitle className="mt-6 text-[1.5rem] leading-[1.15] font-extrabold text-foreground sm:text-[1.75rem]">
              {t('waitlist.success.title')}
            </DialogTitle>
            <DialogDescription className="mt-3 max-w-[22rem] text-base leading-relaxed text-muted-foreground">
              {t('waitlist.success.text')}
            </DialogDescription>
            {duplicate ? (
              <p className="mt-4 rounded-full bg-brand-tint/70 px-4 py-2 text-sm font-semibold text-brand">
                {t('waitlist.success.duplicate')}
              </p>
            ) : null}
            <p className="mt-6 text-base text-foreground">{t('waitlist.success.after')}</p>
            <Button
              href={siteConfig.links.demoApp}
              target="_blank"
              rel="noreferrer"
              className={cn(primaryAction, 'mt-4')}
            >
              {t('waitlist.success.cta')}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {t('waitlist.success.note')}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="px-6 pt-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))] sm:px-8"
          >
            <DialogTitle className="text-[1.6rem] leading-[1.15] font-extrabold text-foreground sm:text-3xl">
              {t('waitlist.title')}
            </DialogTitle>
            <DialogDescription className="mt-2 text-base text-muted-foreground">
              {t('waitlist.subtitle')}
            </DialogDescription>

            <div className="mt-6 space-y-4">
              <Field label={t('waitlist.fields.name')} error={errors.name}>
                <input
                  className={inputClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('waitlist.fields.namePlaceholder')}
                  autoComplete="name"
                  maxLength={120}
                  aria-invalid={Boolean(errors.name)}
                />
              </Field>
              <Field label={t('waitlist.fields.email')} error={errors.email}>
                <input
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('waitlist.fields.emailPlaceholder')}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={255}
                  aria-invalid={Boolean(errors.email)}
                />
              </Field>
              <Field label={t('waitlist.fields.whatsapp')} error={errors.phone}>
                <div className="flex gap-2">
                  <select
                    aria-label={t('waitlist.fields.countryCode')}
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="h-12 shrink-0 rounded-xl border border-border bg-background px-2 text-base font-semibold text-foreground outline-none focus:border-brand"
                  >
                    {countryCodes.map(({ code, label }) => (
                      <option key={code} value={code}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <input
                    className={inputClass}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('waitlist.fields.whatsappPlaceholder')}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={24}
                    aria-invalid={Boolean(errors.phone)}
                  />
                </div>
              </Field>

              <Field label={t('waitlist.fields.profile')} error={errors.profile}>
                <div className="relative">
                  <select
                    name="seller-profile"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value as SellerProfile)}
                    aria-invalid={Boolean(errors.profile)}
                    className={cn(
                      inputClass,
                      'appearance-none pr-11',
                      profile ? 'text-foreground' : 'text-muted-foreground/70',
                    )}
                  >
                    <option value="" disabled>
                      {t('waitlist.fields.profilePlaceholder')}
                    </option>
                    {sellerProfiles.map((option) => (
                      <option key={option} value={option} className="text-foreground">
                        {t(`waitlist.profiles.${option}`)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
              </Field>
            </div>

            {submitError ? (
              <p role="alert" className="mt-4 text-sm font-semibold text-destructive">
                {submitError}
              </p>
            ) : null}

            <Button type="submit" disabled={sending} className={cn(primaryAction, 'mt-6')}>
              {sending ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : null}
              {sending ? t('waitlist.sending') : t('waitlist.submit')}
              {sending ? null : <ArrowRight className="size-4" aria-hidden="true" />}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-foreground">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error ? <FieldError>{error}</FieldError> : null}
    </label>
  )
}

function FieldError({ children }: { children: ReactNode }) {
  return <p className="mt-1.5 text-xs font-semibold text-destructive">{children}</p>
}
