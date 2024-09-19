import { useGameState } from "@/contexts/GameStateContext";
import { useGameSetting } from "@/hooks/useGameSetting";

import RoundBoardComponent from "./RoundBoard";

const RoundBoard: React.FC = () => {
  const { gameSetting } = useGameSetting();
  const { isStarted, round, expeditionResultPerRound } = useGameState();

  return (
    <RoundBoardComponent
      rounds={expeditionResultPerRound.map((result, round) => ({
        questSuccess: result ?? null,
        numExpeditions: gameSetting.numExpeditions[round],
      }))}
      currentRound={isStarted ? round : null}
    />
  );
};

export default RoundBoard;
