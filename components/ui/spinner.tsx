import { cn } from '@/lib/utils'
import * as React from 'react'
import { IconLogo } from './icons'

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'default' | 'dots' | 'pulse' | 'logo' | 'ring' | 'bars' | 'grid' | 'wave'
  color?: 'primary' | 'secondary' | 'muted' | 'white' | 'success' | 'warning' | 'error'
  text?: string
  speed?: 'slow' | 'normal' | 'fast'
  overlay?: boolean
  fullScreen?: boolean
  ariaLabel?: string
}

const sizeClasses = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
  '2xl': 'h-12 w-12'
}

const colorClasses = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  muted: 'text-muted-foreground',
  white: 'text-white',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-red-500'
}

const speedClasses = {
  slow: 'animate-spin',
  normal: 'animate-spin',
  fast: 'animate-spin'
}

const speedDurations = {
  slow: '3s',
  normal: '1s',
  fast: '0.5s'
}

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ 
    className, 
    size = 'md', 
    variant = 'default', 
    color = 'muted',
    text,
    speed = 'normal',
    overlay = false,
    fullScreen = false,
    ariaLabel = 'Loading...',
    ...props 
  }, ref) => {
    const renderSpinner = () => {
      const baseClasses = cn(
        sizeClasses[size],
        colorClasses[color],
        speedClasses[speed]
      )

      switch (variant) {
        case 'dots':
          return (
            <div className="flex space-x-1" role="status" aria-label={ariaLabel}>
              <div className={cn(
                "h-2 w-2 rounded-full bg-current animate-bounce",
                colorClasses[color]
              )} style={{ animationDelay: '0ms', animationDuration: speedDurations[speed] }} />
              <div className={cn(
                "h-2 w-2 rounded-full bg-current animate-bounce",
                colorClasses[color]
              )} style={{ animationDelay: '150ms', animationDuration: speedDurations[speed] }} />
              <div className={cn(
                "h-2 w-2 rounded-full bg-current animate-bounce",
                colorClasses[color]
              )} style={{ animationDelay: '300ms', animationDuration: speedDurations[speed] }} />
            </div>
          )
        
        case 'pulse':
          return (
            <div 
              className={cn(
                "rounded-full bg-current animate-pulse",
                baseClasses
              )}
              role="status"
              aria-label={ariaLabel}
            />
          )
        
        case 'logo':
          return (
            <IconLogo 
              className={cn(
                baseClasses,
                "animate-spin"
              )}
              role="status"
              aria-label={ariaLabel}
            />
          )

        case 'ring':
          return (
            <div 
              className={cn(
                "border-2 border-current border-t-transparent rounded-full animate-spin",
                baseClasses
              )}
              style={{ animationDuration: speedDurations[speed] }}
              role="status"
              aria-label={ariaLabel}
            />
          )

        case 'bars':
          return (
            <div className="flex space-x-1" role="status" aria-label={ariaLabel}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-full w-1 bg-current animate-pulse",
                    colorClasses[color]
                  )}
                  style={{ 
                    animationDelay: `${i * 100}ms`,
                    animationDuration: speedDurations[speed]
                  }}
                />
              ))}
            </div>
          )

        case 'grid':
          return (
            <div className="grid grid-cols-3 gap-1" role="status" aria-label={ariaLabel}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1 h-1 bg-current animate-pulse",
                    colorClasses[color]
                  )}
                  style={{ 
                    animationDelay: `${i * 50}ms`,
                    animationDuration: speedDurations[speed]
                  }}
                />
              ))}
            </div>
          )

        case 'wave':
          return (
            <div className="flex space-x-1" role="status" aria-label={ariaLabel}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1 bg-current animate-bounce",
                    colorClasses[color]
                  )}
                  style={{ 
                    height: `${(i + 1) * 4}px`,
                    animationDelay: `${i * 100}ms`,
                    animationDuration: speedDurations[speed]
                  }}
                />
              ))}
            </div>
          )
        
        default:
          return (
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
              className={cn(
                baseClasses,
                className
              )}
              style={{ animationDuration: speedDurations[speed] }}
              role="status"
              aria-label={ariaLabel}
            >
              <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12" />
            </svg>
          )
      }
    }

    const containerClasses = cn(
      "flex items-center justify-center",
      overlay && "absolute inset-0 bg-background/80 backdrop-blur-sm z-50",
      fullScreen && "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
      className
    )

    return (
      <div
        ref={ref}
        className={containerClasses}
        {...props}
      >
        <div className="flex flex-col items-center space-y-4">
          {renderSpinner()}
          {text && (
            <span className={cn(
              "text-sm font-medium",
              colorClasses[color]
            )}>
              {text}
            </span>
          )}
        </div>
      </div>
    )
  }
)

