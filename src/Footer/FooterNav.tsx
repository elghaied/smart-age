import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'

interface FooterNavProps {
  footerData: Footer
}

export const FooterNav: React.FC<FooterNavProps> = ({ footerData }) => {
  const navItems = footerData?.navItems || []

  return (
    <ul className="space-y-2">
      {navItems.map(({ link }, i) => (
        <li key={i}>
          <CMSLink
            {...link}
            appearance="link"
            className="text-muted-foreground hover:text-primary transition-colors"
          />
        </li>
      ))}
    </ul>
  )
}
