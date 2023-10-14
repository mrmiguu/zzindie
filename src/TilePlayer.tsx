import { RoundedBox, Text } from '@react-three/drei'

import TileEntity from './TileEntity'
import { MapSize, PlayerState } from './types'

type TilePlayerProps = {
  player: PlayerState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}

function TilePlayer({ player, ...props }: TilePlayerProps) {
  return (
    <TileEntity {...props} entity={player}>
      <RoundedBox args={[1, 0.2, 0]} radius={0.1} position-y={0.7}>
        <meshStandardMaterial color="white" transparent opacity={0.8} />
        <Text position-z={0.01} color="black" scale={[0.1, 0.1, 0]} maxWidth={5}>
          {player.name}
        </Text>
      </RoundedBox>
    </TileEntity>
  )
}

export default TilePlayer
