import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { employees } from '@/data/employees'

export const PaymentPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')

  const employee = employees.find((emp) => emp.id === id)

  // Предустановленные суммы
  const presetAmounts = [100, 200, 500, 1000, 2000, 5000]

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Сотрудник не найден
          </h2>
          <p className="text-gray-600 mb-6">
            Запрошенный сотрудник не существует или был удалён
          </p>
          <Button onClick={() => navigate('/employees')}>
            Вернуться к выбору
          </Button>
        </Card>
      </div>
    )
  }

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/employees')}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              Оплата чаевых
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Employee Info */}
        <Card className="p-4 md:p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="40"%3E?%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Чаевые для</p>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                {employee.name}
              </h2>
              <p className="text-sm text-gray-600">{employee.role}</p>
            </div>
          </div>
        </Card>

        {/* Amount Selection */}
        <Card className="p-6 md:p-8 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Выберите сумму
          </h3>

          {/* Preset Amounts */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {presetAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountSelect(amount)}
                className={`
                  p-4 rounded-xl border-2 transition-all
                  ${
                    selectedAmount === amount
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 hover:border-gray-300 text-gray-900'
                  }
                  font-semibold text-lg
                `}
              >
                {amount} ₽
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Или введите свою сумму
            </label>
            <div className="relative">
              <input
                type="number"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
                placeholder="Введите сумму"
                className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none text-lg"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                ₽
              </span>
            </div>
          </div>

          {/* Amount Summary */}
          {finalAmount && finalAmount > 0 && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Сумма чаевых:</span>
                <span className="text-lg font-bold text-gray-900">
                  {finalAmount} ₽
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Комиссия (0%):</span>
                <span className="font-medium text-gray-900">0 ₽</span>
              </div>
              <div className="mt-2 pt-2 border-t border-green-200 flex justify-between items-center">
                <span className="font-semibold text-gray-900">К оплате:</span>
                <span className="text-xl font-bold text-primary">
                  {finalAmount} ₽
                </span>
              </div>
            </div>
          )}
        </Card>

        {/* Payment Methods */}
        <Card className="p-6 md:p-8 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Способ оплаты
          </h3>

          <div className="space-y-3">
            {/* Card Payment */}
            <button className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-primary transition-all flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">Банковская карта</div>
                <div className="text-sm text-gray-600">Visa, Mastercard, МИР</div>
              </div>
            </button>

            {/* SBP Payment */}
            <button className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-primary transition-all flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">СБП</div>
                <div className="text-sm text-gray-600">Система быстрых платежей</div>
              </div>
            </button>
          </div>
        </Card>

        {/* Pay Button */}
        <Button
          size="lg"
          className="w-full"
          disabled={!finalAmount || finalAmount <= 0}
        >
          Оплатить {finalAmount && finalAmount > 0 ? `${finalAmount} ₽` : ''}
        </Button>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Безопасная оплата через tipsyo</p>
          <p className="mt-1">Комиссия 0% для клиента • Мгновенный перевод</p>
        </div>
      </main>
    </div>
  )
}
