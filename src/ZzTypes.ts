import { CSSProperties } from 'react'
import { mapSizes } from './ZzConsts'
import { Db_ChatMessage, Db_Map, Db_Player, Db_PlayerPosition } from './ZzDbTypes'
import { Voice } from './ZzTTS'

type GameState = {
  pieces: { [id: string]: PieceState | EntityState | BeastState | PlayerState }
  updatedAt: number
}

type PieceState = {
  id: string
  x: number
  xTimestamp?: number
  static?: 'foreground' | 'background' | 'item'
  important?: boolean
  className?: string
  disabled?: boolean
  style?: CSSProperties
}

type EntityState = PieceState & {
  sprite: string
  hueRotate?: number
}

type BeastState = EntityState & {
  level: number
}

type PlayerState = BeastState & {
  name: string
  voice: Voice
}

type EventSetPlayer = { type: 'set_player' } & Db_Player
type EventRemovePlayer = { type: 'remove_player' } & Pick<Db_Player, 'id'>
type EventSetPlayerPosition = { type: 'set_player_position' } & Pick<Db_Player, 'id'> & Db_PlayerPosition
type EventChatMessage = { type: 'chat_message' } & Omit<Db_ChatMessage, 'id'> & { map_id: Db_Map['id'] }
type GameEvent = EventSetPlayer | EventRemovePlayer | EventSetPlayerPosition | EventChatMessage

type MapSize = (typeof mapSizes)[number]

export type {
  BeastState,
  EntityState,
  EventChatMessage,
  EventRemovePlayer,
  EventSetPlayer,
  EventSetPlayerPosition,
  GameEvent,
  GameState,
  MapSize,
  PieceState,
  PlayerState,
}
