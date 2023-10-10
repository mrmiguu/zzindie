import { useContext, useEffect } from 'react'
import Zz2dUi from './Zz2dUi'
import Zz3dCanvas from './Zz3dCanvas'
import { ZzAppStateDispatchContext } from './ZzAppState'

function ZzApp() {
  const zzAppStateDispatch = useContext(ZzAppStateDispatchContext)

  useEffect(() => {
    zzAppStateDispatch({
      type: 'addEntity',
      entity: {
        id: 'palm',
        sprite: '🌴',
        zSpecial: 'background',
        x: 3,
      },
    })
    zzAppStateDispatch({
      type: 'addEntity',
      entity: {
        id: 'drink',
        sprite: '🍹',
        zSpecial: 'foreground',
        x: 3,
      },
    })
    zzAppStateDispatch({
      type: 'addPlayer',
      player: {
        id: 'bby',
        level: 1,
        name: 'Mr. Jelly',
        sprite: '🪼',
        voice: 'en_us_001',
        x: 2,
      },
    })
    zzAppStateDispatch({
      type: 'addPlayer',
      player: {
        id: 'abc',
        level: 1,
        name: 'Squid esq.',
        sprite: '🦑',
        voice: 'en_us_001',
        x: 0,
      },
    })
    zzAppStateDispatch({ type: 'setMyId', id: 'abc' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Zz3dCanvas />
      <Zz2dUi />
    </>
  )
}

export default ZzApp
