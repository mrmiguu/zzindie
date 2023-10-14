import { PropsWithChildren, ReactNode } from 'react'

import TileEntity from './TileEntity'
import { BeastState, MapSize } from './types'

type TileBeastProps = PropsWithChildren<{
  beast: BeastState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
  zFixedChildren?: ReactNode
}>

function TileBeast({ beast, zFixedChildren, children, ...props }: TileBeastProps) {
  return (
    <TileEntity {...props} entity={beast} zFixedChildren={zFixedChildren}>
      {children}
    </TileEntity>
  )
}

export default TileBeast
