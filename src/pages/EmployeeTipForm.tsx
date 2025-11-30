import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { employees } from '@/data/employees'
import { PageLoader } from '@/components/PageLoader'
import { ErrorMessage } from '@/components/ErrorMessage'
import { LoadingOverlay } from '@/components/LoadingOverlay'
import { logger } from '@/lib/logger'
import { handleError, getErrorMessage, ValidationError } from '@/lib/errorHandler'

const TIP_AMOUNTS = [50, 100, 150]
const RATINGS = ['🙂', '🙂', '🙂', '😍']

export const EmployeeTipForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const employee = employees.find(e => e.id === id)

  const [amount, setAmount] = useState<number>(100)
  const [customAmount, setCustomAmount] = useState('')
  const [rating, setRating] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        logger.info('Loading employee tip form', { employeeId: id })
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 300))
        
        if (!employee) {
          throw new Error('Employee not found')
        }
        
        setIsLoading(false)
        logger.info('Employee tip form loaded', { employeeName: employee.name })
      } catch (err) {
        const appError = handleError(err, 'EmployeeTipForm')
        setError(getErrorMessage(appError))
        setIsLoading(false)
      }
    }

    loadEmployee()
  }, [id, employee])

  if (isLoading) {
    return <PageLoader message="Loading..." />
  }

  if (error || !employee) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <ErrorMessage 
            message={error || 'Employee not found'} 
            onRetry={() => navigate('/employees')} 
          />
        </div>
      </div>
    )
  }

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      setError(null)
      
      const finalAmount = customAmount ? parseFloat(customAmount) : amount
      
      // Validation
      if (finalAmount <= 0) {
        throw new ValidationError('Please enter a valid tip amount', 'amount')
      }
      
      if (isNaN(finalAmount)) {
        throw new ValidationError('Please enter a valid number', 'amount')
      }
      
      logger.info('Submitting tip form', { 
        employeeId: employee.id, 
        amount: finalAmount,
        hasRating: rating !== null,
        hasMessage: message.length > 0
      })
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      navigate('/payment', {
        state: {
          employeeId: employee.id,
          employeeName: employee.name,
          amount: finalAmount,
          rating,
          message
        }
      })
    } catch (err) {
      const appError = handleError(err, 'EmployeeTipForm.handleSubmit')
      setError(getErrorMessage(appError))
      setIsSubmitting(false)
    }
  }

  const currentAmount = customAmount ? parseFloat(customAmount) || 0 : amount

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/employees')}
            className="p-2 hover:bg-gray-100 rounded-full transition text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/images/Logo.svg" alt="tips'yo" className="h-6" />
            <span className="text-xl font-semibold text-primary">tips'yo</span>
          </div>
          <div className="w-9" />
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Employee Info */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-medium text-gray-900">{employee.name}</h1>
              <p className="text-gray-500">{employee.role}</p>
            </div>
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100">
              <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Tip Amount */}
          <div>
            <h3 className="text-lg font-medium mb-4">Tip Amount</h3>
            <div className="flex gap-3 mb-3">
              <input
                type="number"
                placeholder="Amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-3">
              {TIP_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setAmount(amt); setCustomAmount('') }}
                  className={`flex-1 py-3 rounded-xl font-medium transition ${
                    amount === amt && !customAmount
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rp {amt}
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-medium mb-4">Your Experience</h3>
            <div className="flex gap-3">
              {RATINGS.map((emoji, idx) => (
                <button
                  key={idx}
                  onClick={() => setRating(idx)}
                  className={`flex-1 py-4 rounded-xl text-2xl transition ${
                    rating === idx ? 'bg-primary' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {emoji}
                </button>
              ))}
              <button
                onClick={() => setRating(null)}
                className="px-6 py-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Message */}
          <div>
            <h3 className="text-lg font-medium mb-4">Message</h3>
            <div className="relative">
              <textarea
                placeholder="Add a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 99))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary resize-none h-32"
              />
              <span className="absolute bottom-3 right-3 text-sm text-gray-400">
                {message.length}/99
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div className="border-t border-gray-100 p-4">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="mb-4">
              <ErrorMessage message={error} onDismiss={() => setError(null)} />
            </div>
          )}
          <p className="text-center text-sm text-gray-500 mb-4">
            Tips'yo – a service for receiving gratitude
          </p>
          <button
            onClick={handleSubmit}
            disabled={currentAmount <= 0 || isSubmitting}
            className="w-full bg-primary text-white py-4 rounded-xl font-medium text-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : `Send ${currentAmount.toLocaleString()}`}
          </button>
        </div>
      </div>

      {isSubmitting && <LoadingOverlay message="Processing your tip..." />}
    </div>
  )
}
