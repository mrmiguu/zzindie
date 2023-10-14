import { produce } from 'immer'
import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react'

import { useMusic } from './assets.music'
import { playSound } from './assets.sounds'
import { BeastState, EntityState, PieceState, PlayerState } from './types'
import { stringify } from './utils'

type AppState = {
  myId: string | null
  pieces: { [id: string]: PieceState | EntityState | BeastState | PlayerState }
}

type AppStateAction =
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

function appStateReducer(appState: AppState, action: AppStateAction) {
  return produce(appState, appState => {
    switch (action.type) {
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
          playSound('dash')
        }
        break
      }
      case 'movePlayerRight': {
        const player = appState.pieces[action.playerId]
        if (player) {
          player.x = player.x + 1
          player.xTimestamp = Date.now()
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

export const AppStateContext = createContext<AppState>(null as unknown as AppState)
export const AppStateDispatchContext = createContext<Dispatch<AppStateAction>>(
  null as unknown as Dispatch<AppStateAction>,
)

export function AppStateProvider({ children }: PropsWithChildren) {
  const [appState, dispatch] = useReducer(appStateReducer, {
    myId: null,
    pieces: {},
  })

  useMusic({ volume: 0.2 })

  return (
    <AppStateContext.Provider value={appState}>
      <AppStateDispatchContext.Provider value={dispatch}>{children}</AppStateDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}
