'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

interface HeaderNavProps {
  data: HeaderType
  isMobile?: boolean
  onItemClick?: () => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, isMobile = false, onItemClick }) => {
  const navItems = data?.navItems || []

  if (isMobile) {
    return (
      <>
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
            />
          )
        })}

        {/* Search link for mobile */}
        <Link
          href="/search"
          className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={onItemClick}
        >
          <div className="flex items-center space-x-2">
            <SearchIcon className="w-4 h-4" />
            <span>Search</span>
          </div>
        </Link>
      </>
    )
  }

  return (
    <>
      {navItems.map(({ link }, i) => {
        return (
          <motion.div key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <CMSLink
              {...link}
              appearance="link"
              className="text-muted-foreground hover:text-foreground transition-colors"
            />
          </motion.div>
        )
      })}

      {/* Search Icon */}
      <Link href="/search">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 hover:bg-teal-50 dark:hover:bg-teal-950/50 rounded-md transition-colors"
        >
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 h-5 text-primary" />
        </motion.div>
      </Link>
    </>
  )
}
