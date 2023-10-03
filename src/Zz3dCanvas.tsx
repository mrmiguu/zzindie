import { Canvas } from '@react-three/fiber'
import { useContext, useMemo } from 'react'
import Zz3dTileCarousel from './Zz3dTileCarousel'
import { ZzAppStateContext } from './ZzAppState'
import { GameState, MapSize } from './ZzTypes'
import { clampN } from './math'
import { values } from './utils'

function Zz3dCanvas() {
  // const mapId = 'test_map'

  // const mapSize = useMemo(() => pickRandom(mapSizes, { seed: `${mapId}:mapSize` }), [mapId])
  const mapSize: MapSize = 126

  const { myId, players } = useContext(ZzAppStateContext)
  const myPlayer = myId ? players[myId] : undefined

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
    <div className="absolute top-0 left-0 w-full h-full">
      <Canvas>
        <ambientLight intensity={2} />
        <directionalLight position={[1, 1, 1]} />
        <Zz3dTileCarousel
          tilesHigh={200}
          cameraAngle={75}
          mapSize={mapSize}
          iCamera={myPlayer?.x ?? 0}
          pieces={pieces}
          zIndexes={zIndexes}
        />
      </Canvas>
    </div>
  )
}

export default Zz3dCanvas
