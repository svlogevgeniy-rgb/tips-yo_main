import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LoadingOverlay } from '@/components/LoadingOverlay'
import { ErrorMessage } from '@/components/ErrorMessage'
import { logger } from '@/lib/logger'
import { handleError, getErrorMessage, ValidationError, PaymentError } from '@/lib/errorHandler'

const CARD_BRANDS = ['Mastercard', 'VISA', 'express', 'JCB']

export const PaymentCardPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { amount = 10000, employeeId, employeeName, rating, message } = location.state || {}

  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [showCvv, setShowCvv] = useState(false)
  const [timeLeft, setTimeLeft] = useState(23 * 60 + 53) // 23:53 in seconds
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    logger.info('Payment page loaded', { amount, employeeId })
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          logger.warn('Payment timer expired')
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [amount, employeeId])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const chunks = cleaned.match(/.{1,4}/g) || []
    return chunks.join(' ')
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, '')
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(value)
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4)
    }
    if (value.length <= 5) {
      setExpiryDate(value)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsProcessing(true)
      setError(null)

      // Validation
      if (cardNumber.length !== 16) {
        throw new ValidationError('Card number must be 16 digits', 'cardNumber')
      }

      if (expiryDate.length !== 5) {
        throw new ValidationError('Expiry date must be in MM/YY format', 'expiryDate')
      }

      if (cvv.length !== 3) {
        throw new ValidationError('CVV must be 3 digits', 'cvv')
      }

      // Validate expiry date
      const [month, year] = expiryDate.split('/')
      const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1)
      if (expiry < new Date()) {
        throw new ValidationError('Card has expired', 'expiryDate')
      }

      if (timeLeft <= 0) {
        throw new PaymentError('Payment time has expired. Please try again.', false)
      }

      logger.info('Processing payment', { 
        amount, 
        employeeId,
        cardLast4: cardNumber.slice(-4)
      })

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000))

      logger.info('Payment validated, redirecting to 3DS')

      navigate('/payment/3ds', {
        state: {
          amount,
          employeeId,
          employeeName,
          rating,
          message,
          cardNumber
        }
      })
    } catch (err) {
      const appError = handleError(err, 'PaymentCardPage.handleSubmit')
      setError(getErrorMessage(appError))
      setIsProcessing(false)
    }
  }

  const isFormValid = cardNumber.length === 16 && expiryDate.length === 5 && cvv.length === 3

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md w-full">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <img src="/images/Logo.svg" alt="tips'yo" className="h-6" />
          <span className="text-xl font-semibold text-primary">tips'yo</span>
        </div>

        {/* Amount */}
        <div className="text-center mb-4">
          <p className="text-4xl font-bold text-gray-900">Rp{amount.toLocaleString()}</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
            <span>Order ID #order-card-002</span>
            <button className="text-primary hover:underline">Details</button>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-gray-50 rounded-xl p-3 mb-6 text-center">
          <p className="text-sm text-gray-600">
            Pay within <span className="font-bold text-gray-900">{formatTime(timeLeft)}</span>
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Credit/debit card</h3>

          {/* Card Number */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Card number</label>
            <div className="relative">
              <input
                type="text"
                value={formatCardNumber(cardNumber)}
                onChange={handleCardNumberChange}
                placeholder="1234 1234 1234 1234"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
              />
              {cardNumber.length >= 1 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <span className="text-xs text-gray-400">💳</span>
                </div>
              )}
            </div>
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Expiration date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={handleExpiryChange}
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">CVV</label>
              <div className="relative">
                <input
                  type={showCvv ? 'text' : 'password'}
                  value={cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    if (value.length <= 3) setCvv(value)
                  }}
                  placeholder="123"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowCvv(!showCvv)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCvv ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
          </div>

          {/* Card Brands */}
          <div className="flex gap-2 flex-wrap">
            {CARD_BRANDS.map((brand) => (
              <span
                key={brand}
                className="px-3 py-1 text-xs border border-gray-300 rounded-full text-gray-600"
              >
                {brand}
              </span>
            ))}
          </div>

          {/* Security Info */}
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>Secure payments by Midtrans</p>
            <p>
              By processing this payment, you agree to{' '}
              <a href="#" className="text-primary hover:underline">
                Midtrans Privacy Policy
              </a>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isProcessing || timeLeft <= 0}
            className="w-full bg-primary text-white py-4 rounded-xl font-medium text-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : timeLeft <= 0 ? 'Time Expired' : 'Pay now'}
          </button>
        </div>
      </div>

      {isProcessing && <LoadingOverlay message="Processing payment..." />}
    </div>
  )
}
