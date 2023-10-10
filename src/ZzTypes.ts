import { mapSizes } from './ZzConsts'
import { Voice } from './ZzTTS'
import { EmojiAssetId } from './assets.emojis'

export type PieceState = {
  id: string
  x: number
  xTimestamp?: number
  zSpecial?: 'foreground' | 'background' | 'item'
  disabled?: boolean
}

export type EntityState = PieceState & {
  sprite: EmojiAssetId
  hueRotate?: number
}

export type BeastState = EntityState & {
  level: number
}

export type PlayerState = BeastState & {
  name: string
  voice: Voice
}

export type GamePieceState = PieceState | EntityState | BeastState | PlayerState

export type GameStatePieces = { [id: string]: GamePieceState }

export type GameState = {
  pieces: GameStatePieces
}

export type MapSize = (typeof mapSizes)[number]
