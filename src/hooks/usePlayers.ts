import { useContext } from "react";
import { PlayersContext } from "@/contexts/PlayersContext";

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (!context) throw Error("PlayersContext should be provided!");
  return context;
};
