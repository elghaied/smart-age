'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'

import type { Header as HeaderType } from '@/payload-types'

interface HomeSectionsNavProps {
  sections: NonNullable<HeaderType['homeSections']>
  isMobile?: boolean
  onItemClick?: () => void
}

export const HomeSectionsNav: React.FC<HomeSectionsNavProps> = ({
  sections,
  isMobile = false,
  onItemClick,
}) => {
  const [activeSection, setActiveSection] = useState<string>('')
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Track active section using Intersection Observer
  useEffect(() => {
    if (sections.length === 0) return

    const sectionIds = sections.map((s) => s.sectionId).filter(Boolean)
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId!)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId!)
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
  }, [sections])

  const handleClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 120 // Account for fixed header + section nav
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
    onItemClick?.()
  }

  const getActiveIndex = (): number => {
    return sections.findIndex((s) => s.sectionId === activeSection)
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
      width: itemRect.width - 8,
      left: itemRect.left - navRect.left + 4,
    }
  }

  const indicatorStyle = getIndicatorStyle()

  if (isMobile) {
    return (
      <div className="space-y-1 border-t border-border/50 pt-3 mt-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 mb-2 block">
          Sections
        </span>
        {sections.map((section, i) => {
          const isActive = section.sectionId === activeSection

          return (
            <motion.div
              key={section.id || i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <button
                onClick={() => handleClick(section.sectionId)}
                className={cn(
                  'block w-full text-left py-2 px-4 rounded-lg transition-all duration-200',
                  'hover:bg-primary/10 hover:text-primary',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  isActive
                    ? 'text-primary bg-primary/5 border-l-2 border-primary font-medium'
                    : 'text-muted-foreground',
                )}
              >
                {section.label}
              </button>
            </motion.div>
          )
        })}
      </div>
    )
  }

  return (
    <div ref={navRef} className="relative flex items-center justify-center gap-1">
      {/* Sliding indicator */}
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

      {sections.map((section, i) => {
        const isActive = section.sectionId === activeSection

        return (
          <button
            key={section.id || i}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            onClick={() => handleClick(section.sectionId)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              'relative px-3 py-1.5 text-sm rounded-md transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-primary',
            )}
          >
            {section.label}
          </button>
        )
      })}
    </div>
  )
}
