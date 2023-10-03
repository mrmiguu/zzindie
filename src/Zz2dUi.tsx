import { useContext } from 'react'
import Zz2dLRScreen from './Zz2dLRScreen'
import { ZzAppStateDispatchContext } from './ZzAppState'

function Zz2dUi() {
  const zzAppStateDispatch = useContext(ZzAppStateDispatchContext)

  return (
    <div className="overflow-hidden pointer-events-none">
      {/* <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
        <div className="outline" />
      </div> */}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-auto">
        <Zz2dLRScreen
          onL={() => zzAppStateDispatch({ type: 'movePlayerLeft', playerId: 'abc' })}
          onR={() => zzAppStateDispatch({ type: 'movePlayerRight', playerId: 'abc' })}
        />
      </div>
    </div>
  )
}

export default Zz2dUi
