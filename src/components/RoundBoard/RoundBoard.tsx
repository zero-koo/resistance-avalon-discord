import RoundMarker from "../RoundMarker/RoundMarker";

type RoundBoardProps = {
  rounds: Array<{
    numExpeditions: number;
    questSuccess: boolean | null;
  }>;
  countCompositionTrial: number;
  currentRound: number | null;
};

const RoundBoard: React.FC<RoundBoardProps> = ({
  rounds,
  currentRound,
  countCompositionTrial,
}) => {
  return (
    <div className="flex gap-2.5">
      {rounds.map(({ numExpeditions, questSuccess }, round) => (
        <RoundMarker
          round={round}
          countCompositionTrial={countCompositionTrial}
          numExpeditions={numExpeditions}
          questSuccess={questSuccess}
          isCurrent={round === currentRound}
        />
      ))}
    </div>
  );
};

export default RoundBoard;
