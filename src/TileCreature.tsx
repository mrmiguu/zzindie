import { PropsWithChildren, ReactNode } from 'react'

import TilePiece from './TilePiece'
import { CreatureState, MapSize } from './types'

type TileCreatureProps = PropsWithChildren<{
  creature: CreatureState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
  zFixedChildren?: ReactNode
}>

function TileCreature({ creature, zFixedChildren, children, ...props }: TileCreatureProps) {
  return (
    <TilePiece {...props} piece={creature} zFixedChildren={zFixedChildren}>
      {children}
    </TilePiece>
  )
}

export default TileCreature
