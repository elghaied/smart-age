import { getCachedTeamMembers } from '@/utilities/getTeamMembers'
import type { Homepage } from '@/payload-types'
import type { TypedLocale } from 'payload'
import TeamClient from './Component.client'

interface TeamProps {
  team: Homepage['team']
  locale?: TypedLocale
}

export default async function Team({ team, locale }: TeamProps) {
  if (!team) return null

  // Fetch team members using the cached utility function
  const getTeamMembers = getCachedTeamMembers(locale)
  const teamMembers = await getTeamMembers()

  return <TeamClient team={team} teamMembers={teamMembers} />
}
