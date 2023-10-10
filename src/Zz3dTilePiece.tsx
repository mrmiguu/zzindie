import { animated, useSpring } from '@react-spring/three'
import { PropsWithChildren, useContext } from 'react'
import { ZzAppStateContext } from './ZzAppState'
import { MapSize, PieceState } from './ZzTypes'
import { PI, values } from './utils'

const OFF_HALF = 0.5
const NARROW_FACTOR = 1.1

type Zz3dTilePieceProps = PropsWithChildren<{
  piece: PieceState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}>

function Zz3dTilePiece({ piece: { x, id, zSpecial }, mapSize, inradius, tilesHigh, children }: Zz3dTilePieceProps) {
  const { pieces } = useContext(ZzAppStateContext)

  const zIndexes = values(pieces)
    .filter(p => p.x === x && !p.zSpecial)
    .sort((a, b) => (a.xTimestamp ?? 0) - (b.xTimestamp ?? 0))

  const zIndex = zIndexes.findIndex(p => p.id === id)
  const end = zIndexes.length - 1
  const perc = end > 0 ? zIndex / end : 0.5
  const z = perc / NARROW_FACTOR - OFF_HALF / NARROW_FACTOR
  const zDepth = zSpecial === 'background' ? 0 : zSpecial === 'foreground' ? 1 : zSpecial === 'item' ? 0.5 : 0.5 + z

  const springs = useSpring({
    pieceXRotationZ: ((x * 360) / mapSize) * (PI / 180),
    pieceYPositionY: -inradius - zDepth,
  })

  return (
    <animated.group key={id} rotation-z={springs.pieceXRotationZ}>
      <animated.group position-y={springs.pieceYPositionY} position-z={tilesHigh / 2 + 0.5}>
        {children}
      </animated.group>
    </animated.group>
  )
}

export default Zz3dTilePiece
