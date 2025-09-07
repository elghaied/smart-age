import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'
import { TypedLocale } from 'payload'
import type { Homepage } from '@/payload-types'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMetaForGlobal } from '@/utilities/generateMeta'
import Hero from '@/components/sections/Hero'

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function LandingPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale = 'en' } = await paramsPromise

  // Fetch LandingPage global data
  const homepage = (await getCachedGlobal('homepage', 0, locale)()) as Homepage

  if (!homepage) {
    return <div>Homepage data not found</div>
  }

  return (
    <article>
      {draft && <LivePreviewListener />}

      {/* Hero Section */}
      <Hero hero={homepage.hero} />

      {/* About Section - placeholder */}
      {homepage.about && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">{homepage.about.title}</h2>
            {homepage.about.subtitle && <p className="text-gray-600">{homepage.about.subtitle}</p>}
          </div>
        </section>
      )}

      {/* Why Us Section - placeholder */}
      {homepage.whyUs && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">{homepage.whyUs.title}</h2>
            {homepage.whyUs.subtitle && <p className="text-gray-600">{homepage.whyUs.subtitle}</p>}
          </div>
        </section>
      )}

      {/* Goals Section - placeholder */}
      {homepage.goals && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">{homepage.goals.title}</h2>
            {homepage.goals.subtitle && <p className="text-gray-600">{homepage.goals.subtitle}</p>}
          </div>
        </section>
      )}

      {/* Projects Section - placeholder */}
      {homepage.projects && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">{homepage.projects.title}</h2>
            {homepage.projects.subtitle && (
              <p className="text-gray-600">{homepage.projects.subtitle}</p>
            )}
          </div>
        </section>
      )}

      {/* Services Section - placeholder */}
      {homepage.services && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">{homepage.services.title}</h2>
            {homepage.services.subtitle && (
              <p className="text-gray-600">{homepage.services.subtitle}</p>
            )}
          </div>
        </section>
      )}

      {/* Contact Section - placeholder */}
      {homepage.contact && (
        <section className="py-16 bg-gray-50 pb-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">{homepage.contact.title}</h2>
            {homepage.contact.subtitle && (
              <p className="text-gray-600">{homepage.contact.subtitle}</p>
            )}
          </div>
        </section>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale = 'en' } = await paramsPromise

  // Fetch homepage data for metadata
  const homepage = (await getCachedGlobal('homepage', 0, locale)()) as Homepage

  // Generate metadata for homepage global using SEO plugin fields
  return generateMetaForGlobal({
    global: homepage,
    path: '/',
  })
}
