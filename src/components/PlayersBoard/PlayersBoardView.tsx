import {
  characterMap,
  CharacterSide,
  CharacterType,
} from "@/constants/characters";
import { GamePhase } from "@/contexts/GameStateContext";

import PlayerAvatar from "../PlayerAvatar";
import RadialArrangement from "../RadialArrangement";

type PlayersBoardProps = {
  phase: GamePhase;
  myCharacter: CharacterType | null;
  myIndex: number | null;
  players: Player[];
  teamMemberIds: string[];
  commanderIndex: number | null;
  assassinationTargetId: string | null;
  onSelectPlayer: (playerId: string, selected: boolean) => void;
};

export type Player = {
  id: string;
  name: string;
  avatar?: string | null;
  isSpeaking?: boolean;
  character: CharacterType | null;
  camp: CharacterSide | null;
  isSelected: boolean;
};

const PlayersBoardView: React.FC<PlayersBoardProps> = ({
  phase,
  myCharacter,
  myIndex,
  players,
  commanderIndex,
  teamMemberIds,
  assassinationTargetId,
  onSelectPlayer,
}) => {
  return (
    <RadialArrangement
      items={players.map((player, index) => {
        return (
          <PlayerAvatar
            avatar={player.avatar ?? undefined}
            character={player.character}
            isAssassinationTarget={player.id === assassinationTargetId}
            isCommander={index === commanderIndex}
            side={player.camp}
            isExpedition={teamMemberIds.includes(player.id)}
            isSelected={player.isSelected}
            isSpeaking={!!player.isSpeaking}
            playerName={player.name}
            selectable={
              (myIndex === commanderIndex && phase === "compose-expeditions") ||
              (myCharacter === "Assassin" && phase === "assassination")
            }
            showCharacter={
              (phase === "completed" ||
                (phase === "assassination" &&
                  player.character &&
                  characterMap[player.character].side === "Evil")) ??
              false
            }
            onToggleSelect={(selected) => onSelectPlayer(player.id, selected)}
          />
        );
      })}
      rotateAngle={-90 - (myIndex * 360) / players.length}
    />
  );
};

export default PlayersBoardView;
