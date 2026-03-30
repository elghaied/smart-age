import type { Homepage } from '@/payload-types'
import PartnersClient from './Component.client'

interface PartnersProps {
  partners: Homepage['partners']
}

export default function Partners({ partners }: PartnersProps) {
  if (!partners) return null
  return <PartnersClient partners={partners} />
}
