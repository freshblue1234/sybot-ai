'use client'

import { cn } from '@/lib/utils'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-10 w-10 text-primary', className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2a1 1 0 011 1v1.09A7.001 7.001 0 0119 11v4a2 2 0 01-2 2h-1v2a2 2 0 11-4 0v-2H8v2a2 2 0 11-4 0v-2H3a1 1 0 01-1-1v-4a7 7 0 016-6.91V3a1 1 0 011-1zm-5 9a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z"
      />
    </svg>
  )
}

export { IconLogo }
