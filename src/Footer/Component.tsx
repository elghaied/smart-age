import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { TypedLocale } from 'payload'

import type { Footer, ContactInfo, SiteSetting } from '@/payload-types'
import { FooterClient } from './Component.client'

export async function Footer({ locale }: { locale: TypedLocale }) {
  // Fetch all required data from different globals
  const [footerData, contactData, siteSettingsData] = await Promise.all([
    getCachedGlobal('footer', 1, locale)(),
    getCachedGlobal('contact-info', 1, locale)(),
    getCachedGlobal('site-settings', 1, locale)(),
  ])

  return (
    <FooterClient
      footerData={footerData as Footer}
      contactData={contactData as ContactInfo}
      siteSettingsData={siteSettingsData as SiteSetting}
    />
  )
}
