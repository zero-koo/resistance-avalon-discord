import discordAvaterImage from "@/assets/discord_avatar.webp";
import { FaCheck } from "react-icons/fa6";
import { GiCrossedSwords } from "react-icons/gi";
import { GrFlagFill } from "react-icons/gr";
import { RiVipCrownFill } from "react-icons/ri";

import { CharacterSide, CharacterType } from "@/constants/characters";
import { cn } from "@/lib/utils";

type PlayerAvatarProps = {
  playerName?: string;
  avater?: string;
  isSpeaking?: boolean;
  side?: CharacterSide;
  character?: CharacterType;
  showCharacter?: boolean;
  isCommander?: boolean;
  isExpedition?: boolean;
  selectable?: boolean;
  isSelected?: boolean;
  isAssassinationTarget?: boolean;
  onToggleSelect?: (selected: boolean) => void;
};

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  playerName,
  avater,
  isSpeaking,
  side,
  character,
  showCharacter,
  isCommander,
  isExpedition,
  selectable,
  isAssassinationTarget,
  isSelected,
  onToggleSelect,
}) => {
  return (
    <div
      className={cn("relative size-20 rounded-full bg-white", {
        "centric-shadow shadow-gray-400": isSpeaking,
        "shadow-blue-600": side === "Citizen",
        "shadow-red-600": side === "Evil",
      })}
    >
      <label className="flex size-full items-center justify-center rounded-full">
        <input
          type="checkbox"
          className="appearance-none"
          disabled={!selectable}
          checked={isSelected || isAssassinationTarget}
          onChange={(e) => onToggleSelect?.(e.target.checked)}
        />
        <img
          src={discordAvaterImage}
          className="size-full rounded-full grayscale-[80%]"
        />
      </label>
      <div className="convex absolute inset-0 rounded-full" />
      <div
        className={cn(
          "inner-shadow absolute inset-0 rounded-full shadow-gray-500",
          {
            "shadow-blue-600": side === "Citizen",
            "shadow-red-600": side === "Evil",
          }
        )}
      ></div>
      {isCommander && (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-slate-900/50 p-1 px-1.5 shadow backdrop-blur-sm">
          <RiVipCrownFill size={18} className="text-white/80" />
        </div>
      )}
      {isExpedition && (
        <div className="absolute right-[8%] top-[30%] -translate-y-1/2 translate-x-1/2 rounded-2xl bg-slate-900/50 p-1 shadow backdrop-blur-sm">
          <GrFlagFill size={20} className="scale-75 text-white/80" />
        </div>
      )}
      {playerName && (
        <div className="absolute -bottom-1.5 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center text-center text-xs">
          <div className="min-w-16 max-w-20 overflow-hidden text-ellipsis rounded bg-slate-900/50 px-1 py-0.5 backdrop-blur-sm">
            {playerName}
          </div>
        </div>
      )}
      {isSelected && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <FaCheck
            className="scale-125 text-green-600/90 drop-shadow-lg"
            size={50}
          />
        </div>
      )}
      {isAssassinationTarget && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <GiCrossedSwords
            className="scale-125 text-red-600 drop-shadow-lg"
            size={40}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerAvatar;
