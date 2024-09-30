import { useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";

import { cn } from "@/lib/utils";

import ConfirmButton from "./ConfirmButton";
import { Button } from "./ui/Button";

type VoteProps = {
  value?: boolean | null;
  isInFavorOnly?: boolean;
  onVote: (value: boolean | null) => void;
};

const Vote: React.FC<VoteProps> = ({ value, isInFavorOnly, onVote }) => {
  const [isApproved, setIsApproved] = useState<boolean | null>(
    isInFavorOnly ? true : value ?? null
  );
  return (
    <div className="flex flex-col items-center gap-[0.5em]">
      <div className="flex justify-center gap-5">
        <label className={cn("flex h-fit rounded-3xl border")}>
          <input type="radio" name="id" className="appearance-none" />
          <button
            className={cn(
              "flex size-[2.5em] items-center justify-center rounded-3xl text-[1.5em] opacity-80 hover:opacity-100",
              {
                "opacity-100 outline outline-1": isApproved === true,
              }
            )}
            disabled={value !== null}
            onClick={() => setIsApproved(true)}
          >
            <FaThumbsUp />
          </button>
        </label>
        <label className={cn("flex h-fit rounded-3xl border")}>
          <input
            type="radio"
            name="id"
            className="appearance-none"
            disabled={isInFavorOnly}
          />
          <button
            disabled={value !== null || isInFavorOnly}
            className={cn(
              "flex size-[2.5em] items-center justify-center rounded-3xl text-[1.5em] opacity-80 hover:opacity-100",
              {
                "opacity-100 outline outline-1": isApproved === false,
              }
            )}
            onClick={() => setIsApproved(false)}
          >
            <FaThumbsDown />
          </button>
        </label>
      </div>
      <div>
        {value === null ? (
          <ConfirmButton
            disabled={isApproved === null}
            onClick={() => onVote(isApproved!)}
          />
        ) : (
          <Button size="sm" variant="outline" onClick={() => onVote(null)}>
            <GrPowerReset className="-ml-0.5 mr-2 -scale-x-100 text-orange-500" />
            <span>취소</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Vote;
