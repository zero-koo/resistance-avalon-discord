import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { insertCoin } from 'playroomkit'

insertCoin({
  gameId: import.meta.env.VITE_PLAYROOMKIT_GAME_ID,
  skipLobby: true,
  discord: true,
}).then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
