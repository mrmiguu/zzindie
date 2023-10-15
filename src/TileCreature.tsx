import { PropsWithChildren, ReactNode, useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'

import TilePiece from './TilePiece'
import { CreatureState, MapSize } from './types'
import { stringify } from './utils'

type TileCreatureProps = PropsWithChildren<{
  creature: CreatureState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
  zFixedChildren?: ReactNode
}>

function TileCreature({ creature, zFixedChildren, children, ...props }: TileCreatureProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const status = useMemo(() => creature?.status, [stringify(creature.status)])

  useEffect(() => {
    toast(`Status: ${status || 'n/a'}`)
  }, [status])

  return (
    <TilePiece {...props} piece={creature} zFixedChildren={zFixedChildren}>
      {children}
    </TilePiece>
  )
}

export default TileCreature
