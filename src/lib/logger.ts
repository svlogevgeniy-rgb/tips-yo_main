// Simple logging utility for debugging and monitoring
type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
}

class Logger {
  private isDevelopment = import.meta.env.DEV

  private formatMessage(entry: LogEntry): string {
    return `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context
    }

    // In production, you would send this to a logging service
    // For now, we'll just use console
    const formattedMessage = this.formatMessage(entry)

    switch (level) {
      case 'error':
        console.error(formattedMessage, context)
        break
      case 'warn':
        console.warn(formattedMessage, context)
        break
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedMessage, context)
        }
        break
      default:
        console.log(formattedMessage, context)
    }

    // In production, send to monitoring service
    if (!this.isDevelopment && level === 'error') {
      this.sendToMonitoring(entry)
    }
  }

  private sendToMonitoring(_entry: LogEntry) {
    // Placeholder for sending to monitoring service (e.g., Sentry, LogRocket)
    // In real implementation, you would send to your monitoring service
    // Example: Sentry.captureException(entry)
  }

  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context)
  }

  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context)
  }

  error(message: string, error?: Error | unknown, context?: Record<string, any>) {
    const errorContext = {
      ...context,
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error
    }
    this.log('error', message, errorContext)
  }

  debug(message: string, context?: Record<string, any>) {
    this.log('debug', message, context)
  }
}

export const logger = new Logger()
