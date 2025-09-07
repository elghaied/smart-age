import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'
import { TypedLocale } from 'payload'
import type { Homepage } from '@/payload-types'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMetaForGlobal } from '@/utilities/generateMeta'

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
    <article className="pt-16 pb-24">
      {draft && <LivePreviewListener />}

      {/* Hero Section - will be replaced with Hero component */}
      {homepage.hero && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">{homepage.hero.title}</h1>
            {homepage.hero.subtitle && (
              <p className="text-xl text-gray-600 mb-6">{homepage.hero.subtitle}</p>
            )}
            {homepage.hero.description && (
              <p className="text-gray-700 mb-8">{homepage.hero.description}</p>
            )}
            <div className="flex gap-4 justify-center">
              {homepage.hero.primaryCTA?.text && (
                <a
                  href={homepage.hero.primaryCTA.link || '#'}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                  {homepage.hero.primaryCTA.text}
                </a>
              )}
              {homepage.hero.secondaryCTA?.text && (
                <a
                  href={homepage.hero.secondaryCTA.link || '#'}
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
                >
                  {homepage.hero.secondaryCTA.text}
                </a>
              )}
            </div>
          </div>
        </section>
      )}

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
        <section className="py-16 bg-gray-50">
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
