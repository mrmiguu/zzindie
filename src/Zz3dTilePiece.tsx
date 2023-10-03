import { animated, useSpring } from '@react-spring/three'
import { GameState, MapSize, PieceState } from './ZzTypes'
import { PI } from './utils'

type Zz3dTilePieceProps = {
  piece: PieceState
  zIndexes: GameState['pieces'][keyof GameState['pieces']][]
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}

function Zz3dTilePiece({ piece, zIndexes, mapSize, inradius, tilesHigh }: Zz3dTilePieceProps) {
  // Calculate z position based on zIndexes here
  const zIndex = zIndexes.findIndex(p => p.id === piece.id)
  const end = zIndexes.length - 1
  const perc = end > 0 ? zIndex / end : 0.5
  const offHalf = 0.5
  const narrowFactor = 1.1
  const z = perc / narrowFactor - offHalf / narrowFactor

  const springs = useSpring({
    pieceXRotationZ: ((piece.x * 360) / mapSize) * (PI / 180),
  })

  return (
    <animated.group key={piece.id} rotation-z={springs.pieceXRotationZ}>
      <group position-y={-inradius + (-0.5 + z)} position-z={tilesHigh / 2 + 0.5}>
        {/* <BoardPiece {...piece} z={z} /> */}
        <mesh>
          <boxGeometry args={[1, 0, 1]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>
    </animated.group>
  )
}

export default Zz3dTilePiece
