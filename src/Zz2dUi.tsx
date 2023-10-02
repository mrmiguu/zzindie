import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function Zz2dUi() {
  const [count, setCount] = useState(0)

  return (
    <div className="absolute w-full h-full left-0 top-0 flex justify-center items-end pointer-events-none overflow-hidden">
      <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center">
        <div className="outline" />
      </div>

      <div className="pointer-events-auto">
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  )
}

export default Zz2dUi
