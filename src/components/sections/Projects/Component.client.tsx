'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Building,
  Shield,
  Server,
  Smartphone,
  Globe,
  Cloud,
  BarChart3,
  Database,
  Cpu,
  Users,
  Award,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Zap,
  Clock,
  X,
} from 'lucide-react'
import { Media } from '@/components/Media'
import type { Homepage, Project, Media as MediaType } from '@/payload-types'
import { useState, useRef } from 'react'

// Icon mapping for projects
const iconMap = {
  Building,
  Shield,
  Server,
  Smartphone,
  Globe,
  Cloud,
  BarChart3,
  Database,
  Cpu,
  Users,
  Award,
} as const

interface ProjectImageGalleryProps {
  images: (string | MediaType)[]
  projectName: string
  projectDescription?: string
}

function ProjectImageGallery({
  images,
  projectName,
  projectDescription,
}: ProjectImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const validImages = images.filter(
    (img): img is MediaType => typeof img === 'object' && img !== null,
  )

  if (validImages.length === 0) return null

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
  }

  return (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg group/gallery">
        <Media
          resource={validImages[currentImageIndex]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover/gallery:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300" />

        {/* Navigation arrows */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute start-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-foreground flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
            </button>
            <button
              onClick={nextImage}
              className="absolute end-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-foreground flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </>
        )}

        {/* Image counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-2 start-2 px-2 py-1 rounded-full bg-black/60 text-white text-xs font-medium">
            {currentImageIndex + 1} / {validImages.length}
          </div>
        )}

        {/* Zoom button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-2 end-2 w-8 h-8 rounded-full bg-white/90 text-foreground flex items-center justify-center opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
          aria-label="View full size"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-6xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-12 end-0 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main image */}
              <div className="relative flex-1 min-h-0">
                <Media
                  resource={validImages[currentImageIndex]}
                  className="w-full h-full object-contain rounded-lg"
                />

                {/* Modal navigation */}
                {validImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute start-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute end-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6 rtl:rotate-180" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {validImages.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center overflow-x-auto pb-2">
                  {validImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-white scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Media resource={image} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Project info */}
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-semibold">{projectName}</h3>
                {projectDescription && (
                  <p className="text-white/70 text-sm mt-2 max-w-2xl mx-auto">
                    {projectDescription}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Status badge component
function StatusBadge({ status, label }: { status: string; label: string }) {
  const config = {
    completed: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-600 dark:text-emerald-400',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
    },
    in_development: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-600 dark:text-amber-400',
      dot: 'bg-amber-500',
      icon: Zap,
    },
    planning: {
      bg: 'bg-sky-500/10',
      text: 'text-sky-600 dark:text-sky-400',
      dot: 'bg-sky-500',
      icon: Clock,
    },
  }

  const statusConfig = config[status as keyof typeof config] || config.planning
  const Icon = statusConfig.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
      {label}
      <Icon className="w-3 h-3" />
    </span>
  )
}

// Single project card
function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
}) {
  const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Building
  const statusLabel = project.statusLabel || project.status
  const hasImages = project.image && Array.isArray(project.image) && project.image.length > 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
        {/* Subtle gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content */}
        <div className="relative">
          {/* Image section */}
          {hasImages && (
            <div className="p-3 pb-0">
              <ProjectImageGallery
                images={project.image!}
                projectName={project.name}
                projectDescription={project.description}
              />
            </div>
          )}

          {/* Text content */}
          <div className="p-5 pt-4">
            {/* Header with icon */}
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <IconComponent className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground text-base leading-tight mb-1 group-hover:text-primary transition-colors duration-300">
                  {project.name}
                </h4>
                <StatusBadge status={project.status} label={statusLabel} />
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

// Year section with projects
function YearSection({
  year,
  title,
  projects,
}: {
  year: string
  title: string
  projects: Project[]
}) {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Year header - spans full width with centered badge */}
      <div className="relative mb-12">
        {/* Horizontal decorative line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Year badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex justify-center"
        >
          <div className="bg-background px-6 flex items-center gap-4">
            <div className="flex items-center gap-3 bg-primary text-primary-foreground px-5 py-3 rounded-2xl shadow-lg shadow-primary/20">
              <Calendar className="w-5 h-5" />
              <span className="text-2xl font-bold tracking-tight">{year}</span>
            </div>
            {title !== year && (
              <span className="text-lg font-medium text-muted-foreground hidden sm:block">
                {title}
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Projects grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, projectIndex) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={projectIndex}
          />
        ))}
      </div>
    </motion.section>
  )
}

// Statistics card
function StatCard({
  value,
  label,
  index,
}: {
  value: string
  label: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 text-center">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{
            type: 'spring',
            stiffness: 200,
            delay: index * 0.1 + 0.3,
          }}
          className="relative"
        >
          <div className="text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">
            {value}
          </div>
          <div className="text-sm text-muted-foreground font-medium">{label}</div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Group projects by year
function groupProjectsByYear(projects: Project[]) {
  const grouped = projects
    .filter((project) => project.isActive)
    .reduce(
      (acc, project) => {
        const year = project.year
        if (!acc[year]) {
          acc[year] = {
            year,
            title: project.yearTitle || year,
            projects: [],
          }
        }
        acc[year].projects.push(project)
        return acc
      },
      {} as Record<string, { year: string; title: string; projects: Project[] }>,
    )

  Object.values(grouped).forEach((yearData) => {
    yearData.projects.sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  return Object.values(grouped).sort((a, b) => Number.parseInt(b.year) - Number.parseInt(a.year))
}

// Calculate statistics
function calculateStats(projects: Project[], locale: string) {
  const completedCount = projects.filter((p) => p.status === 'completed' && p.isActive).length
  const inDevelopmentCount = projects.filter(
    (p) => p.status === 'in_development' && p.isActive,
  ).length

  const years = projects.map((p) => Number.parseInt(p.year)).filter((y) => !isNaN(y))
  const earliestYear = Math.min(...years)
  const currentYear = new Date().getFullYear()
  const yearsExperience = currentYear - earliestYear + 1

  return [
    {
      value: `${completedCount}+`,
      label: locale === 'ar' ? 'مشروع مكتمل' : 'Completed Projects',
    },
    {
      value: yearsExperience.toString(),
      label: locale === 'ar' ? 'سنوات خبرة' : 'Years Experience',
    },
    {
      value: '50+',
      label: locale === 'ar' ? 'عميل راضي' : 'Satisfied Clients',
    },
    {
      value: inDevelopmentCount.toString(),
      label: locale === 'ar' ? 'مشاريع قيد التطوير' : 'In Development',
    },
  ]
}

// Main component
interface ProjectsTimelineProps {
  projects: Homepage['projects']
  projectsData: Project[]
  locale: string
}

export default function ProjectsTimeline({
  projects,
  projectsData,
  locale,
}: ProjectsTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineData = groupProjectsByYear(projectsData)
  const stats = calculateStats(projectsData, locale)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Animated timeline line
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 start-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute bottom-1/4 end-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {locale === 'ar' ? 'رحلتنا' : 'Our Journey'}
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            {projects?.title}
          </h2>

          {/* Subtitle */}
          {projects?.subtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
              {projects.subtitle}
            </p>
          )}

          {/* Description */}
          {projects?.description && (
            <p className="text-base text-muted-foreground/80 max-w-3xl mx-auto">
              {projects.description}
            </p>
          )}
        </motion.header>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-24">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} index={index} />
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central vertical timeline line */}
          <div className="absolute top-0 bottom-0 start-1/2 -translate-x-1/2 w-px hidden lg:block">
            {/* Background line */}
            <div className="absolute inset-0 bg-border/50" />
            {/* Animated progress line */}
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-primary to-transparent"
              style={{ height: timelineHeight }}
            />
          </div>

          {/* Year sections */}
          <div className="space-y-24">
            {timelineData.map((yearData) => (
              <YearSection
                key={yearData.year}
                year={yearData.year}
                title={yearData.title}
                projects={yearData.projects}
              />
            ))}
          </div>
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-20"
        >
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span className="w-8 h-px bg-border" />
            <span>{locale === 'ar' ? 'وما زلنا نبني المزيد' : 'And still building more'}</span>
            <span className="w-8 h-px bg-border" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
