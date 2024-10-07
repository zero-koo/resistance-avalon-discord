import { useIsHost } from "playroomkit";

import { useGameState } from "@/contexts/GameStateContext";
import { useGameSetting } from "@/hooks/useGameSetting";
import { useParticipants } from "@/hooks/useParticipants";
import { usePlayers } from "@/hooks/usePlayers";

import CharacterSettingBoard from "./CharacterSettingBoard";
import GameSettingDialog from "./GameSettingDialog";
import PlayGround from "./PlayGround";
import RoundBoard from "./RoundBoard";

const Lobby: React.FC = () => {
  const isHost = useIsHost();
  const { me } = useParticipants();
  const { players, toggleReady } = usePlayers();

  const { gameSetting } = useGameSetting();
  const { isStarted, handleStartGame } = useGameState();

  return (
    <div>
      <div></div>
      <div>Me: {me?.name}</div>
      <div>Players</div>
      {players.map((player) => (
        <div key={player.id}>{player.name}</div>
      ))}
      {!isStarted && (
        <>
          <button onClick={() => toggleReady()}>준비</button>
          <div className="flex flex-col items-center gap-10">
            <RoundBoard />
            <CharacterSettingBoard />
          </div>
          {isHost && (
            <>
              <GameSettingDialog />
              <button
                disabled={players.length < gameSetting.numPlayers}
                onClick={handleStartGame}
              >
                시작
              </button>
            </>
          )}
        </>
      )}
      {isStarted && <PlayGround />}
    </div>
  );
};

export default Lobby;
