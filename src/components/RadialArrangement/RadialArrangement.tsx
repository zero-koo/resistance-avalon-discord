import style from "./RadialArrangement.module.css";

type RadialArrangementProps = {
  /**
   * child nodes to be arranged
   */
  items: React.ReactNode[];
  /**
   * container size in pixel
   */
  size: number;
  /**
   * rotate angle in degree
   * default: 0
   */
  rotateAngle?: number;
};

const RadialArrangement: React.FC<RadialArrangementProps> = ({
  items,
  size,
  rotateAngle = 0,
}) => {
  return (
    <div
      className={style.container}
      style={{ "--size": `${size}px` } as React.CSSProperties}
    >
      {items.map((item, index) => (
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
