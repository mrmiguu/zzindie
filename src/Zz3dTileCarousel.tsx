import { useMemo } from 'react'
// import BoardPiece from './ZzBoardPiece'
import { animated, useSpring } from '@react-spring/three'
import { TILE_PX } from './ZzConsts'
import { GameState, MapSize, PieceState } from './ZzTypes'
import { polygonInradius } from './math'
import { PI } from './utils'

const rainbowColors = ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'] as const

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
              <meshStandardMaterial color={rainbowColors[i % rainbowColors.length]} />
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

  const springs = useSpring({
    iCameraRotationZ: ((-iCamera * 360) / mapSize) * (PI / 180),
  })

  return (
    <group rotation-x={-cameraAngle * (PI / 180)}>
      <group position-y={inradius + 0.5} position-z={-tilesHigh / 2}>
        <animated.group rotation-z={springs.iCameraRotationZ}>
          {tileEls}
          {/* {pieceEls} */}
        </animated.group>
      </group>
    </group>
  )
}

export default Zz3dTileCarousel
