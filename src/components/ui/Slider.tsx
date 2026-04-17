import { cn } from '@/utils/cn'

interface Props {
  min: number
  max: number
  step?: number
  value: number
  onChange: (value: number) => void
  className?: string
  'aria-label'?: string
}

export default function Slider({ min, max, step = 1, value, onChange, className, ...rest }: Props) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className={cn(
        'w-full h-2 rounded-full appearance-none cursor-pointer',
        'bg-slate-200 dark:bg-slate-700',
        '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5',
        '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-500',
        '[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow',
        '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5',
        '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-500',
        '[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
        className,
      )}
      {...rest}
    />
  )
}
