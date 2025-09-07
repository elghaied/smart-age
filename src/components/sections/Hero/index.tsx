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
      className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Floating geometric shapes */}
        <motion.div
          style={{ y }}
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-lg blur-xl rotate-45"
          animate={{
            rotate: [45, 90, 45],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 left-1/4 w-16 h-16 bg-secondary/10 rounded-full blur-lg"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          {/* Company badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {hero.established && (
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{hero.established}</span>
              </div>
            )}
            {hero.location && (
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{hero.location}</span>
              </div>
            )}
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight"
          >
            {hero.title}
          </motion.h1>

          {/* Subtitle with animated underline */}
          {hero.subtitle && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mb-6"
            >
              <p className="text-xl sm:text-2xl lg:text-3xl text-primary mb-2 text-balance font-medium">
                {hero.subtitle}
              </p>
              <motion.div
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.div>
          )}

          {/* Description */}
          {hero.description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-4xl mx-auto text-pretty leading-relaxed"
            >
              {hero.description}
            </motion.p>
          )}

          {/* Feature highlights */}
          {hero.features && hero.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-6 mb-10"
            >
              {hero.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className="flex items-center gap-2 bg-card/30 backdrop-blur-sm border border-border rounded-lg px-4 py-2"
                >
                  <Zap className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Call to Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {hero.primaryCTA?.text && (
              <Button
                size="lg"
                className="w-full sm:w-auto group relative overflow-hidden"
                asChild={!!hero.primaryCTA.link}
              >
                {hero.primaryCTA.link ? (
                  <Link href={hero.primaryCTA.link}>
                    <span className="relative z-10 flex items-center gap-2">
                      {hero.primaryCTA.text}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                ) : (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                      {hero.primaryCTA.text}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary to-accent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </>
                )}
              </Button>
            )}

            {hero.secondaryCTA?.text && (
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent backdrop-blur-sm"
                asChild={!!hero.secondaryCTA.link}
              >
                {hero.secondaryCTA.link ? (
                  <Link href={hero.secondaryCTA.link}>{hero.secondaryCTA.text}</Link>
                ) : (
                  <span>{hero.secondaryCTA.text}</span>
                )}
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}
