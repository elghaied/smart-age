import React from 'react'
import ProjectsClient from './Component.client'
import type { Homepage, Project } from '@/payload-types'

interface ProjectsProps {
  projects: Homepage['projects']
  projectsData: Project[]
  locale: string
}

export default function Projects({ projects, projectsData, locale }: ProjectsProps) {
  if (!projects || !projectsData?.length) return null

  return <ProjectsClient projects={projects} projectsData={projectsData} locale={locale} />
}
