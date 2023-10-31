import { PropsWithChildren, ReactNode, useContext } from 'react'

import { animated, easings, useSpring } from '@react-spring/three'
import { ThreeEvent } from '@react-three/fiber'

import { getTileCreatures } from './appState'
import { AppStateContext } from './AppStateContext'
import { useEmojiTextureAsset } from './assets.emojis'
import { MapSize, PieceState } from './types'
import { PI } from './utils'

const OFF_HALF = 0.5
const NARROW_FACTOR = 1.1

type TilePieceProps = PropsWithChildren<{
  piece: PieceState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
  opacity?: number
  xTeleport?: boolean
  onClick?: (event: ThreeEvent<MouseEvent>) => void
  zFixedChildren?: ReactNode
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
  children,
}: TilePieceProps) {
  const { x, id, zSpecial, mapId, sprite } = piece
  const appState = useContext(AppStateContext)
  const texture = useEmojiTextureAsset(sprite)

  const zIndexes = getTileCreatures(appState, mapId, x).filter(c => !('ghostmode' in (c.statuses ?? {})))

  const zIndex = zIndexes.findIndex(p => p.id === id)
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
      : {},
  )

  const pieceXRotationZ = ((x * 360) / mapSize) * (PI / 180)

  const springs = useSpring({
    pieceXRotationZ,
    pieceZPositionY: -inradius - zDepth,
    pieceCenterZPositionY: -inradius - 0.5,
  })

  return (
    <animated.group key={id} rotation-z={xTeleport ? pieceXRotationZ : springs.pieceXRotationZ}>
      {opacity !== 0 && (
        <>
          {zFixedChildren && (
            <animated.group
              rotation-x={(90 * PI) / 180}
              position-y={springs.pieceCenterZPositionY}
              position-z={tilesHigh / 2 + 0.5}
            >
              {zFixedChildren}
            </animated.group>
          )}
          <animated.group
            rotation-x={zSpecial === 'surface' ? 0 : (90 * PI) / 180}
            position-y={springs.pieceZPositionY}
            position-z={tilesHigh / 2 + (zSpecial === 'surface' ? 0.001 : zSpecial === 'wallface' ? -0.5 : 0.5)}
          >
            {texture && (
              <animated.mesh scale={breathingSpring.scale} onPointerUp={onClick}>
                <boxGeometry args={[1, 1, 0]} />
                <meshStandardMaterial map={texture} transparent={true} opacity={opacity} />
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
