import React from 'react'

interface SkipLinkProps {
  href: string
  children: React.ReactNode
}

export function SkipLink({ href, children }: SkipLinkProps) {
  return (
    <a href={href} className="skip-link" aria-label="Skip to main content">
      {children}
    </a>
  )
}

export default SkipLink
