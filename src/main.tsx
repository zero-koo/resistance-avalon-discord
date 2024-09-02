import { StrictMode } from "react";
import { insertCoin } from "playroomkit";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.css";

insertCoin({
  gameId: import.meta.env.VITE_PLAYROOMKIT_GAME_ID,
  skipLobby: true,
  discord: true,
}).then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
