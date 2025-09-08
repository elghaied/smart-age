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
    <div className="flex gap-3">
      {socialLinks.map(({ href, icon: Icon, label }) => {
        if (!href) return null

        return (
          <Button
            key={label}
            variant="outline"
            size="icon"
            asChild
            className="hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 bg-transparent border-border/50 transition-all duration-300 ease-out group"
          >
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            </a>
          </Button>
        )
      })}
    </div>
  )
}
