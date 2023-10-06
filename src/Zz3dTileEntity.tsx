import { useTexture } from '@react-three/drei'
import Zz3dTilePiece from './Zz3dTilePiece'
import { EntityState, GameState, MapSize } from './ZzTypes'
import emojiBabyPng from './assets/emojis/baby.png'
import emojiCowboyHatFacePng from './assets/emojis/cowboy-hat-face.png'

type Zz3dTileEntityProps = {
  entity: EntityState
  zIndexes: GameState['pieces'][keyof GameState['pieces']][]
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}

function Zz3dTileEntity({ entity, ...props }: Zz3dTileEntityProps) {
  const texture = useTexture(
    entity.sprite === '👶' ? emojiBabyPng : entity.sprite === '🤠' ? emojiCowboyHatFacePng : '',
  )

  return (
    <Zz3dTilePiece {...props} piece={entity}>
      <meshStandardMaterial map={texture} transparent />
    </Zz3dTilePiece>
  )
}

export default Zz3dTileEntity
