'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import type { Homepage, ContactInfo } from '@/payload-types'

interface ContactProps {
  contact: Homepage['contact']
  contactInfo: ContactInfo
  locale: string
}

export default function Contact({ contact, contactInfo, locale }: ContactProps) {
  if (!contact || !contactInfo) return null

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{contact.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">{contact.subtitle}</p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">{contact.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Address */}
              {contactInfo.contactInfo?.address && (
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {contactInfo.labels?.address}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {contactInfo.contactInfo.address}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Phone */}
              {contactInfo.contactInfo?.phone && (
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {contactInfo.labels?.phone}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {contactInfo.contactInfo.phone}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Email */}
              {contactInfo.contactInfo?.email && (
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {contactInfo.labels?.email}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {contactInfo.contactInfo.email}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {/* Working Hours */}
              {contactInfo.contactInfo?.workingHours && (
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {contactInfo.labels?.hours}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {contactInfo.contactInfo.workingHours}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Map Placeholder */}
            <Card className="p-6">
              <div className="w-full h-64 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {locale === 'ar' ? 'موقعنا في طرابلس' : 'Our Location in Tripoli'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Social Media */}
            {contactInfo.socialMedia?.title && (
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  {contactInfo.socialMedia.title}
                </h3>
                <div className="flex justify-center gap-4">
                  {contactInfo.socialMedia.facebook && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                      asChild
                    >
                      <a
                        href={contactInfo.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {contactInfo.socialMedia.twitter && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                      asChild
                    >
                      <a
                        href={contactInfo.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {contactInfo.socialMedia.instagram && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                      asChild
                    >
                      <a
                        href={contactInfo.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                  {contactInfo.socialMedia.linkedin && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                      asChild
                    >
                      <a
                        href={contactInfo.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {contactInfo.contactForm?.title}
              </h3>
              <form className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {contactInfo.contactForm?.fields?.nameLabel}
                    </label>
                    <Input
                      placeholder={contactInfo.contactForm?.fields?.namePlaceholder ?? undefined}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {contactInfo.contactForm?.fields?.emailLabel}
                    </label>
                    <Input
                      type="email"
                      placeholder={contactInfo.contactForm?.fields?.emailPlaceholder ?? undefined}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {contactInfo.contactForm?.fields?.subjectLabel}
                  </label>
                  <Input
                    placeholder={contactInfo.contactForm?.fields?.subjectPlaceholder ?? undefined}
                    className="w-full"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {contactInfo.contactForm?.fields?.messageLabel}
                  </label>
                  <Textarea
                    placeholder={contactInfo.contactForm?.fields?.messagePlaceholder ?? undefined}
                    rows={6}
                    className="w-full resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button size="lg" className="w-full group">
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    {contactInfo.contactForm?.fields?.submitButton}
                  </span>
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {locale === 'ar' ? 'مستعد لبدء مشروعك؟' : 'Ready to Start Your Project?'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'احجز استشارة مجانية مع خبرائنا اليوم ودعنا نساعدك في تحويل أفكارك إلى واقع رقمي'
                : 'Book a free consultation with our experts today and let us help you turn your ideas into digital reality'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {locale === 'ar' ? 'اتصل بنا الآن' : 'Call Us Now'}
                </span>
              </Button>
              <Button variant="outline" size="lg" className="group bg-transparent">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {locale === 'ar' ? 'أرسل بريد إلكتروني' : 'Send Email'}
                </span>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
