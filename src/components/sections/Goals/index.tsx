'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  Target,
  Shield,
  Server,
  Globe,
  Award,
  Zap,
  TrendingUp,
  Users,
  Lightbulb,
  Heart,
  Flag,
} from 'lucide-react'
import type { Goal } from '@/payload-types'

// Icon mapping for the Goals collection
const iconMap = {
  Target,
  Shield,
  Server,
  Globe,
  Award,
  Zap,
  TrendingUp,
  Users,
  Lightbulb,
  Heart,
  CheckCircle,
  Flag,
}

interface GoalsProps {
  title?: string
  subtitle?: string
  goals: Goal[]
}

export const Goals: React.FC<GoalsProps> = ({ title, subtitle, goals }) => {
  // Filter active goals and sort by order
  const activeGoals =
    goals?.filter((goal) => goal.isActive)?.sort((a, b) => (a.order || 0) - (b.order || 0)) || []

  if (!activeGoals.length) {
    return null
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
            )}
          </motion.div>
        )}

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeGoals.map((goal, index) => {
              const IconComponent = goal.icon
                ? iconMap[goal.icon as keyof typeof iconMap]
                : CheckCircle

              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 rounded-lg bg-card border border-border hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    {goal.shortTitle && (
                      <h3 className="font-semibold text-foreground mb-2">{goal.shortTitle}</h3>
                    )}
                    <p className="text-foreground leading-relaxed">{goal.text}</p>
                    {goal.progress !== null && goal.progress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Goals
