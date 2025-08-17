'use client'

import Link from 'next/link'
import React from 'react'
import { SiDiscord, SiGithub, SiX } from 'react-icons/si'
import { Button } from './ui/button'

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 right-0 z-30 p-2 lg:p-3">
      <div className="flex items-center gap-1">
        <Link
          href="https://discord.gg/kfKvS2zM"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 lg:h-10 lg:w-10 text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/50 transition-all duration-200"
          >
            <SiDiscord size={16} className="lg:w-4 lg:h-4" />
          </Button>
        </Link>
        <Link
          href="https://x.com/sybot_ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 lg:h-10 lg:w-10 text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/50 transition-all duration-200"
          >
            <SiX size={16} className="lg:w-4 lg:h-4" />
          </Button>
        </Link>
        <Link
          href="https://github.com/freshblue1234/sybot.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 lg:h-10 lg:w-10 text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/50 transition-all duration-200"
          >
            <SiGithub size={16} className="lg:w-4 lg:h-4" />
          </Button>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
