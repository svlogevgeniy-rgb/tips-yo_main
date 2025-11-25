import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetClose } from '@/components/ui/sheet'

export const HomePage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  const handleThankClick = () => {
    navigate('/employees')
  }

  const professions = [
    { 
      name: 'Официанты', 
      image: 'http://localhost:3845/assets/b7057fba7ea83ca99bda9688c9bc6f47277ebe33.png',
      offsetClass: 'lg:mt-0'
    },
    { 
      name: 'Мастер маникюра', 
      image: 'http://localhost:3845/assets/31b67cf239ba36b3525350523648c20c13ec12c9.png',
      offsetClass: 'lg:mt-[19px]'
    },
    { 
      name: 'Блогеры', 
      image: 'http://localhost:3845/assets/2eaefe59fc29f944b9ea96a2674860b41778c856.png',
      offsetClass: 'lg:mt-[38px]'
    },
    { 
      name: 'Заправщики', 
      image: 'http://localhost:3845/assets/e407bba322b98a54eb6eb56f750dba20061220c7.png',
      offsetClass: 'lg:mt-[57px]'
    },
    { 
      name: 'Курьеры', 
      image: 'http://localhost:3845/assets/2f28e42725e6abc22a92afe8d89dd5cb3e34ef27.png',
      offsetClass: 'lg:mt-[76px]'
    },
    { 
      name: 'Просто так...', 
      image: 'http://localhost:3845/assets/49ced31440623d87977410bbe9230501afb4842e.png',
      offsetClass: 'lg:mt-[95px]'
    },
  ]

  const navigationLinks = [
    { label: 'Для кого', target: 'for-whom' },
    { label: 'Что умеет сервис', target: 'service-capabilities' },
    { label: 'Как это работает', target: 'how-it-works' },
    { label: 'Как начать', target: 'pricing' },
  ]

  const actionLinks: { label: string; onClick: () => void; variant: 'default' | 'outline' }[] = [
    { label: 'Начать пользоваться', onClick: () => scrollToSection('pricing'), variant: 'default' },
    { label: 'Поблагодарить', onClick: handleThankClick, variant: 'outline' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-16 md:h-20">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 pr-24">
              {navigationLinks.map(({ label, target }) => (
                <button
                  key={target}
                  onClick={() => scrollToSection(target)}
                  className="text-white/90 hover:text-white transition-colors text-sm font-medium"
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Logo and Brand */}
            <div className="flex items-center gap-3 text-white md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <img 
                src="http://localhost:3845/assets/3a17e5a5c969b5fa38fbc2620a50ccf0e396b9ab.svg" 
                alt="Tips'yo Logo" 
                className="h-9 md:h-10 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/Logo.svg';
                }}
              />
              <span className="text-2xl font-semibold tracking-tight">tips'yo</span>
            </div>

            {/* Desktop CTA Links */}
            <div className="ml-auto hidden md:flex items-center gap-8 pl-24">
              {actionLinks.map(({ label, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="text-sm font-medium text-white hover:text-white/80 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="ml-auto md:hidden">
              <button
                className="p-2"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent>
          <SheetClose onClick={() => setMobileMenuOpen(false)} />
          <SheetHeader>
            <div className="text-2xl font-bold text-primary mb-8">tips'yo</div>
          </SheetHeader>
          <nav className="flex flex-col space-y-4">
            {navigationLinks.map(({ label, target }) => (
              <button
                key={target}
                onClick={() => scrollToSection(target)}
                className="text-left text-lg text-gray-700 hover:text-primary transition-colors py-2"
              >
                {label}
              </button>
            ))}
            <div className="pt-4 space-y-3">
              {actionLinks.map(({ label, onClick, variant }) => (
                <Button
                  key={label}
                  variant={variant}
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    onClick()
                  }}
                >
                  {label}
                </Button>
              ))}
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Hero Section */}
      <section className="bg-primary text-white pt-24 pb-16 md:pt-32 md:pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="mx-auto flex w-full max-w-[1144px] flex-col items-center text-center">
            <h1 className="font-jost text-[42px] font-medium leading-[110%] text-white sm:text-[56px] md:text-[72px] lg:text-[90px] mb-5">
              Благодарность, подарки<br />
              и <span className="italic font-serif">чаевые</span> безналично
            </h1>

            <p className="font-jost text-[20px] md:text-[32px] leading-[1.4] mb-8 md:mb-[60px] text-white max-w-[654px]">
              Быстрый и безопасный способ поблагодарить без наличных
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button 
                onClick={() => scrollToSection('pricing')}
                className="bg-white text-primary hover:bg-white/90 font-medium text-[18px] px-8 py-4 rounded-[12px] h-[60px] w-full sm:w-[260px] transition-colors"
              >
                Начать пользоваться
              </button>
              <button 
                onClick={handleThankClick}
                className="bg-black text-white hover:bg-black/90 font-medium text-[18px] px-8 py-4 rounded-[12px] h-[60px] w-full sm:w-[260px] transition-colors"
              >
                Поблагодарить
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="flex justify-center items-center gap-8 md:gap-20 text-[18px] font-medium">
            <button
              onClick={() => scrollToSection('for-whom')}
              className="text-white hover:text-white/80 transition-colors"
            >
              Кому подойдёт?
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-white hover:text-white/80 transition-colors"
            >
              Как работает?
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-secondary hover:text-secondary/80 transition-colors relative"
            >
              Сколько стоит?
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-secondary rounded-full" />
            </button>
          </div>
        </div>
      </section>



      {/* For Whom Section */}
      <section id="for-whom" className="py-16 md:py-24 px-4 bg-[#F8FBFD]">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-jost text-[40px] md:text-[60px] leading-[1.2] font-normal text-center text-black mb-12 md:mb-16">
            Подойдёт всем, <br className="hidden md:block" />кого принято благодарить
          </h2>

          {/* Desktop staggered layout */}
          <div className="hidden lg:flex justify-center gap-5 px-4">
            {professions.map((profession) => (
              <div
                key={profession.name}
                className={`flex-shrink-0 w-[192px] ${profession.offsetClass}`}
              >
                <div className="rounded-[50px] bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.06)] p-4 pb-8 flex flex-col items-center">
                  <div className="w-[160px] h-[260px] rounded-[40px] overflow-hidden mb-6">
                    <img
                      src={profession.image}
                      alt={profession.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.className = 'w-[160px] h-[260px] rounded-[40px] overflow-hidden mb-6 bg-gradient-to-br from-emerald-400 to-teal-500';
                        }
                      }}
                    />
                  </div>
                  <p className="text-primary text-center text-[18px] font-medium leading-tight">
                    {profession.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile / tablet grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:hidden">
            {professions.map((profession) => (
              <div key={profession.name} className="rounded-[36px] bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.06)] p-3 pb-6">
                <div className="h-40 sm:h-48 rounded-[30px] overflow-hidden mb-3">
                  <img
                    src={profession.image}
                    alt={profession.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.className = 'h-40 sm:h-48 rounded-[30px] overflow-hidden mb-3 bg-gradient-to-br from-emerald-400 to-teal-500';
                      }
                    }}
                  />
                </div>
                <p className="text-primary text-center text-sm font-medium leading-tight">
                  {profession.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-[1074px] mx-auto">
          <h2 className="font-jost text-[40px] md:text-[60px] leading-[1.2] font-normal text-center text-black mb-10 md:mb-[60px]">
            Работает на всех устройствах, без регистрации
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {/* QR Code Card */}
            <div className="bg-[#EFE8E8] rounded-[50px] p-8 md:p-12 flex flex-col items-center text-center">
              <div className="bg-white w-[184px] h-[207px] rounded-[50px] mb-10 flex items-center justify-center">
                <img 
                  src="http://localhost:3845/assets/6b6515032ea6c207f781f7fd8b5724c79cbb3b1a.svg"
                  alt="QR Code"
                  className="w-[127px] h-[127px]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      const grid = document.createElement('div');
                      grid.className = 'grid grid-cols-3 gap-1';
                      for (let i = 0; i < 9; i++) {
                        const dot = document.createElement('div');
                        dot.className = 'w-3 h-3 bg-gray-800 rounded-sm';
                        grid.appendChild(dot);
                      }
                      target.parentElement.appendChild(grid);
                    }
                  }}
                />
              </div>
              <h3 className="font-jost text-[32px] leading-[1.4] font-normal mb-1 text-black">QR-код</h3>
              <p className="text-[16px] leading-[1.6] text-black max-w-[247px]">
                Клиент сканирует QR-код, переходит по ссылке и указывает сумму.
              </p>
            </div>

            {/* Simple Code Card */}
            <div className="bg-[#FAF7F2] rounded-[50px] p-8 md:p-12 flex flex-col items-center text-center">
              <div className="bg-white w-[184px] h-[207px] rounded-[50px] mb-10 flex flex-col items-center justify-center">
                <p className="font-jost text-[70px] leading-[1.1] font-medium text-[#333333]">345</p>
                <p className="font-jost text-[70px] leading-[1.1] font-medium text-[#333333]">678</p>
              </div>
              <h3 className="font-jost text-[32px] leading-[1.4] font-normal mb-1 text-black">Простой код</h3>
              <p className="text-[16px] leading-[1.6] text-black max-w-[247px]">
                Клиент заходит на tips.tips, вводит шестизначный код и указывает сумму
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 px-4 bg-[#E8EFED]">
        <div className="max-w-[1074px] mx-auto">
          <h2 className="font-jost text-[40px] md:text-[60px] leading-[1.2] font-normal text-center text-black mb-10 md:mb-[60px]">
            Первый месяц – бесплатно,<br />
            дальше – 5% процентов
          </h2>
          <div className="grid md:grid-cols-2 gap-5 mb-10 md:mb-[60px]">
            {/* Unlimited Card */}
            <div className="bg-white rounded-[50px] p-8 md:p-12 flex flex-col items-center text-center">
              <div className="bg-[rgba(232,239,237,0.5)] w-[184px] h-[207px] rounded-[50px] mb-10 flex items-center justify-center">
                <span className="font-jost text-[150px] leading-[1.1] font-medium text-infinityGreen">∞</span>
              </div>
              <h3 className="font-jost text-[32px] leading-[1.4] font-normal mb-1 text-black">Неограниченно</h3>
              <p className="text-[16px] leading-[1.6] text-black max-w-[247px]">
                Добавляйте несколько QR-кодов и используйте их по ситуации
              </p>
            </div>

            {/* Commission Card */}
            <div className="bg-white rounded-[50px] p-8 md:p-12 flex flex-col items-center text-center">
              <div className="bg-[#F8FBFD] w-[184px] h-[207px] rounded-[50px] mb-10 flex items-center justify-center relative">
                <span className="font-jost text-[150px] leading-[1.1] font-medium text-percentBlue absolute left-[50px] top-[40px]">5</span>
                <span className="font-jost text-[30px] leading-[1.1] font-medium text-percentBlue absolute right-[40px] bottom-[50px]">%</span>
              </div>
              <h3 className="font-jost text-[32px] leading-[1.4] font-normal mb-1 text-black">Только 5%</h3>
              <p className="text-[16px] leading-[1.6] text-black max-w-[247px]">
                Выплаты осуществляются по договору дарения, налог платим мы сами
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button 
              onClick={handleThankClick}
              className="bg-accent text-white hover:bg-accent/90 font-jost text-[32px] leading-[1.4] px-8 py-6 rounded-[32px] h-[100px] w-full sm:w-[372px] transition-colors"
            >
              Поблагодарить
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="bg-black text-white hover:bg-black/90 font-jost text-[32px] leading-[1.4] px-8 py-6 rounded-[32px] h-[100px] w-full sm:w-[372px] transition-colors"
            >
              Начать пользоваться
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2024 tipsyo
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button className="text-gray-600 hover:text-primary transition-colors">
                Пользовательское соглашение
              </button>
              <button className="text-gray-600 hover:text-primary transition-colors">
                Согласие на обработку данных
              </button>
              <button className="text-gray-600 hover:text-primary transition-colors">
                Политика конфиденциальности
              </button>
            </div>
            <div className="flex gap-2">
              <button className="text-sm font-medium text-primary">Русский</button>
              <span className="text-gray-400">|</span>
              <button className="text-sm text-gray-600 hover:text-primary transition-colors">EN</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
