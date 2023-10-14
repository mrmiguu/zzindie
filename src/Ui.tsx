import { useContext } from 'react'

import { AppStateDispatchContext } from './AppState'
import LRScreen from './LRScreen'

function Ui() {
  const appStateDispatch = useContext(AppStateDispatchContext)

  return (
    <div className="overflow-hidden pointer-events-none">
      {/* <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
        <div className="outline" />
      </div> */}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-auto">
        <LRScreen
          onL={() => appStateDispatch({ type: 'movePlayerLeft', playerId: 'abc' })}
          onR={() => appStateDispatch({ type: 'movePlayerRight', playerId: 'abc' })}
        />
      </div>
    </div>
  )
}

export default Ui