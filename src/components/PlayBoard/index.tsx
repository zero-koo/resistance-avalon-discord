import ControlBoard from "../ControlBoard";
import PlayersBoard from "../PlayersBoard";

const PlayBoard = () => {
  return (
    <div className="responsive-square relative flex items-center justify-center">
      <PlayersBoard />
      <div
        className={
          "absolute inset-1/4 flex items-center justify-center px-3 py-5"
        }
      >
        <ControlBoard />
      </div>
    </div>
  );
};

export default PlayBoard;
