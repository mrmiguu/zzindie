import { useMemo } from 'react'
// import { useThree } from '@react-three/fiber'
// import BoardPiece from './ZzBoardPiece'
import { Html } from '@react-three/drei'
import { TILE_PX } from './ZzConsts'
import { GameState, MapSize, PieceState } from './ZzTypes'
import { polygonInradius } from './math'
import { PI } from './utils'

type Zz3dTileCarouselProps = {
  mapSize: MapSize
  tilesHigh: number
  iCamera: number
  cameraAngle: number
  pieces: { [id: string]: PieceState }
  zIndexes: GameState['pieces'][keyof GameState['pieces']][]
}

function Zz3dTileCarousel({
  mapSize,
  tilesHigh,
  iCamera,
  cameraAngle /* , pieces, zIndexes */,
}: Zz3dTileCarouselProps) {
  const inradiusPx = polygonInradius(mapSize, TILE_PX)
  const inradius = inradiusPx / TILE_PX

  const tileEls = useMemo(() => {
    return [...Array(mapSize)].map((_, i) => {
      return (
        <group key={i} rotation={[0, 0, ((i * 360) / mapSize) * (PI / 180)]}>
          <group key={i} position={[0, -inradius - 0.5, 0]}>
            <mesh>
              <boxGeometry args={[1, 1, tilesHigh]} />
              <meshStandardMaterial color={'white'} />
              <Html transform position={[0, 0, tilesHigh / 2]}>
                {i}
              </Html>
            </mesh>
          </group>
        </group>
      )
    })
  }, [mapSize, tilesHigh, inradius])

  // const pieceEls = useMemo(() => {
  //   return Object.values(pieces).map(piece => {
  //     // Calculate z position based on zIndexes here
  //     const zIndex = zIndexes.findIndex(p => p.id === piece.id)
  //     const end = zIndexes.length - 1
  //     const perc = end > 0 ? zIndex / end : 0.5
  //     const offHalf = 0.5
  //     const narrowFactor = 1.1
  //     const z = perc / narrowFactor - offHalf / narrowFactor

  //     return (
  //       <group
  //         key={piece.id}
  //         position={[0, pxInradius, 0]}
  //         rotation={[0, ((-piece.x * 360) / mapSize) * (PI / 180), 0]}
  //       >
  //         <BoardPiece {...piece} z={z} />
  //       </group>
  //     )
  //   })
  // }, [pieces, pxInradius, mapSize, zIndexes])

  return (
    <group rotation={[-cameraAngle * (PI / 180), 0, 0]}>
      <group position={[0, inradius + 0.5, -tilesHigh / 2]}>
        <group rotation={[0, 0, ((-iCamera * 360) / mapSize) * (PI / 180)]}>
          {tileEls}
          {/* {pieceEls} */}
        </group>
      </group>
    </group>
  )
}

export default Zz3dTileCarousel
