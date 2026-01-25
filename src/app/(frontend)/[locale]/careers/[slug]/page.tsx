import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { JobSpecifications } from '@/components/JobSpecifications'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import type { Career } from '@/payload-types'

export async function generateStaticParams() {
  return []
}

type Args = {
  params: Promise<{
    slug?: string
    locale: TypedLocale
  }>
}

// Section component for requirement sections
const RequirementSection: React.FC<{
  title: string
  data: Career['responsibilities']
  locale: string
}> = ({ title, data }) => {
  if (!data) return null

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">{title}</h2>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <RichText data={data} enableGutter={false} />
      </div>
    </section>
  )
}

// Localized section titles
const sectionTitles = {
  en: {
    responsibilities: 'Responsibilities',
    qualifications: 'Qualifications',
    preferredQualifications: 'Preferred Qualifications',
    benefits: 'Benefits',
    applyNow: 'Apply Now',
    relatedCareers: 'Related Careers',
  },
  ar: {
    responsibilities: 'المسؤوليات',
    qualifications: 'المؤهلات',
    preferredQualifications: 'المؤهلات المفضلة',
    benefits: 'المزايا',
    applyNow: 'قدم الآن',
    relatedCareers: 'وظائف ذات صلة',
  },
}

export default async function Career({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', locale } = await paramsPromise
  const url = '/careers/' + slug
  const post = await queryCareerBySlug({ slug, locale })

  if (!post) return <PayloadRedirects url={url} />

  const titles = sectionTitles[locale as keyof typeof sectionTitles] || sectionTitles.en

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          {/* Job Specifications */}
          <JobSpecifications career={post} locale={locale} />

          {/* Job Description */}
          <div className="max-w-[48rem] mx-auto">
            <RichText className="" data={post.content} enableGutter={false} />
          </div>

          {/* Requirements Sections */}
          <div className="max-w-[48rem] mx-auto">
            <RequirementSection
              title={titles.responsibilities}
              data={post.responsibilities}
              locale={locale}
            />

            <RequirementSection
              title={titles.qualifications}
              data={post.qualifications}
              locale={locale}
            />

            <RequirementSection
              title={titles.preferredQualifications}
              data={post.preferredQualifications}
              locale={locale}
            />

            <RequirementSection title={titles.benefits} data={post.benefits} locale={locale} />
          </div>

          {/* Application Form */}
          {post.applicationForm && post.applicationForm.length > 0 && (
            <section className="my-12 max-w-[48rem] mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-foreground">{titles.applyNow}</h2>
              <RenderBlocks blocks={post.applicationForm} />
            </section>
          )}

          {/* Related Careers */}
          {post.relatedCareers && post.relatedCareers.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground max-w-[52rem] mx-auto">
                {titles.relatedCareers}
              </h2>
              <RelatedPosts
                className="max-w-[52rem] mx-auto lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
                docs={post.relatedCareers.filter((career) => typeof career === 'object')}
              />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', locale } = await paramsPromise
  const post = await queryCareerBySlug({ slug, locale })

  return generateMeta({ doc: post })
}

const queryCareerBySlug = cache(async ({ slug, locale }: { slug: string; locale: TypedLocale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'careers',
    draft,
    locale,
    limit: 1,
    depth: 2,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
