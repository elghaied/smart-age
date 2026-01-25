import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { TypedLocale } from 'payload'
import { getLocale } from 'next-intl/server'
import type { Footer, ContactInfo, SiteSetting } from '@/payload-types'

import AnimatedLogo from '@/components/AnimatedLogo'
import { SocialMedia } from './SocialMedia'
import { FooterNav } from './FooterNav'
import { ContactSection } from './ContactSection'

export async function Footer() {
  const currentLocale = (await getLocale()) as TypedLocale
  // Fetch all required data from different globals
  const [footerData, contactData, siteSettingsData] = await Promise.all([
    getCachedGlobal('footer', 1, currentLocale)() as Promise<Footer>,
    getCachedGlobal('contact-info', 1, currentLocale)() as Promise<ContactInfo>,
    getCachedGlobal('site-settings', 1, currentLocale)() as Promise<SiteSetting>,
  ])

  return (
    <footer className="bg-card border-t border-border/50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-4 mb-6">
              {siteSettingsData?.branding?.logo ? <AnimatedLogo /> : <AnimatedLogo size="sm" />}
              <h3 className="text-2xl font-bold text-foreground tracking-tight">
                {siteSettingsData?.siteName || 'Smart Age Tech'}
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed text-base max-w-md">
              {footerData.footerLabels?.footerWording}
            </p>
            <SocialMedia contactData={contactData} />
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-foreground mb-6 relative">
              {footerData.footerLabels?.footerQuickLinksLabel}
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary rounded-full" />
            </h4>
            <FooterNav footerData={footerData} />
          </div>

          {/* Contact Info */}
          <ContactSection contactData={contactData} locale={currentLocale} />
        </div>

        {/* Copyright */}
        <div className="border-t border-border/50 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2024 {siteSettingsData?.siteName || 'Smart Age Tech'}.{' '}
              {currentLocale === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{currentLocale === 'ar' ? 'صُنع بـ' : 'Made with'}</span>
              <span className="text-primary">♥</span>
              <span>{currentLocale === 'ar' ? 'في ليبيا' : 'in Libya'}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
