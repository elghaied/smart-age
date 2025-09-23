'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Server,
  Smartphone,
  Cloud,
  BarChart3,
  Layers,
  Users,
  Headphones,
  Target,
  Lightbulb,
  Clock,
  Sparkles,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLocale } from 'next-intl'
import type { Homepage, Service } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

interface ServicesClientProps {
  services: Homepage['services']
  servicesData: Service[]
}

// Icon mapping for services
const iconMap = {
  Globe,
  Shield,
  Server,
  Smartphone,
  Cloud,
  BarChart3,
  Layers,
  Users,
  Headphones,
  Target,
  Lightbulb,
  Clock,
} as const

// Animation variants for enhanced interactions
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
  },
}

const iconVariants = {
  idle: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 5,
  },
}

const featuredCardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
  },
}

export default function ServicesClient({ services, servicesData }: ServicesClientProps) {
  const locale = useLocale()
  const [activeService, setActiveService] = useState(0)

  if (!services || !servicesData.length) return null

  const activeServiceData = servicesData[activeService]
  const ActiveIcon = iconMap[activeServiceData?.icon as keyof typeof iconMap] || Globe

  return (
    <section
      id="services"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/30 to-accent/5 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-medium text-sm mb-6">
            <Sparkles className="h-4 w-4" />
            {locale === 'ar' ? 'خدماتنا المتميزة' : 'Our Premium Services'}
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {services.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            {services.subtitle}
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {services.description}
          </p>
        </motion.div>

        {/* Enhanced Featured Service Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            variants={featuredCardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative bg-gradient-to-br from-card via-card to-accent/5 rounded-3xl p-8 lg:p-12 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 mb-16 overflow-hidden"
          >
            {/* Card background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-2xl" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <motion.div
                    className="relative w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <ActiveIcon className="h-12 w-12 text-white" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
                      {activeServiceData.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {activeServiceData.description}
                    </p>
                  </div>
                </div>

                {/* Enhanced Rich text details */}
                {activeServiceData.details && (
                  <div className="bg-muted/30 rounded-2xl p-6 border border-border/30">
                    <div className="text-foreground leading-relaxed text-lg">
                      {typeof activeServiceData.details === 'object' &&
                      'root' in activeServiceData.details &&
                      activeServiceData.details.root &&
                      'children' in activeServiceData.details.root &&
                      Array.isArray(activeServiceData.details.root.children) &&
                      activeServiceData.details.root.children[0] &&
                      'children' in activeServiceData.details.root.children[0] &&
                      Array.isArray(activeServiceData.details.root.children[0].children) &&
                      activeServiceData.details.root.children[0].children[0] &&
                      'text' in activeServiceData.details.root.children[0].children[0]
                        ? activeServiceData.details.root.children[0].children[0].text
                        : activeServiceData.description}
                    </div>
                  </div>
                )}

                {/* Enhanced Features */}
                {activeServiceData.features && activeServiceData.features.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeServiceData.features.map((featureItem, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors duration-200"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-foreground font-medium">{featureItem.feature}</span>
                      </motion.div>
                    ))}
                  </div>
                )}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="group mt-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <span className="flex items-center gap-2">
                      {locale === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </motion.div>
              </div>

              {/* Enhanced Visual representation */}
              <div className="relative">
                {activeServiceData.image && typeof activeServiceData.image === 'object' ? (
                  <motion.div
                    className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={activeServiceData.image.url || ''}
                      alt={activeServiceData.image.alt || activeServiceData.title}
                      fill
                      className="object-cover"
                      priority // good for LCP-critical images, remove if not above the fold
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </motion.div>
                ) : (
                  <motion.div
                    className="relative w-full h-96 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <ActiveIcon className="h-32 w-32 text-primary/70" />
                    </motion.div>
                    <div className="absolute top-4 right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
                    <div className="absolute bottom-4 left-4 w-32 h-32 bg-primary/20 rounded-full blur-xl" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Service Selection Grid - FIXED */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {servicesData.map((service, index) => {
            const ServiceIcon = iconMap[service.icon as keyof typeof iconMap] || Globe
            const isActive = activeService === index

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                onClick={() => setActiveService(index)}
                className="cursor-pointer group"
              >
                <Card
                  className={`relative p-8 h-full transition-all duration-500 overflow-hidden border ${
                    isActive
                      ? 'ring-2 ring-primary bg-gradient-to-br from-primary/5 via-card to-accent/5 shadow-xl border-primary/20'
                      : 'hover:shadow-xl hover:border-accent/30 bg-card border-border'
                  }`}
                >
                  {/* Background decoration - positioned behind content */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-opacity duration-500 -z-10 ${
                      isActive
                        ? 'bg-primary/10 opacity-100'
                        : 'bg-accent/5 opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  {/* Content container with proper z-index */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    <motion.div
                      variants={iconVariants}
                      initial="idle"
                      whileHover="hover"
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className={`relative w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg'
                          : 'bg-gradient-to-br from-primary/10 to-accent/10 text-primary group-hover:from-primary/20 group-hover:to-accent/20'
                      }`}
                    >
                      <ServiceIcon className="h-10 w-10" />
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl" />
                      )}
                    </motion.div>

                    <div className="space-y-3">
                      <h3
                        className={`text-xl font-bold transition-colors duration-300 ${
                          isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Active indicator */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="flex items-center gap-2"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <div className="w-4 h-2 bg-primary/60 rounded-full" />
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="relative bg-gradient-to-br from-card via-accent/5 to-primary/5 rounded-3xl p-12 border border-border/50 shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5 -z-10" />
            <div className="absolute top-8 right-8 w-32 h-32 bg-accent/10 rounded-full blur-2xl -z-10" />
            <div className="absolute bottom-8 left-8 w-40 h-40 bg-primary/10 rounded-full blur-2xl -z-10" />

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent font-medium text-sm mb-6"
              >
                <Sparkles className="h-4 w-4" />
                {services.servicesCallToAction?.miniTitle}
              </motion.div>

              <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
                {services.servicesCallToAction?.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                {services.servicesCallToAction?.description}
              </p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg"
                >
                  <Link href="#contact">
                    <span className="flex items-center gap-3">
                      {services.servicesCallToAction?.buttonText}
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
