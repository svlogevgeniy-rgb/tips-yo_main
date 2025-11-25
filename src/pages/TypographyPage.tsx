const downloadUrl = 'https://www.fontshare.com/fonts/manrope'

const typefaceCards = [
  { id: 'bold', label: 'Bold', sample: 'Aa', className: 'font-bold' },
  { id: 'semibold', label: 'Semibold', sample: 'Aa', className: 'font-semibold' },
  { id: 'medium', label: 'Medium', sample: 'Aa', className: 'font-medium' },
  { id: 'regular', label: 'Regular', sample: 'Aa', className: 'font-normal' },
] as const

const headingSpecs = [
  { name: 'Heading 1', size: 48, lineHeight: '1.2', tracking: '-0.01em' },
  { name: 'Heading 2', size: 40, lineHeight: '1.2', tracking: '-0.01em' },
  { name: 'Heading 3', size: 32, lineHeight: '1.4', tracking: '-0.01em' },
  { name: 'Heading 4', size: 24, lineHeight: '1.5', tracking: '0' },
  { name: 'Heading 5', size: 20, lineHeight: '1.4', tracking: '0' },
  { name: 'Heading 6', size: 18, lineHeight: '1.4', tracking: '0.0125em' },
]

const bodyWeights = [
  { id: 'bold', label: 'Bold', className: 'font-bold' },
  { id: 'semibold', label: 'SemiBold', className: 'font-semibold' },
  { id: 'medium', label: 'Medium', className: 'font-medium' },
  { id: 'regular', label: 'Regular', className: 'font-normal' },
] as const

const bodySizes = [
  { id: 'xlarge', label: 'Body XLarge', fontSize: 18, lineHeight: 1.5, letterSpacing: '0.2px' },
  { id: 'large', label: 'Body Large', fontSize: 16, lineHeight: 1.65, letterSpacing: '0.4px' },
  { id: 'medium', label: 'Body Medium', fontSize: 14, lineHeight: 1.7, letterSpacing: '0.3px' },
  { id: 'small', label: 'Body Small', fontSize: 12, lineHeight: 1.7, letterSpacing: '0.2px' },
  { id: 'xsmall', label: 'Body XSmall', fontSize: 10, lineHeight: 1.6, letterSpacing: '0.2px' },
] as const

const sampleSentence = 'The quick brown fox jumps over the lazy dog'

const SectionDivider = () => <div className="h-px w-full bg-[#E4E7EC]" />

export const TypographyPage = () => {
  return (
    <div className="min-h-screen bg-white text-[#121A26] font-manrope">
      <header className="bg-white border-b border-[#E4E7EC]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-10">
          <p className="font-manrope text-sm uppercase tracking-[4px] text-[#6C7386]">Style Guide</p>
          <h1 className="font-manrope text-4xl leading-[1.1] text-[#272835] md:text-6xl">
            Typography
          </h1>
          <p className="max-w-2xl text-xl leading-[1.3] text-[#6C7386]">
            The style guide provides a unified system for adapting type styles across the Tips&apos;yo service.
          </p>
        </div>
      </header>

      <main className="mx-auto flex max-w-[1440px] flex-col gap-12 px-4 py-12 md:px-10 lg:py-16">
        <section className="rounded-[24px] bg-[#F9FBFC] p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[420px_auto]">
            <div className="space-y-5">
              <span className="inline-flex rounded-full bg-white px-4 py-1 text-sm font-medium text-[#33CC99]">
                Title Font
              </span>
              <h2 className="text-4xl font-bold md:text-5xl">Manrope</h2>
              <p className="text-lg text-[#667085]">
                We use Manrope as the main interface font. It is friendly, legible and flexible enough to cover the
                entire Tips&apos;yo experience.
              </p>
              <a
                href={downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-base font-semibold text-[#667085] underline decoration-[#667085]"
              >
                Download font — fontshare.com
              </a>
            </div>
            <div className="rounded-[24px] bg-white p-8 shadow-[0px_24px_40px_rgba(17,24,39,0.08)]">
              <p className="text-lg font-semibold text-[#667085]">Glyphs</p>
              <p className="mt-4 text-4xl font-bold tracking-[0.06em] text-[#121A26] md:text-5xl">Aa Bb Cc</p>
              <p className="mt-6 text-sm text-[#667085]">Manrope / Bold / 48px</p>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] bg-[#F9FBFC] p-6 md:p-8">
          <h3 className="text-2xl font-bold">Typeface</h3>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {typefaceCards.map((card) => (
              <article
                key={card.id}
                className="rounded-[16px] bg-white p-6 shadow-[0px_12px_24px_rgba(242,242,242,1)]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-[92px] w-[92px] items-center justify-center rounded-[12px] bg-white shadow-[0_12px_24px_rgba(242,242,242,1)]">
                    <span className={`${card.className} text-[48px] leading-none text-[#121A26]`}>{card.sample}</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold">Manrope</p>
                    <p className="text-base text-[#898D93]">{card.label}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <SectionDivider />

        <section className="space-y-8">
          <div>
            <p className="text-3xl font-bold">Heading</p>
            <p className="font-manrope text-sm text-[#667085]">Manrope / Bold</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {headingSpecs.map((heading) => (
              <article key={heading.name} className="rounded-2xl border border-[#E4E7EC] p-6">
                <p
                  className="font-bold text-[#121A26]"
                  style={{ fontSize: heading.size, lineHeight: heading.lineHeight, letterSpacing: heading.tracking }}
                >
                  {heading.name}
                </p>
                <p className="mt-3 font-manrope text-sm text-[#667085]">
                  {heading.name} / Bold / {heading.size}px
                </p>
              </article>
            ))}
          </div>
        </section>

        <SectionDivider />

        <section className="space-y-8">
          <div>
            <p className="text-3xl font-bold">Body</p>
            <p className="font-manrope text-sm text-[#667085]">Manrope / Bold, SemiBold, Medium, Regular</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {bodyWeights.map((weight) => (
              <div key={weight.id} className="space-y-6 rounded-[20px] bg-[#F9FBFC] p-6">
                {bodySizes.map((size) => (
                  <article key={`${weight.id}-${size.id}`} className="space-y-2 rounded-2xl bg-white p-5 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.2px] text-[#121A26]">{size.label}</p>
                    <p
                      className={`${weight.className} text-[#667085]`}
                      style={{ fontSize: size.fontSize, lineHeight: size.lineHeight, letterSpacing: size.letterSpacing }}
                    >
                      {sampleSentence}
                    </p>
                    <p className="text-xs text-[#667085]">
                      {size.label} / {weight.label} / {size.fontSize}px
                    </p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-16 bg-white">
        <SectionDivider />
        <div className="mx-auto max-w-[1440px] px-6 py-12">
          <p className="font-manrope text-3xl text-[#121A26] md:text-[32px]">Marz — Styleguide System</p>
          <p className="mt-3 text-xl text-[#667085]">© 2025 Giga Tetuko</p>
        </div>
      </footer>
    </div>
  )
}

export default TypographyPage
