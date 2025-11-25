export const PageFooter = () => {
  return (
    <footer className="border-t border-[#E8EFED] bg-[#F2F2F2]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-4 py-6 text-[14px] text-[#999999] lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2021 ООО «Компания»</p>
        <div className="flex flex-wrap items-center gap-4">
          <a className="hover:text-[#00B22D]" href="#">
            Пользовательское соглашение
          </a>
          <a className="hover:text-[#00B22D]" href="#">
            Согласие на обработку данных
          </a>
          <a className="hover:text-[#00B22D]" href="#">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  )
}
