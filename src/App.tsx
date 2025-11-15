import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import { AuthError, Session, User } from '@supabase/supabase-js'

import { AppStateDispatchContext } from './AppStateContext'
import Canvas3D from './Canvas3D'
import { supabase } from './supabase'
import Ui from './Ui'
import { produce } from 'immer'

type UserAuthState = [User | null, Session | null, AuthError | null]

function App() {
  const appStateDispatch = useContext(AppStateDispatchContext)

  const [[user, session, authError], setUser] = useState<UserAuthState>([
    null,
    null,
    null,
  ])

  // Temporarily allow console-based event dispatching.
  ;(
    window as Window & typeof globalThis & { appStateDispatch: unknown }
  ).appStateDispatch = appStateDispatch

  useEffect(() => {
    const getOrCreateAnonymousUser = async () => {
      const myAnonymousEmail = localStorage.getItem('myAnonymousEmail')
      const myAnonymousPassword = localStorage.getItem('myAnonymousPassword')

      if (!myAnonymousEmail || !myAnonymousPassword) {
        const randomEmail = `${uuidv4()}@zzindie.com`
        const randomPassword = `${uuidv4()}`

        const { data, error } = await supabase.auth.signUp({
          email: randomEmail,
          password: randomPassword,
        })

        if (!error) {
          localStorage.setItem('myAnonymousEmail', randomEmail)
          localStorage.setItem('myAnonymousPassword', randomPassword)

          setUser([data.user, data.session, error])
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: myAnonymousEmail,
          password: myAnonymousPassword,
        })

        setUser([data.user, data.session, error])
      }
    }
    getOrCreateAnonymousUser()
  }, [])

  useEffect(() => {
    if (authError) {
      toast.error(
        `${authError.name} (${authError.status}): ${authError.message}`
      )
    }
  }, [authError])

  useEffect(() => {
    if (user && session) {
      toast('user and session ok!')
    }
  }, [user, session])

  useEffect(() => {
    const mapId = 'planningpoker'

    // appStateDispatch({
    //   type: 'switchModes',
    //   mode: 'build',
    // })

    // Planning Poker setup
    appStateDispatch({
      type: 'addMap',
      map: {
        id: mapId,
        size: 35,
        pieces: {
          poker_sign: {
            id: 'poker_sign',
            sprite: '👻',
            zSpecial: 'background',
            statuses: {},
            mapId,
            x: -3,
          },
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
            zSpecial: 'wallface',
            statuses: {},
            statusEffectElectrified: 'ghostmode',
            mapId,
            x: -2,
          },
          '2': {
            id: '2',
            sprite: '2️⃣',
            zSpecial: 'wallface',
            statuses: {},
            statusEffectElectrified: 'ghostmode',
            mapId,
            x: -1,
          },
          '3': {
            id: '3',
            sprite: '3️⃣',
            zSpecial: 'wallface',
            statuses: {},
            statusEffectElectrified: 'ghostmode',
            mapId,
            x: 0,
          },
          '5': {
            id: '5',
            sprite: '5️⃣',
            zSpecial: 'wallface',
            statuses: {},
            statusEffectElectrified: 'ghostmode',
            mapId,
            x: 1,
          },
          '8': {
            id: '8',
            sprite: '8️⃣',
            zSpecial: 'wallface',
            statuses: {},
            statusEffectElectrified: 'ghostmode',
            mapId,
            x: 2,
          },
          palm1: {
            id: 'palm1',
            sprite: '🌴',
            zSpecial: 'background',
            statuses: {},
            mapId,
            x: -5,
          },
          palm2: {
            id: 'palm2',
            sprite: '🌴',
            zSpecial: 'background',
            statuses: {},
            mapId,
            x: 4,
          },
        },
        music: 'ac01',
      },
    })

    // Map decoration added later for fun..
    appStateDispatch({
      type: 'addMapPiece',
      piece: {
        id: 'drink',
        sprite: '🍹',
        zSpecial: 'foreground',
        statuses: {},
        mapId,
        x: 5,
      },
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

  // Combo system state
  const [heldKeys, setHeldKeys] = useState<{ left: boolean; right: boolean }>({
    left: false,
    right: false,
  })
  const comboLevelRef = useRef(0)

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return // Ignore key repeat events

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setHeldKeys(
          produce((heldKeys) => {
            if (!heldKeys.left) {
              comboLevelRef.current = 0
              appStateDispatch({
                type: 'movePlayerLeft',
                playerId: 'alex',
                delta: 1,
              })
            }
            heldKeys.left = true
          })
        )
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setHeldKeys(
          produce((heldKeys) => {
            if (!heldKeys.right) {
              comboLevelRef.current = 0
              appStateDispatch({
                type: 'movePlayerRight',
                playerId: 'alex',
                delta: 1,
              })
            }
            heldKeys.right = true
          })
        )
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        setHeldKeys(
          produce((heldKeys) => {
            heldKeys.left = false
          })
        )
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        setHeldKeys(
          produce((heldKeys) => {
            heldKeys.right = false
          })
        )
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [appStateDispatch])

  // Hop complete handler - called when player lands
  const handleHopComplete = useCallback(() => {
    if (heldKeys.left) {
      comboLevelRef.current += 1
      appStateDispatch({
        type: 'movePlayerLeft',
        playerId: 'alex',
        delta: 1 * (comboLevelRef.current + 1),
      })
    } else if (heldKeys.right) {
      comboLevelRef.current += 1
      appStateDispatch({
        type: 'movePlayerRight',
        playerId: 'alex',
        delta: 1 * (comboLevelRef.current + 1),
      })
    } else {
      comboLevelRef.current = 0
    }
  }, [heldKeys, appStateDispatch])

  return (
    <>
      <Canvas3D onHopComplete={handleHopComplete} />
      <Ui />
    </>
  )
}

export default App
