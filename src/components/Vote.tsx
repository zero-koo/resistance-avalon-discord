import { useState } from "react";
import { FaCheck, FaThumbsDown, FaThumbsUp, FaX } from "react-icons/fa6";

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
    <div className="flex flex-col items-center gap-2">
      <div className="flex justify-center gap-5">
        <label className={cn("rounded-3xl border")}>
          <input
            type="radio"
            name="id"
            className="appearance-none"
            onClick={() => setIsApproved(true)}
          />
          <button
            className={cn("rounded-3xl p-4 opacity-80 hover:opacity-100", {
              "opacity-100 outline outline-2": value === true,
            })}
          >
            <FaThumbsUp size={20} />
          </button>
        </label>
        <label className={cn("rounded-3xl border")}>
          <input
            type="radio"
            name="id"
            className="appearance-none"
            disabled={isInFavorOnly}
            onClick={() => setIsApproved(false)}
          />
          <button
            disabled={isInFavorOnly}
            className={cn("rounded-3xl p-4 opacity-80 hover:opacity-100", {
              "opacity-100 outline outline-2": value === false,
            })}
          >
            <FaThumbsDown size={20} />
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
            <FaX className="-ml-0.5 mr-2 text-red-500" />
            <span>취소</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Vote;
