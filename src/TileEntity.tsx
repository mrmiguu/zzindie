import { PropsWithChildren } from 'react'

import { animated, easings, useSpring } from '@react-spring/three'

import { useEmojiTextureAsset } from './assets.emojis'
import TilePiece from './TilePiece'
import { EntityState, MapSize } from './types'
import { PI } from './utils'

type TileEntityProps = PropsWithChildren<{
  entity: EntityState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}>

function TileEntity({ entity, children, ...props }: TileEntityProps) {
  const texture = useEmojiTextureAsset(entity.sprite)

  const isEntityBeast = 'level' in entity

  const { breathingScale } = useSpring(
    isEntityBeast
      ? {
          from: { breathingScale: 1 },
          to: { breathingScale: 0.95 },
          // BUG: we stop breathing intermittently on-move
          loop: { reverse: true },
          config: {
            duration: 1500,
            easing: easings.linear,
          },
        }
      : {},
  )

  return (
    <TilePiece {...props} piece={entity}>
      {texture && (
        <animated.mesh rotation-x={(90 * PI) / 180} scale={breathingScale}>
          <boxGeometry args={[1, 1, 0]} />
          <meshStandardMaterial map={texture} transparent={true} />
          {children}
        </animated.mesh>
      )}
    </TilePiece>
  )
}

export default TileEntity
