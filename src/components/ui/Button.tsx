import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline' | 'accent'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none',
          {
            'bg-[var(--color-surface-2)] text-[var(--color-text)] hover:bg-white/10 border border-[var(--color-border)]':
              variant === 'default',
            'text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-white/05':
              variant === 'ghost',
            'border border-[var(--color-border)] text-[var(--color-text)] hover:border-white/20 hover:bg-white/05':
              variant === 'outline',
            'bg-[var(--color-accent)] text-[#0e0e10] hover:opacity-90 font-semibold':
              variant === 'accent',
          },
          {
            'h-7 px-2.5 text-xs': size === 'sm',
            'h-9 px-4 text-sm': size === 'md',
            'h-11 px-6 text-base': size === 'lg',
            'h-9 w-9 p-0': size === 'icon',
          },
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
