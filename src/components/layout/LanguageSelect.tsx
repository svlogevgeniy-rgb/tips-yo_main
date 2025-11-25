import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

interface LanguageSelectProps {
  className?: string
}

export const LanguageSelect = ({ className }: LanguageSelectProps) => {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center gap-3 rounded-2xl border border-[#E8EFED] bg-white px-5 py-2 font-jost text-xl text-[#333333] shadow-sm transition hover:border-[#00B22D] hover:text-[#00B22D]',
        className
      )}
      aria-label="Выбрать язык интерфейса"
    >
      <span className="text-2xl leading-none">🇷🇺</span>
      <span>Русский</span>
      <ChevronDown className="h-5 w-5 text-[#999999]" />
    </button>
  )
}
