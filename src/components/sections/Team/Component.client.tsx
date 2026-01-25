'use client'

import { motion } from 'framer-motion'
import { Users, Award, Clock, Star, Sparkles } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import type { Homepage, TeamMember } from '@/payload-types'
import Link from 'next/link'

interface TeamClientProps {
  team: Homepage['team']
  teamMembers: TeamMember[]
}

// Staggered container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

export default function TeamClient({ team, teamMembers }: TeamClientProps) {
  const locale = useLocale()
  const isRTL = locale === 'ar'

  if (!team || !teamMembers.length) return null

  const stats = team.stats

  return (
    <section
      id="team"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-[15%] w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/3 to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header with enhanced typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-2xl mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-60" />
            <Users className="h-10 w-10 text-primary relative z-10" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_8s_ease-in-out_infinite]">
              {team.title}
            </span>
          </h2>
          {team.subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed"
            >
              {team.subtitle}
            </motion.p>
          )}
          {team.description && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-base text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed"
            >
              {team.description}
            </motion.p>
          )}
        </motion.div>

        {/* Team Statistics - Enhanced with animated counters feel */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20"
          >
            {[
              {
                value: stats.expertsCount,
                label: isRTL ? 'خبير' : 'Experts',
                icon: Users,
                suffix: '+',
              },
              {
                value: stats.experienceYears,
                label: isRTL ? 'سنة خبرة' : 'Years Experience',
                icon: Clock,
                suffix: '+',
              },
              {
                value: stats.certificationsCount,
                label: isRTL ? 'شهادة' : 'Certifications',
                icon: Award,
                suffix: '+',
              },
              {
                value: stats.supportAvailability,
                label: isRTL ? 'دعم متاح' : 'Support Available',
                icon: Star,
                suffix: '',
              },
            ]
              .filter((stat) => stat.value)
              .map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 150 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="relative group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center group-hover:border-primary/30 transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                      <stat.icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors duration-300" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}

        {/* Team Members Grid - Redesigned Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              className="group relative"
            >
              {/* Animated border glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 group-hover:duration-200" />

              {/* Card */}
              <div className="relative h-full bg-card rounded-2xl border border-border/60 overflow-hidden transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl group-hover:shadow-primary/10">
                {/* Top decorative bar */}
                <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Card content */}
                <div className="p-6 pt-8">
                  {/* Profile Image with hexagonal frame effect */}
                  <div className="relative mx-auto w-32 h-32 mb-6">
                    {/* Rotating border */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-conic from-primary via-accent via-primary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[spin_4s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite]"
                      style={{ padding: '3px' }}
                    >
                      <div className="w-full h-full bg-card rounded-full" />
                    </div>

                    {/* Image container */}
                    <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/40 transition-all duration-300">
                      {member.image && typeof member.image === 'object' ? (
                        <Image
                          src={member.image.url || ''}
                          alt={member.image.alt || member.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <Users className="h-14 w-14 text-muted-foreground/60 group-hover:text-primary/60 transition-colors duration-300" />
                        </div>
                      )}
                    </div>

                    {/* Sparkle decoration */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="absolute -top-1 -right-1 p-1.5 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </motion.div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 tracking-tight">
                      {member.name}
                    </h3>

                    {/* Role badge with animated underline */}
                    <div className="relative inline-block">
                      <span className="text-sm font-semibold text-primary/90 tracking-wide">
                        {member.role}
                      </span>
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      />
                    </div>

                    {member.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 px-2">
                        {member.description}
                      </p>
                    )}
                  </div>

                  {/* Specialties - Floating tags with staggered animation */}
                  {member.specialties && member.specialties.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-border/50">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.specialties.slice(0, 3).map((specialtyItem, specialtyIndex) => (
                          <motion.span
                            key={specialtyIndex}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + specialtyIndex * 0.05 + 0.4 }}
                            className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10 text-foreground/80 hover:from-primary/10 hover:to-accent/10 hover:border-primary/20 transition-all duration-200 cursor-default"
                          >
                            {specialtyItem.specialty}
                          </motion.span>
                        ))}
                        {member.specialties.length > 3 && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.55 }}
                            className="inline-flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/20"
                          >
                            +{member.specialties.length - 3}
                          </motion.span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom gradient accent */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-card to-accent/5" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />

            {/* Decorative grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative border border-primary/10 rounded-3xl p-10 sm:p-14 backdrop-blur-sm">
              <div className="text-center max-w-2xl mx-auto">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl mb-8 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl" />
                  <Users className="h-12 w-12 text-primary relative z-10" />
                </motion.div>

                <h3 className="text-3xl sm:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {team.teamCallToAction?.title}
                  </span>
                </h3>
                <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                  {team.teamCallToAction?.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={team.teamCallToAction?.viewPositionsButtonLink || ''}
                      className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
                    >
                      {team.teamCallToAction?.viewPositionsButtonText}
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href={team.teamCallToAction?.joinUsButtonLink || ''}
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary/30 rounded-xl font-semibold text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                    >
                      {team.teamCallToAction?.joinUsButtonText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
        }
      `}</style>
    </section>
  )
}
