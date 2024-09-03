import Lobby from "./components/Lobby";
import { DiscordSdkProvider } from "./contexts/DiscordSdkContext";
import { GameSettingProvider } from "./contexts/GameSettingContext";
import { ParticipantsProvider } from "./contexts/ParticipantsContext";
import { PlayersProvider } from "./contexts/PlayersContext";

function App() {
  return (
    <DiscordSdkProvider>
      <ParticipantsProvider>
        <GameSettingProvider>
          <PlayersProvider>
            <Lobby />
          </PlayersProvider>
        </GameSettingProvider>
      </ParticipantsProvider>
    </DiscordSdkProvider>
  );
}

export default App;
