import { useContext, useEffect } from 'react'

import { AppStateDispatchContext } from './AppStateContext'
import { playMusic } from './assets.music'
import Canvas3D from './Canvas3D'
import Ui from './Ui'

function App() {
  const appStateDispatch = useContext(AppStateDispatchContext)

  useEffect(() => {
    playMusic('ac01')

    // Planning Poker setup
    appStateDispatch({ type: 'addMap', map: { id: 'planningpoker', size: 64 } })
    appStateDispatch({
      type: 'addEntity',
      entity: { id: '1', sprite: '1️⃣', zSpecial: 'background', mapId: 'planningpoker', x: -2 },
    })
    appStateDispatch({
      type: 'addEntity',
      entity: { id: '2', sprite: '2️⃣', zSpecial: 'background', mapId: 'planningpoker', x: -1 },
    })
    appStateDispatch({
      type: 'addEntity',
      entity: { id: '3', sprite: '3️⃣', zSpecial: 'background', mapId: 'planningpoker', x: 0 },
    })
    appStateDispatch({
      type: 'addEntity',
      entity: { id: '5', sprite: '5️⃣', zSpecial: 'background', mapId: 'planningpoker', x: 1 },
    })
    appStateDispatch({
      type: 'addEntity',
      entity: { id: '8', sprite: '8️⃣', zSpecial: 'background', mapId: 'planningpoker', x: 2 },
    })

    appStateDispatch({
      type: 'addEntity',
      entity: { id: 'palm', sprite: '🌴', zSpecial: 'background', mapId: 'planningpoker', x: 4 },
    })

    appStateDispatch({
      type: 'addEntity',
      entity: { id: 'drink', sprite: '🍹', zSpecial: 'foreground', mapId: 'planningpoker', x: 5 },
    })

    appStateDispatch({
      type: 'addPlayer',
      player: {
        id: 'bby',
        level: 1,
        name: 'Mr. Jelly',
        sprite: '🪼',
        voice: 'en_us_001',
        mapId: 'planningpoker',
        x: 2,
        zIndex: 0,
      },
    })

    appStateDispatch({
      type: 'addPlayer',
      player: {
        id: 'abc',
        level: 1,
        name: 'Squid esq.',
        sprite: '🦑',
        voice: 'en_us_001',
        mapId: 'planningpoker',
        x: 0,
        zIndex: 0,
      },
    })

    appStateDispatch({ type: 'setMyId', id: 'abc' })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Canvas3D />
      <Ui />
    </>
  )
}

export default App
