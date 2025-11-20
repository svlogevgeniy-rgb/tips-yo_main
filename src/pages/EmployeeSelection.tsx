import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmployeeCard } from '@/components/employees/EmployeeCard'
import { employees } from '@/data/employees'

export const EmployeeSelection = () => {
  const navigate = useNavigate()

  const handleEmployeeClick = (employeeId: string) => {
    navigate(`/employee/${employeeId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Выберите сотрудника
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Description */}
        <div className="mb-8 text-center md:text-left">
          <p className="text-base md:text-lg text-gray-600">
            Выберите сотрудника, которого хотите поблагодарить
          </p>
        </div>

        {/* Employee List */}
        <div className="space-y-4">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onClick={() => handleEmployeeClick(employee.id)}
            />
          ))}
        </div>

        {/* Empty State (if no employees) */}
        {employees.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Сотрудники не найдены
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
