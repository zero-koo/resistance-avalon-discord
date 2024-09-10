import Lobby from "./components/Lobby";
import { DiscordSdkProvider } from "./contexts/DiscordSdkContext";
import { GameSettingProvider } from "./contexts/GameSettingContext";
import { GameStateProvider } from "./contexts/GameStateContext";
import { ParticipantsProvider } from "./contexts/ParticipantsContext";
import { PlayersProvider } from "./contexts/PlayersContext";

function App() {
  return (
    <DiscordSdkProvider>
      <ParticipantsProvider>
        <GameSettingProvider>
          <PlayersProvider>
            <GameStateProvider>
              <Lobby />
            </GameStateProvider>
          </PlayersProvider>
        </GameSettingProvider>
      </ParticipantsProvider>
    </DiscordSdkProvider>
  );
}

export default App;
