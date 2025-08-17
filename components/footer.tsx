'use client'

import { cn } from '@/lib/utils'
import {
    Github,
    Heart,
    Shield,
    Twitter,
    Zap
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { SiDiscord } from 'react-icons/si'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Features', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'API', href: '#' },
      { name: 'Documentation', href: '#' }
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    resources: [
      { name: 'Help Center', href: '#' },
      { name: 'Community', href: '#' },
      { name: 'Status', href: '#' },
      { name: 'Changelog', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'GDPR', href: '#' }
    ]
  }

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/freshblue1234/sybot.git',
      icon: Github,
      color: 'hover:text-gray-900 dark:hover:text-gray-100'
    },
    {
      name: 'Twitter',
      href: 'https://x.com/sybot_ai',
      icon: Twitter,
      color: 'hover:text-blue-500'
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/kfKvS2zM',
      icon: SiDiscord,
      color: 'hover:text-indigo-500'
    }
  ]

  return (
    <footer className="w-full bg-background/80 backdrop-blur-xl border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/sybot.png" 
                alt="Sybot" 
                className="w-8 h-8 rounded-lg shadow-lg" 
              />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Sybot
                </h3>
                <p className="text-sm text-muted-foreground">AI-Powered Answer Engine</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              A fully open-source AI-powered answer engine with a generative UI. 
              Get instant answers, search the web, and chat with AI.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span className="text-xs">Open Source</span>
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span className="text-xs">Fast & Secure</span>
              </Badge>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} Sybot. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>by the Sybot team.</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <Link 
                key={social.name}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 w-8 bg-transparent hover:bg-accent hover:text-accent-foreground",
                  social.color
                )}
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
            {footerLinks.legal.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
