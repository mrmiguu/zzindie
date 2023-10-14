import { useContext, useEffect } from 'react'

import { AppStateDispatchContext } from './AppStateContext'
import { playMusic } from './assets.music'
import Canvas3D from './Canvas3D'
import Ui from './Ui'

function App() {
  const appStateDispatch = useContext(AppStateDispatchContext)

  useEffect(() => {
    const mapId = 'planningpoker'

    playMusic('ac01')

    // Planning Poker setup
    appStateDispatch({ type: 'addMap', map: { id: mapId, size: 63 } })
    appStateDispatch({
      type: 'addPiece',
      piece: { id: 'poker_sign', sprite: '🪧', mapId, zSpecial: 'background', x: -3 },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: { id: 'poker_switch', sprite: '🔘', mapId, zSpecial: 'surface', x: -3 },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: { id: '1', sprite: '1️⃣', mapId, zSpecial: 'foreground', x: -2 },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: { id: '2', sprite: '2️⃣', mapId, zSpecial: 'foreground', x: -1 },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: { id: '3', sprite: '3️⃣', mapId, zSpecial: 'foreground', x: 0 },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: { id: '5', sprite: '5️⃣', mapId, zSpecial: 'foreground', x: 1 },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: { id: '8', sprite: '8️⃣', mapId, zSpecial: 'foreground', x: 2 },
    })
    // Fun scenery
    appStateDispatch({
      type: 'addPiece',
      piece: { id: 'palm', sprite: '🌴', mapId, zSpecial: 'background', x: 4 },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: { id: 'drink', sprite: '🍹', mapId, zSpecial: 'foreground', x: 5 },
    })

    appStateDispatch({
      type: 'addPlayer',
      player: {
        id: 'bby',
        level: 1,
        name: 'Mr. Jelly',
        sprite: '🪼',
        voice: 'en_us_001',
        mapId,
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
        mapId,
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
