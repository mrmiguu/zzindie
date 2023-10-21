import { useContext, useEffect } from 'react'

import { AppStateDispatchContext } from './AppStateContext'
import Canvas3D from './Canvas3D'
import Ui from './Ui'

function App() {
  const appStateDispatch = useContext(AppStateDispatchContext)

  // Temporarily allow console-based event dispatching.
  ;(window as Window & typeof globalThis & { appStateDispatch: unknown }).appStateDispatch = appStateDispatch

  useEffect(() => {
    const mapId = 'planningpoker'

    // playMusic('ac01')

    // Planning Poker setup
    appStateDispatch({
      type: 'addMap',
      map: {
        id: mapId,
        size: 63,
        pieces: {
          poker_sign: { id: 'poker_sign', sprite: '👻', zSpecial: 'background', statuses: {}, mapId, x: -3 },
          poker_switch: {
            id: 'poker_switch',
            sprite: '🔘',
            zSpecial: 'surface',
            statuses: {},
            statusEffectPressed: 'electrified',
            mapId,
            x: -3,
          },
          '1': {
            id: '1',
            sprite: '1️⃣',
            zSpecial: 'background',
            statuses: {},
            statusEffectElectrified: 'ghostmode',
            mapId,
            x: -2,
          },
          '2': {
            id: '2',
            sprite: '2️⃣',
            zSpecial: 'background',
            statuses: {},
            statusEffectElectrified: 'ghostmode',
            mapId,
            x: -1,
          },
          '3': {
            id: '3',
            sprite: '3️⃣',
            zSpecial: 'background',
            statuses: {},
            statusEffectElectrified: 'ghostmode',
            mapId,
            x: 0,
          },
          '5': {
            id: '5',
            sprite: '5️⃣',
            zSpecial: 'background',
            statuses: {},
            statusEffectElectrified: 'ghostmode',
            mapId,
            x: 1,
          },
          '8': {
            id: '8',
            sprite: '8️⃣',
            zSpecial: 'background',
            statuses: {},
            statusEffectElectrified: 'ghostmode',
            mapId,
            x: 2,
          },
          palm1: { id: 'palm1', sprite: '🌴', zSpecial: 'background', statuses: {}, mapId, x: -5 },
          palm2: { id: 'palm2', sprite: '🌴', zSpecial: 'background', statuses: {}, mapId, x: 4 },
        },
      },
    })

    // Map decoration added later for fun..
    appStateDispatch({
      type: 'addMapPiece',
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
