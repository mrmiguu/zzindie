import { animated, useSpring } from '@react-spring/three'
import { PropsWithChildren } from 'react'
import { GamePieceState, MapSize, PieceState } from './ZzTypes'
import { PI } from './utils'

type Zz3dTilePieceProps = PropsWithChildren<{
  piece: PieceState
  zIndexes: GamePieceState[]
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}>

function Zz3dTilePiece({ piece, zIndexes, mapSize, inradius, tilesHigh, children }: Zz3dTilePieceProps) {
  // Calculate z position based on zIndexes here
  const zIndex = zIndexes.findIndex(p => p.id === piece.id)
  const end = zIndexes.length - 1
  const perc = end > 0 ? zIndex / end : 0.5
  const offHalf = 0.5
  const narrowFactor = 1.1
  const z = perc / narrowFactor - offHalf / narrowFactor

  const springs = useSpring({
    pieceXRotationZ: ((piece.x * 360) / mapSize) * (PI / 180),
    pieceYPositionY: -inradius + (-0.5 + z),
  })

  return (
    <animated.group key={piece.id} rotation-z={springs.pieceXRotationZ}>
      <animated.group position-y={springs.pieceYPositionY} position-z={tilesHigh / 2 + 0.5}>
        {children}
      </animated.group>
    </animated.group>
  )
}

export default Zz3dTilePiece
