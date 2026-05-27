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
          <label htmlFor={id} className="text-xs font-medium text-[var(--color-text-secondary)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'h-10 w-full rounded-[var(--radius-md)] bg-[var(--color-surface)]',
            'border border-[var(--color-border)] px-3 text-sm text-[var(--color-text)]',
            'placeholder:text-[var(--color-muted)] outline-none shadow-[var(--shadow-sm)]',
            'focus:border-[var(--color-border-strong)] focus:shadow-[var(--shadow-md)] transition-all duration-150',
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'
