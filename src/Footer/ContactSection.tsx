import React from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import type { ContactInfo } from '@/payload-types'

interface ContactSectionProps {
  contactData: ContactInfo
  locale: 'ar' | 'en'
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contactData, locale }) => {
  const contactInfo = contactData?.contactInfo
  const labels = contactData?.labels

  if (!contactInfo) return null

  const contactItems = [
    {
      icon: MapPin,
      value: contactInfo.address,
      label: labels?.address || (locale === 'ar' ? 'العنوان' : 'Address'),
    },
    {
      icon: Phone,
      value: contactInfo.phone,
      label: labels?.phone || (locale === 'ar' ? 'الهاتف' : 'Phone'),
    },
    {
      icon: Mail,
      value: contactInfo.email,
      label: labels?.email || (locale === 'ar' ? 'البريد الإلكتروني' : 'Email'),
    },
    {
      icon: Clock,
      value: contactInfo.workingHours,
      label: labels?.hours || (locale === 'ar' ? 'ساعات العمل' : 'Working Hours'),
    },
  ]

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-foreground mb-6 relative">
        {locale === 'ar' ? 'معلومات التواصل' : 'Contact Info'}
        <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-primary rounded-full" />
      </h4>
      <div className="space-y-4">
        {contactItems.map(({ icon: Icon, value, label }) => {
          if (!value) return null

          return (
            <div
              key={label}
              className="flex items-start gap-3 group hover:bg-muted/30 p-2 rounded-lg transition-all duration-200 -mx-2"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-medium">
                  {label}
                </div>
                <div className="text-sm text-foreground leading-relaxed break-words">{value}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
