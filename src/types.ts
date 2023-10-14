import { EmojiAssetId } from './assets.emojis'
import { mapSizes } from './consts'
import { Voice } from './tts'

export type PieceState = {
  id: string
  sprite: EmojiAssetId
  hueRotate?: number
  mapId: string
  x: number
  xTimestamp?: number
  zSpecial?: 'foreground' | 'background' | 'item'
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
}

export type GameState = {
  pieces: { [id: string]: GamePieceState }
  maps: { [id: string]: MapState }
}
