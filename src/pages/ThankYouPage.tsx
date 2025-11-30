import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { logger } from '@/lib/logger'

export const ThankYouPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { employeeName = 'сотрудник' } = location.state || {}

  useEffect(() => {
    logger.info('Payment completed successfully', { employeeName })
  }, [employeeName])

  const handleRepeat = () => {
    navigate('/employees')
  }

  const handleShare = async () => {
    const shareData = {
      title: 'tips\'yo',
      text: 'Оставьте чаевые через tips\'yo',
      url: window.location.origin + '/employees'
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url)
      alert('Ссылка скопирована в буфер обмена!')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/images/Logo.svg" alt="tips'yo" className="h-6" />
            <span className="text-xl font-semibold text-primary">tips'yo</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900">
            Спасибо!
          </h1>

          {/* Message */}
          <p className="text-lg text-gray-600 leading-relaxed">
            Оплата прошла успешно и {employeeName} уже получил вознаграждение!
          </p>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6">
            <button
              onClick={handleRepeat}
              className="w-full bg-primary text-white py-4 rounded-xl font-medium text-lg hover:bg-primary/90 transition"
            >
              Повторить
            </button>
            <button
              onClick={handleShare}
              className="w-full bg-white text-primary border-2 border-primary py-4 rounded-xl font-medium text-lg hover:bg-gray-50 transition"
            >
              Поделиться ссылкой
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
