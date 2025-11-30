import { logger } from './logger'

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
    public isRetryable: boolean = false
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class NetworkError extends AppError {
  constructor(message: string = 'Network error occurred') {
    super(message, 'NETWORK_ERROR', 0, true)
    this.name = 'NetworkError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public field?: string) {
    super(message, 'VALIDATION_ERROR', 400, false)
    this.name = 'ValidationError'
  }
}

export class PaymentError extends AppError {
  constructor(message: string, isRetryable: boolean = true) {
    super(message, 'PAYMENT_ERROR', 402, isRetryable)
    this.name = 'PaymentError'
  }
}

export function handleError(error: unknown, context?: string): AppError {
  logger.error(`Error in ${context || 'application'}`, error)

  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    // Check if it's a network error
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return new NetworkError()
    }
    return new AppError(error.message)
  }

  return new AppError('An unexpected error occurred')
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  let lastError: unknown

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      logger.debug(`Attempting operation (attempt ${attempt}/${maxRetries})`)
      return await operation()
    } catch (error) {
      lastError = error
      logger.warn(`Operation failed (attempt ${attempt}/${maxRetries})`, { error })

      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs * attempt))
      }
    }
  }

  throw lastError
}
