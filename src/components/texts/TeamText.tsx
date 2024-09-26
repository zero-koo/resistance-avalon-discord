import { GrFlagFill } from "react-icons/gr";

import { cn } from "@/lib/utils";

import Bold from "./Bold";

const TeamText: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (
  className,
  props
) => {
  return (
    <Bold className={cn("text-[1.1em] text-yellow-100", className)} {...props}>
      <GrFlagFill className="inline" />
      <b>원정대</b>
    </Bold>
  );
};

export default TeamText;
