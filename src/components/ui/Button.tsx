import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-500 hover:bg-brand-600 text-white shadow-sm',
  secondary:
    'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200',
  ghost:
    'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300',
  icon:
    'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg p-2',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-md',
  md: 'text-sm px-4 py-2 rounded-lg',
  lg: 'text-base px-5 py-2.5 rounded-lg',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        // Base
        'inline-flex items-center justify-center gap-2 font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
        'disabled:pointer-events-none disabled:opacity-50',
        'transition-colors',
        // Variant
        variantClasses[variant],
        // Size (skip for icon, which has its own padding)
        variant !== 'icon' && sizeClasses[size],
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = 'Button'

export default Button
