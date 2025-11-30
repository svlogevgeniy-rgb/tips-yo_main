# Error Handling and Logging Guide

## Overview

This document describes the error handling and logging infrastructure implemented in the tips'yo application.

## Components

### 1. Logger (`src/lib/logger.ts`)

A centralized logging utility that provides structured logging with different severity levels.

#### Usage

```typescript
import { logger } from '@/lib/logger'

// Info logging
logger.info('User action completed', { userId: '123', action: 'tip_sent' })

// Warning logging
logger.warn('Unusual behavior detected', { context: 'payment' })

// Error logging
logger.error('Payment failed', error, { userId: '123', amount: 100 })

// Debug logging (only in development)
logger.debug('Debug information', { data: someData })
```

#### Features

- Automatic timestamp generation
- Context-aware logging with additional metadata
- Development vs production mode handling
- Placeholder for integration with monitoring services (Sentry, LogRocket, etc.)

### 2. Error Handler (`src/lib/errorHandler.ts`)

Provides custom error classes and error handling utilities.

#### Custom Error Classes

```typescript
// Generic application error
throw new AppError('Something went wrong', 'ERROR_CODE', 500, true)

// Network error (retryable)
throw new NetworkError('Failed to fetch data')

// Validation error (not retryable)
throw new ValidationError('Invalid email format', 'email')

// Payment error
throw new PaymentError('Card declined', false)
```

#### Utility Functions

```typescript
// Handle any error and convert to AppError
const appError = handleError(error, 'ComponentName')

// Get user-friendly error message
const message = getErrorMessage(error)

// Retry operation with exponential backoff
const result = await retryOperation(
  async () => await fetchData(),
  3, // max retries
  1000 // initial delay in ms
)
```

### 3. UI Components

#### LoadingSpinner

```typescript
import { LoadingSpinner } from '@/components/LoadingSpinner'

<LoadingSpinner size="sm" /> // Small spinner
<LoadingSpinner size="md" /> // Medium spinner (default)
<LoadingSpinner size="lg" /> // Large spinner
```

#### LoadingOverlay

```typescript
import { LoadingOverlay } from '@/components/LoadingOverlay'

{isProcessing && <LoadingOverlay message="Processing payment..." />}
```

#### PageLoader

```typescript
import { PageLoader } from '@/components/PageLoader'

if (isLoading) {
  return <PageLoader message="Loading employees..." />
}
```

#### ErrorMessage

```typescript
import { ErrorMessage } from '@/components/ErrorMessage'

<ErrorMessage 
  message="Failed to load data" 
  onRetry={() => refetch()}
  onDismiss={() => setError(null)}
/>
```

## Implementation Pattern

### Standard Page Pattern

```typescript
import { useState, useEffect } from 'react'
import { PageLoader } from '@/components/PageLoader'
import { ErrorMessage } from '@/components/ErrorMessage'
import { LoadingOverlay } from '@/components/LoadingOverlay'
import { logger } from '@/lib/logger'
import { handleError, getErrorMessage } from '@/lib/errorHandler'

export const MyPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        logger.info('Loading page data')
        const result = await fetchData()
        setData(result)
        setIsLoading(false)
        logger.info('Page data loaded successfully')
      } catch (err) {
        const appError = handleError(err, 'MyPage')
        setError(getErrorMessage(appError))
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const handleAction = async () => {
    try {
      setIsProcessing(true)
      setError(null)
      
      logger.info('Performing action')
      await performAction()
      
      logger.info('Action completed successfully')
    } catch (err) {
      const appError = handleError(err, 'MyPage.handleAction')
      setError(getErrorMessage(appError))
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return <PageLoader message="Loading..." />
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </div>
    )
  }

  return (
    <div>
      {/* Your page content */}
      {isProcessing && <LoadingOverlay message="Processing..." />}
    </div>
  )
}
```

## Best Practices

1. **Always log important user actions**
   - Page loads
   - Form submissions
   - Payment processing
   - Navigation events

2. **Use appropriate error types**
   - `NetworkError` for API/network failures
   - `ValidationError` for input validation
   - `PaymentError` for payment-related issues
   - `AppError` for generic errors

3. **Provide context in logs**
   ```typescript
   logger.info('Payment processed', { 
     amount, 
     employeeId, 
     paymentMethod 
   })
   ```

4. **Handle errors gracefully**
   - Show user-friendly error messages
   - Provide retry options for retryable errors
   - Log detailed error information for debugging

5. **Use loading states**
   - Show loading indicators for async operations
   - Disable buttons during processing
   - Provide feedback on long-running operations

## Future Enhancements

1. **Monitoring Integration**
   - Integrate with Sentry for error tracking
   - Add performance monitoring
   - Set up alerting for critical errors

2. **Analytics**
   - Track user flows
   - Monitor conversion rates
   - Identify drop-off points

3. **Advanced Error Recovery**
   - Implement automatic retry with exponential backoff
   - Add circuit breaker pattern for failing services
   - Implement graceful degradation

## Testing

When testing components with error handling:

```typescript
// Test loading state
expect(screen.getByText('Loading...')).toBeInTheDocument()

// Test error state
await waitFor(() => {
  expect(screen.getByText(/error message/i)).toBeInTheDocument()
})

// Test retry functionality
const retryButton = screen.getByText('Try Again')
fireEvent.click(retryButton)
```
