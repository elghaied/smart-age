import { createLocalReq, getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60 // Allow up to 60 seconds for seeding

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate - only allow logged-in users to seed
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden. Please log in to the admin panel first.', {
      status: 403,
    })
  }

  try {
    // Create a Payload request for transaction support
    const payloadReq = await createLocalReq({ user }, payload)

    await seed({ payload, req: payloadReq })

    return Response.json({ success: true, message: 'Database seeded successfully!' })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding database' })
    return new Response('Error seeding database. Check server logs for details.', { status: 500 })
  }
}
