import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'

interface FooterNavProps {
  footerData: Footer
}

export const FooterNav: React.FC<FooterNavProps> = ({ footerData }) => {
  const navItems = footerData?.navItems || []

  return (
    <ul className="space-y-3">
      {navItems.map(({ link }, i) => (
        <li key={i} className="group">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 bg-primary/50 rounded-full transition-all duration-200 group-hover:bg-primary group-hover:scale-125" />
            <CMSLink
              {...link}
              appearance="link"
              className="text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1 text-sm"
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
