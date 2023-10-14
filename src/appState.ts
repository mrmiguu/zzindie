import { produce } from 'immer'

import { playSound } from './assets.sounds'
import { absMod } from './math'
import { BeastState, EntityState, GameState, MapState, PlayerState } from './types'
import { stringify, values } from './utils'

export type AppState = GameState & {
  myId: string | null
}

export type AppStateAction =
  | {
      type: 'addMap'
      map: MapState
    }
  | {
      type: 'addEntity'
      entity: EntityState
    }
  | {
      type: 'addBeast'
      beast: BeastState
    }
  | {
      type: 'addPlayer'
      player: PlayerState
    }
  | {
      type: 'setMyId'
      id: string
    }
  | {
      type: 'movePlayerLeft'
      playerId: string
    }
  | {
      type: 'movePlayerRight'
      playerId: string
    }

export const appStateReducer = (appState: AppState, action: AppStateAction) => {
  return produce(appState, appState => {
    switch (action.type) {
      case 'addMap': {
        appState.maps[action.map.id] = action.map
        break
      }
      case 'addEntity': {
        action.entity.xTimestamp = Date.now()
        appState.pieces[action.entity.id] = action.entity
        break
      }
      case 'addBeast': {
        action.beast.xTimestamp = Date.now()
        appState.pieces[action.beast.id] = action.beast
        break
      }
      case 'addPlayer': {
        action.player.xTimestamp = Date.now()
        appState.pieces[action.player.id] = action.player
        break
      }
      case 'setMyId': {
        appState.myId = action.id
        break
      }
      case 'movePlayerLeft': {
        const player = appState.pieces[action.playerId]
        if (player) {
          player.x = player.x - 1
          player.xTimestamp = Date.now()
          sortMapBeastsAndHigher(appState, player.mapId)

          playSound('dash')
        }
        break
      }
      case 'movePlayerRight': {
        const player = appState.pieces[action.playerId]
        if (player) {
          player.x = player.x + 1
          player.xTimestamp = Date.now()
          sortMapBeastsAndHigher(appState, player.mapId)

          playSound('dash')
        }
        break
      }
      default: {
        throw Error(`Unknown action: ${stringify(action)}`)
      }
    }
  })
}

export const getTileBeastsAndHigher = (state: AppState, mapId: string, x: number) => {
  const { size: mapSize = 2 } = state.maps[mapId] ?? {}

  const zIndexes = (values(state.pieces) as BeastState[])
    .filter(p => 'level' in p && absMod(p.x, mapSize) === absMod(x, mapSize) && !p.zSpecial)
    .sort((a, b) => (a.xTimestamp ?? 0) - (b.xTimestamp ?? 0))

  return zIndexes
}

export const sortTileBeastsAndHigher = (state: AppState, mapId: string, x: number) => {
  const zIndexes = getTileBeastsAndHigher(state, mapId, x)

  for (let i = 0; i < zIndexes.length; i++) {
    zIndexes[i]!.zIndex = i
  }
}

export const sortMapBeastsAndHigher = (state: AppState, mapId: string) => {
  const { size: mapSize = 2 } = state.maps[mapId] ?? {}

  for (let x = 0; x < mapSize; x++) {
    sortTileBeastsAndHigher(state, mapId, x)
  }
}
