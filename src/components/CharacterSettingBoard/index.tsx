import { characterMap } from "@/constants/characters";
import { characterListFromSetting } from "@/lib/game";
import { useGameSetting } from "@/hooks/useGameSetting";

import PlayerAvatar from "../PlayerAvatar";
import RadialArrangement from "../RadialArrangement";

const CharacterSettingBoard = () => {
  const { gameSetting } = useGameSetting();
  return (
    <RadialArrangement
      items={characterListFromSetting({
        numPlayers: gameSetting.numPlayers,
        optionalCitizens: gameSetting.selectedOptionalCitizens,
        optionalDevils: gameSetting.selectedOptionalDevils,
      }).map((character) => {
        return (
          <PlayerAvatar
            character={character}
            side={characterMap[character].side}
          />
        );
      })}
      rotateAngle={90}
    />
  );
};

export default CharacterSettingBoard;
