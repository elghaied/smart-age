'use client'

import { motion } from 'framer-motion'
import {
  Globe,
  Target,
  Lightbulb,
  Clock,
  Shield,
  Award,
  Users,
  Zap,
  CheckCircle,
  Star,
  ThumbsUp,
  Rocket,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { Homepage, Feature } from '@/payload-types'

interface WhyUsClientProps {
  whyUs: Homepage['whyUs']
  features: Feature[]
}

// Icon mapping for features
const iconMap = {
  Globe,
  Target,
  Lightbulb,
  Clock,
  Shield,
  Award,
  Users,
  Zap,
  CheckCircle,
  Star,
  ThumbsUp,
  Rocket,
} as const

export default function WhyUsClient({ whyUs, features }: WhyUsClientProps) {
  if (!whyUs) return null

  return (
    <section id="why-us" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{whyUs.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{whyUs.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Lightbulb

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="p-6 h-full text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
