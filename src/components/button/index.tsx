import { Slot } from '@radix-ui/react-slot'
import type { ComponentProps } from 'react'
import { buttonStyles, type StyleProps } from './styles'

type ButtonAsButton = StyleProps & { asChild?: false; href?: undefined } & ComponentProps<'button'>
type ButtonAsLink = StyleProps & { asChild?: false; href: string } & ComponentProps<'a'>
/** Aplica os estilos no filho direto (ex.: <Link> do router). */
type ButtonAsChild = StyleProps & { asChild: true } & ComponentProps<typeof Slot>

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsChild

export function Button(props: ButtonProps) {
  if (props.asChild) {
    const { variant, size, className, asChild, ...rest } = props
    return <Slot className={buttonStyles({ variant, size, className })} {...rest} />
  }
  if (props.href !== undefined) {
    const { variant, size, className, asChild, ...rest } = props
    return <a className={buttonStyles({ variant, size, className })} {...rest} />
  }
  const { variant, size, className, asChild, type = 'button', ...rest } = props
  return <button type={type} className={buttonStyles({ variant, size, className })} {...rest} />
}
