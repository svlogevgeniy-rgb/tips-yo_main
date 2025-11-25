import { ReactNode } from 'react'

import { LanguageSelect } from './LanguageSelect'

interface PageHeaderProps {
  children?: ReactNode
}

export const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <header className="border-b border-[#E8EFED] bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-6 lg:px-8">
        <div>
          <p className="font-jost text-4xl text-[#00B22D]">tips’yo</p>
          <p className="font-jost text-lg text-[#00B22D]">
            Благодарность, подарки или чаевые безналично
          </p>
        </div>
        <div className="flex items-center gap-4">
          {children}
          <LanguageSelect />
        </div>
      </div>
    </header>
  )
}
