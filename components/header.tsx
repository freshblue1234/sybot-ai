<<<<<<< HEAD
import Image from 'next/image'
=======
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
import React from 'react'
import HistoryContainer from './history-container'
import { ModeToggle } from './mode-toggle'

export const Header: React.FC = async () => {
  return (
<<<<<<< HEAD
    <header className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <a 
            href="/" 
            className="flex items-center gap-3 group transition-all duration-200 hover:scale-105"
          >
            <div className="relative">
              <Image 
                src="/sybot.png" 
                alt="Sybot" 
                width={40}
                height={40}
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-200" 
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Sybot
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                AI-Powered Answer Engine
              </span>
            </div>
          </a>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 lg:gap-3">
          <ModeToggle />
          <div className="hidden sm:block">
            <HistoryContainer />
          </div>
        </div>
=======
    <header className="fixed w-full p-2 flex justify-between items-center z-10 backdrop-blur lg:backdrop-blur-none bg-background/80 lg:bg-transparent">
      <div>
      <a href="/" className="flex items-center gap-2">
  <img src="/sybot.png" alt="sybot" className="w-6 h-6" />
  <span className="text-lg font-bold">Sybot</span>
</a>

      </div>
      <div className="flex gap-0.5">
        <ModeToggle />
        <HistoryContainer />
>>>>>>> 41155a42ae5ee50065317213a1704586c96f7cfd
      </div>
    </header>
  )
}

export default Header
