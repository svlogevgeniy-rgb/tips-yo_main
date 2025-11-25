import { useState } from 'react'
import { Menu, Infinity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetClose } from '@/components/ui/sheet'

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  const gratitudeCards = [
    {
      name: 'Официанты',
      image: 'http://localhost:3845/assets/b7057fba7ea83ca99bda9688c9bc6f47277ebe33.png',
      offsetClass: 'lg:mt-[0px]',
    },
    {
      name: 'Мастер маникюра',
      image: 'http://localhost:3845/assets/31b67cf239ba36b3525350523648c20c13ec12c9.png',
      offsetClass: 'lg:mt-[18px]',
    },
    {
      name: 'Блогеры',
      image: 'http://localhost:3845/assets/2eaefe59fc29f944b9ea96a2674860b41778c856.png',
      offsetClass: 'lg:mt-[36px]',
    },
    {
      name: 'Заправщики',
      image: 'http://localhost:3845/assets/e407bba322b98a54eb6eb56f750dba20061220c7.png',
      offsetClass: 'lg:mt-[54px]',
    },
    {
      name: 'Курьеры',
      image: 'http://localhost:3845/assets/2f28e42725e6abc22a92afe8d89dd5cb3e34ef27.png',
      offsetClass: 'lg:mt-[72px]',
    },
    {
      name: 'Просто так...',
      image: 'http://localhost:3845/assets/49ced31440623d87977410bbe9230501afb4842e.png',
      offsetClass: 'lg:mt-[90px]',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">tipsyo</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('for-whom')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Для кого
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Как работает
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Сколько стоит
              </button>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline">Поблагодарить</Button>
              <Button>Начать пользоваться</Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent>
          <SheetClose onClick={() => setMobileMenuOpen(false)} />
          <SheetHeader>
            <div className="text-2xl font-bold text-primary mb-8">tipsyo</div>
          </SheetHeader>
          <nav className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection('for-whom')}
              className="text-left text-lg text-gray-700 hover:text-primary transition-colors py-2"
            >
              Для кого
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left text-lg text-gray-700 hover:text-primary transition-colors py-2"
            >
              Как работает
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left text-lg text-gray-700 hover:text-primary transition-colors py-2"
            >
              Сколько стоит
            </button>
            <div className="pt-4 space-y-3">
              <Button variant="outline" className="w-full">
                Поблагодарить
              </Button>
              <Button className="w-full">Начать пользоваться</Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Hero Section */}
      <section className="bg-primary text-white pt-32 pb-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Благодарность, подарки<br />и <span className="italic">чаевые</span> безналично
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Быстрый и безопасный способ поблагодарить без наличных
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Начать пользоваться
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Поблагодарить
            </Button>
          </div>
          <p className="text-sm text-white/70">
            Безопасные платежи • Без комиссии для клиентов • Мгновенный перевод
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-50 py-4 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          <Button
            variant="ghost"
            onClick={() => scrollToSection('for-whom')}
          >
            Кому подойдёт?
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('how-it-works')}
          >
            Как работает?
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('pricing')}
          >
            Сколько стоит?
          </Button>
        </div>
      </section>

      {/* For Whom Section */}
      <section id="for-whom" className="py-16 md:py-24 px-4 bg-[#F8FBFD]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-[#1E5F4B] md:leading-tight">
            Подойдёт всем, <br className="hidden md:block" /> кого принято благодарить
          </h2>

          {/* Desktop staggered layout */}
          <div className="hidden lg:flex justify-center gap-6 mt-16">
            {gratitudeCards.map((card) => (
              <article
                key={card.name}
                className={`flex-shrink-0 w-[190px] ${card.offsetClass}`}
              >
                <div className="rounded-[50px] bg-white shadow-[0px_8px_16px_rgba(0,0,0,0.06)] p-4 pb-8 flex flex-col items-center">
                  <div className="w-full h-[260px] rounded-[40px] overflow-hidden mb-6">
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[#1E5F4B] text-center text-lg font-medium leading-tight">
                    {card.name}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile / tablet grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10 lg:hidden">
            {gratitudeCards.map((card) => (
              <Card key={card.name} className="rounded-[36px] shadow-[0px_8px_16px_rgba(0,0,0,0.06)] border-0">
                <div className="h-40 sm:h-48 rounded-[30px] overflow-hidden m-3 mb-2">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pb-6">
                  <p className="text-[#1E5F4B] text-center text-sm font-medium leading-tight">
                    {card.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Работает на всех устройствах, без регистрации
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* QR Code Card */}
            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-40 h-40 mb-6 border-4 border-gray-300 rounded-2xl flex items-center justify-center bg-white">
                  <div className="grid grid-cols-3 gap-1">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-gray-800 rounded-sm" />
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">QR-код</h3>
                <p className="text-gray-600">
                  Клиент сканирует QR-код и переходит на страницу оплаты чаевых
                </p>
              </div>
            </Card>

            {/* Simple Code Card */}
            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-primary">345 678</div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Простой код</h3>
                <p className="text-gray-600">
                  Клиент заходит на сайт, вводит короткий код и оставляет чаевые
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Первый месяц — бесплатно,
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            дальше — 5 процентов
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Unlimited Card */}
            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <Infinity className="w-20 h-20 text-accent mb-6" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold mb-4">Неограниченно</h3>
                <p className="text-gray-600">
                  Добавляйте несколько QR-кодов и используйте их по ситуации
                </p>
              </div>
            </Card>

            {/* Commission Card */}
            <Card className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="text-7xl font-bold text-accent mb-6">5%</div>
                <h3 className="text-2xl font-bold mb-4">Только 5%</h3>
                <p className="text-gray-600">
                  Комиссия удерживается автоматически, налоги платите сами
                </p>
              </div>
            </Card>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Начать пользоваться</Button>
            <Button size="lg" variant="outline">
              Поблагодарить
            </Button>
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

export default LandingPage
