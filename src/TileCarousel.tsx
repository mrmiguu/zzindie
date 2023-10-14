import { useMemo } from 'react'

import { animated, useSpring } from '@react-spring/three'

import { TILE_PX } from './consts'
import { polygonInradius } from './math'
import TileCreature from './TileCreature'
import TilePiece from './TilePiece'
import TilePlayer from './TilePlayer'
import { GameStatePieces, MapSize } from './types'
import { PI, values } from './utils'

const rainbowColors = ['#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff'] as const

type TileCarouselProps = {
  mapSize: MapSize
  tilesHigh: number
  xCamera: number
  cameraAngle: number
  pieces: GameStatePieces
}

function TileCarousel({ mapSize, tilesHigh, xCamera, cameraAngle, pieces }: TileCarouselProps) {
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
      <TilePlayer key={piece.id} player={piece} mapSize={mapSize} inradius={inradius} tilesHigh={tilesHigh} />
    ) : 'level' in piece ? (
      <TileCreature key={piece.id} creature={piece} mapSize={mapSize} inradius={inradius} tilesHigh={tilesHigh} />
    ) : (
      <TilePiece key={piece.id} piece={piece} mapSize={mapSize} inradius={inradius} tilesHigh={tilesHigh} />
    ),
  )

  const springs = useSpring({
    xCameraRotationZ: ((-xCamera * 360) / mapSize) * (PI / 180),
  })

  return (
    <group rotation-x={-cameraAngle * (PI / 180)}>
      <group position-y={inradius + 0.5} position-z={-tilesHigh / 2}>
        <animated.group rotation-z={springs.xCameraRotationZ}>
          {tileEls}
          {pieceEls}
        </animated.group>
      </group>
    </group>
  )
}

export default TileCarousel
