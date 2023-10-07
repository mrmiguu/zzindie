import { PropsWithChildren } from 'react'
import Zz3dTilePiece from './Zz3dTilePiece'
import { EntityState, GamePieceState, MapSize } from './ZzTypes'
import { useEmojiTextureAsset } from './assets.emojis'
import { PI } from './utils'

type Zz3dTileEntityProps = PropsWithChildren<{
  entity: EntityState
  zIndexes: GamePieceState[]
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}>

function Zz3dTileEntity({ entity, children, ...props }: Zz3dTileEntityProps) {
  const texture = useEmojiTextureAsset(entity.sprite)

  return (
    <Zz3dTilePiece {...props} piece={entity}>
      {texture && (
        <mesh rotation-x={(90 * PI) / 180}>
          <boxGeometry args={[1, 1, 0]} />
          <meshStandardMaterial map={texture} transparent={true} />
          {children}
        </mesh>
      )}
    </Zz3dTilePiece>
  )
}

export default Zz3dTileEntity
