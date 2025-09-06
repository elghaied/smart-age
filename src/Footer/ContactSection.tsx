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
    <div>
      <h4 className="text-lg font-semibold text-foreground mb-4">
        {locale === 'ar' ? 'معلومات التواصل' : 'Contact Info'}
      </h4>
      <div className="space-y-3">
        {contactItems.map(({ icon: Icon, value, label }) => {
          if (!value) return null

          return (
            <div key={label} className="flex items-start gap-3">
              <Icon className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  {label}
                </div>
                <div className="text-sm text-muted-foreground">{value}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
