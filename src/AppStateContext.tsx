import { createContext, Dispatch, PropsWithChildren, useReducer } from 'react'

import { AppState, AppStateAction, appStateReducer } from './appState'
import { useMusic } from './assets.music'

export const AppStateContext = createContext<AppState>(null as unknown as AppState)
export const AppStateDispatchContext = createContext<Dispatch<AppStateAction>>(
  null as unknown as Dispatch<AppStateAction>,
)

export function AppStateProvider({ children }: PropsWithChildren) {
  const [appState, dispatch] = useReducer(appStateReducer, {
    myId: null,
    pieces: {},
    maps: {},
  })

  useMusic({ volume: 0.2 })

  return (
    <AppStateContext.Provider value={appState}>
      <AppStateDispatchContext.Provider value={dispatch}>{children}</AppStateDispatchContext.Provider>
    </AppStateContext.Provider>
  )
}
