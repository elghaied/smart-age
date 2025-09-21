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
      hoverColors: 'hover:bg-blue-600 hover:border-blue-600',
    },
    {
      href: socialMedia.twitter,
      icon: Twitter,
      label: 'Twitter',
      hoverColors: 'hover:bg-sky-500 hover:border-sky-500',
    },
    {
      href: socialMedia.instagram,
      icon: Instagram,
      label: 'Instagram',
      hoverColors:
        'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:border-purple-500',
    },
    {
      href: socialMedia.linkedin,
      icon: Linkedin,
      label: 'LinkedIn',
      hoverColors: 'hover:bg-blue-700 hover:border-blue-700',
    },
  ]

  return (
    <div className="flex gap-3">
      {socialLinks.map(({ href, icon: Icon, label, hoverColors }) => {
        if (!href) return null

        return (
          <Button
            key={label}
            variant="outline"
            size="icon"
            asChild
            className={`${hoverColors} hover:text-white hover:scale-110 bg-transparent border-border/50 transition-all duration-300 ease-out group`}
          >
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex items-center justify-center w-full h-full"
            >
              <Icon className="h-4 w-4 text-foreground group-hover:text-white transition-all duration-300 group-hover:scale-110" />
            </a>
          </Button>
        )
      })}
    </div>
  )
}
