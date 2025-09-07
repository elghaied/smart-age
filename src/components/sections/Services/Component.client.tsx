'use client'

import { useState } from 'react'
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
import { useLocale } from 'next-intl'
import type { Homepage, Service } from '@/payload-types'

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

export default function ServicesClient({ services, servicesData }: ServicesClientProps) {
  const locale = useLocale()
  const [activeService, setActiveService] = useState(0)

  if (!services || !servicesData.length) return null

  const activeServiceData = servicesData[activeService]
  const ActiveIcon = iconMap[activeServiceData?.icon as keyof typeof iconMap] || Globe

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{services.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            {services.subtitle}
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            {services.description}
          </p>
        </motion.div>

        {/* Featured Service Display - Full Width */}
        <motion.div
          key={activeService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-2xl p-8 lg:p-12 border border-border shadow-lg mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <ActiveIcon className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">
                    {activeServiceData.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">{activeServiceData.description}</p>
                </div>
              </div>

              {/* Rich text details */}
              {activeServiceData.details && (
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
              )}

              {/* Features */}
              {activeServiceData.features && activeServiceData.features.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeServiceData.features.map((featureItem, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{featureItem.feature}</span>
                    </div>
                  ))}
                </div>
              )}

              <Button size="lg" className="group mt-6">
                <span className="flex items-center gap-2">
                  {locale === 'ar' ? 'اعرف المزيد' : 'Learn More'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </div>

            {/* Visual representation */}
            <div className="relative">
              {activeServiceData.image && typeof activeServiceData.image === 'object' ? (
                <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={activeServiceData.image.url || ''}
                    alt={activeServiceData.image.alt || activeServiceData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center shadow-lg">
                  <ActiveIcon className="h-32 w-32 text-primary/60" />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Service Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {servicesData.map((service, index) => {
            const ServiceIcon = iconMap[service.icon as keyof typeof iconMap] || Globe

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveService(index)}
                className="cursor-pointer"
              >
                <Card
                  className={`p-6 h-full transition-all duration-300 hover:shadow-lg ${
                    activeService === index
                      ? 'ring-2 ring-primary bg-primary/5 shadow-md'
                      : 'hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                        activeService === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <ServiceIcon className="h-8 w-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {activeService === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3 h-3 bg-primary rounded-full"
                      />
                    )}
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {locale === 'ar' ? 'هل تحتاج لحل تقني مخصص؟' : 'Need a Custom Technical Solution?'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'تواصل معنا اليوم لمناقشة احتياجاتك التقنية والحصول على استشارة مجانية من خبرائنا'
                : 'Contact us today to discuss your technical needs and get a free consultation from our experts'}
            </p>
            <Button size="lg" className="group">
              <span className="flex items-center gap-2">
                {locale === 'ar' ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
