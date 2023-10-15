import { PropsWithChildren, ReactNode, useContext } from 'react'

import { animated, easings, useSpring } from '@react-spring/three'

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
  zFixedChildren?: ReactNode
}>

function TilePiece({ piece, mapSize, inradius, tilesHigh, opacity, zFixedChildren, children }: TilePieceProps) {
  const { x, id, zSpecial, mapId, sprite } = piece
  const appState = useContext(AppStateContext)
  const texture = useEmojiTextureAsset(sprite)

  const zIndexes = getTileCreatures(appState, mapId, x).filter(c => !('ghostmode' in (c.statuses ?? {})))

  const zIndex = zIndexes.findIndex(p => p.id === id)
  const end = zIndexes.length - 1
  const perc = end > 0 ? zIndex / end : 0.5
  const z = perc / NARROW_FACTOR - OFF_HALF / NARROW_FACTOR
  const zDepth = zSpecial === 'background' ? 0 : zSpecial === 'foreground' ? 1 : zSpecial === 'item' ? 0.5 : 0.5 + z

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

  const springs = useSpring({
    pieceXRotationZ: ((x * 360) / mapSize) * (PI / 180),
    pieceZPositionY: -inradius - zDepth,
    pieceCenterZPositionY: -inradius - 0.5,
  })

  return (
    <animated.group key={id} rotation-z={springs.pieceXRotationZ}>
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
            position-z={tilesHigh / 2 + (zSpecial === 'surface' ? 0.001 : 0.5)}
          >
            {texture && (
              <animated.mesh scale={breathingSpring.scale}>
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
