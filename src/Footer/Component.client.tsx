'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import type { Footer, ContactInfo, SiteSetting } from '@/payload-types'

import { SocialMedia } from './SocialMedia'
import { FooterNav } from './FooterNav'
import { ContactSection } from './ContactSection'
import AnimatedLogo from '@/components/AnimatedLogo'

interface FooterClientProps {
  footerData: Footer
  contactData: ContactInfo
  siteSettingsData: SiteSetting
}

export const FooterClient: React.FC<FooterClientProps> = ({
  footerData,
  contactData,
  siteSettingsData,
}) => {
  const pathname = usePathname()
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en'

  return (
    <footer className="bg-card border-t border-border py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              {siteSettingsData?.branding?.logo ? <AnimatedLogo /> : <AnimatedLogo size="sm" />}
              <h3 className="text-xl font-bold text-foreground">
                {siteSettingsData?.siteName || 'Smart Age Tech'}
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {footerData.footerLabels?.footerWording}
            </p>
            <SocialMedia contactData={contactData} />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              {footerData.footerLabels?.footerQuickLinksLabel}
            </h4>
            <FooterNav footerData={footerData} />
          </div>

          {/* Contact Info */}
          <ContactSection contactData={contactData} locale={locale} />
        </div>

        {/* Copyright */}
        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 {siteSettingsData?.siteName || 'Smart Age Tech'}.{' '}
            {locale === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
          </p>
        </div>
      </div>
    </footer>
  )
}
