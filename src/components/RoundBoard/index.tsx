import { useGameState } from "@/contexts/GameStateContext";
import { useGameSetting } from "@/hooks/useGameSetting";

import RoundBoardComponent from "./RoundBoard";

const RoundBoard: React.FC = () => {
  const { gameSetting } = useGameSetting();
  const { isStarted, round, countCompositionTrial, expeditionResultPerRound } =
    useGameState();

  return (
    <RoundBoardComponent
      rounds={Array.from(
        { length: 5 },
        (_, i) => expeditionResultPerRound[i]
      ).map((result, round) => ({
        questSuccess: result ?? null,
        numExpeditions: gameSetting.numExpeditions[round],
      }))}
      currentRound={isStarted ? round : null}
      countCompositionTrial={countCompositionTrial}
    />
  );
};

export default RoundBoard;
