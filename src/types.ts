import { EmojiAssetId } from './assets.emojis'
import { mapSizes } from './consts'
import { Voice } from './tts'

export type ZSpecial = 'foreground' | 'background' | 'surface' | 'wallface' | 'item'

export type PieceStatus = 'electrified' | 'ghostmode' | 'poison'
export type PieceStatuses = { [key in PieceStatus]?: true }

export type PieceState = {
  id: string
  sprite: EmojiAssetId
  hueRotate?: number
  mapId: string
  x: number
  xTimestamp?: number
  zSpecial?: ZSpecial
  statuses: PieceStatuses
  statusEffect?: PieceStatus
  statusEffectElectrified?: PieceStatus
  statusEffectPressed?: PieceStatus
  disabled?: boolean
}

export type CreatureState = PieceState & {
  level: number
  zIndex: number
}

export type PlayerState = CreatureState & {
  name: string
  voice: Voice
}

export type GamePieceState = PieceState | CreatureState | PlayerState

export type GameStatePieces = { [id: string]: GamePieceState }

export type MapSize = (typeof mapSizes)[number]

export type MapState = {
  id: string
  size: MapSize
  pieces: { [id: string]: GamePieceState }
  tilesElectrified?: { [x: number]: true }
}

export type GameState = {
  pieces: { [id: string]: GamePieceState }
  maps: { [id: string]: MapState }
}
