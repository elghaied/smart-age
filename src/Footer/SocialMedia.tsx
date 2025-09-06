import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ContactInfo } from '@/payload-types'

interface SocialMediaProps {
  contactData: ContactInfo
}

export const SocialMedia: React.FC<SocialMediaProps> = ({ contactData }) => {
  const socialMedia = contactData?.socialMedia

  if (!socialMedia) return null

  const socialLinks = [
    {
      href: socialMedia.facebook,
      icon: Facebook,
      label: 'Facebook',
    },
    {
      href: socialMedia.twitter,
      icon: Twitter,
      label: 'Twitter',
    },
    {
      href: socialMedia.instagram,
      icon: Instagram,
      label: 'Instagram',
    },
    {
      href: socialMedia.linkedin,
      icon: Linkedin,
      label: 'LinkedIn',
    },
  ]

  return (
    <div className="flex gap-4">
      {socialLinks.map(({ href, icon: Icon, label }) => {
        if (!href) return null

        return (
          <Button
            key={label}
            variant="outline"
            size="icon"
            asChild
            className="hover:bg-primary hover:text-primary-foreground bg-transparent transition-all duration-200"
          >
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon className="h-4 w-4" />
            </a>
          </Button>
        )
      })}
    </div>
  )
}
