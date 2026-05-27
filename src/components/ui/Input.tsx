import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-xs text-[var(--color-muted)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'h-9 w-full rounded-[var(--radius-md)] bg-[var(--color-surface-2)]',
            'border border-[var(--color-border)] px-3 text-sm text-[var(--color-text)]',
            'placeholder:text-[var(--color-muted)] outline-none',
            'focus:border-[var(--color-accent)] transition-colors duration-150',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'
