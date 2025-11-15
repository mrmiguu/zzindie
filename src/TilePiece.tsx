import {
  PropsWithChildren,
  ReactNode,
  useContext,
  useRef,
  useEffect,
} from 'react'

import { animated, easings, useSpring } from '@react-spring/three'
import { ThreeEvent } from '@react-three/fiber'

import { getTileCreatures } from './appState'
import { AppStateContext } from './AppStateContext'
import { useEmojiTextureAsset } from './assets.emojis'
import { MapSize, PieceState } from './types'
import { PI } from './utils'

const OFF_HALF = 0.5
const NARROW_FACTOR = 1.1
const HOP_DURATION_PER_TILE = 200 // milliseconds per tile
export const X_ROTATION_DURATION_PER_TILE = 200 // milliseconds per tile

const calculateHopHeight = (distance: number): number => {
  return distance ? Math.log(distance + 0.15) : 0
}

type TilePieceProps = PropsWithChildren<{
  piece: PieceState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
  opacity?: number
  xTeleport?: boolean
  onClick?: (event: ThreeEvent<MouseEvent>) => void
  zFixedChildren?: ReactNode
  onHopComplete?: () => void
}>

function TilePiece({
  piece,
  mapSize,
  inradius,
  tilesHigh,
  opacity,
  xTeleport,
  onClick,
  zFixedChildren,
  onHopComplete,
  children,
}: TilePieceProps) {
  const { x, id, zSpecial, mapId, sprite } = piece
  const appState = useContext(AppStateContext)
  const texture = useEmojiTextureAsset(sprite)

  const zIndexes = getTileCreatures(appState, mapId, x).filter(
    (c) => !('ghostmode' in (c.statuses ?? {}))
  )

  const zIndex = zIndexes.findIndex((p) => p.id === id)
  const end = zIndexes.length - 1
  const perc = end > 0 ? zIndex / end : 0.5
  const z = perc / NARROW_FACTOR - OFF_HALF / NARROW_FACTOR
  const zDepth =
    zSpecial === 'background'
      ? 0
      : zSpecial === 'foreground' || zSpecial === 'wallface'
      ? 1.0001
      : zSpecial
      ? 0.5
      : 0.5 + z

  const isPieceCreature = 'level' in piece

  const breathingSpring = useSpring(
    isPieceCreature
      ? {
          from: { scale: 1 },
          to: { scale: 0.95 },
          // BUG: we stop breathing intermittently on-move
          loop: { reverse: true },
          config: {
            duration: 1500,
            easing: easings.linear,
          },
        }
      : {}
  )

  // Track previous x position for hop detection
  const prevXRef = useRef(x)
  const hopHeightRef = useRef(0)

  // Hop animation spring
  const [hopSpring, hopApi] = useSpring(() => ({
    hopProgress: 0,
    config: { duration: 300 },
  }))

  // X rotation spring (separate from position springs to allow dynamic duration)
  const pieceXRotationZ = ((x * 360) / mapSize) * (PI / 180)
  const [rotationSpring, rotationApi] = useSpring(() => ({
    pieceXRotationZ,
    config: { duration: 300 },
  }))

  // Detect movement and trigger hop and rotation animations
  useEffect(() => {
    if (xTeleport) {
      // Don't hop during teleports, but do update rotation immediately
      prevXRef.current = x
      rotationApi.start({
        pieceXRotationZ,
        immediate: true,
      })
      return
    }

    const prevX = prevXRef.current
    const distance = Math.abs(x - prevX)

    if (distance > 0) {
      // Movement detected!
      const hopHeight = calculateHopHeight(distance)
      const duration = HOP_DURATION_PER_TILE * distance
      const rotationDuration = X_ROTATION_DURATION_PER_TILE * distance

      hopHeightRef.current = hopHeight

      // Reset and start hop animation
      hopApi.start({
        from: { hopProgress: 0 },
        to: { hopProgress: 1 },
        config: { duration },
        onRest: () => {
          onHopComplete?.()
        },
      })

      // Start rotation animation with scaled duration
      rotationApi.start({
        pieceXRotationZ,
        config: { duration: rotationDuration },
      })
    }

    prevXRef.current = x
  }, [x, xTeleport, hopApi, rotationApi, onHopComplete, pieceXRotationZ])

  // Calculate hop offset using parabolic formula
  const hopOffset = hopSpring.hopProgress.to(
    (progress) => hopHeightRef.current * 4 * progress * (1 - progress)
  )

  const springs = useSpring({
    pieceZPositionY: -inradius - zDepth,
    pieceCenterZPositionY: -inradius - 0.5,
  })

  return (
    <animated.group
      key={id}
      rotation-z={xTeleport ? pieceXRotationZ : rotationSpring.pieceXRotationZ}
    >
      {opacity !== 0 && (
        <>
          {zFixedChildren && (
            <animated.group
              rotation-x={(90 * PI) / 180}
              position-y={springs.pieceCenterZPositionY}
              position-z={hopOffset.to((hop) => tilesHigh / 2 + 0.5 + hop)}
            >
              {zFixedChildren}
            </animated.group>
          )}
          <animated.group
            rotation-x={zSpecial === 'surface' ? 0 : (90 * PI) / 180}
            position-y={springs.pieceZPositionY}
            position-z={hopOffset.to(
              (hop) =>
                tilesHigh / 2 +
                (zSpecial === 'surface'
                  ? 0.001
                  : zSpecial === 'wallface'
                  ? -0.5
                  : 0.5) +
                hop
            )}
          >
            {texture && (
              <animated.mesh
                scale={breathingSpring.scale}
                onPointerUp={onClick}
              >
                <boxGeometry args={[1, 1, 0]} />
                <meshStandardMaterial
                  map={texture}
                  transparent={true}
                  opacity={opacity}
                />
                {children}
              </animated.mesh>
            )}
          </animated.group>
        </>
      )}
    </animated.group>
  )
}

export default TilePiece
