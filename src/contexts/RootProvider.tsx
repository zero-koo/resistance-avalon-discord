import { DiscordSdkProvider } from "./DiscordSdkContext";
import { GameSettingProvider } from "./GameSettingContext";
import { GameStateProvider } from "./GameStateContext";
import { ParticipantsProvider } from "./ParticipantsContext";
import { PlayersProvider } from "./PlayersContext";

const RootProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <DiscordSdkProvider>
      <ParticipantsProvider>
        <GameSettingProvider>
          <PlayersProvider>
            <GameStateProvider>{children}</GameStateProvider>
          </PlayersProvider>
        </GameSettingProvider>
      </ParticipantsProvider>
    </DiscordSdkProvider>
  );
};

export default RootProvider;
