import { useGameState } from "@/contexts/GameStateContext";

import { useParticipants } from "@/hooks/useParticipants";

import Vote from "./Vote";

const PlayBoard: React.FC = () => {
  const { phase } = useGameState();

  return (
    <div>
      {phase === "vote-expeditions" && <VotePhaseBoard />}
      {phase === "expedition" && <ExpeditionPhaseBoard />}
      {phase === "assassination" && <AssassinationPhaseBoard />}
    </div>
  );
};

export default PlayBoard;

const VotePhaseBoard: React.FC = () => {
  const { myPlayerState, handleVoteForExpeditionComposition } = useGameState();

  return (
    <div>
      Vote
      <div>
        <Vote
          value={myPlayerState.hasAgreedForComposition}
          onVote={handleVoteForExpeditionComposition}
        />
      </div>
    </div>
  );
};

const ExpeditionPhaseBoard: React.FC = () => {
  const { me } = useParticipants();
  const { myPlayerState, expeditionIds, handleVoteOnExpedition } =
    useGameState();

  return (
    <div>
      {expeditionIds.includes(me.id) ? (
        <Vote
          value={myPlayerState.hasAgreedOnExpedition}
          onVote={handleVoteOnExpedition}
        />
      ) : (
        <div>원정대 아님</div>
      )}
    </div>
  );
};

const AssassinationPhaseBoard: React.FC = () => {
  const { myPlayerState, handleConfirmAssassinate } = useGameState();

  const isAssassin = myPlayerState.characterType === "Assassin";

  return (
    <div>
      {isAssassin ? (
        <div>
          <div>암살 대상을 선택하세요.</div>
          <button onClick={handleConfirmAssassinate}>확인</button>
        </div>
      ) : (
        <div>어쌔씬 아님</div>
      )}
    </div>
  );
};
