import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import type { Homepage, Feature } from '@/payload-types'
import WhyUsClient from './Component.client'

interface WhyUsProps {
  whyUs: Homepage['whyUs']
  locale?: TypedLocale
}

export default async function WhyUs({ whyUs, locale }: WhyUsProps) {
  if (!whyUs) return null

  // Fetch features using Payload's local API
  const payload = await getPayload({ config: configPromise })

  const featuresResult = await payload.find({
    collection: 'features',
    locale: locale,
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'order',
  })

  const features = featuresResult.docs as Feature[]

  return <WhyUsClient whyUs={whyUs} features={features} />
}
