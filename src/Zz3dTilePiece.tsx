import { animated, useSpring } from '@react-spring/three'
import { useTexture } from '@react-three/drei'
import { GameState, MapSize, PieceState } from './ZzTypes'
import emojiBabyPng from './assets/emojis/baby.png'
import emojiCowboyHatFacePng from './assets/emojis/cowboy-hat-face.png'
import { PI } from './utils'

type Zz3dTilePieceProps = {
  piece: PieceState
  zIndexes: GameState['pieces'][keyof GameState['pieces']][]
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}

function Zz3dTilePiece({ piece, zIndexes, mapSize, inradius, tilesHigh }: Zz3dTilePieceProps) {
  // TODO: fix this-- it's super sketch
  //       React Hook "useTexture" is called conditionally.
  //       React Hooks must be called in the exact same order in every component render.
  const texture =
    'sprite' in piece && typeof piece.sprite === 'string'
      ? useTexture(piece.sprite === '👶' ? emojiBabyPng : piece.sprite === '🤠' ? emojiCowboyHatFacePng : '')
      : null

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
        <mesh>
          <boxGeometry args={[1, 0, 1]} />
          <meshStandardMaterial map={texture} transparent />
        </mesh>
      </animated.group>
    </animated.group>
  )
}

export default Zz3dTilePiece
