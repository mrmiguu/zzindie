import { produce } from 'immer'

import { playSound } from './assets.sounds'
import { absMod } from './math'
import { CreatureState, GameState, MapState, PieceState, PlayerState } from './types'
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
      type: 'addPiece'
      piece: PieceState
    }
  | {
      type: 'addCreature'
      creature: CreatureState
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
      case 'addPiece': {
        action.piece.xTimestamp = Date.now()
        appState.pieces[action.piece.id] = action.piece
        processMapCreatures(appState, action.piece.mapId)
        break
      }
      case 'addCreature': {
        action.creature.xTimestamp = Date.now()
        appState.pieces[action.creature.id] = action.creature
        processMapCreatures(appState, action.creature.mapId)
        break
      }
      case 'addPlayer': {
        action.player.xTimestamp = Date.now()
        appState.pieces[action.player.id] = action.player
        processMapCreatures(appState, action.player.mapId)
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
          processMapCreatures(appState, player.mapId)

          playSound('dash')
        }
        break
      }
      case 'movePlayerRight': {
        const player = appState.pieces[action.playerId]
        if (player) {
          player.x = player.x + 1
          player.xTimestamp = Date.now()
          processMapCreatures(appState, player.mapId)

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

export const getStatusEffectTilePieces = (state: AppState, mapId: string, x: number) => {
  const { size: mapSize = 2 } = state.maps[mapId] ?? {}

  const zIndexes = (values(state.pieces) as PieceState[])
    .filter(p => absMod(p.x, mapSize) === absMod(x, mapSize) && (p.statusEffect || p.statusEffectElectricity))
    .sort((a, b) => (a.xTimestamp ?? 0) - (b.xTimestamp ?? 0))

  return zIndexes
}

export const getTileCreatures = (state: AppState, mapId: string, x: number) => {
  const { size: mapSize = 2 } = state.maps[mapId] ?? {}

  const zIndexes = (values(state.pieces) as CreatureState[])
    .filter(p => 'level' in p && absMod(p.x, mapSize) === absMod(x, mapSize) && !p.zSpecial)
    .sort((a, b) => (a.xTimestamp ?? 0) - (b.xTimestamp ?? 0))

  return zIndexes
}

export const sortTileCreatures = (state: AppState, mapId: string, x: number) => {
  const zIndexes = getTileCreatures(state, mapId, x)

  for (let i = 0; i < zIndexes.length; i++) {
    zIndexes[i]!.zIndex = i
  }
}

export const sortMapCreatures = (state: AppState, mapId: string) => {
  const { size: mapSize = 2 } = state.maps[mapId] ?? {}

  for (let x = 0; x < mapSize; x++) {
    sortTileCreatures(state, mapId, x)
  }
}

export const statusEffectTileCreatures = (state: AppState, mapId: string, x: number) => {
  const zIndexes = getTileCreatures(state, mapId, x)
  const statusEffectPieces = getStatusEffectTilePieces(state, mapId, x)

  for (let i = 0; i < zIndexes.length; i++) {
    const creature = zIndexes[i]!
    creature.zIndex = i

    const statuses = statusEffectPieces
      .filter(p => p.id !== creature.id)
      .map(p => p.statusEffect!)
      .sort()
    if (statuses.length) creature.status = statuses
    else delete creature.status
  }
}

export const statusEffectMapCreatures = (state: AppState, mapId: string) => {
  const { size: mapSize = 2 } = state.maps[mapId] ?? {}

  for (let x = 0; x < mapSize; x++) {
    statusEffectTileCreatures(state, mapId, x)
  }
}

export const processMapCreatures = (state: AppState, mapId: string) => {
  sortMapCreatures(state, mapId)
  statusEffectMapCreatures(state, mapId)
}
