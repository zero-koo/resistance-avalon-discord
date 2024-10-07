import { FaCheck, FaXmark } from "react-icons/fa6";

import { cn } from "@/lib/utils";

export type RoundMarkerProps = {
  round: number;
  /**
   * whether the expedition on this round succeeded or not
   */
  numExpeditions: number;
  /**
   * number of expeditions for this round;
   */
  questSuccess: boolean | null;
  /**
   * Is this the current round?
   */
  isCurrent?: boolean;
  countCompositionTrial: number;
};

const RoundMarker: React.FC<RoundMarkerProps> = ({
  round,
  numExpeditions,
  countCompositionTrial,
  questSuccess,
  isCurrent,
}) => {
  return (
    <div
      className={cn(
        "convex relative flex size-16 flex-col items-center justify-center rounded-full bg-white/30 shadow-inner backdrop-blur"
      )}
    >
      <div className={cn("p-[1px] text-3xl font-bold text-yellow-200")}>
        {numExpeditions}
      </div>
      <div
        className={cn(
          "absolute -top-0.5 -translate-y-[100%] text-sm font-bold opacity-40",
          {
            "diffused text-yellow-200 opacity-100": isCurrent,
          }
        )}
      >{`${round + 1}${isCurrent ? ` - ${countCompositionTrial}` : ""}`}</div>
      {questSuccess !== null &&
        (questSuccess ? <SuccessMarker /> : <FailMarker />)}
    </div>
  );
};

export default RoundMarker;

const SuccessMarker: React.FC = () => {
  return (
    <div className="convex absolute inset-[1px] flex items-center justify-center rounded-full bg-green-200/80 backdrop-blur-lg">
      <FaCheck className="diffused scale-150 text-green-500/90" size={25} />
    </div>
  );
};

const FailMarker: React.FC = () => {
  return (
    <div className="convex convex absolute inset-[1px] flex items-center justify-center rounded-full bg-red-200/80 backdrop-blur-lg">
      <FaXmark className="diffused scale-150 text-red-500/90" size={25} />
    </div>
  );
};
