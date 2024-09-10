import React, { createContext } from "react";

import { OptionalCharacterType } from "@/constants/characters";
import {
  DEFAULT_NUM_EXPEDITIONS,
  DEFAULT_NUM_PLAYERS,
  NumExpeditions,
} from "@/constants/settings";
import { useMultiplayerState } from "@/hooks/useMultiplayerState";

export type GameSetting = {
  numPlayers: number;
  numExpeditions: NumExpeditions;
  selectedOptionalCitizens: OptionalCharacterType[];
  selectedOptionalDevils: OptionalCharacterType[];
  anonymousVote: boolean;
};

type GameSettingContext = {
  gameSetting: GameSetting;
  setGameSetting: (setting: GameSetting) => void;
};

export const GameSettingContext = createContext<GameSettingContext | null>(
  null
);

export const GameSettingProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [gameSetting, setGameSetting] = useMultiplayerState<GameSetting>(
    "game-setting",
    {
      numPlayers: DEFAULT_NUM_PLAYERS,
      numExpeditions: DEFAULT_NUM_EXPEDITIONS,
      selectedOptionalCitizens: [],
      selectedOptionalDevils: [],
      anonymousVote: false,
    }
  );

  return (
    <GameSettingContext.Provider
      value={{
        gameSetting,
        setGameSetting,
      }}
    >
      {children}
    </GameSettingContext.Provider>
  );
};
