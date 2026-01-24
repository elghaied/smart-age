'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MapPin, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { Homepage } from '@/payload-types'

interface HeroProps {
  hero: Homepage['hero']
}

export default function Hero({ hero }: HeroProps) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, -100])
  const y2 = useTransform(scrollY, [0, 500], [0, 75])
  // Parallax transforms for floating elements
  const y = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  if (!hero) return null

  return (
    <section
      id="home"
      className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Improved animated background grid with teal tint */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(var(--primary)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--primary)/0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />

        {/* Enhanced floating geometric shapes with teal colors */}
        <motion.div
          style={{ y }}
          className="absolute top-20 left-10 w-24 h-24 bg-primary/15 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-40 right-20 w-40 h-40 bg-accent/12 rounded-2xl blur-2xl rotate-45"
          animate={{
            rotate: [45, 90, 45],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-secondary/15 rounded-full blur-xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />

        {/* Additional decorative elements */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-accent rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-primary rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          {/* Enhanced Company badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            {hero.established && (
              <motion.div
                className="flex items-center gap-2 bg-card/60 backdrop-blur-md border border-border/50 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                whileHover={{ y: -2 }}
              >
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">
                  {hero.established}
                </span>
              </motion.div>
            )}
            {hero.location && (
              <motion.div
                className="flex items-center gap-2 bg-card/60 backdrop-blur-md border border-border/50 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                whileHover={{ y: -2 }}
              >
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">{hero.location}</span>
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced Main title with improved typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold text-foreground mb-8 text-balance leading-[1.1] tracking-tight"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            {hero.title}
          </motion.h1>

          {/* Enhanced Subtitle with improved animation */}
          {hero.subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mb-8"
            >
              <p
                className="text-xl sm:text-2xl lg:text-4xl text-primary mb-3 text-balance font-semibold tracking-wide"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                {hero.subtitle}
              </p>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
              />
            </motion.div>
          )}

          {/* Enhanced Description with better typography */}
          {hero.description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto text-pretty leading-relaxed font-light"
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              {hero.description}
            </motion.p>
          )}

          {/* Enhanced Feature highlights */}
          {hero.features && hero.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {hero.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-3 bg-card/40 backdrop-blur-md border border-border/50 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Zap className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Enhanced Call to Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {hero.primaryCTA?.text && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto group relative overflow-hidden px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 "
                  asChild={!!hero.primaryCTA.link}
                >
                  {hero.primaryCTA.link ? (
                    <Link href={hero.primaryCTA.link}>
                      <span className="relative z-10 flex items-center gap-3">
                        {hero.primaryCTA.text}
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ) : (
                    <span className="relative z-10 flex items-center gap-3">
                      {hero.primaryCTA.text}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </Button>
              </motion.div>
            )}

            {hero.secondaryCTA?.text && (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-card/30 backdrop-blur-md border-border/50 px-8 py-4 text-base font-semibold 
             hover:bg-accent/10 hover:border-accent/30 hover:text-foreground transition-all duration-300"
                  asChild={!!hero.secondaryCTA.link}
                >
                  {hero.secondaryCTA.link ? (
                    <Link href={hero.secondaryCTA.link}>{hero.secondaryCTA.text}</Link>
                  ) : (
                    <span>{hero.secondaryCTA.text}</span>
                  )}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      >
        <div className="w-7 h-12 border-2 border-muted-foreground/60 rounded-full flex justify-center relative">
          <motion.div
            className="w-1.5 h-4 bg-gradient-to-b from-primary to-accent rounded-full mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}
