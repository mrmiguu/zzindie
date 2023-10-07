import { useMemo } from 'react'
// import BoardPiece from './ZzBoardPiece'
import { animated, useSpring } from '@react-spring/three'
import Zz3dTileEntity from './Zz3dTileEntity'
import Zz3dTilePiece from './Zz3dTilePiece'
import Zz3dTilePlayer from './Zz3dTilePlayer'
import { TILE_PX } from './ZzConsts'
import { GamePieceState, GameStatePieces, MapSize } from './ZzTypes'
import { polygonInradius } from './math'
import { PI, values } from './utils'

const rainbowColors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'] as const

type Zz3dTileCarouselProps = {
  mapSize: MapSize
  tilesHigh: number
  iCamera: number
  cameraAngle: number
  pieces: GameStatePieces
  zIndexes: GamePieceState[]
}

function Zz3dTileCarousel({ mapSize, tilesHigh, iCamera, cameraAngle, pieces, zIndexes }: Zz3dTileCarouselProps) {
  const inradiusPx = polygonInradius(mapSize, TILE_PX)
  const inradius = inradiusPx / TILE_PX

  const tileEls = useMemo(() => {
    return [...Array(mapSize)].map((_, i) => {
      return (
        <group key={i} rotation-z={((i * 360) / mapSize) * (PI / 180)}>
          <group position-y={-inradius - 0.5}>
            <mesh>
              <boxGeometry args={[1, 1, tilesHigh]} />
              <meshStandardMaterial color={rainbowColors[i % rainbowColors.length]} />
            </mesh>
          </group>
        </group>
      )
    })
  }, [mapSize, tilesHigh, inradius])

  const pieceEls = values(pieces).map(piece =>
    'name' in piece ? (
      <Zz3dTilePlayer
        key={piece.id}
        player={piece}
        zIndexes={zIndexes}
        mapSize={mapSize}
        inradius={inradius}
        tilesHigh={tilesHigh}
      />
    ) : 'sprite' in piece ? (
      <Zz3dTileEntity
        key={piece.id}
        entity={piece}
        zIndexes={zIndexes}
        mapSize={mapSize}
        inradius={inradius}
        tilesHigh={tilesHigh}
      />
    ) : (
      <Zz3dTilePiece
        key={piece.id}
        piece={piece}
        zIndexes={zIndexes}
        mapSize={mapSize}
        inradius={inradius}
        tilesHigh={tilesHigh}
      />
    ),
  )

  const springs = useSpring({
    iCameraRotationZ: ((-iCamera * 360) / mapSize) * (PI / 180),
  })

  return (
    <group rotation-x={-cameraAngle * (PI / 180)}>
      <group position-y={inradius + 0.5} position-z={-tilesHigh / 2}>
        <animated.group rotation-z={springs.iCameraRotationZ}>
          {tileEls}
          {pieceEls}
        </animated.group>
      </group>
    </group>
  )
}

export default Zz3dTileCarousel
