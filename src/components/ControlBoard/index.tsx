import { characterMap } from "@/constants/characters";
import { useGameState } from "@/contexts/GameStateContext";
import { useGameSetting } from "@/hooks/useGameSetting";

import ControlBoardComponent from "./ControlBoard";

const ControlBoard: React.FC = () => {
  const { gameSetting } = useGameSetting();
  const {
    myPlayerState,
    round,
    phase,
    selectedExpeditionIds,
    assassinateTargetId,
    commanderIndex,
    countCompositionTrial,
    result,
    handleVoteForExpeditionComposition,
    handleVoteOnExpedition,
    handleConfirmAssassinate,
    handleCompleteExpeditionComposition,
  } = useGameState();
  return (
    <ControlBoardComponent
      phase={phase}
      myCamp={characterMap[myPlayerState?.characterType]?.side}
      myCharacter={myPlayerState?.characterType}
      isCommander={myPlayerState?.order === commanderIndex}
      isExpedition={myPlayerState?.isExpedition}
      countCompositionTrial={countCompositionTrial}
      numExpeditions={gameSetting.numExpeditions[round]}
      numSelectedExpeditions={selectedExpeditionIds.length}
      hasAgreedForQuest={myPlayerState?.hasAgreedOnExpedition}
      hasAgreedForTeamBuild={myPlayerState?.hasAgreedForComposition}
      assassinationTargetSelected={assassinateTargetId !== null}
      gameResult={result}
      onConfirmForTeamBuild={handleCompleteExpeditionComposition}
      onVoteForTeamBuild={handleVoteForExpeditionComposition}
      onVoteForQuest={handleVoteOnExpedition}
      onConfirmForAssassination={handleConfirmAssassinate}
    />
  );
};

export default ControlBoard;
