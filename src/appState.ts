import { produce } from 'immer'

import { playSound } from './assets.sounds'
import { absMod } from './math'
import { difference } from './math.sets'
import { CreatureState, GameState, MapState, PieceState, PieceStatuses, PlayerState } from './types'
import { keys, stringify, values } from './utils'

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
    .filter(p => {
      const onSameTile = absMod(p.x, mapSize) === absMod(x, mapSize)
      const hasStatusEffect = p.statusEffect
      const hasElectrifiedStatusEffect = 'electrified' in p.statuses && p.statusEffectElectrified
      return onSameTile && (hasStatusEffect || hasElectrifiedStatusEffect)
    })
    .sort((a, b) => (a.xTimestamp ?? 0) - (b.xTimestamp ?? 0))

  return zIndexes
}

export const getTilePiecesUnordered = (state: AppState, mapId: string, x: number) => {
  const { size: mapSize = 2 } = state.maps[mapId] ?? {}

  const zIndexes = values(state.pieces).filter(p => absMod(p.x, mapSize) === absMod(x, mapSize))
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

export const statusEffectTilePieces = (state: AppState, mapId: string, x: number) => {
  const pieces = getTilePiecesUnordered(state, mapId, x)
  const statusEffectPieces = getStatusEffectTilePieces(state, mapId, x)

  for (const piece of pieces) {
    const statuses = statusEffectPieces
      .filter(p => p.id !== piece.id)
      .reduce<PieceStatuses>(
        (s, p) =>
          produce(s, s => {
            if ('electrified' in p.statuses && p.statusEffectElectrified) {
              s[p.statusEffectElectrified] = true
            } else if (p.statusEffect) {
              s[p.statusEffect] = true
            }
          }),
        {},
      )

    const weightyPieces = pieces.filter(p => p.id !== piece.id && !p.zSpecial)

    if (piece.statusEffectPressed && weightyPieces.length) {
      statuses['electrified'] = true
    }
    if ('zIndex' in piece && 'ghostmode' in statuses) {
      piece.zIndex = 0
    }

    piece.statuses = statuses
  }
}

export const electrifyTilePieceCircuit = (
  state: AppState,
  mapId: string,
  x: number,
  xCache: { [x: number]: true } = {},
) => {
  const { size: mapSize = 2 } = state.maps[mapId] ?? {}
  const xMod = absMod(x, mapSize)

  if (xMod in xCache) return
  xCache[xMod] = true

  const pieces = getTilePiecesUnordered(state, mapId, x)

  for (const piece of pieces) {
    piece.statuses['electrified'] = true
  }

  if (pieces.length) {
    electrifyTilePieceCircuit(state, mapId, absMod(x + 1, mapSize), xCache)
    electrifyTilePieceCircuit(state, mapId, absMod(x - 1, mapSize), xCache)
  }
}

export const possiblyElectrifyTilePieceCircuit = (
  state: AppState,
  mapId: string,
  x: number,
  xCache: { [x: number]: true },
) => {
  const pieces = getTilePiecesUnordered(state, mapId, x)

  if (pieces.some(p => 'electrified' in p.statuses)) {
    electrifyTilePieceCircuit(state, mapId, x, xCache)
    return true
  }

  return false
}

export const possiblyElectrifyMapPieces = (state: AppState, mapId: string) => {
  const map = state.maps[mapId]
  if (!map) return

  const xElectricityCache: { [x: number]: true } = {}
  let isElectrified = false

  for (let x = 0; x < map.size; x++) {
    const xElectrified = possiblyElectrifyTilePieceCircuit(state, mapId, x, xElectricityCache)
    isElectrified = isElectrified || xElectrified
  }

  const tilesElectrified: { [x: number]: true } = {}

  for (let x = 0; x < map.size; x++) {
    if (getTilePiecesUnordered(state, mapId, x).some(p => 'electrified' in p.statuses)) {
      tilesElectrified[x] = true
    }
  }

  const newElec = new Set(keys(tilesElectrified))
  const oldElec = new Set(keys(map.tilesElectrified ?? {}))

  if (difference(newElec, oldElec).size > 0) {
    playSound('zap3')
  }

  map.tilesElectrified = tilesElectrified
}

export const statusEffectMapPieces = (state: AppState, mapId: string) => {
  const map = state.maps[mapId]
  if (!map) return

  for (let x = 0; x < map.size; x++) {
    statusEffectTilePieces(state, mapId, x)
  }

  // This must happen after all individual tile piece statuses have been set.
  possiblyElectrifyMapPieces(state, mapId)
}

export const processMapCreatures = (state: AppState, mapId: string) => {
  sortMapCreatures(state, mapId) // Any zIndex status effects will be overridden if soft happens after.
  statusEffectMapPieces(state, mapId) // Any zIndex status effects will be overridden if soft happens after.
}
