import { PropsWithChildren, ReactNode, useContext, useMemo } from 'react'

import { AppStateContext } from './AppStateContext'
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
  const { myId, mode } = useContext(AppStateContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const statuses = useMemo(() => creature?.statuses ?? {}, [stringify(creature.statuses)])

  const sprite = 'ghostmode' in statuses ? '👻' : creature.sprite
  const opacity = 'ghostmode' in statuses ? (creature.id === myId ? 0.5 : 0) : 1

  if (mode === 'build') {
    return null
  }

  return (
    <TilePiece {...props} piece={{ ...creature, sprite }} opacity={opacity} zFixedChildren={zFixedChildren}>
      {children}
    </TilePiece>
  )
}

export default TileCreature
