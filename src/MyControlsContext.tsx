import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useAppState, useAppStateDispatch } from './AppStateContext'

interface MyControlsContextValue {
  heldKeys: { left: boolean; right: boolean }
  handleHopComplete: () => void
}

const MyControlsContext = createContext<MyControlsContextValue | undefined>(
  undefined
)

export function MyControlsProvider({ children }: { children: ReactNode }) {
  const [heldKeys, setHeldKeys] = useState<{ left: boolean; right: boolean }>({
    left: false,
    right: false,
  })
  const comboLevelRef = useRef(0)
  const appStateDispatch = useAppStateDispatch()
  const { myId } = useAppState()

  const handleHopComplete = useCallback(() => {
    if (!myId) return

    if (heldKeys.left) {
      comboLevelRef.current += 1
      appStateDispatch({
        type: 'movePlayerLeft',
        playerId: myId,
        delta: 1 * (comboLevelRef.current + 1),
      })
    } else if (heldKeys.right) {
      comboLevelRef.current += 1
      appStateDispatch({
        type: 'movePlayerRight',
        playerId: myId,
        delta: 1 * (comboLevelRef.current + 1),
      })
    } else {
      comboLevelRef.current = 0
    }
  }, [heldKeys, appStateDispatch, myId])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return
      if (!myId) return

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault()
        if (!heldKeys.left) {
          comboLevelRef.current = 0
          appStateDispatch({
            type: 'movePlayerLeft',
            playerId: myId,
            delta: 1,
          })
          setHeldKeys((prev) => ({ ...prev, left: true }))
        }
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        if (!heldKeys.right) {
          comboLevelRef.current = 0
          appStateDispatch({
            type: 'movePlayerRight',
            playerId: myId,
            delta: 1,
          })
          setHeldKeys((prev) => ({ ...prev, right: true }))
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault()
        setHeldKeys((prev) => ({ ...prev, left: false }))
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault()
        setHeldKeys((prev) => ({ ...prev, right: false }))
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [heldKeys, appStateDispatch, myId])

  return (
    <MyControlsContext.Provider value={{ heldKeys, handleHopComplete }}>
      {children}
    </MyControlsContext.Provider>
  )
}

export function useMyControls() {
  const context = useContext(MyControlsContext)
  if (!context) {
    throw new Error('useMyControls must be used within a MyControlsProvider')
  }
  return context
}
