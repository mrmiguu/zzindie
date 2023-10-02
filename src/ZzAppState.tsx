import { produce } from 'immer'
import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react'
import { PlayerState } from './ZzTypes'
import { stringify } from './utils'

type ZzAppState = {
  myId: string | null
  players: { [id: string]: PlayerState }
}

type ZzAppStateAction =
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

function zzAppStateReducer(zzAppState: ZzAppState, action: ZzAppStateAction) {
  switch (action.type) {
    case 'addPlayer': {
      return produce(zzAppState, zzAppState => {
        zzAppState.players[action.player.id] = action.player
      })
    }
    case 'setMyId': {
      return produce(zzAppState, zzAppState => {
        zzAppState.myId = action.id
      })
    }
    case 'movePlayerLeft': {
      return produce(zzAppState, zzAppState => {
        const player = zzAppState.players[action.playerId]
        if (player) {
          player.x = player.x - 1
        }
      })
    }
    case 'movePlayerRight': {
      return produce(zzAppState, zzAppState => {
        const player = zzAppState.players[action.playerId]
        if (player) {
          player.x = player.x + 1
        }
      })
    }
    default: {
      throw Error(`Unknown action: ${stringify(action)}`)
    }
  }
}

export const ZzAppStateContext = createContext<ZzAppState>(null as unknown as ZzAppState)
export const ZzAppStateDispatchContext = createContext<Dispatch<ZzAppStateAction>>(
  null as unknown as Dispatch<ZzAppStateAction>,
)

export function ZzAppStateProvider({ children }: PropsWithChildren) {
  const [zzAppState, dispatch] = useReducer(zzAppStateReducer, { myId: null, players: {} })

  return (
    <ZzAppStateContext.Provider value={zzAppState}>
      <ZzAppStateDispatchContext.Provider value={dispatch}>{children}</ZzAppStateDispatchContext.Provider>
    </ZzAppStateContext.Provider>
  )
}
