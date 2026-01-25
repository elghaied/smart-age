import type { Homepage, Service } from '@/payload-types'
import ServicesClient from './Component.client'

interface ServicesProps {
  services: Homepage['services']
  servicesData: Service[]
}

export default function Services({ services, servicesData }: ServicesProps) {
  if (!services) return null

  return <ServicesClient services={services} servicesData={servicesData} />
}
