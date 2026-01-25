import { cache } from 'react'
import { getPayload, TypedLocale } from 'payload'
import configPromise from '@payload-config'
import type {
  Project,
  Goal,
  Service,
  TeamMember,
  Value,
  Feature,
} from '@/payload-types'

type QueryParams = {
  locale: TypedLocale
  draft?: boolean
}

export const queryProjectsByLocale = cache(
  async ({ locale, draft = false }: QueryParams): Promise<Project[]> => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'projects',
      draft,
      locale,
      overrideAccess: draft,
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
    })

    return result.docs as Project[]
  },
)

export const queryGoalsByLocale = cache(
  async ({ locale, draft = false }: QueryParams): Promise<Goal[]> => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'goals',
      draft,
      locale,
      overrideAccess: draft,
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
    })

    return result.docs as Goal[]
  },
)

export const queryServicesByLocale = cache(
  async ({ locale, draft = false }: QueryParams): Promise<Service[]> => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'services',
      draft,
      locale,
      overrideAccess: draft,
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
    })

    return result.docs as Service[]
  },
)

export const queryTeamMembersByLocale = cache(
  async ({ locale, draft = false }: QueryParams): Promise<TeamMember[]> => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'team-members',
      draft,
      locale,
      overrideAccess: draft,
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
    })

    return result.docs as TeamMember[]
  },
)

export const queryValuesByLocale = cache(
  async ({ locale, draft = false }: QueryParams): Promise<Value[]> => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'values',
      draft,
      locale,
      overrideAccess: draft,
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
    })

    return result.docs as Value[]
  },
)

export const queryFeaturesByLocale = cache(
  async ({ locale, draft = false }: QueryParams): Promise<Feature[]> => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'features',
      draft,
      locale,
      overrideAccess: draft,
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
    })

    return result.docs as Feature[]
  },
)
