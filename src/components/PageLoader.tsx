import { LoadingSpinner } from './LoadingSpinner'

interface PageLoaderProps {
  message?: string
}

export const PageLoader = ({ message = 'Loading...' }: PageLoaderProps) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <LoadingSpinner size="lg" className="mb-4" />
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  )
}
