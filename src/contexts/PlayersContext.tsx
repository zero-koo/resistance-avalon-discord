import { createContext, useMemo } from "react";

import { useGameSetting } from "@/hooks/useGameSetting";
import { useMultiplayerState } from "@/hooks/useMultiplayerState";
import { useParticipants } from "@/hooks/useParticipants";

import { DiscordParticipant } from "./ParticipantsContext";

type PlayersContext = {
  playerIds: string[];
  players: Player[];
  viewers: Viewer[];
  toggleReady(isReady?: boolean): void;
};

type Player = DiscordParticipant;
type Viewer = DiscordParticipant;

export const PlayersContext = createContext<PlayersContext | null>(null);

export const PlayersProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const {
    gameSetting: { numPlayers },
  } = useGameSetting();
  const { me, participants } = useParticipants();

  const [playerIds, setPlayerIds] = useMultiplayerState<string[]>(
    "player-ids",
    []
  );

  const toggleReady = (isReady?: boolean) => {
    if (!me) return;

    const ready = isReady ?? !playerIds.includes(me.id);

    if (ready && playerIds.length >= numPlayers) {
      throw Error("Already reached maximum player count!");
    }

    const ids = playerIds.filter((id) => id !== me.id);
    setPlayerIds(ready ? [...ids, me.id] : ids);
  };

  const [players, viewers] = useMemo<[Player[], Viewer[]]>(
    () =>
      participants.reduce(
        ([players, viewers]: [Player[], Viewer[]], participant) => {
          if (playerIds.includes(participant.id)) {
            players.push(participant);
          } else {
            viewers.push(participant);
          }
          return [players, viewers];
        },
        [[], []]
      ),
    [playerIds, participants]
  );

  return (
    <PlayersContext.Provider
      value={{
        playerIds,
        players,
        viewers,
        toggleReady,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
