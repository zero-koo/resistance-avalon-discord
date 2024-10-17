import { createContext } from "react";

import { useGameSetting } from "@/hooks/useGameSetting";
import { useMultiplayerState } from "@/hooks/useMultiplayerState";
import { useParticipants } from "@/hooks/useParticipants";

import { DiscordParticipant } from "./ParticipantsContext";

type PlayersContext = {
  playerIds: string[];
  players: Player[];
  toggleReady(isReady?: boolean): void;
  setPlayers(players: Player[]): void;
  resetPlayers(): void;
};

type Player = DiscordParticipant;

export const PlayersContext = createContext<PlayersContext | null>(null);

export const PlayersProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const {
    gameSetting: { numPlayers },
  } = useGameSetting();
  const { me } = useParticipants();
  const [players, setPlayers] = useMultiplayerState<Player[]>("players", []);

  const toggleReady = (isReady?: boolean) => {
    if (!me) return;

    const ready = isReady ?? !players.some((player) => player.id === me.id);

    if (ready) {
      if (players.length >= numPlayers) {
        throw Error("Already reached maximum player count!");
      }

      setPlayers([...players, me]);
      return;
    }

    setPlayers(players.filter((player) => player.id !== me.id));
  };

  const playerIds = players.map((player) => player.id);

  const resetPlayers = () => {
    setPlayers([]);
  };

  return (
    <PlayersContext.Provider
      value={{
        playerIds,
        players,
        toggleReady,
        setPlayers,
        resetPlayers,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
