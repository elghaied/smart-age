'use client'

import { motion } from 'framer-motion'
import { Award, Heart, Lightbulb, Target, Users, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import type { Homepage, Value } from '@/payload-types'

interface AboutClientProps {
  about: Homepage['about']
  values: Value[]
}

// Icon mapping for values
const iconMap = {
  Lightbulb,
  Heart,
  Award,
  Zap,
  Target,
  Users,
} as const

export default function AboutClient({ about, values }: AboutClientProps) {
  if (!about) return null

  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{about.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{about.subtitle}</p>
          <p className="text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {/* Convert rich text to plain text for this simple display */}
            {about.description &&
            typeof about.description === 'object' &&
            'root' in about.description &&
            about.description.root &&
            'children' in about.description.root &&
            Array.isArray(about.description.root.children) &&
            about.description.root.children[0] &&
            'children' in about.description.root.children[0] &&
            Array.isArray(about.description.root.children[0].children) &&
            about.description.root.children[0].children[0] &&
            'text' in about.description.root.children[0].children[0]
              ? about.description.root.children[0].children[0].text
              : ''}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {about.mission?.title || 'Our Mission'}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {/* Convert rich text to plain text for this simple display */}
                {about.mission?.text &&
                typeof about.mission.text === 'object' &&
                'root' in about.mission.text &&
                about.mission.text.root &&
                'children' in about.mission.text.root &&
                Array.isArray(about.mission.text.root.children) &&
                about.mission.text.root.children[0] &&
                'children' in about.mission.text.root.children[0] &&
                Array.isArray(about.mission.text.root.children[0].children) &&
                about.mission.text.root.children[0].children[0] &&
                'text' in about.mission.text.root.children[0].children[0]
                  ? about.mission.text.root.children[0].children[0].text
                  : ''}
              </p>
            </Card>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">
              {about.valuesTitle || 'Our Values'}
            </h3>
            <div className="space-y-4">
              {values.map((value, index) => {
                const IconComponent = iconMap[value.icon as keyof typeof iconMap] || Lightbulb

                return (
                  <motion.div
                    key={value.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-card/50 border border-border"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
