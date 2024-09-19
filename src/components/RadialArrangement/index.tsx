import style from "./RadialArrangement.module.css";

const RadialArrangement: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export default RadialArrangement;
