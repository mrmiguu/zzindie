import './index.css'

import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'

import App from './App.tsx'
import { AppStateProvider } from './AppState.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <AppStateProvider>
      <App />
    </AppStateProvider>
    <Toaster containerClassName="toaster font-mono opacity-95" position="bottom-center" />
  </>,
)
