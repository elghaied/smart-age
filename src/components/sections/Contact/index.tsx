'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { Card } from '@/components/ui/card'
import type { Homepage, ContactInfo } from '@/payload-types'
import { RenderBlocksClient } from '@/blocks/RenderBlocks.client'
import SocialMedia from './SocialMedia'

interface ContactProps {
  contact: Homepage['contact']
  contactInfo: ContactInfo
  locale: string
}

export default function Contact({ contact, contactInfo, locale }: ContactProps) {
  if (!contact || !contactInfo) return null

  return (
    <section
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/20 to-primary/5"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            {contact.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
            {contact.subtitle}
          </p>
          <p className="text-lg text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {contact.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Address */}
              {contactInfo.contactInfo?.address && (
                <Card className="group p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                      <MapPin className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {contactInfo.labels?.address}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {contactInfo.contactInfo.address}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Phone */}
              {contactInfo.contactInfo?.phone && (
                <Card className="group p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                      <Phone className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {contactInfo.labels?.phone}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {contactInfo.contactInfo.phone}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Email */}
              {contactInfo.contactInfo?.email && (
                <Card className="group p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                      <Mail className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1  ">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {contactInfo.labels?.email}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed break-all">
                        {contactInfo.contactInfo.email}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Working Hours */}
              {contactInfo.contactInfo?.workingHours && (
                <Card className="group p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-105 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                      <Clock className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {contactInfo.labels?.hours}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {contactInfo.contactInfo.workingHours}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Map Placeholder */}
            <Card className="group p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/80 backdrop-blur-sm overflow-hidden">
              {contactInfo.contactInfo?.mapLink ? (
                <div className="w-full h-72 rounded-xl overflow-hidden">
                  <iframe
                    src={contactInfo.contactInfo.mapLink}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <div className="w-full h-72 bg-gradient-to-br from-primary/15 via-primary/10 to-accent/15 rounded-xl flex items-center justify-center">
                  <p className="text-muted-foreground">Map not available</p>
                </div>
              )}
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {locale === 'ar' ? 'موقعنا في طرابلس' : 'Our Location in Tripoli'}
                </h3>
                <p className="text-muted-foreground">
                  {locale === 'ar' ? 'زورونا في مكتبنا الرئيسي' : 'Visit us at our main office'}
                </p>
              </div>
            </Card>

            {/* Social Media */}
            {contactInfo.socialMedia?.title && (
              <SocialMedia socialMedia={contactInfo.socialMedia} />
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Card className="p-10 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/30 bg-card/90 backdrop-blur-sm">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
                  <Send className="h-8 w-8 text-primary" />
                </div>
              </div>

              {contactInfo.contactForm && contactInfo.contactForm.length > 0 && (
                <RenderBlocksClient blocks={contactInfo.contactForm} />
              )}
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Card className="p-12 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border-primary/30 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-3xl mb-8">
                <Phone className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {contact.contactCallToAction?.title}
              </h3>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                {contact.contactCallToAction?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="group h-14 px-8 text-lg font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25"
                >
                  <a
                    href={`${contactInfo?.contactInfo?.phone || ''}`}
                    className="flex items-center gap-3 text-primary-foreground dark:group-hover:text-accent-foreground"
                  >
                    <Phone className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    {contact.contactCallToAction?.callUsButtonText || 'Call Us'}
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="group h-14 px-8 text-lg font-semibold bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300"
                >
                  <a
                    href="#contact"
                    className="flex items-center gap-3 group-hover:text-accent dark:group-hover:text-accent-foreground"
                  >
                    <Mail className="h-5 w-5 transition-transform group-hover:rotate-12" />
                    {contact.contactCallToAction?.emailUsButtonText || 'Email Us'}
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
