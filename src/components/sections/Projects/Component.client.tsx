'use client'

import { motion } from 'framer-motion'
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
  Sparkles,
  Clock,
  CheckCircle2,
  Zap,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Timeline } from '@/components/ui/timeline'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Media } from '@/components/Media'
import type { Homepage, Project, Media as MediaType } from '@/payload-types'
import { useState } from 'react'

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
  const [modalImageIndex, setModalImageIndex] = useState(0)

  const validImages = images.filter(
    (img): img is MediaType => typeof img === 'object' && img !== null,
  )

  if (validImages.length === 0) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
  }

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % validImages.length)
  }

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length)
  }

  return (
    <div className="mb-4 relative group">
      <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
        <Media
          resource={validImages[currentImageIndex]}
          className="w-full h-40 object-cover transition-all duration-500 group-hover:scale-110"
        />

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Image Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <motion.button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.button>
            <motion.button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </>
        )}

        {/* Enhanced Image Counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
            {currentImageIndex + 1} / {validImages.length}
          </div>
        )}

        {/* Enhanced Zoom Overlay */}
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center cursor-pointer"
              onClick={() => setModalImageIndex(currentImageIndex)}
            >
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3 border border-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ZoomIn className="h-5 w-5 text-gray-800" />
              </motion.div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-6xl w-full">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">{projectName}</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <Media
                resource={validImages[modalImageIndex]}
                className="w-full max-h-[70vh] object-contain rounded-xl"
              />

              {/* Modal Navigation */}
              {validImages.length > 1 && (
                <>
                  <motion.button
                    onClick={prevModalImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </motion.button>
                  <motion.button
                    onClick={nextModalImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </motion.button>

                  {/* Modal Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
                    {modalImageIndex + 1} / {validImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Enhanced Image Thumbnails */}
            {validImages.length > 1 && (
              <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                {validImages.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setModalImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      index === modalImageIndex
                        ? 'border-primary shadow-lg scale-105'
                        : 'border-transparent hover:border-border hover:scale-105'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Media resource={image} className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}

            {projectDescription && (
              <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/30">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {projectDescription}
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

interface ProjectsTimelineProps {
  projects: Homepage['projects']
  projectsData: Project[]
  locale: string
}

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

// Group projects by year and sort them
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

  // Sort projects within each year by order
  Object.values(grouped).forEach((yearData) => {
    yearData.projects.sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  // Convert to array and sort by year (descending)
  return Object.values(grouped).sort((a, b) => Number.parseInt(b.year) - Number.parseInt(a.year))
}

// Calculate statistics from projects data
function calculateStats(projects: Project[], locale: string) {
  const completedCount = projects.filter((p) => p.status === 'completed' && p.isActive).length
  const inDevelopmentCount = projects.filter(
    (p) => p.status === 'in_development' && p.isActive,
  ).length

  // Calculate years of experience (from earliest project year to current year)
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
      label: locale === 'ar' ? 'مشاريع قيد التطوير' : 'Projects in Development',
    },
  ]
}

export default function ProjectsTimeline({
  projects,
  projectsData,
  locale,
}: ProjectsTimelineProps) {
  const timelineData = groupProjectsByYear(projectsData)
  const stats = calculateStats(projectsData, locale)

  // Transform data for Timeline component with enhanced styling
  const timelineEntries = timelineData.map((yearData) => ({
    title: yearData.year,
    content: (
      <div className="mb-8">
        <Card className="relative p-8 border border-border/50 hover:border-border transition-all duration-500 hover:shadow-2xl bg-gradient-to-br from-card via-card to-accent/5 overflow-hidden group">
          {/* Enhanced background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Enhanced Year Header */}
          <div className="relative mb-8">
            <div className="flex items-center gap-6 mb-6">
              <motion.div
                className="relative w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Calendar className="h-8 w-8 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
              </motion.div>
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-1">
                  {yearData.year}
                </h3>
                <p className="text-xl font-semibold text-foreground">{yearData.title}</p>
              </div>
            </div>
            <div className="h-px bg-gradient-to-r from-border via-accent/30 to-transparent" />
          </div>

          {/* Enhanced Projects Grid */}
          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {yearData.projects.map((project, projectIndex) => {
              const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Building
              const statusLabel = project.statusLabel || project.status

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{
                    duration: 0.5,
                    delay: projectIndex * 0.1,
                    type: 'spring',
                    stiffness: 300,
                  }}
                  viewport={{ once: true }}
                  className="relative bg-gradient-to-br from-muted/20 via-muted/30 to-accent/5 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-border/30 hover:border-accent/30 group/card overflow-hidden"
                >
                  {/* Card background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

                  {/* Enhanced Project Images */}
                  {project.image && Array.isArray(project.image) && project.image.length > 0 && (
                    <ProjectImageGallery
                      images={project.image}
                      projectName={project.name}
                      projectDescription={project.description}
                    />
                  )}

                  <div className="relative flex items-start gap-4">
                    <motion.div
                      className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <IconComponent className="h-6 w-6 text-primary" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground mb-2 text-base leading-tight group-hover/card:text-primary transition-colors duration-200">
                        {project.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Enhanced Status Badge */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <motion.div
                            className={`w-3 h-3 rounded-full shadow-sm ${
                              project.status === 'completed'
                                ? 'bg-green-500 shadow-green-500/30'
                                : project.status === 'in_development'
                                  ? 'bg-yellow-500 shadow-yellow-500/30'
                                  : 'bg-blue-500 shadow-blue-500/30'
                            }`}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-sm font-medium text-muted-foreground">
                            {statusLabel}
                          </span>
                        </div>

                        {/* Status Icon */}
                        {project.status === 'completed' && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                        {project.status === 'in_development' && (
                          <Zap className="h-4 w-4 text-yellow-500" />
                        )}
                        {project.status === 'planning' && (
                          <Clock className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </Card>
      </div>
    ),
  }))

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/20 to-accent/5 overflow-hidden"
    >
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-medium text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            {locale === 'ar' ? 'مشاريعنا المتميزة' : 'Our Featured Projects'}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {projects?.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            {projects?.subtitle}
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {projects?.description}
          </p>
        </motion.div>

        {/* Enhanced Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative text-center p-6 rounded-2xl bg-gradient-to-br from-card via-card to-accent/5 border border-border/30 hover:border-accent/30 transition-all duration-300 hover:shadow-lg group"
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <motion.div
                  className="text-4xl lg:text-5xl font-bold text-primary mb-3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, type: 'spring', stiffness: 300 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm font-medium text-muted-foreground leading-relaxed">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced Timeline */}
      <div className="relative">
        <Timeline data={timelineEntries} />
      </div>
    </section>
  )
}
