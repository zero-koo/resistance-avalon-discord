import { cn } from "@/lib/utils";
import { useBoundingClientRect } from "@/hooks/useBoundingClientRect";

import style from "./RadialArrangement.module.css";

type RadialArrangementProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * child nodes to be arranged
   */
  items: React.ReactNode[];
  /**
   * rotate angle in degree
   * default: 0
   */
  rotateAngle?: number;
};

const RadialArrangement: React.FC<RadialArrangementProps> = ({
  className,
  items,
  rotateAngle = 0,
}) => {
  const [ref, rect] = useBoundingClientRect();
  return (
    <div
      ref={ref}
      className={cn("responsive-square relative size-full", className)}
      style={{ "--size": `${rect?.width}px` } as React.CSSProperties}
    >
      {rect &&
        items.map((item, index) => (
          <div
            key={index}
            className={style.outer}
            style={
              {
                "--angle": `${(360 / items.length) * index + rotateAngle}deg`,
              } as React.CSSProperties
            }
          >
            <div className={style.inner}>{item}</div>
          </div>
        ))}
    </div>
  );
};

export default RadialArrangement;
