import { CSSProperties } from 'react'
import { mapSizes } from './ZzConsts'
import { Db_ChatMessage, Db_Map, Db_Player, Db_PlayerPosition } from './ZzDbTypes'
import { Voice } from './ZzTTS'
import { EmojiAssetId } from './assets.emojis'

export type PieceState = {
  id: string
  x: number
  xTimestamp?: number
  static?: 'foreground' | 'background' | 'item'
  important?: boolean
  className?: string
  disabled?: boolean
  style?: CSSProperties
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
  // TODO: deprecate
  updatedAt: number
}

export type EventSetPlayer = { type: 'set_player' } & Db_Player
export type EventRemovePlayer = { type: 'remove_player' } & Pick<Db_Player, 'id'>
export type EventSetPlayerPosition = { type: 'set_player_position' } & Pick<Db_Player, 'id'> & Db_PlayerPosition
export type EventChatMessage = { type: 'chat_message' } & Omit<Db_ChatMessage, 'id'> & { map_id: Db_Map['id'] }
export type GameEvent = EventSetPlayer | EventRemovePlayer | EventSetPlayerPosition | EventChatMessage

export type MapSize = (typeof mapSizes)[number]
