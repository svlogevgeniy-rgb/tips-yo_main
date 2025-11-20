import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Infinity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
    { name: 'Официанты', image: '/images/waitress.png' },
    { name: 'Мастера маникюра', image: '/images/manicure.png' },
    { name: 'Блогеры', image: '/images/blogger.png' },
    { name: 'Заправщики', image: '/images/gas-station.png' },
    { name: 'Курьеры', image: '/images/courier.png' },
    { name: 'Кто угодно', image: '/images/anyone.png' },
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
              <Button variant="outline" onClick={handleThankClick}>
                Поблагодарить
              </Button>
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
              <Button variant="outline" className="w-full" onClick={handleThankClick}>
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
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={handleThankClick}
            >
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
      <section id="for-whom" className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Подойдёт всем, кого принято благодарить
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {professions.map((profession) => (
              <Card key={profession.name} className="overflow-hidden">
                <div className="h-48 md:h-56 bg-gray-100 relative">
                  <img 
                    src={profession.image} 
                    alt={profession.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.className = 'h-48 md:h-56 bg-gradient-to-br from-emerald-400 to-teal-500';
                      }
                    }}
                  />
                </div>
                <CardContent className="p-4">
                  <p className="text-center font-medium text-sm">{profession.name}</p>
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
            <Button size="lg" variant="outline" onClick={handleThankClick}>
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
