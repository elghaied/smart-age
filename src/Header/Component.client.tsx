'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLocale } from 'next-intl'

import type { Header } from '@/payload-types'

import { HeaderNav } from './Nav'
import { HomeSectionsNav } from './HomeSectionsNav'

import AnimatedLogo from '@/components/AnimatedLogo'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import LanguageSwitcher from './LanguagesSwitcher'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const locale = useLocale()

  // Check if we're on the homepage
  const isHomepage = (() => {
    const cleanPathname = pathname.replace(/^\/(ar|en)/, '') || '/'
    return cleanPathname === '/' || cleanPathname === ''
  })()

  const homeSections = data?.homeSections || []
  const showHomeSectionsNav = isHomepage && homeSections.length > 0

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Navigation */}
      <motion.nav
        id="navigation"
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm'
            : 'bg-background/80 backdrop-blur-sm',
        )}
        initial={{ y: prefersReducedMotion ? 0 : -100 }}
        animate={{ y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : 0.2,
              }}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <Link
                className={cn(
                  'flex items-center gap-3 group transition-all duration-200',
                  'hover:scale-105 focus-visible:scale-105',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-1',
                )}
                href={`/${locale}`}
              >
                <div className="transition-transform duration-200 group-hover:rotate-12">
                  <AnimatedLogo size="sm" />
                </div>
                <div className="hidden sm:block">
                  <h1
                    className={cn(
                      'text-lg font-bold text-foreground transition-colors duration-200',
                      'group-hover:text-primary',
                    )}
                  >
                    Smart Age Tech
                  </h1>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div
              className="hidden md:flex items-center space-x-8 rtl:space-x-reverse"
              initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : 0.3,
              }}
            >
              <HeaderNav data={data} />
            </motion.div>

            {/* Theme Switcher, Locale Toggle & Mobile Menu */}
            <motion.div
              className="flex items-center space-x-3 rtl:space-x-reverse"
              initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : 0.4,
              }}
            >
              {/* Theme Switcher */}
              <div className="transition-transform duration-200 hover:scale-105">
                <ThemeSelector />
              </div>

              {/* Language Toggle - Hidden on mobile */}
              <div className="hidden sm:flex">
                <LanguageSwitcher />
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'md:hidden p-2',
                  'hover:bg-primary/10 hover:text-primary',
                  'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  'transition-all duration-200 hover:scale-105 active:scale-95',
                )}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <motion.div
                  animate={{ rotate: prefersReducedMotion ? 0 : isMenuOpen ? 180 : 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Homepage Sections Navigation - Desktop */}
        <AnimatePresence>
          {showHomeSectionsNav && (
            <motion.div
              initial={{
                opacity: prefersReducedMotion ? 1 : 0,
                height: prefersReducedMotion ? 'auto' : 0,
              }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{
                opacity: prefersReducedMotion ? 1 : 0,
                height: prefersReducedMotion ? 'auto' : 0,
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
              className="hidden md:block border-t border-border/50"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <HomeSectionsNav sections={homeSections} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{
                opacity: prefersReducedMotion ? 1 : 0,
                height: prefersReducedMotion ? 'auto' : 0,
              }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{
                opacity: prefersReducedMotion ? 1 : 0,
                height: prefersReducedMotion ? 'auto' : 0,
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-card/95 backdrop-blur-md border-t border-border shadow-lg"
            >
              <motion.div
                className="px-4 py-4 space-y-3"
                initial={{
                  opacity: prefersReducedMotion ? 1 : 0,
                  y: prefersReducedMotion ? 0 : -10,
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : -10 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.2,
                  delay: prefersReducedMotion ? 0 : 0.1,
                }}
              >
                {/* Mobile Navigation Items */}
                <HeaderNav data={data} isMobile={true} onItemClick={() => setIsMenuOpen(false)} />

                {/* Mobile Homepage Sections */}
                {showHomeSectionsNav && (
                  <HomeSectionsNav
                    sections={homeSections}
                    isMobile={true}
                    onItemClick={() => setIsMenuOpen(false)}
                  />
                )}

                {/* Mobile controls container */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-border/50">
                  <span className="text-sm font-medium text-muted-foreground">
                    {locale === 'ar' ? 'الإعدادات' : 'Settings'}
                  </span>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="transition-transform duration-200 hover:scale-105">
                      <ThemeSelector />
                    </div>
                    <LanguageSwitcher mobile />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
