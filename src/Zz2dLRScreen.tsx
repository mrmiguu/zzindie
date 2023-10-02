import { useState } from 'react'

type Zz2dLRScreenPaneProps = {
  opacity: number
  onClick: () => void
}

function Zz2dLRScreenPane({ opacity, onClick }: Zz2dLRScreenPaneProps) {
  return (
    <button
      className="w-1/2 h-full transition duration-150 ease-in-out bg-transparent focus:bg-transparent focus:outline-none focus:ring-0 active:bg-black"
      style={{ opacity }}
      onClick={onClick}
    />
  )
}

type Zz2dLRScreenProps = {
  onL: () => void
  onR: () => void
}

function Zz2dLRScreen({ onL, onR }: Zz2dLRScreenProps) {
  const [opacity, setOpacity] = useState(0.1)

  return (
    <div className="absolute flex w-full h-full">
      <Zz2dLRScreenPane
        opacity={opacity}
        onClick={() => {
          setOpacity(o => o * 0.7)
          onL()
        }}
      />
      <Zz2dLRScreenPane
        opacity={opacity}
        onClick={() => {
          setOpacity(o => o * 0.7)
          onR()
        }}
      />
    </div>
  )
}

export default Zz2dLRScreen
