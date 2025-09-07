import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Homepage, Service } from '@/payload-types'
import ServicesClient from './Component.client'

interface ServicesProps {
  services: Homepage['services']
}

export default async function Services({ services }: ServicesProps) {
  if (!services) return null

  // Fetch services using Payload's local API
  const payload = await getPayload({ config: configPromise })

  const servicesResult = await payload.find({
    collection: 'services',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'order',
  })

  const servicesData = servicesResult.docs as Service[]

  return <ServicesClient services={services} servicesData={servicesData} />
}
