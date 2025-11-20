import { Employee } from '@/data/employees'
import { Card } from '@/components/ui/card'

interface EmployeeCardProps {
  employee: Employee
  onClick: () => void
}

export const EmployeeCard = ({ employee, onClick }: EmployeeCardProps) => {
  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-6">
        {/* Avatar */}
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
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

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
            {employee.name}
          </h3>
          <p className="text-sm md:text-base text-gray-600">{employee.role}</p>
        </div>

        {/* Arrow icon for desktop */}
        <div className="hidden md:block text-gray-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Card>
  )
}
