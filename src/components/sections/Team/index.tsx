import type { Homepage, TeamMember } from '@/payload-types'
import TeamClient from './Component.client'

interface TeamProps {
  team: Homepage['team']
  teamMembers: TeamMember[]
}

export default function Team({ team, teamMembers }: TeamProps) {
  if (!team) return null

  return <TeamClient team={team} teamMembers={teamMembers} />
}
