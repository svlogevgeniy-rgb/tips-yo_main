import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { employees } from '@/data/employees'
import { PageLoader } from '@/components/PageLoader'
import { ErrorMessage } from '@/components/ErrorMessage'
import { logger } from '@/lib/logger'
import { handleError, getErrorMessage } from '@/lib/errorHandler'

export const EmployeeSelectionNew = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        logger.info('Loading employee selection page')
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        if (employees.length === 0) {
          throw new Error('No employees available')
        }
        
        setIsLoading(false)
        logger.info('Employee selection page loaded successfully', { count: employees.length })
      } catch (err) {
        const appError = handleError(err, 'EmployeeSelectionNew')
        setError(getErrorMessage(appError))
        setIsLoading(false)
      }
    }

    loadEmployees()
  }, [])

  const handleRetry = () => {
    setError(null)
    setIsLoading(true)
    window.location.reload()
  }

  if (isLoading) {
    return <PageLoader message="Loading employees..." />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage message={error} onRetry={handleRetry} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="/images/Logo.svg" 
              alt="tips'yo" 
              className="h-6 w-auto"
            />
            <span className="text-xl font-semibold text-primary">tips'yo</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Cafe Info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
              <span className="text-2xl">🍩</span>
            </div>
            <div>
              <h1 className="text-2xl font-medium text-gray-900">
                Cafe «Krispy-Kreme» Bali
              </h1>
            </div>
          </div>

          {/* Question */}
          <h2 className="text-xl font-medium text-gray-900 mb-6">
            Who would you like to thank?
          </h2>

          {/* Employee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {employees.map((employee) => (
              <button
                key={employee.id}
                onClick={() => navigate(`/employee/${employee.id}`)}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-2xl hover:border-primary hover:shadow-md transition text-left"
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={employee.avatar}
                    alt={employee.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://placehold.co/64x64/E8EFED/1E5F4B?text=' + employee.name[0];
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {employee.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {employee.role}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6">
        <p className="text-center text-sm text-gray-500">
          Tips'yo – a service for receiving gratitude
        </p>
      </footer>
    </div>
  )
}
