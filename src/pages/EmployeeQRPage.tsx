import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { employees } from '@/data/employees'

export const EmployeeQRPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const employee = employees.find((emp) => emp.id === id)

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/employees')}
                className="mr-4"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg md:text-xl font-bold text-gray-900">
                Поблагодарить
              </h1>
            </div>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Employee Info Card */}
        <Card className="p-6 md:p-8 mb-6">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 bg-gray-100">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and Role */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {employee.name}
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              {employee.role}
            </p>

            {/* QR Code */}
            <div className="w-full max-w-xs aspect-square bg-white border-4 border-gray-200 rounded-2xl p-4 mb-6">
              {/* QR Code Placeholder */}
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="grid grid-cols-8 gap-1 p-4">
                  {[...Array(64)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 ${
                        Math.random() > 0.5 ? 'bg-gray-800' : 'bg-white'
                      } rounded-sm`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* QR Code ID */}
            <p className="text-sm text-gray-500 mb-2">ID: {employee.id}</p>
            <p className="text-xs text-gray-400 mb-6">
              Отсканируйте QR-код для оплаты чаевых
            </p>

            {/* Action Buttons */}
            <div className="w-full space-y-3">
              <Button size="lg" className="w-full">
                Оплатить чаевые
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                onClick={() => navigate('/employees')}
              >
                Выбрать другого сотрудника
              </Button>
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="text-center text-sm text-gray-500">
          <p>Безопасная оплата через tipsyo</p>
          <p className="mt-1">Комиссия 5% • Мгновенный перевод</p>
        </div>
      </main>
    </div>
  )
}
