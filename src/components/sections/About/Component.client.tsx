'use client'

import { motion } from 'framer-motion'
import { Award, Heart, Lightbulb, Target, Users, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            {about.title}
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            {about.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
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

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-accent/30">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {about.mission?.title || 'Our Mission'}
                  </h3>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-lg text-muted-foreground leading-relaxed">
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                {about.valuesTitle || 'Our Values'}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto lg:mx-0"></div>
            </div>

            <div className="space-y-6">
              {values.map((value, index) => {
                const IconComponent = iconMap[value.icon as keyof typeof iconMap] || Lightbulb

                return (
                  <motion.div
                    key={value.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border hover:border-accent/30 cursor-pointer">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-primary/20">
                          <IconComponent className="h-7 w-7 text-primary group-hover:text-accent transition-colors duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                            {value.title}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Additional Visual Enhancement - Stats or Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/10 hover:border-accent/20 transition-all duration-300">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Ready to Transform Your Business?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Join the growing number of businesses that trust Smart Age Tech to deliver
                innovative solutions that drive growth and success in the digital age.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="font-semibold">Innovative Solutions</span>
                </div>
                <div className="flex items-center gap-3 text-primary">
                  <div
                    className="w-3 h-3 bg-accent rounded-full animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                  <span className="font-semibold">Expert Team</span>
                </div>
                <div className="flex items-center gap-3 text-primary">
                  <div
                    className="w-3 h-3 bg-secondary rounded-full animate-pulse"
                    style={{ animationDelay: '1s' }}
                  ></div>
                  <span className="font-semibold">Proven Results</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
