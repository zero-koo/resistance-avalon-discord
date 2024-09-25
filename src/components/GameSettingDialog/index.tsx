import { useGameSetting } from "@/hooks/useGameSetting";

import GameSettingDialogComponent from "./GameSettingDialog";

const GameSettingDialog: React.FC = () => {
  const { gameSetting, setGameSetting } = useGameSetting();

  return (
    <GameSettingDialogComponent
      initialSetting={gameSetting}
      onChangeSetting={setGameSetting}
    />
  );
};

export default GameSettingDialog;
