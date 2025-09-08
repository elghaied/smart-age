'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'
import { createSmoothScrollHandler } from '@/utilities/smoothScroll'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

interface HeaderNavProps {
  data: HeaderType
  isMobile?: boolean
  onItemClick?: () => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, isMobile = false, onItemClick }) => {
  const navItems = data?.navItems || []
  const pathname = usePathname()

  // Helper function to check if a link is active
  const isActiveLink = (linkUrl: string | null | undefined) => {
    if (!linkUrl) return false

    // Remove locale prefix for comparison
    const cleanPathname = pathname.replace(/^\/(ar|en)/, '') || '/'
    const cleanLinkUrl = linkUrl.replace(/^\/(ar|en)/, '') || '/'

    return cleanPathname === cleanLinkUrl
  }

  if (isMobile) {
    return (
      <div className="space-y-1">
        {navItems.map(({ link }, i) => {
          const isActive = isActiveLink(link?.url)

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <div onClick={onItemClick}>
                <CMSLink
                  {...link}
                  appearance="link"
                  className={cn(
                    'block py-3 px-4 rounded-lg transition-all duration-200',
                    'hover:bg-primary/10 hover:text-primary hover:translate-x-1',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                    isActive
                      ? 'text-primary bg-primary/5 border-l-2 border-primary font-medium'
                      : 'text-muted-foreground',
                  )}
                />
              </div>
            </motion.div>
          )
        })}

        {/* Search link for mobile */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
        >
          <Link
            href="/search"
            className={cn(
              'flex items-center space-x-3 rtl:space-x-reverse py-3 px-4 rounded-lg',
              'text-muted-foreground hover:text-primary hover:bg-primary/10 hover:translate-x-1',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              'transition-all duration-200',
            )}
            onClick={onItemClick}
          >
            <SearchIcon className="w-4 h-4" />
            <span>Search</span>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-6 rtl:space-x-reverse">
      {navItems.map(({ link }, i) => {
        const isActive = isActiveLink(link?.url)

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <CMSLink
              {...link}
              appearance="link"
              className={cn(
                'relative px-3 py-2 rounded-md transition-all duration-200',
                'hover:text-primary hover:bg-primary/5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5',
                'after:bg-primary after:transform after:scale-x-0 after:transition-transform after:duration-200',
                'hover:after:scale-x-100',
                isActive ? 'text-primary font-medium after:scale-x-100' : 'text-muted-foreground',
              )}
            />
          </motion.div>
        )
      })}

      {/* Search Icon */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: navItems.length * 0.1 }}
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/search"
          className={cn(
            'p-2 rounded-md transition-all duration-200',
            'hover:bg-primary/10 hover:text-primary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
            'text-muted-foreground',
          )}
        >
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  )
}
