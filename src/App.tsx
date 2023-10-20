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
      piece: { id: 'poker_sign', sprite: '👻', zSpecial: 'background', statuses: {}, mapId, x: -3 },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: {
        id: 'poker_switch',
        sprite: '🔘',
        zSpecial: 'surface',
        statuses: {},
        statusEffectPressed: 'electrified',
        mapId,
        x: -3,
      },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: {
        id: '1',
        sprite: '1️⃣',
        zSpecial: 'background',
        statuses: {},
        statusEffectElectrified: 'ghostmode',
        mapId,
        x: -2,
      },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: {
        id: '2',
        sprite: '2️⃣',
        zSpecial: 'background',
        statuses: {},
        statusEffectElectrified: 'ghostmode',
        mapId,
        x: -1,
      },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: {
        id: '3',
        sprite: '3️⃣',
        zSpecial: 'background',
        statuses: {},
        statusEffectElectrified: 'ghostmode',
        mapId,
        x: 0,
      },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: {
        id: '5',
        sprite: '5️⃣',
        zSpecial: 'background',
        statuses: {},
        statusEffectElectrified: 'ghostmode',
        mapId,
        x: 1,
      },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: {
        id: '8',
        sprite: '8️⃣',
        zSpecial: 'background',
        statuses: {},
        statusEffectElectrified: 'ghostmode',
        mapId,
        x: 2,
      },
    })
    // Fun scenery
    appStateDispatch({
      type: 'addPiece',
      piece: { id: 'palm', sprite: '🌴', zSpecial: 'background', statuses: {}, mapId, x: 4 },
    })
    appStateDispatch({
      type: 'addPiece',
      piece: { id: 'drink', sprite: '🍹', zSpecial: 'foreground', statuses: {}, mapId, x: 5 },
    })

    appStateDispatch({
      type: 'addPlayer',
      player: {
        id: 'jelly',
        level: 1,
        name: 'Mr. Jelly',
        sprite: '🪼',
        voice: 'en_us_001',
        statuses: {},
        statusEffect: 'poison',
        mapId,
        x: -1,
        zIndex: 0,
      },
    })

    appStateDispatch({
      type: 'addPlayer',
      player: {
        id: 'froge',
        level: 1,
        name: 'Froge',
        sprite: '🐸',
        voice: 'en_us_001',
        statuses: {},
        mapId,
        x: -1,
        zIndex: 0,
      },
    })

    appStateDispatch({
      type: 'addPlayer',
      player: {
        id: 'alex',
        level: 1,
        name: 'Squidward',
        sprite: '🦑',
        voice: 'en_us_001',
        statuses: {},
        mapId,
        x: 0,
        zIndex: 0,
      },
    })

    appStateDispatch({ type: 'setMyId', id: 'alex' })

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
