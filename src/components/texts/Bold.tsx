import React from "react";

import { cn } from "@/lib/utils";

const Bold: React.FC<
  React.PropsWithChildren & React.HTMLAttributes<HTMLSpanElement>
> = ({ className, children, ...props }) => {
  return (
    <b className={cn("text-[1.1em] font-bold", className)} {...props}>
      {children}
    </b>
  );
};

export default Bold;
