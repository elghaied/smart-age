'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'

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
  const [activeHash, setActiveHash] = useState<string>('')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Extract hash section IDs from nav items
  const hashSectionIds = navItems
    .map(({ link }) => link?.url)
    .filter((url): url is string => !!url && url.startsWith('#'))
    .map((url) => url.slice(1))

  // Track active section using Intersection Observer
  useEffect(() => {
    if (hashSectionIds.length === 0) return

    const observers: IntersectionObserver[] = []

    hashSectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHash(`#${sectionId}`)
            }
          })
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [hashSectionIds.join(',')])

  // Helper to check if link is a hash link
  const isHashLink = (url: string | null | undefined) => url?.startsWith('#')

  // Helper to check if we're on the homepage
  const isHomepage = () => {
    const cleanPathname = pathname.replace(/^\/(ar|en)/, '') || '/'
    return cleanPathname === '/'
  }

  // Determine the single active link index (only one can be active at a time)
  const getActiveIndex = (): number => {
    // If we have an active hash section, that takes priority (only on homepage)
    if (activeHash && isHomepage()) {
      const hashIndex = navItems.findIndex(({ link }) => link?.url === activeHash)
      if (hashIndex !== -1) return hashIndex
    }

    // Otherwise, check for active page link (non-hash links only)
    for (let i = 0; i < navItems.length; i++) {
      const linkUrl = navItems[i]?.link?.url
      if (!linkUrl || isHashLink(linkUrl)) continue

      const cleanPathname = pathname.replace(/^\/(ar|en)/, '') || '/'
      const cleanLinkUrl = linkUrl.replace(/^\/(ar|en)/, '') || '/'

      if (cleanPathname === cleanLinkUrl) return i
    }

    return -1
  }

  const activeIndex = getActiveIndex()

  // Calculate indicator position based on hovered or active item
  const getIndicatorStyle = () => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex
    if (targetIndex === -1 || !itemRefs.current[targetIndex] || !navRef.current) {
      return { opacity: 0, width: 0, left: 0 }
    }

    const item = itemRefs.current[targetIndex]
    const nav = navRef.current
    if (!item) return { opacity: 0, width: 0, left: 0 }

    const itemRect = item.getBoundingClientRect()
    const navRect = nav.getBoundingClientRect()

    return {
      opacity: 1,
      width: itemRect.width - 16, // Slightly narrower than the item
      left: itemRect.left - navRect.left + 8, // Centered with 8px offset
    }
  }

  const indicatorStyle = getIndicatorStyle()

  if (isMobile) {
    return (
      <div className="space-y-1">
        {navItems.map(({ link }, i) => {
          const isActive = i === activeIndex

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
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ',
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
    <div ref={navRef} className="relative flex items-center space-x-1 rtl:space-x-reverse">
      {/* Sliding indicator - single animated underline */}
      <motion.div
        className="absolute bottom-0 h-0.5 bg-primary rounded-full"
        initial={false}
        animate={{
          opacity: indicatorStyle.opacity,
          width: indicatorStyle.width,
          x: indicatorStyle.left,
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30,
        }}
        style={{ left: 0 }}
      />

      {navItems.map(({ link }, i) => {
        const isActive = i === activeIndex

        return (
          <motion.div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <CMSLink
              {...link}
              appearance="link"
              className={cn(
                'relative px-3 py-2 rounded-md transition-colors duration-200 ',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 hover:no-underline',
                isActive
                  ? 'text-primary font-medium '
                  : 'text-muted-foreground hover:text-primary ',
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
        whileHover={{ scale: 1.05 }}
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
