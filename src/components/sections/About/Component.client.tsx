'use client'

import { motion } from 'framer-motion'
import { Award, Heart, Lightbulb, Target, Users, Zap } from 'lucide-react'
import type { Homepage, Value } from '@/payload-types'

interface AboutClientProps {
  about: Homepage['about']
  values: Value[]
}

const iconMap = {
  Lightbulb,
  Heart,
  Award,
  Zap,
  Target,
  Users,
} as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
}

const floatVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut' as const,
    },
  },
}

function extractText(richText: unknown): string {
  if (
    richText &&
    typeof richText === 'object' &&
    'root' in richText &&
    richText.root &&
    typeof richText.root === 'object' &&
    'children' in richText.root &&
    Array.isArray(richText.root.children) &&
    richText.root.children[0] &&
    typeof richText.root.children[0] === 'object' &&
    'children' in richText.root.children[0] &&
    Array.isArray(richText.root.children[0].children) &&
    richText.root.children[0].children[0] &&
    typeof richText.root.children[0].children[0] === 'object' &&
    'text' in richText.root.children[0].children[0]
  ) {
    return richText.root.children[0].children[0].text as string
  }
  return ''
}

export default function AboutClient({ about, values }: AboutClientProps) {
  if (!about) return null

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header with Split Design */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Title & Subtitle */}
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
                {about.title}
              </h2>
              <motion.div
                className="w-20 h-1.5 bg-gradient-to-r from-primary via-accent to-primary rounded-full mt-6"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              />
            </motion.div>

            {/* Right: Description */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
                {about.subtitle}
              </p>
              <p className="text-lg text-muted-foreground/80 mt-4 leading-relaxed">
                {extractText(about.description)}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
        >
          {/* Mission Card - Spans 2 columns on large screens */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="md:col-span-2 lg:col-span-2 group"
          >
            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 hover:border-primary/40 transition-colors duration-300 relative overflow-hidden">
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Target className="h-7 w-7 text-primary-foreground" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {about.mission?.title || 'Our Mission'}
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {extractText(about.mission?.text)}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Values Title Card */}
          <motion.div
            variants={floatVariants}
            className="flex items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-accent/10 to-transparent border border-accent/20"
          >
            <div className="text-center">
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center"
              >
                <Heart className="h-8 w-8 text-primary-foreground" />
              </motion.div>
              <h3 className="text-2xl font-bold text-foreground">
                {about.valuesTitle || 'Our Values'}
              </h3>
            </div>
          </motion.div>

          {/* Value Cards */}
          {values.map((value, index) => {
            const IconComponent = iconMap[value.icon as keyof typeof iconMap] || Lightbulb
            const isWide = index === 0 && values.length > 2

            return (
              <motion.div
                key={value.id}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`group ${isWide ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 border border-primary/10"
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <IconComponent className="h-6 w-6 text-primary group-hover:text-accent transition-colors duration-300" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {value.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Call to Action - Full Width Banner */}
        {about.aboutUsCallToAction && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div className="relative rounded-3xl overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              <div className="relative z-10 p-8 sm:p-12">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="flex-1">
                    <motion.h3
                      className="text-2xl sm:text-3xl font-bold text-foreground mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {about.aboutUsCallToAction.title}
                    </motion.h3>
                    <motion.p
                      className="text-lg text-muted-foreground"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                    >
                      {about.aboutUsCallToAction.description}
                    </motion.p>
                  </div>

                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1, delayChildren: 0.4 },
                      },
                    }}
                  >
                    {about.aboutUsCallToAction.strongPoints?.map((point, i) => (
                      <motion.div
                        key={i}
                        variants={{
                          hidden: { opacity: 0, scale: 0.8 },
                          visible: { opacity: 1, scale: 1 },
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 shadow-sm"
                      >
                        <motion.div
                          className={`w-2.5 h-2.5 rounded-full ${
                            i === 0 ? 'bg-primary' : i === 1 ? 'bg-accent' : 'bg-secondary'
                          }`}
                          animate={{
                            scale: [1, 1.3, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                        <span className="font-medium text-foreground whitespace-nowrap">
                          {point.point}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
