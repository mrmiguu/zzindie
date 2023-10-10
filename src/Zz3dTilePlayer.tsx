import { RoundedBox, Text } from '@react-three/drei'
import Zz3dTileEntity from './Zz3dTileEntity'
import { MapSize, PlayerState } from './ZzTypes'

type Zz3dTilePlayerProps = {
  player: PlayerState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}

function Zz3dTilePlayer({ player, ...props }: Zz3dTilePlayerProps) {
  return (
    <Zz3dTileEntity {...props} entity={player}>
      <RoundedBox args={[1, 0.2, 0]} radius={0.1} position-y={0.7}>
        <meshStandardMaterial color="white" transparent opacity={0.8} />
        <Text position-z={0.01} color="black" scale={[0.1, 0.1, 0]} maxWidth={5}>
          {player.name}
        </Text>
      </RoundedBox>
    </Zz3dTileEntity>
  )
}

export default Zz3dTilePlayer
