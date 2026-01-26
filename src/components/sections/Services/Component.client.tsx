'use client'

import { motion } from 'framer-motion'
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
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Homepage, Service } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'

interface ServicesClientProps {
  services: Homepage['services']
  servicesData: Service[]
}

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

export default function ServicesClient({ services, servicesData }: ServicesClientProps) {
  if (!services || !servicesData.length) return null

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {services.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            {services.subtitle}
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full" />
          {services.description && (
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {services.description}
            </p>
          )}
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {servicesData.map((service, index) => {
            const ServiceIcon = iconMap[service.icon as keyof typeof iconMap] || Globe

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6 bg-card hover:shadow-lg transition-shadow duration-300 border border-border hover:border-primary/20">
                  {/* Icon & Image */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
                      <ServiceIcon className="h-6 w-6 text-primary" />
                    </div>
                    {service.image && typeof service.image === 'object' && service.image.url && (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ms-auto">
                        <Image
                          src={service.image.url}
                          alt={service.image.alt || service.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features List */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2">
                      {service.features.slice(0, 4).map((featureItem, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-foreground">{featureItem.feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        {services.servicesCallToAction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 sm:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 text-center">
              {services.servicesCallToAction.miniTitle && (
                <span className="inline-block text-sm font-medium text-primary mb-3">
                  {services.servicesCallToAction.miniTitle}
                </span>
              )}
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {services.servicesCallToAction.title}
              </h3>
              {services.servicesCallToAction.description && (
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
                  {services.servicesCallToAction.description}
                </p>
              )}
              <Button size="lg" className="group" asChild>
                <Link href="#contact" className="flex items-center">
                  {services.servicesCallToAction.buttonText}
                  <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  )
}
