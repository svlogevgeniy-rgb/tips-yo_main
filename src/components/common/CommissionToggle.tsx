import { cn } from '@/lib/utils'

interface CommissionToggleProps {
  checked: boolean
  onChange: (value: boolean) => void
  label: string
  className?: string
}

export const CommissionToggle = ({
  checked,
  onChange,
  label,
  className,
}: CommissionToggleProps) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        'flex w-full items-center gap-4 rounded-[24px] border border-[#E8EFED] bg-white px-4 py-3 text-left transition hover:border-[#00B22D]',
        className
      )}
      aria-pressed={checked}
    >
      <span
        className={cn(
          'relative h-8 w-14 rounded-full transition',
          checked ? 'bg-[#00B22D]' : 'bg-[#D9D9D9]'
        )}
      >
        <span
          className={cn(
            'absolute top-1 h-6 w-6 rounded-full bg-white shadow transition',
            checked ? 'right-1' : 'left-1'
          )}
        />
      </span>
      <span className="font-inter text-base text-[#333333]">{label}</span>
    </button>
  )
}
