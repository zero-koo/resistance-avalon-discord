import { RiVipCrownFill } from "react-icons/ri";

import { cn } from "@/lib/utils";

import Bold from "./Bold";

const CommanderText: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => {
  return (
    <Bold className={cn("text-[1.1em] text-yellow-100", className)} {...props}>
      <RiVipCrownFill className="mb-0.5 inline" />
      <b>원정대장</b>
    </Bold>
  );
};

export default CommanderText;
