import Link from 'next/link'
import clsx from 'clsx'

const baseStyles = {
  solid:
    'group inline-flex items-center justify-center rounded-lg py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300',
  outline:
    'group inline-flex ring-1 items-center justify-center rounded-lg py-2 px-4 text-sm font-semibold focus:outline-none transition-all duration-300',
  ghost:
    'group inline-flex items-center justify-center rounded-lg py-2 px-4 text-sm font-semibold focus:outline-none transition-all duration-300',
}

const variantStyles = {
  solid: {
    primary:
      'bg-[#42A5F5] text-white hover:bg-[#80D2FF] hover:shadow-lg hover:shadow-[#42A5F5]/25 active:bg-[#1E88E5] focus-visible:outline-[#42A5F5]',
    secondary:
      'bg-white text-[#1A1A2E] border border-[#42A5F5]/50 hover:bg-[#42A5F5]/10 hover:border-[#42A5F5] hover:text-[#42A5F5] active:bg-[#42A5F5]/20 focus-visible:outline-[#42A5F5]',
    dark:
      'bg-[#1A1A2E] text-white hover:bg-[#2A2A3E] active:bg-[#1A1A2E] focus-visible:outline-white',
  },
  outline: {
    primary:
      'border border-[#42A5F5]/50 text-[#42A5F5] hover:bg-[#42A5F5]/10 hover:border-[#42A5F5] active:bg-[#42A5F5]/20 focus-visible:outline-[#42A5F5]',
    secondary:
      'border border-[rgba(26, 26, 46, 0.08)] text-[#1A1A2E]/60 hover:border-[rgba(26, 26, 46, 0.12)] hover:text-[#1A1A2E] active:bg-[rgba(26, 26, 46, 0.05)] focus-visible:outline-[#1A1A2E]',
  },
  ghost: {
    primary:
      'text-[#1A1A2E]/60 hover:text-[#42A5F5] hover:bg-[#42A5F5]/5 active:bg-[#42A5F5]/10 focus-visible:outline-[#42A5F5]',
    secondary:
      'text-[#1A1A2E]/60 hover:text-[#1A1A2E] hover:bg-[rgba(26, 26, 46, 0.05)] active:bg-[rgba(26, 26, 46, 0.1)] focus-visible:outline-[#1A1A2E]',
  },
}

export function Button({ className, ...props }) {
  props.variant ??= 'solid'
  props.color ??= 'primary'

  className = clsx(
    baseStyles[props.variant],
    props.variant === 'outline'
      ? variantStyles.outline[props.color]
      : props.variant === 'solid'
      ? variantStyles.solid[props.color]
      : props.variant === 'ghost'
      ? variantStyles.ghost[props.color]
      : undefined,
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
