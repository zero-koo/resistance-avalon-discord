import discordAvaterImage from "@/assets/discord_avatar.webp";
import { FaCheck } from "react-icons/fa6";
import { GiCrossedSwords } from "react-icons/gi";
import { GrFlagFill } from "react-icons/gr";
import { RiVipCrownFill } from "react-icons/ri";

import {
  characterImageMap,
  characterMap,
  CharacterSide,
  CharacterType,
} from "@/constants/characters";
import { cn } from "@/lib/utils";

import style from "./PlayerAvatar.module.css";

type PlayerAvatarProps = {
  playerName?: string;
  avatar?: string;
  isSpeaking?: boolean;
  side: CharacterSide | null;
  character: CharacterType | null;
  showCharacter?: boolean;
  isCommander?: boolean;
  isExpedition?: boolean;
  selectable?: boolean;
  isSelected?: boolean;
  isAssassinationTarget?: boolean;
  size?: "default" | "sm";
  onToggleSelect?: (selected: boolean) => void;
};

const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  playerName,
  avatar,
  isSpeaking,
  side,
  character,
  isCommander,
  isExpedition,
  selectable,
  isAssassinationTarget,
  isSelected,
  size = "default",
  onToggleSelect,
}) => {
  const characterSide = character ? characterMap[character].side : side ?? null;
  return (
    <div
      className={cn(
        "pointer-events-none relative rounded-full bg-white outline outline-offset-2 outline-gray-500",
        style.avatar,
        {
          [style.small]: size === "sm",
          "hover:outline-white": selectable,
          "centric-shadow shadow-white": isSpeaking,
          "shadow-blue-600": characterSide === "Citizen",
          "shadow-red-600": characterSide === "Evil",
          "outline-white": isSelected,
          "outline-red-600": isAssassinationTarget,
        }
      )}
    >
      <label
        className={cn(
          "pointer-events-auto flex size-full items-center justify-center rounded-full",
          {
            "cursor-pointer": selectable,
          }
        )}
      >
        <input
          type="checkbox"
          className="appearance-none"
          disabled={!selectable}
          checked={(isSelected || isAssassinationTarget) ?? false}
          onChange={(e) => {
            onToggleSelect?.(e.target.checked);
          }}
        />
        <img
          src={
            character
              ? characterImageMap[character]
              : avatar ?? discordAvaterImage
          }
          className={cn("size-full rounded-full", {
            "grayscale-[80%]": !character,
          })}
        />
        <div className="convex absolute inset-0 rounded-full" />
        <div
          className={cn(
            "inner-shadow absolute inset-0 rounded-full shadow-gray-500",
            {
              "shadow-blue-600": characterSide === "Citizen",
              "shadow-red-600": characterSide === "Evil",
            }
          )}
        ></div>
      </label>
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
      {character && character !== "Citizen" && character !== "Evil" && (
        <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center text-center text-xs">
          <div className="overflow-hidden text-ellipsis rounded px-1 font-bold uppercase text-yellow-400">
            {character}
          </div>
        </div>
      )}
      {playerName && (
        <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center whitespace-nowrap text-center text-xs">
          <div className="max-w-20 overflow-hidden text-ellipsis rounded bg-slate-900/50 px-1 py-0.5 backdrop-blur-sm">
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
