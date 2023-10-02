import { Voice } from './ZzTTS'

type Db_Player = {
  id: string
  name: string
  sprite_emoji: string
  sprite_hue_rotate: number
  voice: Voice
  exp: number
  map_id: string
  party_id: string | null
}
type Db_PlayerItems = {
  item_counts: { [item_emoji: string]: number }
}
type Db_PlayerFriends = {
  players: { [player_id: string]: true }
}
type Db_PlayerPosition = {
  x: number
}

type Db_Map = {
  id: string
  players: { [player_id: string]: true }
  chat_messages: { [message_id: string]: true }
}

type Db_ChatMessage = {
  id: string
  player_id: string
  msg: string
  timestamp: string
}

type Db_Party = {
  id: string
  players: { [player_id: string]: true }
}

type Db_Quest = {
  id: string
  players_stage: { [player_id: string]: number }
}

type Db = {
  players: { [player_id: string]: Db_Player }
  player_items: { [player_id: string]: Db_PlayerItems }
  player_friends: { [player_id: string]: Db_PlayerFriends }
  player_positions: { [player_id: string]: Db_PlayerPosition }

  maps: { [map_id: string]: Db_Map }

  chat_messages: { [message_id: string]: Db_ChatMessage }

  quests: { [quest_id: string]: Db_Quest }

  parties: { [party_id: string]: Db_Party }
}

export type {
  Db,
  Db_ChatMessage,
  Db_Map,
  Db_Party,
  Db_Player,
  Db_PlayerFriends,
  Db_PlayerItems,
  Db_PlayerPosition,
  Db_Quest,
}
