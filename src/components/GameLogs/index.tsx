import { useEffect, useRef } from "react";

import { useGameState } from "@/contexts/GameStateContext";
import { usePlayers } from "@/hooks/usePlayers";

import GameLog from "../GameLog";
import { GameLogProps } from "../GameLog/GameLogView";

const GameLogs = () => {
  const { myPlayerState, gameLogs, playerState } = useGameState();
  const { players } = usePlayers();

  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    container.current?.scrollTo({
      top: container.current?.scrollHeight ?? 9999,
      behavior: "smooth",
    });
  }, [gameLogs]);
  return (
    <div
      className="responsive-width flex h-28 flex-col gap-3 overflow-auto bg-slate-500/90 p-5"
      ref={container}
    >
      {gameLogs.map((log, index) => {
        const logProps: GameLogProps = (() => {
          switch (log.type) {
            case "character": {
              return {
                type: "character",
                character: myPlayerState?.characterType,
              };
            }
            case "team-build": {
              const { commanderIndex, teamMemberIds } = log;
              const commander = players.find(
                (player) => playerState[player.id].order === commanderIndex
              );
              const teamMembers = teamMemberIds.map(
                (id) =>
                  players.find((player) => player.id === id)?.name ?? "알수없음"
              );

              return {
                ...log,
                commander: commander?.name ?? "알수없음",
                teamMembers,
              };
            }
            default:
              return log;
          }
        })();

        return <GameLog key={index} {...logProps} />;
      })}
    </div>
  );
};

export default GameLogs;
