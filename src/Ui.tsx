import { useContext } from 'react'

import { AppStateContext, AppStateDispatchContext } from './AppStateContext'
import LRScreen from './LRScreen'

function Ui() {
  const { myId } = useContext(AppStateContext)
  const appStateDispatch = useContext(AppStateDispatchContext)

  return (
    <div className="overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-auto">
        {myId && (
          <LRScreen
            onL={() => appStateDispatch({ type: 'movePlayerLeft', playerId: myId })}
            onR={() => appStateDispatch({ type: 'movePlayerRight', playerId: myId })}
          />
        )}
      </div>
    </div>
  )
}

export default Ui
