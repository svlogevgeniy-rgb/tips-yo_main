import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoadingOverlay } from '@/components/LoadingOverlay'
import { ErrorMessage } from '@/components/ErrorMessage'
import { logger } from '@/lib/logger'
import { handleError, getErrorMessage, PaymentError } from '@/lib/errorHandler'

export const ThreeDSPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { amount = 10000, employeeName, cardNumber } = location.state || {}

  const [password, setPassword] = useState('')
  const [timeLeft, setTimeLeft] = useState(3 * 60 + 27) // 03:27
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    logger.info('3DS authentication page loaded', { amount })
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          logger.warn('3DS timer expired')
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [amount])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const maskCardNumber = (num: string) => {
    if (!num || num.length < 4) return '****-****-****-****'
    return `${num.slice(0, 4)}****-${num.slice(-4)}`
  }

  const handleOK = async () => {
    try {
      setIsProcessing(true)
      setError(null)

      if (!password) {
        throw new PaymentError('Please enter the 3DS code', false)
      }

      if (timeLeft <= 0) {
        throw new PaymentError('Authentication time expired. Please try again.', false)
      }

      logger.info('Verifying 3DS authentication', { passwordLength: password.length })

      // Simulate 3DS verification
      await new Promise(resolve => setTimeout(resolve, 1500))

      if (password === '112233') {
        logger.info('3DS authentication successful')
        navigate('/thank-you', {
          state: { employeeName }
        })
      } else {
        throw new PaymentError('Incorrect authentication code. Please try 112233', true)
      }
    } catch (err) {
      const appError = handleError(err, 'ThreeDSPage.handleOK')
      setError(getErrorMessage(appError))
      setIsProcessing(false)
    }
  }

  const handleCancel = () => {
    logger.info('3DS authentication cancelled')
    navigate('/payment')
  }

  const handleResend = () => {
    logger.info('3DS code resend requested')
    setError(null)
    alert('Code resent!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full">
        {/* Bank Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            🏦
          </div>
          <span className="font-medium text-gray-900">Issuing Bank</span>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700">
            Please input <span className="font-bold">"112233"</span> to simulate a successful 3DS 2.0 transaction. 
            In the real world, your customers will receive a one-time token via their mobile phone from their issuing bank.
          </p>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 text-cyan-500 mb-6">
          <span>⏱️</span>
          <span className="text-sm">Transaction time left – {formatTime(timeLeft)}</span>
        </div>

        {/* Transaction Details */}
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Merchant Name:</span>
            <span className="font-medium text-gray-900">Tip$Yo</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium text-gray-900">{amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction Time:</span>
            <span className="font-medium text-gray-900">
              {new Date().toLocaleString('en-GB', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Card Number:</span>
            <span className="font-medium text-gray-900">{maskCardNumber(cardNumber)}</span>
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Password:</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter 3DS code"
            disabled={isProcessing || timeLeft <= 0}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary disabled:opacity-50"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleOK}
            disabled={isProcessing || timeLeft <= 0}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Verifying...' : 'OK'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isProcessing}
            className="flex-1 bg-cyan-500 text-white py-3 rounded-xl font-medium hover:bg-cyan-600 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleResend}
            disabled={isProcessing}
            className="flex-1 bg-gray-400 text-white py-3 rounded-xl font-medium hover:bg-gray-500 transition disabled:opacity-50"
          >
            Resend
          </button>
        </div>
      </div>

      {isProcessing && <LoadingOverlay message="Verifying authentication..." />}
    </div>
  )
}
