import { useContext, useEffect } from 'react'

import { Canvas } from '@react-three/fiber'

import { AppStateContext } from './AppStateContext'
import { playMusic } from './assets.music'
import TileCarousel from './TileCarousel'

function Canvas3D() {
  const { myId, pieces, maps } = useContext(AppStateContext)

  const myPlayer = myId ? pieces[myId] : undefined
  const myMap = maps[myPlayer?.mapId ?? '']

  // Temporarily allow console-based view of current map.
  ;(window as Window & typeof globalThis & { myMap: unknown }).myMap = myMap

  useEffect(() => {
    if (myMap?.music) playMusic(myMap.music)
  }, [myMap?.music])

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600 to-blue-400">
      <Canvas flat linear>
        <ambientLight intensity={3} />
        <directionalLight position={[1, 1, 0]} />
        {myMap && (
          <TileCarousel
            tilesHigh={500}
            cameraAngle={70}
            map={myMap}
            xCamera={myPlayer?.x ?? 0}
            pieces={{ ...pieces, ...myMap.pieces }}
          />
        )}
      </Canvas>
    </div>
  )
}

export default Canvas3D
