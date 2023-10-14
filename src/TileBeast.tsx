import { PropsWithChildren } from 'react'

import TileEntity from './TileEntity'
import { BeastState, MapSize } from './types'

type TileBeastProps = PropsWithChildren<{
  beast: BeastState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}>

function TileBeast({ beast, children, ...props }: TileBeastProps) {
  return (
    <TileEntity {...props} entity={beast}>
      {children}
    </TileEntity>
  )
}

export default TileBeast
