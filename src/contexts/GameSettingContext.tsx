import React, { createContext } from "react";
import { OptionalCharacterType } from "@/constants/characters";
import {
  DEFAULT_NUM_EXPEDITIONS,
  DEFAULT_NUM_PLAYERS,
  NumExpeditions,
  NumPlayers,
} from "@/constants/settings";

import { useMultiplayerState } from "@/hooks/useMultiplayerState";

export type GameSetting = {
  numPlayers: NumPlayers;
  numExpeditions: NumExpeditions;
  optionalCharacters: OptionalCharacterType[];
  anonymousVote: boolean;
};

type GameSettingContext = GameSetting & {
  setNumPlayers: React.Dispatch<React.SetStateAction<NumPlayers>>;
  setNumExpeditions: React.Dispatch<React.SetStateAction<NumExpeditions>>;
  setOptionalCharacters: React.Dispatch<
    React.SetStateAction<OptionalCharacterType[]>
  >;
  setAnonymousVote: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GameSettingContext = createContext<GameSettingContext | null>(
  null
);

export const GameSettingProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [numPlayers, setNumPlayers] = useMultiplayerState<NumPlayers>(
    "num-players",
    DEFAULT_NUM_PLAYERS
  );

  const [numExpeditions, setNumExpeditions] =
    useMultiplayerState<NumExpeditions>(
      "num-expeditions",
      DEFAULT_NUM_EXPEDITIONS
    );

  const [optionalCharacters, setOptionalCharacters] = useMultiplayerState<
    OptionalCharacterType[]
  >("optional-characters", []);

  const [anonymousVote, setAnonymousVote] = useMultiplayerState<boolean>(
    "anonymous-vote",
    false
  );

  return (
    <GameSettingContext.Provider
      value={{
        numPlayers,
        optionalCharacters,
        numExpeditions,
        anonymousVote,
        setNumPlayers,
        setOptionalCharacters,
        setNumExpeditions,
        setAnonymousVote,
      }}
    >
      {children}
    </GameSettingContext.Provider>
  );
};
