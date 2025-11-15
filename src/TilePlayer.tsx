import { animated, useSpring } from '@react-spring/three'
import { Html } from '@react-three/drei'

import TileCreature from './TileCreature'
import { MapSize, PlayerState } from './types'

type TilePlayerProps = {
  player: PlayerState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}

function TilePlayer({ player, ...props }: TilePlayerProps) {
  const { name, sprite, statuses } = player

  const { nameYPositionY } = useSpring({
    nameYPositionY:
      0.5 + 0.2 + ('ghostmode' in statuses ? 0 : 0.25 * player.zIndex),
  })

  return (
    <TileCreature
      {...props}
      creature={player}
      zFixedChildren={
        <animated.mesh position-z={0} position-y={nameYPositionY}>
          <Html transform scale={0.3} pointerEvents="none">
            {/* TODO: Find fix for text-sm and font-mono; they break centering. */}
            <div className="px-3 py-1 rounded-xl bg-white/80">
              {name} {sprite}
            </div>
          </Html>
        </animated.mesh>
      }
    ></TileCreature>
  )
}

export default TilePlayer
