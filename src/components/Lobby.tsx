import { useGameState } from "@/contexts/GameStateContext";

import CharacterSettingBoard from "./CharacterSettingBoard";
import ParticipantList from "./ParticipantList";
import ParticipantMenu from "./ParticipantMenu";
import PlayGround from "./PlayGround";
import RoundBoard from "./RoundBoard";

const Lobby: React.FC = () => {
  const { isStarted } = useGameState();

  return (
    <div className="h-full">
      {!isStarted ? (
        <div className="flex h-full flex-col items-center gap-14 py-14">
          <RoundBoard />
          <CharacterSettingBoard />
          <div className="fixed bottom-0 left-0 right-0 md:static">
            <ParticipantList participantMenu={<ParticipantMenu />} />
          </div>
        </div>
      ) : (
        <PlayGround />
      )}
    </div>
  );
};

export default Lobby;
