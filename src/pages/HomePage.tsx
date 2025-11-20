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
                src="/images/Logo.svg" 
                alt="Tips'yo Logo" 
                className="h-9 md:h-10 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/Logo.png';
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
      <section id="how-it-works" className="bg-primary text-white pt-24 pb-24 md:pt-32 md:pb-32 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Благодарность, подарки<br className="hidden sm:block" />
              {' '}и <span className="italic">чаевые</span> безналично
            </h2>
            
            <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
              Простой и безопасный способ поблагодарить без наличных.<br className="hidden md:block" />
              Сканируйте QR-код, выбирайте сотрудника и оставляйте чаевые.
            </p>

            {/* How it works - Simple steps */}
            <div className="grid md:grid-cols-3 gap-6 mb-10 text-left md:text-center">
              <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Сканируйте QR</h3>
                  <p className="text-sm text-white/80">Наведите камеру на код</p>
                </div>
              </div>
              
              <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Выберите сумму</h3>
                  <p className="text-sm text-white/80">Укажите размер чаевых</p>
                </div>
              </div>
              
              <div className="flex md:flex-col items-start md:items-center gap-4 md:gap-3">
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Оплатите</h3>
                  <p className="text-sm text-white/80">Мгновенный перевод</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                Подключить заведение
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold"
                onClick={handleThankClick}
              >
                Оставить чаевые
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Безопасные платежи</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <span>0% комиссия для клиента</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Мгновенный перевод</span>
              </div>
            </div>
          </div>
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
            onClick={() => scrollToSection('service-capabilities')}
          >
            Что умеет сервис?
          </Button>
          <Button
            variant="ghost"
            onClick={() => scrollToSection('pricing')}
          >
            Как начать?
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

      {/* Service Capabilities Section */}
      <section id="service-capabilities" className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Что умеет сервис
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Работает на всех устройствах и не требует регистрации
          </p>
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
