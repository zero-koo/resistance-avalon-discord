import { useContext } from "react";

import { GameSettingContext } from "@/contexts/GameSettingContext";

export const useGameSetting = () => {
  const context = useContext(GameSettingContext);
  if (!context) throw Error("GameSettingContext should be provided!");
  return context;
};
