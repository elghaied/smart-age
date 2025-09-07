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
    <div className="mb-3 relative group">
      <div className="relative overflow-hidden rounded-lg">
        <Media
          resource={validImages[currentImageIndex]}
          className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Image Navigation Arrows */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {validImages.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {currentImageIndex + 1} / {validImages.length}
          </div>
        )}

        {/* Zoom Overlay */}
        <Dialog>
          <DialogTrigger asChild>
            <div
              className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center cursor-pointer"
              onClick={() => setModalImageIndex(currentImageIndex)}
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                <ZoomIn className="h-4 w-4 text-gray-800" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-6xl w-full">
            <DialogHeader>
              <DialogTitle>{projectName}</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <Media
                resource={validImages[modalImageIndex]}
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />

              {/* Modal Navigation */}
              {validImages.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Modal Image Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded">
                    {modalImageIndex + 1} / {validImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Image Thumbnails */}
            {validImages.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {validImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setModalImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === modalImageIndex
                        ? 'border-primary'
                        : 'border-transparent hover:border-border'
                    }`}
                  >
                    <Media resource={image} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {projectDescription && (
              <p className="text-sm text-muted-foreground mt-4">{projectDescription}</p>
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

  // Transform data for Timeline component
  const timelineEntries = timelineData.map((yearData) => ({
    title: yearData.year,
    content: (
      <div className="mb-8">
        <Card className="p-6 border-2 hover:shadow-lg transition-all duration-300">
          {/* Year Header */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary">{yearData.year}</h3>
                <p className="text-lg font-semibold text-foreground">{yearData.title}</p>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {yearData.projects.map((project, projectIndex) => {
              const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Building
              const statusLabel = project.statusLabel || project.status

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: projectIndex * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  {/* Project Images */}
                  {project.image && Array.isArray(project.image) && project.image.length > 0 && (
                    <ProjectImageGallery
                      images={project.image}
                      projectName={project.name}
                      projectDescription={project.description}
                    />
                  )}

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1 text-sm">{project.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            project.status === 'completed'
                              ? 'bg-green-500'
                              : project.status === 'in_development'
                                ? 'bg-yellow-500'
                                : 'bg-blue-500'
                          }`}
                        />
                        <span className="text-xs font-medium text-muted-foreground">
                          {statusLabel}
                        </span>
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
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{projects?.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            {projects?.subtitle}
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            {projects?.description}
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Timeline */}
      <Timeline data={timelineEntries} />
    </section>
  )
}
