'use client'

import { motion } from 'framer-motion'
import { Users, Award, Clock, Star, Mail, Linkedin } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import type { Homepage, TeamMember } from '@/payload-types'

interface TeamClientProps {
  team: Homepage['team']
  teamMembers: TeamMember[]
}

export default function TeamClient({ team, teamMembers }: TeamClientProps) {
  const locale = useLocale()

  if (!team || !teamMembers.length) return null

  const stats = team.stats

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{team.title}</h2>
          {team.subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">{team.subtitle}</p>
          )}
          {team.description && (
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">{team.description}</p>
          )}
        </motion.div>

        {/* Team Statistics */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {stats.expertsCount && (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stats.expertsCount}+</div>
                <p className="text-muted-foreground text-sm">
                  {locale === 'ar' ? 'خبير' : 'Experts'}
                </p>
              </div>
            )}

            {stats.experienceYears && (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stats.experienceYears}+
                </div>
                <p className="text-muted-foreground text-sm">
                  {locale === 'ar' ? 'سنة خبرة' : 'Years Experience'}
                </p>
              </div>
            )}

            {stats.certificationsCount && (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stats.certificationsCount}+
                </div>
                <p className="text-muted-foreground text-sm">
                  {locale === 'ar' ? 'شهادة' : 'Certifications'}
                </p>
              </div>
            )}

            {stats.supportAvailability && (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-2">
                  {stats.supportAvailability}
                </div>
                <p className="text-muted-foreground text-sm">
                  {locale === 'ar' ? 'دعم متاح' : 'Support Available'}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="p-6 h-full transition-all duration-300 hover:shadow-lg border border-border">
                <div className="text-center space-y-4">
                  {/* Profile Image */}
                  {member.image && typeof member.image === 'object' && (
                    <div className="relative mx-auto w-24 h-24 mb-4">
                      <Image
                        src={member.image.url || ''}
                        alt={member.image.alt || member.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-full border-4 border-primary/10 group-hover:border-primary/20 transition-colors"
                      />
                    </div>
                  )}

                  {/* Member Info */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                    <p className="text-primary font-medium">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>

                  {/* Specialties */}
                  {member.specialties && member.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      {member.specialties.slice(0, 3).map((specialtyItem, specialtyIndex) => (
                        <Badge key={specialtyIndex} variant="secondary" className="text-xs">
                          {specialtyItem.specialty}
                        </Badge>
                      ))}
                      {member.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{member.specialties.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Social Links Placeholder - Can be extended if needed */}
                  <div className="flex justify-center space-x-3 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                      <Linkedin className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-muted/50 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {locale === 'ar' ? 'انضم إلى فريقنا المتميز' : 'Join Our Exceptional Team'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {locale === 'ar'
                ? 'نحن دائماً نبحث عن المواهب المتميزة للانضمام إلى فريقنا. إذا كنت تشارك رؤيتنا وتريد أن تكون جزءاً من مستقبل التكنولوجيا، تواصل معنا'
                : 'We are always looking for exceptional talent to join our team. If you share our vision and want to be part of the future of technology, get in touch with us'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                {locale === 'ar' ? 'تصفح الوظائف المتاحة' : 'View Open Positions'}
              </button>
              <button className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium">
                {locale === 'ar' ? 'أرسل سيرتك الذاتية' : 'Send Your Resume'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
