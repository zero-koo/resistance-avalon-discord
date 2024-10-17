import { useEffect } from "react";

import { useGameState } from "@/contexts/GameStateContext";

import { useParticipants } from "./useParticipants";
import { usePlayers } from "./usePlayers";

export const useHandleDisconnection = () => {
  const { participants } = useParticipants();
  const { isStarted } = useGameState();
  const { players, setPlayers } = usePlayers();

  useEffect(() => {
    if (!participants.length || isStarted) return;
    setPlayers(
      players.filter((player) =>
        participants.some((participant) => {
          return participant.id === player.id;
        })
      )
    );
  }, [participants]);
};
