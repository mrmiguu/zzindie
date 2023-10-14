import { useContext } from 'react'

import { Canvas } from '@react-three/fiber'

import { AppStateContext } from './AppStateContext'
import TileCarousel from './TileCarousel'
import { MapSize } from './types'

function Canvas3D() {
  const mapSize: MapSize = 64

  const { myId, pieces } = useContext(AppStateContext)
  const myPlayer = myId ? pieces[myId] : undefined

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600 to-blue-400">
      <Canvas flat linear>
        <ambientLight intensity={3} />
        <directionalLight position={[1, 1, 0]} />
        <TileCarousel tilesHigh={500} cameraAngle={70} mapSize={mapSize} xCamera={myPlayer?.x ?? 0} pieces={pieces} />
      </Canvas>
    </div>
  )
}

export default Canvas3D
