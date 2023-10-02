import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import ZzApp from './ZzApp.tsx'
import { ZzAppStateProvider } from './ZzAppState.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <ZzAppStateProvider>
      <ZzApp />
    </ZzAppStateProvider>
    <Toaster containerClassName="toaster font-mono opacity-95" position="bottom-center" />
  </>,
)
