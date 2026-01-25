'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Clock, Building, Briefcase, ArrowUpRight, Zap } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface CareerCardProps {
  career: {
    title?: string | null
    slug?: string | null
    location?: string | null
    department?: string | null
    jobType?: string | null
    workMode?: string | null
    experienceLevel?: string | null
    categories?: Array<{ title?: string | null } | string> | null
    meta?: {
      description?: string | null
    } | null
  }
  index: number
  locale: string
}

const jobTypeLabels = {
  en: {
    full_time: 'Full Time',
    part_time: 'Part Time',
    contract: 'Contract',
    internship: 'Internship',
  },
  ar: {
    full_time: 'دوام كامل',
    part_time: 'دوام جزئي',
    contract: 'عقد',
    internship: 'تدريب',
  },
}

const workModeLabels = {
  en: {
    on_site: 'On Site',
    remote: 'Remote',
    hybrid: 'Hybrid',
  },
  ar: {
    on_site: 'في الموقع',
    remote: 'عن بعد',
    hybrid: 'هجين',
  },
}

const experienceLevelLabels = {
  en: {
    entry: 'Entry',
    mid: 'Mid',
    senior: 'Senior',
    lead: 'Lead',
    executive: 'Executive',
  },
  ar: {
    entry: 'مبتدئ',
    mid: 'متوسط',
    senior: 'خبير',
    lead: 'قائد',
    executive: 'تنفيذي',
  },
}

export function CareerCard({ career, index, locale }: CareerCardProps) {
  const {
    title,
    slug,
    location,
    department,
    jobType,
    workMode,
    experienceLevel,
    categories,
    meta,
  } = career

  const jobTypes = jobTypeLabels[locale as keyof typeof jobTypeLabels] || jobTypeLabels.en
  const workModes = workModeLabels[locale as keyof typeof workModeLabels] || workModeLabels.en
  const expLevels =
    experienceLevelLabels[locale as keyof typeof experienceLevelLabels] || experienceLevelLabels.en

  const categoryName =
    categories && categories.length > 0
      ? typeof categories[0] === 'object'
        ? categories[0]?.title
        : categories[0]
      : null

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/careers/${slug}`} className="block">
        <div
          className={cn(
            'relative p-6 lg:p-8 rounded-2xl',
            'bg-card/80 backdrop-blur-sm',
            'border border-border/60',
            'transition-all duration-500 ease-out',
            'hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5',
            'hover:-translate-y-1',
            'overflow-hidden',
          )}
        >
          {/* Background Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:via-transparent group-hover:to-accent/5 transition-all duration-500" />

          {/* Corner Accent */}
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rotate-45 transform origin-center scale-0 group-hover:scale-100 transition-transform duration-500" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Top Row: Category + Experience Badge */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex flex-wrap items-center gap-2">
                {categoryName && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                    {categoryName}
                  </span>
                )}
                {experienceLevel && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                    <Zap className="w-3 h-3" />
                    {expLevels[experienceLevel as keyof typeof expLevels] || experienceLevel}
                  </span>
                )}
              </div>

              {/* Arrow Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>

            {/* Description */}
            {meta?.description && (
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
                {meta.description}
              </p>
            )}

            {/* Meta Info Row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {location && (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary/70" />
                  {location}
                </span>
              )}

              {jobType && (
                <span className="inline-flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-primary/70" />
                  {jobTypes[jobType as keyof typeof jobTypes] || jobType}
                </span>
              )}

              {workMode && (
                <span className="inline-flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-primary/70" />
                  {workModes[workMode as keyof typeof workModes] || workMode}
                </span>
              )}

              {department && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary/70" />
                  {department}
                </span>
              )}
            </div>

            {/* Bottom Border Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
