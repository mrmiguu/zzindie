import { useContext } from 'react'
import Zz2dLRScreen from './Zz2dLRScreen'
import { ZzAppStateDispatchContext } from './ZzAppState'

function Zz2dUi() {
  const zzAppStateDispatch = useContext(ZzAppStateDispatchContext)

  return (
    <div className="pointer-events-none overflow-hidden">
      <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center">
        <div className="outline" />
      </div>

      <div className="absolute w-full h-full left-0 top-0 pointer-events-auto">
        <Zz2dLRScreen
          onL={() => zzAppStateDispatch({ type: 'movePlayerLeft', playerId: 'abc' })}
          onR={() => zzAppStateDispatch({ type: 'movePlayerRight', playerId: 'abc' })}
        />
      </div>
    </div>
  )
}

export default Zz2dUi
