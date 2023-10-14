import { produce } from 'immer'
import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react'

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
  switch (action.type) {
    case 'addEntity': {
      return produce(appState, appState => {
        action.entity.xTimestamp = Date.now()
        appState.pieces[action.entity.id] = action.entity
      })
    }
    case 'addBeast': {
      return produce(appState, appState => {
        action.beast.xTimestamp = Date.now()
        appState.pieces[action.beast.id] = action.beast
      })
    }
    case 'addPlayer': {
      return produce(appState, appState => {
        action.player.xTimestamp = Date.now()
        appState.pieces[action.player.id] = action.player
      })
    }
    case 'setMyId': {
      return produce(appState, appState => {
        appState.myId = action.id
      })
    }
    case 'movePlayerLeft': {
      return produce(appState, appState => {
        const player = appState.pieces[action.playerId]
        if (player) {
          player.x = player.x - 1
          player.xTimestamp = Date.now()
        }
      })
    }
    case 'movePlayerRight': {
      return produce(appState, appState => {
        const player = appState.pieces[action.playerId]
        if (player) {
          player.x = player.x + 1
          player.xTimestamp = Date.now()
        }
      })
    }
    default: {
      throw Error(`Unknown action: ${stringify(action)}`)
    }
  }
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

  return (
    <AppStateContext.Provider value={appState}>
      <AppStateDispatchContext.Provider value={dispatch}>{children}</AppStateDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}
