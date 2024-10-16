import FibonachiSystem from '@/assets/voteSystems/fibonachi.json'
import SharkSystem from '@/assets/voteSystems/shark.json'
import SharkEmojiSystem from '@/assets/voteSystems/shark-emoji.json'
import TShirtSystem from '@/assets/voteSystems/t-shirt.json'

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

export const VoteSystems = ['fibonachi', 'shark', 'shark-emoji', 't-shirt'] as const
export type IVoteSystems = (typeof VoteSystems)[number]

export const VoteSystemConfig: Record<IVoteSystems, IVoteConfig> = {
  'fibonachi': FibonachiSystem,
  'shark': SharkSystem,
  'shark-emoji': SharkEmojiSystem,
  't-shirt': TShirtSystem,
}
