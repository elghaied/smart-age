'use client'

import { motion } from 'framer-motion'
import { Handshake } from 'lucide-react'
import Image from 'next/image'
import type { Homepage } from '@/payload-types'

interface PartnersClientProps {
  partners: NonNullable<Homepage['partners']>
}

export default function PartnersClient({ partners }: PartnersClientProps) {
  const items = partners.items ?? []

  if (!items.length) return null

  // Ensure enough cards to always overflow the viewport
  const repeated = Array.from({ length: Math.ceil(8 / items.length) + 1 }, () => items).flat()
  const doubled = [...repeated, ...repeated]

  return (
    <section
      id="partners"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-[15%] w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-2xl mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-60" />
            <Handshake className="h-10 w-10 text-primary relative z-10" />
          </motion.div>

          {partners.title && (
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary via-foreground to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_8s_ease-in-out_infinite]">
                {partners.title}
              </span>
            </h2>
          )}
        </motion.div>
      </div>

      {/* Marquee — outside max-w-7xl so it bleeds full width */}
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden w-full">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="flex gap-6 w-max will-change-transform"
          >
            {doubled.map((partner, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 w-52 h-28 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl flex flex-col items-center justify-center gap-3 px-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {partner.logo && typeof partner.logo === 'object' ? (
                  <div className="h-10 w-full flex items-center justify-center">
                    <Image
                      src={partner.logo.url || ''}
                      alt={partner.logo.alt || partner.name || ''}
                      width={140}
                      height={40}
                      className="object-contain max-h-10 w-auto opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-full bg-muted/30 rounded-lg" />
                )}

                {partner.name && (
                  <p className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 text-center truncate w-full relative z-10">
                    {partner.name}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

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
