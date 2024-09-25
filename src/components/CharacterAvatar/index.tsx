import { characterImageMap, CharacterType } from "@/constants/characters";
import { cn } from "@/lib/utils";

const CharacterAvatar: React.FC<{ character: CharacterType }> = ({
  character,
}) => {
  return (
    <div className="size-full rounded-full">
      <img
        src={characterImageMap[character]}
        className={cn("size-full rounded-full")}
      />
      <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center text-center text-xs">
        <div className="overflow-hidden text-ellipsis rounded px-1 font-bold uppercase">
          {character}
        </div>
      </div>
    </div>
  );
};

export default CharacterAvatar;
