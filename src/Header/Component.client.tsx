'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'

import AnimatedLogo from '@/components/AnimatedLogo' // You'll need to import your animated logo
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [locale, setLocale] = useState<'en' | 'ar'>('en') // Default to English
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Extract locale from pathname or use other method based on your i18n setup
  useEffect(() => {
    const pathLocale = pathname.startsWith('/ar') ? 'ar' : 'en'
    setLocale(pathLocale)
  }, [pathname])

  const toggleLocale = () => {
    const newLocale = locale === 'ar' ? 'en' : 'ar'
    const currentPath = pathname.replace(/^\/(ar|en)/, '')
    const newPath = `/${newLocale}${currentPath}`
    window.location.href = newPath
  }

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Link className="flex items-center gap-2 " href={`/${locale}`}>
                {/* Using your AnimatedLogo component, fallback to Payload Logo if needed */}
                <AnimatedLogo size="md" />
                <div className="hidden sm:block ml-2">
                  <h1 className="text-lg font-bold text-foreground">Smart Age Tech</h1>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              <HeaderNav data={data} />
            </div>

            {/* Theme Switcher, Locale Toggle & Mobile Menu */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {/* Theme Switcher - Always visible */}
              <ThemeSelector />

              {/* Language Toggle - Hidden on mobile */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLocale}
                className="hidden sm:flex bg-transparent"
              >
                {locale === 'ar' ? 'EN' : 'عربي'}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border"
          >
            <div className="px-4 py-2 space-y-2">
              {/* Mobile Navigation Items */}
              <HeaderNav data={data} isMobile={true} onItemClick={() => setIsMenuOpen(false)} />

              {/* Mobile controls container */}
              <div className="flex items-center justify-between pt-2 mt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  {locale === 'ar' ? 'الإعدادات' : 'Settings'}
                </span>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <ThemeSelector />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleLocale}
                    className="bg-transparent"
                  >
                    {locale === 'ar' ? 'EN' : 'عربي'}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </>
  )
}
