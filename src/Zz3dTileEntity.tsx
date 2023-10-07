import Zz3dTilePiece from './Zz3dTilePiece'
import { EntityState, GameState, MapSize } from './ZzTypes'
import { useEmojiTextureAsset } from './assets.emojis'

type Zz3dTileEntityProps = {
  entity: EntityState
  zIndexes: GameState['pieces'][keyof GameState['pieces']][]
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}

function Zz3dTileEntity({ entity, ...props }: Zz3dTileEntityProps) {
  const texture = useEmojiTextureAsset(entity.sprite)

  return (
    <Zz3dTilePiece {...props} piece={entity}>
      {texture && <meshStandardMaterial map={texture} transparent />}
    </Zz3dTilePiece>
  )
}

export default Zz3dTileEntity
