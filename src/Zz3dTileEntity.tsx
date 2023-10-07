import Zz3dTilePiece from './Zz3dTilePiece'
import { EntityState, GamePieceState, MapSize } from './ZzTypes'
import { useEmojiTextureAsset } from './assets.emojis'

type Zz3dTileEntityProps = {
  entity: EntityState
  zIndexes: GamePieceState[]
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}

function Zz3dTileEntity({ entity, ...props }: Zz3dTileEntityProps) {
  const texture = useEmojiTextureAsset(entity.sprite)

  return (
    <Zz3dTilePiece {...props} piece={entity}>
      {texture && (
        <mesh>
          <boxGeometry args={[1, 0, 1]} />
          <meshStandardMaterial map={texture} transparent />
        </mesh>
      )}
    </Zz3dTilePiece>
  )
}

export default Zz3dTileEntity
