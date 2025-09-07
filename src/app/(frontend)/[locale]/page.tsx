import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'
import { TypedLocale } from 'payload'
import type { Homepage } from '@/payload-types'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMetaForGlobal } from '@/utilities/generateMeta'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import WhyUs from '@/components/sections/WhyUs'
import Goals from '@/components/sections/Goals'
import Projects from '@/components/sections/Projects'
import { getCachedGoals } from '@/utilities/getGoals'
import { getCachedProjects } from '@/utilities/getProjects'

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

  // Fetch Goals data
  const goals = await getCachedGoals(locale)()

  // Fetch Projects data
  const projects = await getCachedProjects(locale)()

  if (!homepage) {
    return <div>Homepage data not found</div>
  }

  return (
    <article>
      {draft && <LivePreviewListener />}

      {/* Hero Section */}
      <Hero hero={homepage.hero} />

      {/* About Section */}
      <About about={homepage.about} />

      {/* Why Us Section */}
      <WhyUs whyUs={homepage.whyUs} />

      {/* Goals Section */}
      {homepage.goals && (
        <Goals title={homepage.goals.title!} subtitle={homepage.goals.subtitle!} goals={goals} />
      )}

      {/* Projects Section */}
      {homepage.projects && (
        <Projects projects={homepage.projects} projectsData={projects} locale={locale} />
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
