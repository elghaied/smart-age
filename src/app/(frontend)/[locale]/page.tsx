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
import {
  queryGoalsByLocale,
  queryProjectsByLocale,
  queryServicesByLocale,
  queryTeamMembersByLocale,
} from '@/utilities/queryCollections'

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function LandingPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale = 'en' } = await paramsPromise

  // Fetch all data in parallel
  const [homepage, contactInfo, goals, projects, services, teamMembers] = await Promise.all([
    getCachedGlobal('homepage', 0, locale)() as Promise<Homepage>,
    getCachedGlobal('contact-info', 2, locale)() as Promise<ContactInfo>,
    queryGoalsByLocale({ locale, draft }),
    queryProjectsByLocale({ locale, draft }),
    queryServicesByLocale({ locale, draft }),
    queryTeamMembersByLocale({ locale, draft }),
  ])

  if (!homepage) {
    return <div>Homepage data not found</div>
  }

  return (
    <article>
      {draft && <LivePreviewListener />}

      {/* Hero Section */}
      <Hero hero={homepage.hero} />

      {/* About Section */}
      <About about={homepage.about} locale={locale} />

      {/* Why Us Section */}
      <WhyUs whyUs={homepage.whyUs} locale={locale} />

      {/* Goals Section */}
      {homepage.goals && (
        <Goals title={homepage.goals.title!} subtitle={homepage.goals.subtitle!} goals={goals} />
      )}

      {/* Projects Section */}
      {homepage.projects && (
        <Projects projects={homepage.projects} projectsData={projects} locale={locale} />
      )}

      {/* Services Section */}
      <Services services={homepage.services} servicesData={services} />

      {/* Team Section */}
      <Team team={homepage.team} teamMembers={teamMembers} />

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
