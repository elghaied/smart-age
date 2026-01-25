import React from 'react'
import type { Career } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { formatDateTime } from '@/utilities/formatDateTime'

// Icons using simple SVG paths
const BriefcaseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const LocationIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const HomeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const BuildingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CurrencyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

// Localization maps
const labels = {
  en: {
    jobType: 'Job Type',
    workMode: 'Work Mode',
    location: 'Location',
    department: 'Department',
    experienceLevel: 'Experience Level',
    experienceYears: 'Experience',
    salaryRange: 'Salary',
    applicationDeadline: 'Apply By',
    status: 'Status',
    active: 'Actively Hiring',
    closed: 'Closed',
  },
  ar: {
    jobType: 'نوع الوظيفة',
    workMode: 'نمط العمل',
    location: 'الموقع',
    department: 'القسم',
    experienceLevel: 'مستوى الخبرة',
    experienceYears: 'الخبرة',
    salaryRange: 'الراتب',
    applicationDeadline: 'آخر موعد',
    status: 'الحالة',
    active: 'التوظيف نشط',
    closed: 'مغلق',
  },
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
    entry: 'Entry Level',
    mid: 'Mid Level',
    senior: 'Senior Level',
    lead: 'Lead',
    executive: 'Executive',
  },
  ar: {
    entry: 'مستوى مبتدئ',
    mid: 'مستوى متوسط',
    senior: 'مستوى كبير',
    lead: 'قائد',
    executive: 'تنفيذي',
  },
}

interface SpecItemProps {
  icon: React.ReactNode
  label: string
  value: string
  highlight?: boolean
}

const SpecItem: React.FC<SpecItemProps> = ({ icon, label, value, highlight }) => (
  <div
    className={cn(
      'flex flex-col gap-2 p-4 rounded-lg',
      'bg-card/50 backdrop-blur-sm border border-border/50',
      'transition-colors duration-200 hover:bg-card/80',
      highlight && 'ring-2 ring-primary/20',
    )}
  >
    <div className="flex items-center gap-2 text-muted-foreground">
      {icon}
      <span className="text-sm font-medium uppercase tracking-wide">{label}</span>
    </div>
    <p className="text-base font-semibold text-foreground">{value}</p>
  </div>
)

interface StatusBadgeProps {
  isActive: boolean
  locale: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ isActive, locale }) => {
  const l = labels[locale as keyof typeof labels] || labels.en

  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-4 rounded-lg',
        'bg-card/50 backdrop-blur-sm border border-border/50',
        'transition-colors duration-200',
      )}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <CheckCircleIcon />
        <span className="text-sm font-medium uppercase tracking-wide">{l.status}</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
            isActive
              ? 'bg-green-500/20 text-green-600 dark:text-green-400'
              : 'bg-red-500/20 text-red-600 dark:text-red-400',
          )}
        >
          <span
            className={cn(
              'w-2 h-2 rounded-full me-2',
              isActive ? 'bg-green-500' : 'bg-red-500',
            )}
          />
          {isActive ? l.active : l.closed}
        </span>
      </div>
    </div>
  )
}

interface JobSpecificationsProps {
  career: Career
  locale: string
}

export const JobSpecifications: React.FC<JobSpecificationsProps> = ({ career, locale }) => {
  const l = labels[locale as keyof typeof labels] || labels.en
  const jobTypes = jobTypeLabels[locale as keyof typeof jobTypeLabels] || jobTypeLabels.en
  const workModes = workModeLabels[locale as keyof typeof workModeLabels] || workModeLabels.en
  const expLevels =
    experienceLevelLabels[locale as keyof typeof experienceLevelLabels] || experienceLevelLabels.en

  const {
    jobType,
    workMode,
    location,
    department,
    experienceLevel,
    experienceYears,
    salaryRange,
    applicationDeadline,
    isActive,
  } = career

  const specs: Array<{
    icon: React.ReactNode
    label: string
    value: string
    show: boolean
    highlight?: boolean
  }> = [
    {
      icon: <BriefcaseIcon />,
      label: l.jobType,
      value: jobType ? jobTypes[jobType as keyof typeof jobTypes] || jobType : '',
      show: Boolean(jobType),
    },
    {
      icon: <HomeIcon />,
      label: l.workMode,
      value: workMode ? workModes[workMode as keyof typeof workModes] || workMode : '',
      show: Boolean(workMode),
    },
    {
      icon: <LocationIcon />,
      label: l.location,
      value: location || '',
      show: Boolean(location),
    },
    {
      icon: <BuildingIcon />,
      label: l.department,
      value: department || '',
      show: Boolean(department),
    },
    {
      icon: <ChartIcon />,
      label: l.experienceLevel,
      value: experienceLevel
        ? expLevels[experienceLevel as keyof typeof expLevels] || experienceLevel
        : '',
      show: Boolean(experienceLevel),
    },
    {
      icon: <ClockIcon />,
      label: l.experienceYears,
      value: experienceYears || '',
      show: Boolean(experienceYears),
    },
    {
      icon: <CurrencyIcon />,
      label: l.salaryRange,
      value: salaryRange || '',
      show: Boolean(salaryRange),
      highlight: true,
    },
    {
      icon: <CalendarIcon />,
      label: l.applicationDeadline,
      value: applicationDeadline ? formatDateTime(applicationDeadline) : '',
      show: Boolean(applicationDeadline),
    },
  ]

  const visibleSpecs = specs.filter((spec) => spec.show)

  if (visibleSpecs.length === 0 && isActive === undefined) {
    return null
  }

  return (
    <div className="max-w-5xl mx-auto my-8">
      <div
        className={cn(
          'grid gap-4',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4',
          'motion-safe:duration-700',
        )}
      >
        {visibleSpecs.map((spec, index) => (
          <SpecItem
            key={index}
            icon={spec.icon}
            label={spec.label}
            value={spec.value}
            highlight={spec.highlight}
          />
        ))}
        <StatusBadge isActive={isActive ?? true} locale={locale} />
      </div>
    </div>
  )
}

export default JobSpecifications
