import { useGameState } from "@/contexts/GameStateContext";

import { useGameSetting } from "@/hooks/useGameSetting";
import { useParticipants } from "@/hooks/useParticipants";
import { usePlayers } from "@/hooks/usePlayers";

import PlayBoard from "./PlayBoard";
import PlayerAvater from "./PlayerAvatar";

const PlayGround: React.FC = () => {
  const { me } = useParticipants();
  const { players } = usePlayers();
  const { gameSetting } = useGameSetting();

  const {
    isStarted,
    commanderIndex,
    phase,
    round,
    countCompositionTrial,
    expeditionIds,
    selectedExpeditionIds,
    expeditionResultPerRound,
    playerState,
    myPlayerState,
    handleChangeExpeditionComposition,
    handleCompleteExpeditionComposition,
  } = useGameState();

  const isCommander = commanderIndex === playerState[me.id]?.order;

  return (
    <div>
      <h1>PlayGround</h1>
      <div>isStarted: {isStarted}</div>
      <div>Round: {round + 1}</div>
      <div>
        expeditionResultPerRound:{" "}
        {expeditionResultPerRound.map((v, index) => (
          <div key={index}>{v ? "성공" : "실패"}</div>
        ))}
      </div>
      <div>commanderIndex: {commanderIndex}</div>
      <div>My order: {playerState[me.id]?.order}</div>
      <div>My character: {playerState[me.id]?.characterType}</div>
      <div>phase: {phase}</div>
      {players.map((player) => (
        <PlayerAvater
          key={player.id}
          id={player.id}
          name={player.name}
          selectable={
            (phase === "compose-expeditions" && isCommander) ||
            (phase === "assassination" &&
              playerState[me.id]?.characterType === "Assassin")
          }
          assassinated={false}
          selectedAsExpedition={playerState[player.id]?.isExpedition}
          selectedByAssassin={false}
          onSelectAsExpedition={(selected) => {
            handleChangeExpeditionComposition(player.id, selected);
          }}
        />
      ))}
      {commanderIndex === playerState[me.id]?.order && (
        <div>
          <div>You're a commander</div>
          <button
            disabled={
              selectedExpeditionIds.length !== gameSetting.numExpeditions[round]
            }
            onClick={handleCompleteExpeditionComposition}
          >
            원정대원 확인
          </button>
        </div>
      )}
      <PlayBoard />
    </div>
  );
};

export default PlayGround;
