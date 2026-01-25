'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, Users, Sparkles, ArrowDown } from 'lucide-react'

interface CareersHeroProps {
  title: string
  subtitle: string
  description: string
  openPositionsCount: number
  locale: string
}

export function CareersHero({
  title,
  subtitle,
  description,
  openPositionsCount,
  locale,
}: CareersHeroProps) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, -80])
  const y2 = useTransform(scrollY, [0, 500], [0, 60])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const scale = useTransform(scrollY, [0, 400], [1, 0.95])
  const isRTL = locale === 'ar'

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(var(--primary)/0.06)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--primary)/0.06)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Diagonal Accent Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 right-0 w-[200%] h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent origin-right rotate-[-15deg] translate-y-[30vh]"
        style={{ transformOrigin: isRTL ? 'left' : 'right' }}
      />

      {/* Floating Geometric Shapes */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[15%] left-[8%] w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/10 blur-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-[20%] right-[10%] w-48 h-48 rounded-full bg-gradient-to-tr from-accent/10 to-primary/15 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />

      {/* Animated Dots Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale }}
        className="container relative z-10 pt-24 pb-16"
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card/60 backdrop-blur-md border border-border/50 shadow-lg">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/15">
                <Briefcase className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {openPositionsCount > 0 ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                      {openPositionsCount}
                    </span>
                    <span className="text-muted-foreground">
                      {locale === 'ar' ? 'فرصة متاحة' : 'Open Positions'}
                    </span>
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    {locale === 'ar' ? 'الوظائف القادمة' : 'Coming Soon'}
                  </span>
                )}
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-center mb-6"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-foreground tracking-tight leading-[1.05]">
              {title}
            </h1>
          </motion.div>

          {/* Subtitle with animated underline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative text-center mb-8"
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-primary">
              {subtitle}
            </span>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-1 max-w-[200px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            {[
              {
                icon: Users,
                text: locale === 'ar' ? 'فريق متنوع' : 'Diverse Team',
              },
              {
                icon: Sparkles,
                text: locale === 'ar' ? 'نمو مهني' : 'Career Growth',
              },
              {
                icon: Briefcase,
                text: locale === 'ar' ? 'مشاريع مبتكرة' : 'Innovative Projects',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-card/40 backdrop-blur-sm border border-border/40 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                <item.icon className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            {locale === 'ar' ? 'اكتشف المزيد' : 'Explore'}
          </span>
          <div className="w-10 h-14 rounded-full border-2 border-muted-foreground/40 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-4 rounded-full bg-gradient-to-b from-primary to-accent"
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
