import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { CareersHero } from './CareersHero'
import { CareerCard } from './CareerCard'
import { Pagination } from '@/components/Pagination'

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

const translations = {
  en: {
    title: 'Join Our Team',
    subtitle: 'Shape the future with us',
    description:
      'Discover opportunities to grow, innovate, and make an impact. We are looking for passionate individuals ready to push boundaries.',
    openPositions: 'Open Positions',
    noPositions: 'No open positions at the moment',
    checkBack: 'Check back soon for new opportunities',
    showing: 'Showing',
    of: 'of',
    positions: 'positions',
  },
  ar: {
    title: 'انضم إلى فريقنا',
    subtitle: 'اصنع المستقبل معنا',
    description:
      'اكتشف فرصاً للنمو والابتكار وإحداث التأثير. نحن نبحث عن أفراد شغوفين مستعدين لتجاوز الحدود.',
    openPositions: 'الوظائف المتاحة',
    noPositions: 'لا توجد وظائف متاحة حالياً',
    checkBack: 'تابعنا قريباً للفرص الجديدة',
    showing: 'عرض',
    of: 'من',
    positions: 'وظيفة',
  },
}

export default async function Page({ params }: Args) {
  const { locale } = await params
  const t = translations[locale as keyof typeof translations] || translations.en

  const payload = await getPayload({ config: configPromise })

  const careers = await payload.find({
    collection: 'careers',
    depth: 1,
    limit: 12,
    locale,
    overrideAccess: false,
    where: {
      isActive: {
        equals: true,
      },
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      jobType: true,
      workMode: true,
      location: true,
      department: true,
      experienceLevel: true,
      isActive: true,
      meta: true,
      publishedAt: true,
    },
  })

  return (
    <div className="min-h-screen">
      <PageClient />

      {/* Hero Section */}
      <CareersHero
        title={t.title}
        subtitle={t.subtitle}
        description={t.description}
        openPositionsCount={careers.totalDocs}
        locale={locale}
      />

      {/* Positions Section */}
      <section className="relative py-20 lg:py-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="container relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
                {t.openPositions}
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {careers.totalDocs > 0 ? (
                  <>
                    {t.showing}{' '}
                    <span className="text-primary">{careers.docs.length}</span> {t.of}{' '}
                    <span className="text-primary">{careers.totalDocs}</span> {t.positions}
                  </>
                ) : (
                  t.noPositions
                )}
              </h2>
            </div>
          </div>

          {/* Career Cards Grid */}
          {careers.docs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {careers.docs.map((career, index) => (
                <CareerCard key={career.slug} career={career} index={index} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Empty State */}
              <div className="flex flex-col items-center justify-center py-20 lg:py-32">
                <div className="relative mb-8">
                  {/* Decorative circles */}
                  <div className="absolute inset-0 rounded-full bg-primary/5 animate-ping" />
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-primary/60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{t.noPositions}</h3>
                <p className="text-muted-foreground text-lg">{t.checkBack}</p>
              </div>
            </div>
          )}

          {/* Pagination */}
          {careers.totalPages > 1 && careers.page && (
            <div className="mt-16">
              <Pagination page={careers.page} totalPages={careers.totalPages} />
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const t = translations[locale as keyof typeof translations] || translations.en

  return {
    title: `${t.title} | Smart Age`,
    description: t.description,
  }
}
