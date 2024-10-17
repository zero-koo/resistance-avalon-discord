import GameLogs from "./GameLogs";
import PlayBoard from "./PlayBoard";
import RoundBoard from "./RoundBoard";

const PlayGround: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-20">
        <RoundBoard />
      </div>
      <PlayBoard />
      <div className="fixed bottom-0 left-0 right-0 flex justify-center">
        <GameLogs />
      </div>
    </div>
  );
};

export default PlayGround;
