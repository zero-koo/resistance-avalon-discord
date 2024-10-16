import { useIsHost } from "playroomkit";

import { cn } from "@/lib/utils";
import { useGameState } from "@/contexts/GameStateContext";
import { useGameSetting } from "@/hooks/useGameSetting";
import { usePlayers } from "@/hooks/usePlayers";

import GameSettingDialog from "../GameSettingDialog";
import { Button } from "../ui/Button";

const ParticipantMenu = () => {
  const isHost = useIsHost();
  const { gameSetting } = useGameSetting();
  const { playerIds, toggleReady } = usePlayers();
  const { handleStartGame } = useGameState();

  return (
    <div className="flex flex-col items-center gap-2">
      {isHost && (
        <>
          <GameSettingDialog />
          <Button
            variant={"outline"}
            className="w-20"
            disabled={playerIds.length < gameSetting.numPlayers}
            onClick={handleStartGame}
          >
            시작
          </Button>
        </>
      )}
      <Button
        variant={"outline"}
        onClick={() => toggleReady()}
        className="w-20"
      >
        준비
      </Button>
      <div className="relative mb-2 flex size-20 flex-col justify-between rounded-xl border text-2xl">
        <div
          className={cn(
            "absolute right-14 top-2.5 translate-x-1/2 font-bold leading-none",
            {
              "opacity-80": playerIds.length < gameSetting.numPlayers,
              "text-red-600": playerIds.length > gameSetting.numPlayers,
            }
          )}
        >
          {playerIds.length}
        </div>
        <div className="absolute left-1/2 top-1/2 h-14 -translate-x-1/2 -translate-y-1/2 rotate-[40deg] border-r-2" />
        <div className="absolute bottom-3 left-14 -translate-x-1/2 font-bold leading-none">
          {gameSetting.numPlayers}
        </div>
      </div>
    </div>
  );
};

export default ParticipantMenu;
