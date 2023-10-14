import { animated, useSpring } from '@react-spring/three'
import { RoundedBox, Text } from '@react-three/drei'

import TileEntity from './TileEntity'
import { MapSize, PlayerState } from './types'

const AnimatedRoundedBox = animated(RoundedBox)

type TilePlayerProps = {
  player: PlayerState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}

function TilePlayer({ player, ...props }: TilePlayerProps) {
  const { nameYPositionY } = useSpring({
    nameYPositionY: 0.5 + 0.2 + 0.2 * player.zIndex,
  })

  return (
    <TileEntity
      {...props}
      entity={player}
      zFixedChildren={
        <AnimatedRoundedBox args={[1, 0.2, 0]} radius={0.1} position-z={0} position-y={nameYPositionY}>
          <meshStandardMaterial color="white" transparent opacity={0.8} />
          <Text position-z={0.01} color="black" scale={[0.1, 0.1, 0]} maxWidth={5}>
            {player.name}
          </Text>
        </AnimatedRoundedBox>
      }
    ></TileEntity>
  )
}

export default TilePlayer
