import { characterMap } from "@/constants/characters";
import { useGameState } from "@/contexts/GameStateContext";

type PlayerAvaterProps = {
  id: string;
  name: string;
  selectable: boolean;
  selectedAsExpedition: boolean;
  selectedByAssassin: boolean;
  assassinated: boolean;
  onSelectAsExpedition: (selected: boolean) => void;
};

const PlayerAvater = ({ id, name }: PlayerAvaterProps) => {
  const {
    phase,
    playerState,
    myPlayerState,
    commanderIndex,
    assassinateTargetId,
    handleChangeExpeditionComposition,
    handleChangeAssassinateTarget,
  } = useGameState();

  const isMe = id === myPlayerState.id;

  const myCharacter = myPlayerState.characterType;
  const myKnownCharacters = characterMap[myCharacter]?.knownCharacters ?? [];

  const [sideRevealedAs, characterRevealedAs] = (() => {
    const knownCharacter = myKnownCharacters.find(
      ({ targetCharacter }) => targetCharacter === playerState[id].characterType
    );
    if (isMe || !knownCharacter) return [null, null];
    return [
      knownCharacter.side ??
        (knownCharacter.name && characterMap[knownCharacter.name].side) ??
        null,
      knownCharacter.name ?? null,
    ];
  })();

  const onClickAvatar = (playerId: string, selected?: boolean) => {
    switch (phase) {
      case "compose-expeditions": {
        if (myPlayerState.order !== commanderIndex) return;
        handleChangeExpeditionComposition(playerId, selected ?? false);
        return;
      }
      case "assassination": {
        if (myPlayerState.characterType !== "Assassin") return;
        handleChangeAssassinateTarget(playerId);
        return;
      }
      default: {
        throw Error("Unexpected click!");
      }
    }
  };

  const isAvatarChecked = (() => {
    const state = playerState[id];
    switch (phase) {
      case "compose-expeditions":
      case "vote-expeditions":
      case "expedition": {
        return state.isExpedition;
      }
      case "assassination": {
        return id === assassinateTargetId;
      }
      default:
        return false;
    }
  })();

  return (
    <label>
      <input
        type="checkbox"
        disabled={
          !(
            (phase === "compose-expeditions" &&
              myPlayerState.order === commanderIndex) ||
            (phase === "assassination" &&
              myPlayerState.characterType === "Assassin")
          )
        }
        checked={isAvatarChecked}
        onChange={(e) => onClickAvatar(id, e.target.checked)}
      />
      <div>{name}</div>
      {isMe && <div>Me</div>}
      {characterRevealedAs && <div>character: {characterRevealedAs}</div>}
      {sideRevealedAs && <div>side: {sideRevealedAs}</div>}
    </label>
  );
};

export default PlayerAvater;
