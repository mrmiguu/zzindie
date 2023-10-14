import { PropsWithChildren, ReactNode, useContext } from 'react'

import { animated, useSpring } from '@react-spring/three'

import { getTileBeastsAndHigher } from './appState'
import { AppStateContext } from './AppStateContext'
import { MapSize, PieceState } from './types'
import { PI } from './utils'

const OFF_HALF = 0.5
const NARROW_FACTOR = 1.1

type TilePieceProps = PropsWithChildren<{
  piece: PieceState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
  zFixedChildren?: ReactNode
}>

function TilePiece({ piece, mapSize, inradius, tilesHigh, zFixedChildren, children }: TilePieceProps) {
  const { x, id, zSpecial, mapId } = piece
  const appState = useContext(AppStateContext)

  const zIndexes = getTileBeastsAndHigher(appState, mapId, x)

  const zIndex = zIndexes.findIndex(p => p.id === id)
  const end = zIndexes.length - 1
  const perc = end > 0 ? zIndex / end : 0.5
  const z = perc / NARROW_FACTOR - OFF_HALF / NARROW_FACTOR
  const zDepth = zSpecial === 'background' ? 0 : zSpecial === 'foreground' ? 1 : zSpecial === 'item' ? 0.5 : 0.5 + z

  const springs = useSpring({
    pieceXRotationZ: ((x * 360) / mapSize) * (PI / 180),
    pieceZPositionY: -inradius - zDepth,
    pieceCenterZPositionY: -inradius - 0.5,
  })

  return (
    <animated.group key={id} rotation-z={springs.pieceXRotationZ}>
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
        rotation-x={(90 * PI) / 180}
        position-y={springs.pieceZPositionY}
        position-z={tilesHigh / 2 + 0.5}
      >
        {children}
      </animated.group>
    </animated.group>
  )
}

export default TilePiece
