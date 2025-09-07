import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Homepage, Value } from '@/payload-types'
import AboutClient from './Component.client'

interface AboutProps {
  about: Homepage['about']
}

export default async function About({ about }: AboutProps) {
  if (!about) return null

  // Fetch values using Payload's local API
  const payload = await getPayload({ config: configPromise })

  const valuesResult = await payload.find({
    collection: 'values',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'order',
  })

  const values = valuesResult.docs as Value[]

  return <AboutClient about={about} values={values} />
}
