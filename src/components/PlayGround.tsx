import PlayBoard from "./PlayBoard";
import RoundBoard from "./RoundBoard";

const PlayGround: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-20">
        <RoundBoard />
      </div>
      <PlayBoard />
    </div>
  );
};

export default PlayGround;
