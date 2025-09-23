'use client'

import { motion } from 'framer-motion'
import { Users, Award, Clock, Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import type { Homepage, TeamMember } from '@/payload-types'
import Link from 'next/link'

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
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mb-6"
          >
            <Users className="h-8 w-8 text-primary" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent mb-6">
            {team.title}
          </h2>
          {team.subtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
              {team.subtitle}
            </p>
          )}
          {team.description && (
            <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {team.description}
            </p>
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
              <motion.div whileHover={{ scale: 1.05 }} className="text-center group cursor-pointer">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Users className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stats.expertsCount}+
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                  {locale === 'ar' ? 'خبير' : 'Experts'}
                </p>
              </motion.div>
            )}

            {stats.experienceYears && (
              <motion.div whileHover={{ scale: 1.05 }} className="text-center group cursor-pointer">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Clock className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stats.experienceYears}+
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                  {locale === 'ar' ? 'سنة خبرة' : 'Years Experience'}
                </p>
              </motion.div>
            )}

            {stats.certificationsCount && (
              <motion.div whileHover={{ scale: 1.05 }} className="text-center group cursor-pointer">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Award className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stats.certificationsCount}+
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                  {locale === 'ar' ? 'شهادة' : 'Certifications'}
                </p>
              </motion.div>
            )}

            {stats.supportAvailability && (
              <motion.div whileHover={{ scale: 1.05 }} className="text-center group cursor-pointer">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Star className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stats.supportAvailability}
                </div>
                <p className="text-muted-foreground text-sm font-medium">
                  {locale === 'ar' ? 'دعم متاح' : 'Support Available'}
                </p>
              </motion.div>
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
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <Card className="relative p-6 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 border border-border bg-gradient-to-br from-card to-card/50 backdrop-blur-sm overflow-hidden">
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative text-center space-y-4">
                  {/* Profile Image */}
                  <div className="relative mx-auto w-28 h-28 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {member.image && typeof member.image === 'object' ? (
                      <Image
                        src={member.image.url || ''}
                        alt={member.image.alt || member.name}
                        width={112}
                        height={112}
                        className="relative w-full h-full object-cover rounded-full border-4 border-primary/20 group-hover:border-accent/40 transition-all duration-300 shadow-lg group-hover:shadow-xl"
                      />
                    ) : (
                      <div className="relative w-full h-full bg-gradient-to-br from-muted to-muted/70 rounded-full border-4 border-primary/20 group-hover:border-accent/40 transition-all duration-300 flex items-center justify-center shadow-lg group-hover:shadow-xl">
                        <Users className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full">
                      <p className="text-primary font-semibold text-sm">{member.role}</p>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed px-2">
                      {member.description}
                    </p>
                  </div>

                  {/* Specialties */}
                  {member.specialties && member.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center pt-2">
                      {member.specialties.slice(0, 3).map((specialtyItem, specialtyIndex) => (
                        <Badge
                          key={specialtyIndex}
                          variant="secondary"
                          className="text-xs bg-gradient-to-r from-primary/10 to-accent/15 dark:from-secondary/20 dark:to-accent/20 hover:from-primary/15 hover:to-accent/20 dark:hover:from-secondary/30 dark:hover:to-accent/30 transition-all duration-200 border-primary/20 text-foreground font-semibold shadow-sm"
                        >
                          {specialtyItem.specialty}
                        </Badge>
                      ))}
                      {member.specialties.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs border-primary/30 text-primary hover:bg-primary/10 transition-all duration-200 font-semibold"
                        >
                          +{member.specialties.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
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
          className="text-center mt-20"
        >
          <div className="relative bg-gradient-to-br from-primary/5 via-card to-accent/5 rounded-3xl p-10 border border-primary/20 backdrop-blur-sm overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-2xl" />

            <div className="relative">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mb-6"
              >
                <Users className="h-12 w-12 text-primary" />
              </motion.div>

              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                {team.teamCallToAction?.title}
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                {team.teamCallToAction?.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-200 font-semibold"
                >
                  <Link href={team.teamCallToAction?.viewPositionsButtonLink || ''}>
                    {team.teamCallToAction?.viewPositionsButtonText}
                  </Link>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-primary/30 rounded-xl hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 font-semibold text-primary"
                >
                  <Link href={team.teamCallToAction?.joinUsButtonLink || ''}>
                    {team.teamCallToAction?.joinUsButtonText}
                  </Link>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
