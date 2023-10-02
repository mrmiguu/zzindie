import { Canvas } from '@react-three/fiber'
import { useMemo } from 'react'
import Zz3dTileCarousel from './Zz3dTileCarousel'
import { GameState, MapSize } from './ZzTypes'
import { clampN } from './math'
import { values } from './utils'

function Zz3dCanvas() {
  // const mapId = 'test_map'

  // const mapSize = useMemo(() => pickRandom(mapSizes, { seed: `${mapId}:mapSize` }), [mapId])
  const mapSize: MapSize = 126

  const pieces = useMemo<GameState['pieces']>(() => ({}), [])

  const zIndexes = useMemo(
    () =>
      values(pieces)
        .filter(p => !p.static)
        .sort((a, b) => {
          const di = clampN(a.x, mapSize) - clampN(b.x, mapSize)
          return di === 0 ? (a.xTimestamp ?? 0) - (b.xTimestamp ?? 0) : di
        }),
    [pieces, mapSize],
  )

  return (
    <div className="absolute w-full h-full left-0 top-0">
      <Canvas>
        <ambientLight intensity={2} />
        <directionalLight position={[1, 1, 1]} />
        <Zz3dTileCarousel
          // iCamera={myPiece?.x ?? 0}
          tilesHigh={20}
          iCamera={0}
          cameraAngle={75}
          mapSize={mapSize}
          pieces={pieces}
          zIndexes={zIndexes}
        />
      </Canvas>
    </div>
  )
}

export default Zz3dCanvas
