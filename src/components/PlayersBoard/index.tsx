import { characterMap } from "@/constants/characters";
import { useGameState } from "@/contexts/GameStateContext";
import { usePlayers } from "@/hooks/usePlayers";

import PlayersBoardView, { Player } from "./PlayersBoardView";

const PlayersBoard: React.FC = () => {
  const { players: playerList } = usePlayers();
  const {
    phase,
    myPlayerState,
    playerState,
    commanderIndex,
    assassinateTargetId,
    expeditionIds,
    selectedExpeditionIds,
    handleChangeExpeditionComposition,
    handleChangeAssassinateTarget,
  } = useGameState();

  const myCharacter = myPlayerState?.characterType;
  const myIndex = myPlayerState?.order;

  const players: Player[] = playerList
    .sort((prev, curr) =>
      playerState[prev.id].order < playerState[curr.id].order ? -1 : 1
    )
    .map((player, index) => ({
      id: player.id,
      name: player.name,
      avatar: player.avater,
      isSpeaking: player.isSpeaking,
      character:
        phase === "completed" ||
        (phase === "assassination" &&
          characterMap[playerState[player.id].characterType].side === "Evil") ||
        index === myIndex
          ? playerState[player.id].characterType
          : null, // TODO
      camp:
        characterMap[myCharacter].knownCharacters.find(
          (character) =>
            playerState[player.id].characterType === character.targetCharacter
        )?.side ?? null,
      isSelected:
        (phase === "compose-expeditions" &&
          myIndex === commanderIndex &&
          selectedExpeditionIds.includes(player.id)) ||
        (phase === "vote-expeditions" &&
          playerState[player.id].hasAgreedForComposition !== null) ||
        (phase === "expedition" &&
          playerState[player.id].hasAgreedOnExpedition !== null),
    }));

  return (
    <PlayersBoardView
      players={players}
      myCharacter={myCharacter}
      myIndex={myIndex}
      phase={phase}
      commanderIndex={commanderIndex}
      assassinationTargetId={assassinateTargetId}
      teamMemberIds={expeditionIds}
      onSelectPlayer={(playerId, selected) => {
        if (phase === "compose-expeditions" && commanderIndex === myIndex) {
          console.log(playerId, selected);
          handleChangeExpeditionComposition(playerId, selected);
          return;
        }
        if (phase === "assassination" && myCharacter === "Assassin") {
          handleChangeAssassinateTarget(playerId);
        }
      }}
    />
  );
};

export default PlayersBoard;
