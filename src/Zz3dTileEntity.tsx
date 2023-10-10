import { animated, easings, useSpring } from '@react-spring/three'
import { PropsWithChildren } from 'react'
import Zz3dTilePiece from './Zz3dTilePiece'
import { EntityState, MapSize } from './ZzTypes'
import { useEmojiTextureAsset } from './assets.emojis'
import { PI } from './utils'

type Zz3dTileEntityProps = PropsWithChildren<{
  entity: EntityState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}>

function Zz3dTileEntity({ entity, children, ...props }: Zz3dTileEntityProps) {
  const texture = useEmojiTextureAsset(entity.sprite)

  const isEntityBeast = 'level' in entity

  const { breathingScale } = useSpring(
    isEntityBeast
      ? {
          from: { breathingScale: 1 },
          to: { breathingScale: 0.95 },
          loop: { reverse: true },
          config: {
            duration: 1500,
            easing: easings.linear,
          },
        }
      : {},
  )

  return (
    <Zz3dTilePiece {...props} piece={entity}>
      {texture && (
        <animated.mesh rotation-x={(90 * PI) / 180} scale={breathingScale}>
          <boxGeometry args={[1, 1, 0]} />
          <meshStandardMaterial map={texture} transparent={true} />
          {children}
        </animated.mesh>
      )}
    </Zz3dTilePiece>
  )
}

export default Zz3dTileEntity
