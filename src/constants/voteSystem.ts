import FibonachiSystem from '@/assets/voteSystems/fibonachi.json'
import SharkSystem from '@/assets/voteSystems/shark.json'

/**
 * Dynamic imports is overcomplicated in this case
 * May be in future
 */

export type IVoteOption = {
  name: string
  value: number
  tooltip?: string
}
export type IVoteConfig = {
  name: string
  description: string
  options: Array<IVoteOption>
}

export const VoteSystems = ['fibonachi', 'shark'] as const
export type IVoteSystems = (typeof VoteSystems)[number]

export const VoteSystemConfig = {
  fibonachi: FibonachiSystem,
  shark: SharkSystem
} satisfies Record<IVoteSystems, IVoteConfig>
