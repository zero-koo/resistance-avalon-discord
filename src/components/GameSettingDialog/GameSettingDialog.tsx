import { useId, useState } from "react";
import { FiSettings } from "react-icons/fi";

import { GameSetting } from "@/contexts/GameSettingContext";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

import GameSettingForm from "../GameSettingForm/GameSettingForm";

type GameSettingDialogProps = {
  initialSetting?: GameSetting;
  onChangeSetting: (setting: GameSetting) => void;
};

const GameSettingDialog: React.FC<GameSettingDialogProps> = ({
  initialSetting,
  onChangeSetting,
}) => {
  const formId = useId();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <Button
          variant={"outline"}
          className="w-20"
          onClick={() => setIsDialogOpen(true)}
        >
          설정
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게임 설정</DialogTitle>
        </DialogHeader>
        <GameSettingForm
          formId={formId}
          initialSetting={initialSetting}
          onSubmit={(setting) => {
            onChangeSetting(setting);
            setIsDialogOpen(false);
          }}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">취소</Button>
          </DialogClose>
          <Button form={formId} type="submit">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameSettingDialog;
