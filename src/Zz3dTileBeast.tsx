import { PropsWithChildren } from 'react'
import Zz3dTileEntity from './Zz3dTileEntity'
import { BeastState, MapSize } from './ZzTypes'

type Zz3dTileBeastProps = PropsWithChildren<{
  beast: BeastState
  mapSize: MapSize
  inradius: number
  tilesHigh: number
}>

function Zz3dTileBeast({ beast, children, ...props }: Zz3dTileBeastProps) {
  return (
    <Zz3dTileEntity {...props} entity={beast}>
      {children}
    </Zz3dTileEntity>
  )
}

export default Zz3dTileBeast
