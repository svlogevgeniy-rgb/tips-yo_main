import { LoadingSpinner } from './LoadingSpinner'

interface LoadingOverlayProps {
  message?: string
}

export const LoadingOverlay = ({ message = 'Loading...' }: LoadingOverlayProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
        <LoadingSpinner size="lg" className="mb-4" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  )
}
