import { FaCheck } from "react-icons/fa6";

import { cn } from "@/lib/utils";

import { Button } from "./ui/Button";

const ConfirmButton: React.FC<{
  disabled: boolean;
  onClick: () => void;
}> = ({ disabled, onClick }) => {
  return (
    <Button
      size="sm"
      variant="outline"
      disabled={disabled}
      onClick={() => onClick()}
    >
      <FaCheck
        className={cn("-ml-0.5 mr-2", {
          "text-green-500": !disabled,
        })}
      />
      <span>확인</span>
    </Button>
  );
};

export default ConfirmButton;