Spinner.displayName = 'Spinner'

// Legacy exports for backward compatibility
export const LogoSpinner = () => (
  <div className="p-4 border border-border rounded-lg">
    <IconLogo className="w-4 h-4 animate-spin text-primary" />
  </div>
)

// Additional spinner variants
export const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...',
  variant = 'default',
  color = 'muted',
  speed = 'normal'
}: { 
  size?: SpinnerProps['size']
  text?: string
  variant?: SpinnerProps['variant']
  color?: SpinnerProps['color']
  speed?: SpinnerProps['speed']
}) => (
  <Spinner size={size} text={text} variant={variant} color={color} speed={speed} />
)

export const FullScreenSpinner = ({ 
  text = 'Loading...',
  variant = 'default',
  color = 'muted',
  speed = 'normal'
}: { 
  text?: string
  variant?: SpinnerProps['variant']
  color?: SpinnerProps['color']
  speed?: SpinnerProps['speed']
}) => (
  <Spinner 
    fullScreen 
    text={text} 
    variant={variant} 
    color={color} 
    speed={speed}
    ariaLabel="Full screen loading"
  />
)

export const InlineSpinner = ({ 
  size = 'sm',
  variant = 'dots',
  color = 'muted',
  speed = 'normal'
}: { 
  size?: SpinnerProps['size']
  variant?: SpinnerProps['variant']
  color?: SpinnerProps['color']
  speed?: SpinnerProps['speed']
}) => (
  <Spinner size={size} variant={variant} color={color} speed={speed} />
)

export const OverlaySpinner = ({ 
  text = 'Loading...',
  variant = 'default',
  color = 'muted',
  speed = 'normal'
}: { 
  text?: string
  variant?: SpinnerProps['variant']
  color?: SpinnerProps['color']
  speed?: SpinnerProps['speed']
}) => (
  <Spinner 
    overlay 
    text={text} 
    variant={variant} 
    color={color} 
    speed={speed}
    ariaLabel="Overlay loading"
  />
)

// Specialized spinners for different contexts
export const ButtonSpinner = ({ 
  size = 'sm',
  color = 'white'
}: { 
  size?: SpinnerProps['size']
  color?: SpinnerProps['color']
}) => (
  <Spinner size={size} variant="ring" color={color} speed="fast" />
)

export const PageSpinner = ({ 
  text = 'Loading page...'
}: { 
  text?: string
}) => (
  <FullScreenSpinner text={text} variant="ring" color="primary" />
)

export const DataSpinner = ({ 
  text = 'Loading data...'
}: { 
  text?: string
}) => (
  <LoadingSpinner text={text} variant="dots" color="primary" />
)

export const SuccessSpinner = ({ 
  text = 'Processing...'
}: { 
  text?: string
}) => (
  <LoadingSpinner text={text} variant="pulse" color="success" />
)

export const ErrorSpinner = ({ 
  text = 'Error occurred...'
}: { 
  text?: string
}) => (
  <LoadingSpinner text={text} variant="wave" color="error" />
)
