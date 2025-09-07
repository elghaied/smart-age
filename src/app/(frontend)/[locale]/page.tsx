import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'
import { TypedLocale } from 'payload'
import type { Homepage, ContactInfo } from '@/payload-types'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { generateMetaForGlobal } from '@/utilities/generateMeta'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import WhyUs from '@/components/sections/WhyUs'
import Goals from '@/components/sections/Goals'
import Projects from '@/components/sections/Projects'
import Services from '@/components/sections/Services'
import Team from '@/components/sections/Team'
import Contact from '@/components/sections/Contact'
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

  // Fetch ContactInfo global data
  const contactInfo = (await getCachedGlobal('contact-info', 0, locale)()) as ContactInfo

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

      {/* Services Section */}
      <Services services={homepage.services} />

      {/* Team Section */}
      <Team team={homepage.team} locale={locale} />

      {/* Contact Section */}
      {homepage.contact && contactInfo && (
        <Contact contact={homepage.contact} contactInfo={contactInfo} locale={locale} />
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
