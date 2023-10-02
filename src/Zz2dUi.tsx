import toast from 'react-hot-toast'
import Zz2dLRScreen from './Zz2dLRScreen'

function Zz2dUi() {
  return (
    <div className="pointer-events-none overflow-hidden">
      <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center">
        <div className="outline" />
      </div>

      <div className="absolute w-full h-full left-0 top-0 pointer-events-auto">
        <Zz2dLRScreen onL={() => toast('<')} onR={() => toast('>')} />
      </div>
    </div>
  )
}

export default Zz2dUi
